import { updateUser } from '@/api/auth'
import { Button, Form, Image } from '@heroui/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState } from 'react'

function ChooseAvatar() {
  const [isSelected, setIsSelected] = useState(false)
  const [selectedAvatar, setSelectedAvatar] = useState("")

  const avatars = [
    "./LSW_ProfileIcons_DarthVader.png",
    "./CadBane_BountyHunter.png",
    "./LSW_PhotoIcons_KitFisto.png",
    "./DarthMaul_DarkSide.png",
    "./LSW_ProfileIcons_ObiWan_JediKnight_Robe.png",
  ]

  const clickAvatar = (e: React.MouseEvent<HTMLImageElement>) => {
    setIsSelected(true)
    setSelectedAvatar((e.target as HTMLImageElement).src)
  }
  const exitAvatar = () => {
    setIsSelected(false)
    setSelectedAvatar("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const updated = await updateUser({
        profile_picture: selectedAvatar
      })
      window.location.href = "/"
    } catch (error) {
      
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-background text-background'>
      <h1 className='text-white mb-15 text-2xl'>Choose an avatar</h1>
      <Form onSubmit={handleSubmit} className='flex flex-col items-center justify-center'>
      <div hidden={isSelected} className='flex flex-row gap-10'>
        {avatars.slice(0,3).map((src, index) => (
            <Image key={index} onClick={clickAvatar} src={src} className='cursor-pointer size-30 rounded-full shadow-md hover:scale-110 transition-transform duration-200'/>
        ))}
      </div>
      <div hidden={isSelected} className='flex flex-row gap-10 mt-5'>
        {avatars.slice(3,5).map((src, index) => (
            <Image key={index} src={src} onClick={clickAvatar} className='cursor-pointer size-30 rounded-full shadow-md hover:scale-110 transition-transform duration-200'/>
        ))}
      </div>
      <Button hidden={isSelected} className='mt-10'>Skip</Button>
      <AnimatePresence>
        {isSelected &&(
          <motion.div className='fixed flex flex-col items-center' onClick={exitAvatar} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{opacity: 0}}>
            <motion.img className='size-80 rounded-full' src={selectedAvatar} layoutId={selectedAvatar} transition={{ duration:0.4, ease: "easeOut"}}/>
        <div className='flex flex-row justify-center gap-5 mt-5'>
          <Button onClick={exitAvatar} className='text-xl w-35' variant='bordered' color='danger'>Cancel</Button>
          <Button type='submit' className='text-xl w-35'color='success' variant='bordered'>Continue</Button>
        </div>
        </motion.div>
        )}
        
      </AnimatePresence>
      </Form>
    </div>
  )
}

export default ChooseAvatar