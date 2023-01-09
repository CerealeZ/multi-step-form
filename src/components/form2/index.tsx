import { useEffect, useState } from "react"
import { FormProps, Form } from "pages"
import { plans, priceText } from "src/constants/plans"

export const Form2: React.FC<FormProps> = ({
  inputHandler,
  watcher,
  device,
  setValue,
}) => {
  return (
    <div className="form-container">
      <header>
        <h2>Select your plan</h2>
        <h3>You have the option of montly or yearly billing</h3>
      </header>

      <form>
        <div className="plans">
          {plans.map(({ title, svg, billing }, key) => {
            const form = watcher()
            if (!form.plan) return

            return (
              <label
                key={key}
                className={`plan ${
                  title === form?.plan?.name ? "plan--selected" : ""
                }`}
              >
                <div>
                  <img src={svg} alt={title} />
                </div>
                <div className="plan__text">
                  <h4 className="plan__title">{title}</h4>
                  <h4 className="plan__price">
                    ${billing[form.plan.billing]}
                    {priceText[form.plan.billing]?.[0]}
                  </h4>
                  <h5 className="plan__discount">
                    {priceText[form?.plan?.billing]?.[1]}
                  </h5>
                </div>
                <input
                  {...inputHandler("plan.name", { required: true })}
                  value={title}
                  className={"plan__radio"}
                  type={"radio"}
                />
              </label>
            )
          })}
        </div>
        <div className="slider">
          <SliderButton<Form["plan"]["billing"]>
            left={"monthly"}
            rigth={"yearly"}
            value={watcher().plan?.billing}
            onChange={(value) => setValue("plan.billing", value)}
          />
        </div>
      </form>

      <style jsx>
        {`
          h4,
          h5 {
            margin: 0;
            padding: 0;
          }

          .plan__title {
            color: hsl(213, 96%, 18%);
            font-weight: 700;
            text-transform: capitalize;
          }

          .plan__radio {
            display: none;
          }

          .plan__price {
            color: hsl(231, 11%, 63%);
          }

          .plan__discount {
            color: hsl(213, 96%, 18%);
          }

          .slider {
            display: flex;
            place-content: center;
            padding: 20px;
            background-color: hsl(217, 100%, 97%);
            border-radius: 10px;
          }

          form {
            display: flex;
            gap: 20px;
            flex-direction: column;
          }

          .plans {
            display: flex;
            ${device === "mobile" ? "flex-direction: column;" : ""}
            gap: 20px;
          }
          .plan {
            display: flex;
            flex-direction: column;
            ${device === "mobile" ? "flex-direction: row;" : ""}
            flex-wrap: wrap;
            flex: 1;
            box-sizing: border-box;
            gap: 50px;
            ${device === "mobile" ? "gap: 10px;" : ""}
            outline: 1px solid hsl(231, 11%, 63%);
            border-radius: 10px;
            padding: 15px;
            cursor: pointer;
          }
          .plan--selected {
            background-color: hsl(217, 100%, 97%);
            outline-color: hsl(243, 100%, 62%);
            outline-width: 1.6px;
          }

          .plan__text {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
        `}
      </style>
    </div>
  )
}

interface Slider<T extends String> {
  rigth: T
  left: T
  value: T
  onChange: (value: T) => void
}

const SliderButton = <T extends String>({
  rigth,
  left,
  value,
  onChange,
}: Slider<T>) => {
  const [slided, setSlide] = useState(value === rigth ? true : false)

  useEffect(() => {
    console.log(slided)
    onChange(slided ? rigth : left)
  }, [slided])

  return (
    <div className="slider">
      <p>{left}</p>
      <div
        onClick={() => {
          setSlide((prev) => !prev)
        }}
        className="slider__back"
      >
        <div
          className={`slider__btn ${slided ? "slider__btn--move" : ""}`}
        ></div>
      </div>
      <p>{rigth}</p>

      <style jsx>{`
        p {
          margin: 0;
          text-transform: capitalize;
          font-weight: 700;
          color: hsl(213, 96%, 18%);
        }
        .slider {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .slider__back {
          --backWidth: 45px;
          position: relative;
          width: var(--backWidth);
          height: 23px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          cursor: pointer;
          background-color: hsl(213, 96%, 18%);
        }

        .slider__btn {
          position: absolute;
          background-color: white;
          padding: 9px;
          border-radius: 100%;
          left: 3px;
          cursor: pointer;
          transition: left 0.5s;
        }

        .slider__btn--move {
          left: calc(var(--backWidth) - 21px);
        }
      `}</style>
    </div>
  )
}
