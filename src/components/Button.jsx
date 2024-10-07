import React from 'react'

export default function Button ({ children, onClick, className, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`h-[45px] w-full border-none rounded-[25px] 
                  text-[#fff] text-[16px] cursor-pointer flex justify-center items-center
                  transition-all duration-200 ease-in-out bg-[#473a2b] hover:bg-[#322618]
    ${buttonType === 'secondary' ? "text-[18px] opacity-[0.85": ""}`}
    >
      {children}
    </button>
  )
}
