import NewEvent from '@/components/Events/NewEvent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events/new')({
    component: () => <NewEvent />,
})
