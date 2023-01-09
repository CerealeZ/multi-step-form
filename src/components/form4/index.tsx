import { FormProps, Form } from "pages"
import { Plan, plans, priceText } from "src/constants/plans"
import { plans as addonsList } from "src/constants/addons"

type TotalBilling = {
  [Propety in Form["plan"]["billing"]]: string
}

const totalText: TotalBilling = {
  monthly: "month",
  yearly: "year",
}

export const Form4: React.FC<FormProps> = ({ watcher }) => {
  const { plan: userPlan, addons } = watcher()

  const choosedPlan = plans.find(
    (constant) => constant.title === userPlan.name
  ) as Plan
  const choosedAddons = addonsList.filter((addon) => {
    const isChoosed = addons.some((addonValue) => addonValue === addon.value)
    return isChoosed
  })

  const addonsTotalPrice = choosedAddons.reduce<number>((total, addon) => {
    const value = Number(addon.priceText[userPlan.billing].match(/(\d+)/)?.[0]) // Get number
    return total + value
  }, 0)

  const planPrice = choosedPlan.billing[userPlan.billing]
  const totalPrice = addonsTotalPrice + planPrice

  return (
    <div className="form-container">
      <header>
        <h2>Finish up</h2>
        <h3>Double-everything looks OK before confirming</h3>
      </header>
      <div className="summary">
        <div className="summary__resume">
          <div className="summary__section summary__section--header">
            <div className="item">
              <div className="item__name">
                <p className="item__plan-name">
                  {userPlan.name} ({userPlan.billing})
                </p>
                <p className="item__plan-change">Change</p>
              </div>
              <p className="item__price item__price--plan">
                ${choosedPlan.billing[userPlan.billing]}
                {priceText[userPlan.billing][0]}
              </p>
            </div>
          </div>
          <div className="summary__section">
            {choosedAddons.map(({ primaryText, priceText }, key) => {
              return (
                <div className="item" key={key}>
                  <p className="item__name">{primaryText}</p>
                  <p className="item__price">{priceText[userPlan.billing]}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="summary__resume summary__resume--total">
          <div className="summary__section">
            <div className="item">
              <p className="item__name">
                Total (per {totalText[userPlan.billing]})
              </p>
              <p className="item__price item__price--final">
                ${totalPrice}
                {priceText[userPlan.billing][0]}
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        p {
          margin: 0;
        }

        .item {
          display: grid;
          grid-template-columns: 7fr 1fr;
          align-items: center;
        }
        .item__name {
          grid-column-start: 1;
          color: hsl(231, 11%, 63%);
        }

        .item__price {
          grid-column-start: 2;
          justify-self: end;
          color: hsl(213, 96%, 18%);
        }

        .item__price--final {
          font-weight: 700;
          font-size: 1.3rem;
          color: hsl(243, 100%, 62%);
        }
        .item__price--plan {
          font-weight: 700;
        }

        .item__plan-name {
          font-weight: 700;
          color: hsl(213, 96%, 18%);
          text-transform: capitalize;
        }

        .item__plan-change {
          text-decoration: underline;
          cursor: pointer;
        }

        .summary__resume {
          background-color: hsl(217, 100%, 97%);
          padding: 0 15px;
          border-radius: 10px;
        }

        .summary__resume--total {
          background-color: initial;
        }

        .summary__section {
          display: flex;
          flex-direction: column;
          gap: 15px;
          padding: 15px 0;
        }
        .summary__section--header {
          border-bottom: 1px solid hsl(231, 11%, 63%);
        }
      `}</style>
    </div>
  )
}
