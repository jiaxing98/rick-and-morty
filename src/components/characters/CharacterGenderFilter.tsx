import { FilterGroup } from '../_shared/FilterGroup'

export const characterGender = ['female', 'male', 'genderless', 'unknown'] as const
type Gender = (typeof characterGender)[number]

interface Props {
  selected: Gender | undefined
  onSelect: (gender: Gender | undefined) => void
}

export const CharacterGenderFilter = ({ selected, onSelect }: Props) => {
  return (
    <FilterGroup<Gender>
      selected={selected}
      options={[
        {
          label: 'female',
          value: 'female',
          activeColor: '#3dd288',
        },
        {
          label: 'male',
          value: 'male',
          activeColor: '#fb2c36',
        },
        {
          label: 'genderless',
          value: 'genderless',
          activeColor: '#9810fa',
        },
        {
          label: 'unknown',
          value: 'unknown',
          activeColor: '#155dfc',
        },
      ]}
      onSelect={(gender) => {
        onSelect(gender)
      }}
    />
  )
}
