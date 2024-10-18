/**
 * The `NewEvent` component is a React component that renders a form for creating a new event. It uses the `react-hook-form` library to manage the form state and validation, and the `zod` library to define the schema for the event data.
 *
 * The form includes fields for the event title, description, category, venue, city, start and end dates, organizer information, ticket details, and whether the event is paid or free. The component also includes a calenar component for selecting the start and end dates.
 *
 * The `onSubmit` function is called when the form is submitted, and it logs the event data to the console.
 */

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from "@/components/ui/button"
// array of categories of events that can be selected and their corresponding description
import eventCategories from "@/lib/Event_categories"


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "../ui/calendar"
import citiesInKenya from "@/lib/cities"

// zod schema for event data
const categories = eventCategories.map((item) => item.name)
const EventSchema = z.object({
    id: z.string(), // Unique identifier for the event
    title: z.string().min(1, "Title is required"), // Title of the event
    description: z.string().min(1, "Description is required"), // Description of the event
    category: z.enum(categories as [string, ...string[]]), // Category of the event (e.g., music, business, etc.)
    city: z.enum(citiesInKenya.sort() as [string, ...string[]]), // The city where the event takes place
    venue: z.string().min(1, "Venue is required"), // Venue of the event
    imageUrl: z.string().url("Invalid URL"), // URL of the event's image
    startDate: z.date(), // Start date and time of the event
    endDate: z.date(), // End date and time of the event
    // start and endtime
    startTime: z.object({
        hour: z.number().int().min(0).max(23),
        minute: z.number().int().min(0).max(59),
        second: z.number().int().min(0).max(59),
    }),
    endTime: z.object({
        hour: z.number().int().min(0).max(23),
        minute: z.number().int().min(0).max(59),
        second: z.number().int().min(0).max(59),
    }),
    organizer: z.object({
        id: z.string(), // Unique identifier for the event organizer
        name: z.string().min(1, "Organizer name is required"), // Name of the organizer
        contactEmail: z.string().email("Invalid email"), // Organizer's contact email
    }),
    ticket: z.object({
        price: z.number().nonnegative(), // Ticket price (if free, set to 0)
        totalTickets: z.number().int().nonnegative(), // Total number of tickets available
        soldTickets: z.number().int().nonnegative(), // Number of tickets sold
    }),
    isPaidEvent: z.boolean().default(false), // Whether the event is paid or free
    tags: z.array(z.string()).optional(), // List of tags related to the event (e.g., #festival, #workshop)
    attendees: z.array(z.string()).optional(), // List of user IDs of attendees
    isCancelled: z.boolean().default(false), // Whether the event has been cancelled
    createdAt: z.date(), // Timestamp for when the event was created
    updatedAt: z.date().optional(), // Optional: Timestamp for when the event was last updated
});

const NewEvent = () => {
    const form = useForm<z.infer<typeof EventSchema>>({
        resolver: zodResolver(EventSchema),
        defaultValues: {
            title: '',
            description: '',
            category: '',
            city: '',
            venue: '',
            imageUrl: '',
            startDate: new Date(),
            endDate: new Date(),
            // time
            // startTime:
            organizer: {
                id: '',
                name: '',
                contactEmail: '',
            },
            ticket: {
                price: 0,
                totalTickets: 0,
                soldTickets: 0,
            },
            tags: [],
            attendees: [],
            isCancelled: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });

    const [showPriceField, setShowPriceField] = useState(false);



    const onSubmit = (data: z.infer<typeof EventSchema>) => {
        console.log(data);
    }


    const isPaidEvent = form.watch("isPaidEvent")
    useEffect(() => {
        setShowPriceField(isPaidEvent)
        console.log('rerender')
    }, [isPaidEvent])



    return (
        <div
            className="w-full flex flex-col items-center justify-center gap-4 mx-auto      min-h-screen px-3">
            <Card className="w-full max-w-screen-lg p-6 rounded-none">
                <h1 className="text-2xl font-bold mb-4">New Event</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Event Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Event Title" {...field} type="text" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea {...field} placeholder="Event Description" rows={8} />
                                    </FormControl>
                                    <FormDescription>
                                        Briefly describe your event. What is it about? What makes it special? What can attendees expect? Keep it clear, short and sweet.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />


                        {/* select category */}
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> Event Category</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                        </FormControl>                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Select a category</SelectLabel>
                                                {
                                                    eventCategories.map((category) => (
                                                        <SelectItem key={category.name} value={category.name}>
                                                            {category.name}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <fieldset title="Venue and Time Details" className="grid grid-cols-1 md:grrid-cols-2 gap-4 items-center align-middle border p-2">

                            <legend className="">Venue and Time Details</legend>

                            <FormField
                                control={form.control}
                                name="venue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Venue</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Venue" {...field} type="text" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Venue City</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select the Venue City" />
                                                </SelectTrigger>
                                            </FormControl>                                        <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Select City</SelectLabel>
                                                    {
                                                        citiesInKenya.map((city) => (
                                                            <SelectItem key={city} value={city}>
                                                                {city}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="startDate"

                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block">Kick Off Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} className={cn(
                                                        "w-[240px] justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}>
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, "P") : <span>Pick a date</span>}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="endDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block">Closing Date</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} className={cn(
                                                        "w-[240px] justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}>
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, "P") : <span>Pick a date</span>}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </fieldset>

                        {/* ticketing */}
                        <fieldset title="Ticketing details" className="grid grid-cols-2 gap-4 items-center align-middle border p-2">
                            <legend>Ticketing</legend>

                            <FormField
                                control={form.control}
                                name="isPaidEvent"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel> Paid Event</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue="false">
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Select Categories</SelectLabel>
                                                    <SelectItem value="true">
                                                        Is Paid
                                                    </SelectItem>
                                                    <SelectItem value="false">
                                                        Is free
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            {/* listen to isPaid variable to only show the input for price on a paid event */}

                            {
                                showPriceField && (
                                    <aside className="flex flex-col md:flex-row items-start align-middle justify-center gap-4 flex-wrap" >

                                        <FormField
                                            control={form.control}
                                            name="ticket.price"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Ticket Price</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Price in KSh." {...field} type="number" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="ticket.totalTickets"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Available Tickets</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Number of available tickets for sale." {...field} type="number" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </aside>
                                )
                            }

                        </fieldset>




                        <Button type="submit">Add Event</Button>
                    </form>
                </Form>


            </Card>

        </div >
    )
}

export default NewEvent