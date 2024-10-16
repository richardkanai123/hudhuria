import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import Header from '@/components/navigation/Header'
import Footer from '@/components/navigation/Footer'

export const Route = createRootRoute({
    component: () => (
        <div className='w-full min-h-screen mx-auto flex flex-col  bg-gray-200 text-pretty'>
            <Header />
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200">
                <Outlet />
                <Footer />
            </div>
            <TanStackRouterDevtools closeButtonProps={{
                className: 'absolute top-0 right-0 m-4',
            }} />
        </div >
    ),
})