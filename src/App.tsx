import { useState } from 'react'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-full min-h-screen mx-auto flex items-center justify-center gap-4'>
      <Button onClick={() => setCount((prev) => prev + 1)} variant="default">Add</Button>
      <Button onClick={() => setCount(0)} variant='ghost'>{count}</Button>
      <Button onClick={() => setCount((prev) => prev - 1)} variant='destructive'>Subtract</Button>
    </div>
  )
}

export default App
