import { register } from '@/api/auth'
import BrickgramLogo from '@/components/BrickgramLogo'
import PasswordInput from '@/components/forms/PasswordInput'
import UsernameInput from '@/components/forms/UsernameInput'
import { Button, Card, CardBody, CardHeader, Input, Form, Checkbox } from '@heroui/react'
import React, { useState } from 'react'

function RegisterPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [terms, setTerms] = useState(false)
  
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)
  
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsLoading(true)
    try {
      const data = await register(username, email, fullName, password, terms)
      localStorage.setItem("token", data.token)
      window.location.href = "/avatar"
    } catch (error: any) {
      setErrorMessage(error)
    }
    finally {
      setIsLoading(false)
    }

  }
  // onValueChange = onChange
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-foreground bg-background pb-25'>
      <BrickgramLogo />
      <Card className='w-full max-w-md p-6 shadow-xl'>
        <CardHeader className='justify-center'>
          <h1 className='font-bold text-xl'>Create an Account</h1>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit} className='flex flex-col gap-6'>
            <UsernameInput isAvailable={isAvailable} value={username} isChecking={isChecking} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} onCheckStart={() => { setIsChecking(true); setIsAvailable(null)}} onCheckFinish={(available) => {setIsChecking(false); setIsAvailable(available)}} onResetCheck={() => {setIsChecking(false); setIsAvailable(null)}}/>
            <Input labelPlacement='outside-top' label='Full Name' isClearable value={fullName} onValueChange={setFullName}/>
            <Input type='email' labelPlacement='outside-top' label='E-mail' isClearable value={email} onValueChange={setEmail}/>
            <PasswordInput value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} fullWidth />
            <Checkbox isRequired isSelected={terms} onValueChange={setTerms}>I agree to the terms and conditions</Checkbox>
            <Button type='submit' isLoading={isLoading} color='success' variant='bordered' className='text-lg w-full'>Continue</Button>
          </Form> 
        </CardBody>
      </Card>
    </div>
  )
}

export default RegisterPage