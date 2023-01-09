import { Device } from "pages"

interface FormMenuProps {
  device: Device["name"]
  step: number
  components: {
    desc: string
  }[]
  onChangeStep: (step: number) => void
}

export const FormMenu: React.FC<FormMenuProps> = ({
  device,
  step,
  components,
  onChangeStep,
}) => {
  return (
    <div className={`section ${device === "mobile" ? "section--mobile" : ""}`}>
      {components.map(({ desc }, index) => {
        const isSelected = index === step

        return (
          <div key={index} className="step" onClick={() => onChangeStep(index)}>
            <div className={`circle ${isSelected ? "circle--selected" : ""}`}>
              <p className="step__desc">{index + 1}</p>
            </div>

            {device === "desktop" && (
              <div>
                <p className="step__title">STEP {index + 1}</p>
                <p className="step__desc">{desc.toUpperCase()}</p>
              </div>
            )}
          </div>
        )
      })}

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
        }
        .section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .section--mobile {
          flex-direction: row;
        }
        .step {
          color: white;
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .step__title {
          font-weight: 400;
          font-size: 0.7rem;
        }

        .step__desc {
          font-weight: 500;
        }

        .circle {
          display: flex;
          position: relative;
          align-items: center;
          justify-content: center;
          border-radius: 100%;
          padding: 15px;
          border-width: 1px;
          border-style: solid;
          border-color: white;
        }

        .circle--selected {
          background-color: hsl(206, 94%, 87%);
          color: hsl(213, 96%, 18%);
          border-color: hsl(229, 24%, 87%);
        }

        .circle * {
          position: absolute;
        }
      `}</style>
    </div>
  )
}
