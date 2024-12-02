import React from 'react'

type CardProps = {
  title: string
  children: React.ReactNode
}

const Card = ({ title, children }: CardProps) => {
  return (
    <div className="rounded-lg border shadow-sm">
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          {title}
        </h3>
      </div>
      <div className="p-6 pt-0">{children}</div>
    </div>
  )
}

export default Card
