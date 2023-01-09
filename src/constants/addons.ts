import { Form } from "pages"

export interface Plan {
  value: string
  primaryText: string
  secundaryText: string
  priceText: {
    [k in Form["plan"]["billing"]]: string
  }
}

export const plans: Plan[] = [
  {
    primaryText: "Online Service",
    secundaryText: "Access to multiplayer games",
    priceText: {
      monthly: "+$1/mo",
      yearly: "+$10/yr",
    },
    value: "online-service",
  },
  {
    primaryText: "Larger storage",
    secundaryText: "Extra 1TB of cloud save",
    priceText: {
      monthly: "+$2/mo",
      yearly: "+$20/yr",
    },
    value: "large-storage",
  },
  {
    primaryText: "Customizable profile",
    secundaryText: "Custom theme on your profile",
    priceText: {
      monthly: "+$2/mo",
      yearly: "+$20/yr",
    },
    value: "custom-profile",
  },
]
