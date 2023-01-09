import React, { useEffect, useState } from "react"
import { Form1 } from "src/components/form1"
import { Form2 } from "src/components/form2"
import { Form3 } from "src/components/form3"
import { Form4 } from "src/components/form4"
import { Buttons } from "src/components/buttons"
import { ThankYou } from "src/components/thanks"
import { useForm } from "react-hook-form"
import { useDevice } from "src/hooks/useDevice"
import { FormMenu } from "src/components/form-menu"
import { Ubuntu } from "@next/font/google"
import {
  FieldErrorsImpl,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form/dist/types"
import Head from "next/head"

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"],
})

const components = [
  { desc: "Your info", Component: Form1 },
  { desc: "Select Plan", Component: Form2 },
  { desc: "Add-ons", Component: Form3 },
  {
    desc: "Summary",
    Component: Form4,
  },
]

export interface Device {
  name: "desktop" | "mobile"
  minWidth: number
}

export interface Form {
  name: string
  email: string
  tel: string
  plan: {
    name: "arcade" | "advanced" | "pro"
    billing: "monthly" | "yearly"
  }
  addons: string[]
}

export interface FormProps {
  setCurrentValues?: (values: (keyof Form)[]) => void
  device?: Device["name"]
  inputHandler: UseFormRegister<Form>
  errors?: Partial<FieldErrorsImpl<Form>>
  watcher: UseFormWatch<Form>
  setValue: UseFormSetValue<Form>
}

// Keep this array descendent.

const devices: Device[] = [
  { name: "desktop", minWidth: 1024 },
  { name: "mobile", minWidth: 600 },
]

export default function Home() {
  const [step, setStep] = useState<number>(0)
  const [isDone, setIsDone] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: {
      name: "",
      email: "",
      tel: "",
      plan: {
        name: undefined,
        billing: undefined,
      },
      addons: [],
    },
  })
  const Form: React.FC<FormProps> = components[step].Component
  const device = useDevice<Device, Device["name"]>(
    devices,
    (devices, windowWidth) => {
      const device =
        devices.find((device) => device.minWidth <= windowWidth) ??
        (devices.at(-1) as Device)
      return device.name
    }
  )

  useEffect(
    function scrollToTop() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    },
    [step]
  )

  if (!device) return null

  const newWea = {
    menu: (
      <FormMenu
        device={device}
        components={components}
        step={step}
        onChangeStep={(step) => {
          // WIP
          // setStep(step)
        }}
      />
    ),
    form: (
      <Form
        watcher={watch}
        errors={errors}
        inputHandler={register}
        device={device}
        setValue={setValue}
      />
    ),
    buttons: (
      <Buttons
        step={step}
        onNext={(nextStep) => {
          handleSubmit(() => {
            setStep(nextStep)
          })()
        }}
        onFinish={() => {
          setIsDone(true)
        }}
        onBack={(previusStep) => setStep(previusStep)}
        maxStep={3}
      />
    ),
    thanks: <ThankYou />,
  }

  return (
    <>
      <Head>
        <title>Multi Form Step</title>
      </Head>
      <div className={`container ${ubuntu.className}`}>
        {device === "mobile" && <MobileLayout isDone={isDone} {...newWea} />}
        {device === "desktop" && <DesktopLayout isDone={isDone} {...newWea} />}

        <style jsx>
          {`
            .container :global(.form-container) {
              display: flex;
              flex-direction: column;
              gap: 30px;
            }

            .container :global(header) {
              display: flex;
              flex-direction: column;
              gap: 15px;
            }
            .container :global(h2) {
              color: hsl(213, 96%, 18%);
              font-weight: 700;
              font-size: 1.7rem;
              margin: 0;
            }

            .container :global(h3) {
              font-weight: 500;
              color: hsl(231, 11%, 63%);
              margin: 0;
            }
          `}
        </style>
      </div>
    </>
  )
}

interface LayoutProps {
  menu: JSX.Element
  form: JSX.Element
  buttons: JSX.Element
  thanks: JSX.Element
  isDone: boolean
}

const MobileLayout: React.FC<LayoutProps> = ({
  menu,
  form,
  buttons,
  thanks,
  isDone,
}) => {
  return (
    <div className={`container`}>
      <div className="container__menu">{menu}</div>
      {isDone ? (
        <div className="container__form">{thanks}</div>
      ) : (
        <>
          <div className="container__form">{form} </div>
          <div className="container__buttons">{buttons}</div>
        </>
      )}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background-color: hsl(206, 94%, 87%);
          background-image: url("/bg-sidebar-mobile.svg");
          background-repeat: no-repeat;
          background-size: 100% 250px;
          gap: 25px;
        }
        .container__form {
          background-color: hsl(0, 0%, 100%);
          box-sizing: border-box;
          border-radius: 10px;
          padding: 30px;
          align-self: center;
          width: 80%;
          box-shadow: 0px 15px 23px -11px rgba(82, 82, 82, 1);
        }

        .container__buttons {
          margin-top: auto;
          padding: 20px;
          background-color: hsl(0, 0%, 100%);
        }
        .container__menu {
          padding: 25px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

const DesktopLayout: React.FC<LayoutProps> = ({
  menu,
  form,
  buttons,
  isDone,
  thanks,
}) => {
  return (
    <div className={`container`}>
      <div className="multi-form">
        <div className="multi-form__menu">{menu}</div>
        {isDone ? (
          <div className={"multi-form__thanks"}>{thanks}</div>
        ) : (
          <>
            <div className="multi-form__buttons">{buttons}</div>
            <div className={"multi-form__form"}>{form}</div>
          </>
        )}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background-color: hsl(206, 94%, 87%);
        }
        .multi-form {
          display: grid;
          grid-template-columns: 2fr 5fr;
          grid-template-rows: 8fr 1fr;
          grid-template-areas:
            "menu form"
            "menu buttons";
          padding: 15px;
          border-radius: 10px;
          max-width: 1024px;
          width: 100%;
          min-height: 560px;
          background-color: hsl(0, 0%, 100%);
          box-sizing: border-box;
        }
        .multi-form--mobile {
          display: flex;
          flex-direction: column;
        }

        .multi-form__menu {
          padding: 30px;
          grid-area: menu;
          background-image: url("/bg-sidebar-desktop.svg");
          background-repeat: no-repeat;
          background-size: contain;
        }
        .multi-form__form {
          grid-area: form;
          padding: 40px 60px;
        }

        .multi-form__thanks {
          grid-row-start: form;
          grid-column-start: form;
          grid-row-end: buttons;
          grid-column-end: buttons;
          display: flex;
          place-content: center;
          max-width: 50%;
          justify-self: center;
        }

        .multi-form__buttons {
          grid-area: buttons;
          padding: 0 60px;
        }
      `}</style>
    </div>
  )
}
