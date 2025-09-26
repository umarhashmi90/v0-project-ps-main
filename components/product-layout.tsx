"use client"
import type React from "react"
import Header from "@/components/landing/header"
import Footer from "@/components/landing/footer"

interface ProductLayoutProps {
  children: React.ReactNode
}

export const ProductLayout: React.FC<ProductLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
