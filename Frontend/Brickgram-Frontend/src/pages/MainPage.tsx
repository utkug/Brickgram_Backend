import Post from '@/components/Post'
import { Textarea } from '@heroui/react'
import React from 'react'

function MainPage() {
  return (
    <div className='flex flex-col items-center min-h-screen bg-background text-foreground'>
        <div className='flex flex-col items-center w-full md:w-1/2 min-h-screen border border-b-0 border-gray-700'>
            <Textarea />
            <Post />
            <Post />
            <Post />
            <Post />
        </div>
    </div>
  )
}

export default MainPage