import { FormProps, Form } from "pages"
import { plans } from "src/constants/addons"

export const Form3: React.FC<FormProps> = ({ inputHandler, watcher }) => {
  return (
    <div className="form-container">
      <header>
        <h2>Pick add-ons</h2>
        <h3>Add-ons help enhance your gaming experience</h3>
      </header>
      <form>
        {plans.map(({ value, primaryText, secundaryText, priceText }, key) => {
          const { addons, plan } = watcher()
          const isChecked = addons.some((addon) => value === addon)
          return (
            <CheckButton
              key={key}
              primaryText={primaryText}
              secundaryText={secundaryText}
              labelPrice={priceText[plan?.billing]}
              value={value}
              isActive={isChecked}
              name={"addons"}
              inputHandler={inputHandler}
            />
          )
        })}
      </form>
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
      `}</style>
    </div>
  )
}

interface CheckButtonProps {
  primaryText: string
  secundaryText: string
  labelPrice: string
  value: string
  name: keyof Form
  isActive: boolean
  inputHandler: FormProps["inputHandler"]
}

const CheckButton: React.FC<CheckButtonProps> = ({
  primaryText,
  secundaryText,
  labelPrice,
  isActive,
  name,
  value,
  inputHandler,
}) => {
  return (
    <label className="label">
      <input
        className="label__checkbox"
        checked={isActive}
        {...inputHandler(name)}
        value={value}
        type={"checkbox"}
      />
      <div className="label__text-block">
        <p className="label__text label__text--primary">{primaryText}</p>
        <p className="label__text label__text--secundary">{secundaryText}</p>
      </div>

      <p className="label__price label__text">{labelPrice}</p>
      <style jsx>
        {`
          .label {
            display: flex;
            align-items: center;
            border-radius: 10px;
            padding: 15px;
            ${isActive
              ? "background-color: hsl(217, 100%, 97%);" +
                "outline: 1.6px solid hsl(243, 100%, 62%);"
              : "outline: 1px solid hsl(231, 11%, 63%);"}
            border-radius: 10px;
            gap: 20px;
            cursor: pointer;
          }

          .label__checkbox {
          }

          .label__text-block {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          .label__text {
            margin: 0;
            padding: 0;
          }
          .label__text--primary {
            font-weight: 700;
            color: hsl(213, 96%, 18%);
          }
          .label__text--secundary {
            color: hsl(231, 11%, 63%);
          }

          .label__price {
            margin-left: auto;
            font-weight: 500;
            color: hsl(243, 100%, 62%);
          }
        `}
      </style>
    </label>
  )
}
