import ContactForm from '@/components/contact/ContactForm'
import CitiesCarousel from '@/components/Events/CitiesCarousel'
import UpcomingEventsLister from '@/components/Events/UpcomingEventsLister'
import { eventsList } from '@/lib/data'
import { createLazyFileRoute } from '@tanstack/react-router'


export const Route = createLazyFileRoute('/')({
    component: Index,

})

function Index() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4 overflow-x-hidden">
            {/* hero image */}
            <div style={{
                backgroundImage: `url('/conference_banner.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
                backgroundBlendMode: 'overlay',

            }} className="w-full h-[70vh] bg-opacity-10  bg-slate-900 flex flex-col align-middle justify-center items-center gap-2 backdrop-blur-sm " >
                <h1 className='text-7xl tracking-wide font-extrabold animate-in slide-in-from-top-6  bg-opacity-20 text-transparent bg-clip-text  bg-gradient-to-tr from-primary to-primary-foreground '> Hudhuria</h1>
                <p className="text-center text-xl font-semibold text-white backdrop-blur-[1px] bg-stone-800 bg-blend-darken bg-opacity-10 p-2 rounded-md">
                    Discover, Book, Attend and Connect with events near you.
                </p>
                <div className="w-[80%] mx-auto p-2 flex ">
                </div>
            </div>
            {/* Upcoming events */}
            <UpcomingEventsLister eventsList={eventsList} />
            {/* Cities carousel */}
            <CitiesCarousel />


            {/* contact form */}


            <ContactForm />


        </div>
    )
}