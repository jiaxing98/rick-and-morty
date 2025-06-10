import { CharacterCard } from '@/components/characters/CharacterCard'
import { allCharactersQueryOptions } from '@/queries/characterQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { z } from 'zod'

const queryParamSchema = z.object({
  page: z.number().catch(1),
  name: z.string().optional(),
  status: z.enum(['alive', 'dead', 'unknown']).optional(),
  species: z.string().optional(),
  type: z.string().optional(),
  gender: z.enum(['female', 'male', 'genderless', 'unknown']).optional(),
})

export const Route = createFileRoute('/characters/')({
  validateSearch: queryParamSchema,
  loaderDeps: ({ search: { page, name, status, species, type, gender } }) => ({
    page,
    name,
    status,
    species,
    type,
    gender,
  }),
  loader: ({ context: { queryClient }, deps }) => queryClient.ensureQueryData(allCharactersQueryOptions(deps)),
  component: RouteComponent,
})

function RouteComponent() {
  const { page } = useSearch({ from: '/characters/' })
  const {
    data: { info, results },
  } = useSuspenseQuery(allCharactersQueryOptions({ page: page }))

  return (
    <div className="flex flex-col w-screen items-center p-2 pb-12 gap-4 ">
      {/* <CharacterFilterGroup title="status" options={status.map((x) => ({
        label:x,
        color:
      }))} /> */}
      <div className="flex flex-col w-full h-full justify-center items-center p-6 gap-8 perspective-midrange sm:grid sm:grid-cols-[repeat(auto-fit,_minmax(0,600px))] sm:place-items-center sm:gap-6">
        {results.map((x) => {
          return <CharacterCard key={`character-card-${x.id}`} info={x} />
        })}
      </div>
      <hr />
      {/* <PaginationBar
        currentPage={page}
        totalPages={info.pages}
        onPrev={() => navigate({ search: (prev) => ({ page: clamp(page - 1, 1, info.pages) }) })}
        onNext={() => navigate({ search: (prev) => ({ page: clamp(page - 1, 1, info.pages) }) })}
        onGoto={(index) => setPage(clamp(index, 1, info.pages))}
      /> */}
    </div>
  )
}
