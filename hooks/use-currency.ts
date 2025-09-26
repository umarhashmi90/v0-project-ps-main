"use client"

import { useState } from "react"

export const useCurrency = () => {
  const [currency, setCurrency] = useState("USD")
  const [exchangeRate, setExchangeRate] = useState(1)

  const formatPrice = (priceUSD: number) => {
    const convertedPrice = priceUSD * exchangeRate
    if (currency === "USD") {
      return `$${convertedPrice.toFixed(2)}`
    } else if (currency === "PKR") {
      return `₨${Math.round(convertedPrice)}`
    }
    return `$${convertedPrice.toFixed(2)}`
  }

  return { currency, setCurrency, formatPrice, exchangeRate, setExchangeRate }
}
