import { getRouteApi } from "@tanstack/react-router"
const SingleEventDetails = () => {
    const RouteSearch = getRouteApi('/events/$eventId')
    const { eventId } = RouteSearch.useParams()
    return (
        <div>SingleEventDetails: {eventId}</div>
    )
}

export default SingleEventDetails