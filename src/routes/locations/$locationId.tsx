import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/locations/$locationId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/locations/$locationId"!</div>
}
