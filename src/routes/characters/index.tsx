import { allCharactersQueryOptions } from '@/queries/characterQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/characters/')({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(allCharactersQueryOptions()),
  component: CharactersIndexComponent,
})

function CharactersIndexComponent() {
  const { data } = useSuspenseQuery(allCharactersQueryOptions())

  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {data.map((x) => {
          return (
            <li key={x.id} className="whitespace-nowrap">
              <Link
                to="/characters/$characterId"
                params={{
                  characterId: `${x.id}`,
                }}
                className="block py-1 text-blue-600 hover:opacity-75"
                activeProps={{ className: 'font-bold underline' }}
              >
                <div>{x.name}</div>
              </Link>
            </li>
          )
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  )
}
