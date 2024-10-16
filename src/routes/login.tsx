import { LoginForm } from '@/components/Auth/LoginForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login')({
  component: () => <LoginForm />,
})
