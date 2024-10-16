export type EventType = {
    eventId: string;
    title: string;
    description: string;
    organizerId: string;
    category: string;
    city: string;
    venue: string;
    eventDate: string;
    ticketPrice: number;
    isFree: boolean;
    maxAttendees: number;
    registeredAttendees: string[] | [],
    eventImage: string,
    status: string,
    createdAt: string,
    updatedAt: string
}