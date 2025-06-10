interface Props<T> {
  label: string
  value: T
  activeColor: string
  inactiveColor?: string
  active: boolean
  onSelect: (value: T) => void
}

export const FilterOption = <T,>({ label, value, activeColor, inactiveColor, active, onSelect }: Props<T>) => {
  return (
    <div
      className="flex border-2 border-solid rounded-md justify-center px-4"
      style={{
        color: active ? activeColor : undefined,
        borderColor: active ? activeColor : (inactiveColor ?? '#6a7282'),
      }}
      onClick={() => onSelect(value)}
    >
      {label}
    </div>
  )
}
