import { FormProps } from "pages"
import { Form } from "pages"
import { HTMLInputTypeAttribute } from "react"

export const Form1: React.FC<FormProps> = ({ inputHandler, errors }) => {
  return (
    <div className="form-container">
      <header>
        <h2>Personal info</h2>
        <h3>Please provide your name, email, address, and phone number</h3>
      </header>

      <form>
        {inputs.map(({ name, type, placeholder }, key) => {
          return (
            <div key={key} className="input-box">
              <label className="input-box__label">{name}</label>
              {errors?.[name] && (
                <label className="input-box__error">
                  This field is requeried
                </label>
              )}
              <input
                {...inputHandler(name, { required: true })}
                type={type}
                className={`input-box__input ${
                  errors?.[name] ? "input-box__input--error" : ""
                }`}
                placeholder={placeholder}
              />
            </div>
          )
        })}
      </form>

      <style jsx>
        {`
          .input-box {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "label error"
              "input input";
            gap: 5px;
          }

          .input-box__label {
            color: hsl(213, 96%, 18%);
            grid-area: label;
            font-weight: 500;
            text-transform: capitalize;
          }
          .input-box__error {
            grid-area: error;
            justify-self: end;
            text-align: end;

            color: hsl(354, 84%, 57%);
            font-weight: 700;
          }
          .input-box__input {
            grid-area: input;
            padding: 13px;
            font-weight: 700;
            border-radius: 5px;
            color: hsl(213, 96%, 18%);
            border: 1px solid hsl(231, 11%, 63%);
            outline-color: hsl(213, 96%, 18%);
          }

          .input-box__input--error {
            border-color: hsl(354, 84%, 57%);
          }

          .input-box__input::placeholder {
            color: hsl(231, 11%, 63%);
            font-weight: 500;
          }

          form {
            display: flex;
            flex-direction: column;
            gap: 30px;
          }
        `}
      </style>
    </div>
  )
}

interface Input {
  name: keyof Form
  type: HTMLInputTypeAttribute
  placeholder: string
}

const inputs: Input[] = [
  { name: "name", type: "text", placeholder: "e.g. Stephen King" },
  { name: "email", type: "email", placeholder: "e.g. stephenking@lorem.com" },
  { name: "tel", type: "tel", placeholder: "e.g. +1 234 567 890" },
]
