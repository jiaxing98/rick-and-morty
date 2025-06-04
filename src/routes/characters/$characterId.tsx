import * as React from 'react'
import { ErrorComponent, createFileRoute, useRouter } from '@tanstack/react-router'
import { useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query'
import type { ErrorComponentProps } from '@tanstack/react-router'
import { NotFoundError } from '@/api/axios'
import { characterQueryOptions } from '@/queries/characterQuery'

export const Route = createFileRoute('/characters/$characterId')({
  loader: ({ context: { queryClient }, params: { characterId } }) => {
    return queryClient.ensureQueryData(characterQueryOptions(characterId))
  },
  errorComponent: CharacterErrorComponent,
  component: CharacterComponent,
})

export function CharacterErrorComponent({ error }: ErrorComponentProps) {
  const router = useRouter()
  if (error instanceof NotFoundError) {
    return <div>{error.message}</div>
  }
  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  React.useEffect(() => {
    queryErrorResetBoundary.reset()
  }, [queryErrorResetBoundary])

  return (
    <div>
      <button
        onClick={() => {
          router.invalidate()
        }}
      >
        retry
      </button>
      <ErrorComponent error={error} />
    </div>
  )
}

function CharacterComponent() {
  const { characterId } = Route.useParams()
  const { data } = useSuspenseQuery(characterQueryOptions(characterId))

  return (
    <div className="space-y-2">
      <h4 className="text-xl font-bold underline">{data.name}</h4>
      <div className="text-sm">{data.status}</div>
    </div>
  )
}
