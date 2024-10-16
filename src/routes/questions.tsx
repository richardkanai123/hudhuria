import FaqComponent from '@/components/navigation/FaqComponent'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/questions')({
    component: () => <div className='w-full p-4 flex flex-col items-center align-middle justify-center mx-auto'>
        <h1 className='text-2xl font-bold'>FAQS</h1>
        <div className="w-full mx-auto max-w-screen-md">

            <FaqComponent />
        </div>
    </div>,
})
