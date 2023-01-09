interface ButtonsProps {
  step: number
  maxStep: number
  onNext: (nextStep: number) => void
  onBack: (previusStep: number) => void
  onFinish: () => void
}

export const Buttons: React.FC<ButtonsProps> = ({
  step,
  onNext,
  maxStep,
  onBack,
  onFinish,
}) => {
  return (
    <div className="container">
      {step > 0 && (
        <button
          onClick={() => onBack(step - 1)}
          className="container__btn container__btn--back"
        >
          Go Back
        </button>
      )}

      {step !== maxStep ? (
        <button
          onClick={() => onNext(step + 1)}
          className="container__btn container__btn--next"
        >
          Next Step
        </button>
      ) : (
        <button
          onClick={() => onFinish()}
          className="container__btn container__btn--finish "
        >
          Confirm
        </button>
      )}

      <style jsx>
        {`
          .container {
            display: flex;
          }

          .container__btn {
            border: none;
            padding: 15px 20px;
            cursor: pointer;
            border-radius: 10px;
            min-width: 120px;
          }

          .container__btn--back {
            background-color: transparent;
            color: hsl(231, 11%, 63%);
          }

          .container__btn--next {
            background-color: hsl(213, 96%, 18%);
            color: hsl(0, 0%, 100%);
            margin-left: auto;
          }
          .container__btn--finish {
            background-color: hsl(243, 100%, 62%);
            color: hsl(0, 0%, 100%);
            margin-left: auto;
          }
        `}
      </style>
    </div>
  )
}
