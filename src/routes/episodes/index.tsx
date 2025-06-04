import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/episodes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/episodes/"!</div>
}
