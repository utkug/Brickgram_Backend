import { Input } from '@heroui/react'
import React, { useState } from 'react'

function UsernameOrEmailInput() {
  const [loginIdentifier, setLoginIdentifier] = useState("")
  const [type, setType] = useState<"username" | "email" | null>(null) 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setLoginIdentifier(val)
    if(/\S+@\S+\.\S+/.test(val)){
        setType('email')
    }
    else {
        setType('username')
    }
  }
  return (
    <div className='w-full'>
        <Input label="Username or E-mail" labelPlacement='outside-top' value={loginIdentifier} onChange={handleChange}/>
    </div>
  )
}

export default UsernameOrEmailInput