import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resetPassword')({
    component: () => <div>Hello /resetPassword!</div>,
})
