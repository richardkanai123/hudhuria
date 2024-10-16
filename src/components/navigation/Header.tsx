import { Button } from '@/components/ui/button'
import { Link, } from '@tanstack/react-router'
import { Menu } from 'lucide-react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
const Header = () => {
    return (
        <header className="w-full pt-2 px-4 pb-4 flex align-middle justify-between items-center bg-slate-50">
            {/* logo */}
            <Link to="/" className='flex items-center gap-2'>
                <img src="/EventBanner.jpeg" className="h-8 w-8 rounded-full" alt="logo" />
                <h1 className="text-2xl font-bold text-primary">Hudhuria</h1>
            </Link>
            {/* nav */}
            <nav className='hidden md:flex gap-4 align-middle'>
                <Link to="/" className="[&.active]:font-bold text-lg [&.active]:text-primary ">
                    Home
                </Link>
                <Link to="/events" search={
                    {
                        city: 'all',
                    }
                } className="[&.active]:font-bold text-lg [&.active]:text-primary ">
                    Events
                </Link>
                <Link to="/about" className="[&.active]:font-bold text-lg [&.active]:text-primary ">
                    About
                </Link>
                <Link to="/contact" className="[&.active]:font-bold text-lg [&.active]:text-primary ">
                    Contact
                </Link>
            </nav>

            <div className="hidden md:flex gap-4 items-center justify-center">
                <Button className='flex items-center align-middle justify-center ' asChild variant="default">
                    <Link to="/login">Login</Link>

                </Button>
                <Button className='flex items-center align-middle justify-center ' asChild variant="default">
                    <Link to="/signup">
                        Signup
                    </Link>


                </Button>
            </div>

            {/* menu Toggle Button for smalll screens */}
            <div className="flex gap-4 md:hidden">
                <Button className='flex items-center align-middle justify-center ' asChild variant="default">
                    <Link to="/login">Login</Link>
                </Button>

                {/* mobile menu */}

                <Sheet>
                    <SheetTrigger className=" bg-transparent md:hidden">
                        <Menu className='w-6 h-6' />
                    </SheetTrigger>
                    <SheetContent className='mt-4'>

                        {/* logo */}
                        <Link to="/" className='flex flex-col items-center gap-2'>
                            <h1 className="text-2xl font-bold text-primary">Hudhuria</h1>
                            <img src="/EventBanner.jpeg" className="mx-auto w-[80%]  aspect-video " alt="logo" />
                        </Link>

                        <nav className='w-full flex flex-col gap-4 align-middle mt-4'>
                            <SheetClose asChild className=" bg-transparent border-b">
                                <Link to="/" className="[&.active]:font-bold text-lg [&.active]:text-primary bg-secondary p-3 rounded-md [&.active]:bg-accent-foreground hover:bg-accent-foreground hover:text-primary">
                                    Home
                                </Link>
                            </SheetClose>

                            <SheetClose asChild className=" bg-transparent border-b">

                                <Link to="/about" className="[&.active]:font-bold text-lg [&.active]:text-primary bg-secondary p-3 rounded-md [&.active]:bg-accent-foreground hover:bg-accent-foreground hover:text-primary">
                                    About
                                </Link>
                            </SheetClose>

                            <SheetClose asChild className=" bg-transparent border-b">

                                <Link to="/about" className="[&.active]:font-bold text-lg [&.active]:text-primary bg-secondary p-3 rounded-md [&.active]:bg-accent-foreground hover:bg-accent-foreground hover:text-primary">
                                    Profile
                                </Link>

                            </SheetClose>

                            <SheetClose asChild className=" bg-transparent border-b">

                                <Link to="/contact" className="[&.active]:font-bold text-lg [&.active]:text-primary bg-secondary p-3 rounded-md [&.active]:bg-accent-foreground hover:bg-accent-foreground hover:text-primary">
                                    Contact
                                </Link>

                            </SheetClose>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    )
}

export default Header