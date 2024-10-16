// import FiltredEventsLister from '@/components/Events/FiltredEventsLister'`
import FiltredEventsLister from '@/components/Events/FiltredEventsLister'
import { createFileRoute } from '@tanstack/react-router'

type RouteParamsType = {
  city: string
}



export const Route = createFileRoute('/events/')({
  validateSearch: (search: Record<string, unknown>): RouteParamsType => {
    return {
      city: search?.city as string,

    }
  },

  component: FiltredEventsLister
})


