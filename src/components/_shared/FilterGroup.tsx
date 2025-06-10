import { useState } from 'react'
import { FilterOption } from './FilterOption'

interface Props<T> {
  selected: T | undefined
  options: {
    label: string
    value: T
    activeColor: string
    inactiveColor?: string
  }[]
  onSelect: (value?: T) => void
}

export const FilterGroup = <T,>({ selected, options, onSelect }: Props<T>) => {
  const [active, setActive] = useState<T | undefined>(selected)

  return (
    <div className="flex flex-row w-full gap-4">
      {options.map((x) => (
        <FilterOption
          key={`filter-option-${x.value}`}
          label={x.label}
          value={x.value}
          activeColor={x.activeColor}
          inactiveColor={x.inactiveColor}
          active={active === x.value}
          onSelect={(value) => {
            active !== value ? setActive(value) : setActive(undefined)
            active !== value ? onSelect(value) : onSelect(undefined)
          }}
        />
      ))}
    </div>
  )
}
