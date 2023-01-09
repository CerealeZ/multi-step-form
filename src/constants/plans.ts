import { Form } from "pages"

export interface Plan {
  title: Form["plan"]["name"]
  svg: string
  billing: {
    monthly: number
    yearly: number
  }
}
export const plans: Plan[] = [
  {
    title: "arcade",
    svg: "/icon-arcade.svg",
    billing: {
      monthly: 9,
      yearly: 90,
    },
  },
  {
    title: "advanced",
    svg: "/icon-advanced.svg",
    billing: {
      monthly: 12,
      yearly: 120,
    },
  },
  {
    title: "pro",
    svg: "/icon-pro.svg",
    billing: {
      monthly: 15,
      yearly: 150,
    },
  },
]

export const priceText = {
  monthly: {
    0: "/mo",
    1: "",
  },
  yearly: {
    0: "/yr",
    1: "2 months free",
  },
}
