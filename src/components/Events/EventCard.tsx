import { EventType } from "@/lib/types"
import { CalendarCheck, MapPinHouseIcon, UsersRound } from "lucide-react"
import { formatDistance } from "date-fns";
import { Badge } from "../ui/badge";
import { Link } from "@tanstack/react-router";

const EventCard = ({ eventData }: { eventData: EventType }) => {
    const { city, description, eventDate, ticketPrice, title, registeredAttendees, isFree, eventId } = eventData
    return (
        <Link to={`/events/${eventId}`} className='flex-1 w-full md:min-w-[300px] max-w-[350px] aspect-square  flex flex-col gap-2 rounded-md overflow-hidden cursor-pointer shadow-sm bg-accent transition-all ease-in duration-700 group hover:shadow-md'>
            {/* image */}
            <div style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',

            }} className="w-full h-[200px] text-left flex flex-col items-end bg-opacity-25 bg-sky-200 bg-blend-overlay group-hover:bg-blend-normal transition-all ease-in delay-500 " >
            </div >
            {/* Title within Image  */}
            <div className="w-full px-1 pb-4 flex flex-col gap-2">
                <h2 className="w-full text-xl font-semibold text-primary ">{title}</h2>
                {/* description */}
                <p className="w-full text-sm text-gray-500">
                    {/* truncate description to 20 characters */}
                    {
                        description.slice(0, 100)
                    }
                    ....
                </p>
                {/* payment and  date details */}
                <div className="w-full flex justify-around flex-wrap text-gray-700 ">
                    <p className="text-base flex items-center gap-1">
                        <MapPinHouseIcon className="w-4 h-4 inline-block mr-1" />
                        {city}
                    </p>
                    <p className="text-base flex items-center gap-1">
                        <CalendarCheck className="w-4 h-4 inline-block mr-1" />
                        {formatDistance(new Date(eventDate), new Date(), { addSuffix: true })}
                    </p>

                </div>
                <div className="w-full flex justify-around flex-wrap ">

                    <div className="text-base flex items-center gap-1 px-2">
                        {isFree ? <Badge className="bg-lime-600"> Free</Badge> : <span className="text-primary"> Ksh. {ticketPrice}</span>}
                    </div>
                    <p className="text-base flex items-center gap-1">
                        <UsersRound className="w-4 h-4 inline-block mr-1" />
                        {registeredAttendees.length}
                    </p>

                </div>

            </div>
        </ Link>
    )
}

export default EventCard