import { LoaderPinwheelIcon } from 'lucide-react'
import { Button } from '../ui/button'

type Props = {
    text: string
    onClick?: () => void
    size?: 'default' | 'sm' | 'lg' | 'icon'
}
const PendingBtn = ({ text, onClick, size }: Props) => {
    return (
        <Button
            size={size}
            onClick={() => onClick}
            className='flex align-middle items-center '>
            <LoaderPinwheelIcon className='mr-2 h-4 w-4 animate-spin' />
            <span>{text}</span>
        </Button>
    )
}

export default PendingBtn