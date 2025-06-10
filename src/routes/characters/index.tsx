import { CharacterCard } from '@/components/characters/CharacterCard'
import { characterGender, CharacterGenderFilter } from '@/components/characters/CharacterGenderFilter'
import { characterStatus, CharaterStatusFilter } from '@/components/characters/CharaterStatusFilter'
import { allCharactersQueryOptions } from '@/queries/characterQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { z } from 'zod'

const queryParamSchema = z.object({
  page: z.number().catch(1),
  name: z.string().optional(),
  status: z.enum(characterStatus).optional(),
  species: z.string().optional(),
  type: z.string().optional(),
  gender: z.enum(characterGender).optional(),
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
  const navigate = useNavigate()
  const queryParams = useSearch({ from: '/characters/' })
  const {
    data: { info, results },
  } = useSuspenseQuery(allCharactersQueryOptions(queryParams))

  return (
    <div className="flex flex-col w-screen items-center px-8 pt-4 pb-12 gap-4">
      <div className="grid grid-cols-[max-content_1fr] grid-rows-2 gap-x-4 gap-y-2">
        <h4>Status</h4>
        <CharaterStatusFilter
          selected={queryParams.status}
          onSelect={(status) => {
            navigate({ to: '/characters', search: (prev) => ({ ...prev, page: 1, status: status }) })
          }}
        />
        <h4>Gender</h4>
        <CharacterGenderFilter
          selected={queryParams.gender}
          onSelect={(gender) => {
            navigate({ to: '/characters', search: (prev) => ({ ...prev, page: 1, gender: gender }) })
          }}
        />
      </div>

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
