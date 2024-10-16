import { createFileRoute } from '@tanstack/react-router'
import SingleEventDetails from '@/components/Events/SingleEventDetails'

export const Route = createFileRoute('/events/$eventId')({

    component: () => {
        return <SingleEventDetails />
    },
})

