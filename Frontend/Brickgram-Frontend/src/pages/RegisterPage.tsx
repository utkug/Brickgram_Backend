import BrickgramLogo from '@/components/BrickgramLogo'
import PasswordInput from '@/components/forms/PasswordInput'
import UsernameInput from '@/components/forms/UsernameInput'
import { Button, Card, CardBody, CardHeader, Input, Form, Checkbox } from '@heroui/react'
import React, { useState } from 'react'

function RegisterPage() {
  const [password, setPassword] = useState("")
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-foreground bg-background pb-25'>
      <BrickgramLogo />
      <Card className='w-full max-w-md p-6 shadow-xl'>
        <CardHeader className='justify-center'>
          <h1 className='font-bold text-xl'>Create an Account</h1>
        </CardHeader>
        <CardBody>
          <Form className='flex flex-col gap-6'>
            <UsernameInput />
            <Input labelPlacement='outside-top' label='Full Name' isClearable/>
            <Input type='email' labelPlacement='outside-top' label='E-mail' isClearable/>
            <PasswordInput value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} fullWidth />
            <Checkbox isRequired>I agree to the terms and conditions</Checkbox>
            <Button color='success' variant='bordered' className='text-lg w-full'>Continue</Button>
          </Form> 
        </CardBody>
      </Card>
    </div>
  )
}

export default RegisterPage