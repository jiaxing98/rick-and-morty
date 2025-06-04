import { CharacterCard } from '@/components/card/CharacterCard'
import { PaginationBar } from '@/components/PaginationBar'
import { allCharactersQueryOptions } from '@/queries/characterQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import clamp from 'lodash/clamp'
import { useState } from 'react'

export const Route = createFileRoute('/characters/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(allCharactersQueryOptions()),
  component: RouteComponent,
})

function RouteComponent() {
  const {
    data: { info, results },
  } = useSuspenseQuery(allCharactersQueryOptions())
  const [page, setPage] = useState(1)

  return (
    <div className="flex flex-col w-screen items-center p-2 pb-12 gap-4 ">
      <div className="flex flex-col w-full h-full justify-center items-center p-6 gap-8 sm:grid sm:grid-cols-[repeat(auto-fit,_minmax(0,600px))] sm:place-items-center sm:gap-6">
        {results.map((x) => {
          return <CharacterCard key={`character-card-${x.name}`} info={x} />
        })}
      </div>
      <hr />
      <PaginationBar
        currentPage={page}
        totalPages={info.pages}
        onPrev={() => setPage(clamp(page - 1, 1, info.pages))}
        onNext={() => setPage(clamp(page + 1, 1, info.pages))}
      />
    </div>
  )
}
