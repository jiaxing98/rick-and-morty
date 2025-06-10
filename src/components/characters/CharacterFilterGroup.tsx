import React from 'react'

interface Props {
  title: string
  options: {
    label: string
    color: string
  }[]
}

export const CharacterFilterGroup = ({ title, options }: Props) => {
  return (
    <div className="flex flex-row">
      <h4>{title}</h4>
      <div className="gap-4">
        {options.map((x) => (
          <span className={`border border-${x} rounded-xl`}>{x.label}</span>
        ))}
      </div>
    </div>
  )
}
