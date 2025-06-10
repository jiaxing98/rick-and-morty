import { FilterGroup } from '../_shared/FilterGroup'

export const characterStatus = ['alive', 'dead', 'unknown'] as const
type Status = (typeof characterStatus)[number]

interface Props {
  selected: Status | undefined
  onSelect: (status: Status | undefined) => void
}

export const CharaterStatusFilter = ({ selected, onSelect }: Props) => {
  return (
    <FilterGroup<Status>
      selected={selected}
      options={[
        {
          label: 'alive',
          value: 'alive',
          activeColor: '#3dd288',
        },
        {
          label: 'dead',
          value: 'dead',
          activeColor: '#fb2c36',
        },
        {
          label: 'unknown',
          value: 'unknown',
          activeColor: '#155dfc',
        },
      ]}
      onSelect={(value) => {
        onSelect(value)
      }}
    />
  )
}
