import { RiArrowLeftSLine } from 'react-icons/ri'
import { RiArrowRightSLine } from 'react-icons/ri'
import clsx from 'clsx'
import { useWindowSize } from '@/hooks/useWindowSize'

interface Props {
  currentPage: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
  onGoto: (index: number) => void
}

interface IndexProps {
  index: number
  isSelected: boolean
  onGoto: (index: number) => void
}

export const PaginationBar = ({ currentPage, totalPages, onPrev, onNext, onGoto }: Props) => {
  const { width } = useWindowSize()
  const maxIndex = width >= 640 ? 8 : 5

  return (
    <div className="flex flex-row w-full gap-4 justify-center">
      <button className="text-2xl hover:text-[#ffa219]" disabled onClick={onPrev}>
        <RiArrowLeftSLine />
      </button>
      {[...Array(totalPages >= maxIndex ? maxIndex : totalPages)].map((_, index) => {
        if (index == maxIndex - 2) {
          return <p>...</p>
        }

        if (index == maxIndex - 1) {
          return (
            <PaginationIndex
              key={`pagination-index-${totalPages}`}
              index={totalPages}
              isSelected={currentPage === totalPages}
              onGoto={onGoto}
            />
          )
        }

        return (
          <PaginationIndex
            key={`pagination-index-${index}`}
            index={index + 1}
            isSelected={currentPage === index + 1}
            onGoto={onGoto}
          />
        )
      })}
      <button className="text-2xl hover:text-[#ffa219]" disabled={currentPage === totalPages} onClick={onNext}>
        <RiArrowRightSLine />
      </button>
    </div>
  )
}

const PaginationIndex = ({ index, isSelected, onGoto }: IndexProps) => {
  return (
    <button
      className={clsx(
        'flex w-10 h-10 rounded-full border-2 border-blue-500 justify-center items-center text-xl hover:text-[#ffa219] hover:border-2 hover:border-[#ffa219]',
        { 'text-red-500': isSelected }
      )}
      onClick={() => onGoto(index)}
    >
      {index}
    </button>
  )
}
