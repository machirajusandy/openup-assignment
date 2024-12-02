import React, { ComponentProps } from 'react'

const Button = ({ className, ...rest }: ComponentProps<'button'>) => {
  return (
    <button
      {...rest}
      className={`px-4 py-2 bg-blue-500 text-white rounded-md ${className}`}
    />
  )
}

export default Button
