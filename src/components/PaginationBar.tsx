import { RiArrowLeftSLine } from 'react-icons/ri'
import { RiArrowRightSLine } from 'react-icons/ri'

interface Props {
  currentPage: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
}

export const PaginationBar = ({ currentPage, totalPages, onPrev, onNext }: Props) => {
  return (
    <div className="flex flex-row gap-4">
      <button className="text-2xl hover:text-[#ffa219]" disabled onClick={onPrev}>
        <RiArrowLeftSLine />
      </button>
      {[...Array(totalPages >= 10 ? 10 : totalPages)].map((_, index) => (
        <PaginationIndex key={`pagination-index-${index}`} index={index + 1} />
      ))}
      <button className="text-2xl hover:text-[#ffa219]" disabled={currentPage === totalPages} onClick={onNext}>
        <RiArrowRightSLine />
      </button>
    </div>
  )
}

const PaginationIndex = ({ index }: { index: number }) => {
  return (
    <button className="flex w-10 h-10 rounded-full border-2 border-blue-500 justify-center items-center text-xl hover:text-[#ffa219] hover:border-2 hover:border-[#ffa219]">
      {index}
    </button>
  )
}
