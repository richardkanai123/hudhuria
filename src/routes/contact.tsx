import ContactForm from '@/components/contact/ContactForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contact')({
  component: () => <ContactForm />,
})

