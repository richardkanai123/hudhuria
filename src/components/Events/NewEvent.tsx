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

// zod schema for event data
const categories = eventCategories.map((item) => item.name)
const EventSchema = z.object({
    id: z.string(), // Unique identifier for the event
    title: z.string().min(1, "Title is required"), // Title of the event
    description: z.string().min(1, "Description is required"), // Description of the event
    category: z.enum(categories as [string, ...string[]]), // Category of the event (e.g., music, business, etc.)
    city: z.string().min(1, "City is required"), // The city where the event takes place
    venue: z.string().min(1, "Venue is required"), // Venue of the event
    imageUrl: z.string().url("Invalid URL"), // URL of the event's image
    startDate: z.date(), // Start date and time of the event
    endDate: z.date(), // End date and time of the event
    organizer: z.object({
        id: z.string(), // Unique identifier for the event organizer
        name: z.string().min(1, "Organizer name is required"), // Name of the organizer
        contactEmail: z.string().email("Invalid email"), // Organizer's contact email
    }),
    ticket: z.object({
        price: z.number().nonnegative(), // Ticket price (if free, set to 0)
        currency: z.string().length(3, "Currency should be a 3-letter ISO code"), // Currency of the ticket price (e.g., USD, KES)
        totalTickets: z.number().int().nonnegative(), // Total number of tickets available
        soldTickets: z.number().int().nonnegative(), // Number of tickets sold
    }),
    isPaidEvent: z.boolean(), // Whether the event is paid or free
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
            organizer: {
                id: '',
                name: '',
                contactEmail: '',
            },
            ticket: {
                price: 0,
                currency: '',
                totalTickets: 0,
                soldTickets: 0,
            },
            isPaidEvent: false,
            tags: [],
            attendees: [],
            isCancelled: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });


    const onSubmit = (data: z.infer<typeof EventSchema>) => {
        console.log(data);
    }

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
                                                <SelectLabel>Select Categories</SelectLabel>
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

                        <fieldset title="Venue and Time Details" className="grid grid-cols-2 gap-4 items-center align-middle border p-2">

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
                                name="startDate"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block">Start</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} className={cn(
                                                        "w-[240px] justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}>
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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
                                        <FormLabel className="block">End</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} className={cn(
                                                        "w-[240px] justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}>
                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
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

                        <Button type="submit">Add Event</Button>
                    </form>
                </Form>


            </Card>

        </div>
    )
}

export default NewEvent