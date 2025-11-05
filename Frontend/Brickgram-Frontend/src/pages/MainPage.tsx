import Post from '@/components/Post'
import PostingPost from '@/components/PostingPost'
import UserContentCard from '@/components/UserContentCard'
import { Textarea } from '@heroui/react'
import React from 'react'

function MainPage() {
  return (
    <div className='w-full'>
        <div className='w-full p-4 border-b border-gray-700'>
            <PostingPost type='post'/>
        </div>
<UserContentCard
  type="post"
  name="Utku Gülmez"
  username="Utkugulmez07"
  text="Just finished building my LEGO X-Wing 🚀✨"
  avatar="./LSW_PhotoIcons_KitFisto.png"
  time="2h"
  fullTime="Nov 4, 2025, 14:42"
/>

        </div>
  )
}

export default MainPage