import { SignUpForm } from '@/components/Auth/SignUpForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/signup')({
  component: () => <SignUpForm />,
})
