export const ThankYou = () => {
  return (
    <div className="container">
      <div>
        <img alt="thx" src="/icon-thank-you.svg" />
      </div>
      <div className="container__text">
        <h2>Thank you!</h2>
        <h3>
          {
            "Thanks for use my project. Nothing was send to anywhere, so stay calm (you can check your network log if you don't trust me). If you like it, leave a start in my GitHub and contact me throght my email"
          }
        </h3>
      </div>

      <style jsx>
        {`
          .container {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            gap: 30px;
          }

          .container__text {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          h2 {
            color: hsl(213, 96%, 18%);
            font-weight: 700;
            font-size: 1.7rem;
            margin: 0;
          }

          h3 {
            font-weight: 500;
            color: hsl(231, 11%, 63%);
            font-size: 1rem;
            margin: 0;
            line-height: 1.4rem;
          }
        `}
      </style>
    </div>
  )
}
