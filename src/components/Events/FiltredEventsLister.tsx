import { getRouteApi } from "@tanstack/react-router"
const FiltredEventsLister = () => {
    const RouteSearch = getRouteApi('/events/')
    const { city } = RouteSearch.useSearch()

    return (
        <div>Filtred EventsLister for {city}</div>
    )
}

export default FiltredEventsLister