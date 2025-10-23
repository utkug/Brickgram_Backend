import Footer from '@/components/Footer'
import React from 'react'
import { Image } from '@heroui/react'

function DefaultLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='min-h-screen flex flex-col bg-background text-foreground'>
        <header>
            <Image src='/brickgram_logo.png' alt='Brickgram Logo' className='w-32 h-auto object-contain'/> 
        </header>
        <main className='flex-grow px-4'>{children}</main>
        <Footer />
    </div>
  )
}

export default DefaultLayout