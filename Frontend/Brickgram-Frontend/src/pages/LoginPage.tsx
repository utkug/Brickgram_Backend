import { login } from '@/api/auth'
import BrickgramLogo from '@/components/BrickgramLogo'
import PasswordInput from '@/components/forms/PasswordInput'
import { Button, Card, CardBody, CardHeader, Checkbox, Form, Input } from '@heroui/react'
import React, { useState } from 'react'

function LoginPage() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [keepLoggedIn, setKeepLoggedIn] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setIsLoading(true)
    
    try {
      const data = await login(identifier, password)
      if (keepLoggedIn) {
        localStorage.setItem("token", data.token)
      }
      else {
        sessionStorage.setItem("token", data.token)
      }
      window.location.href = "/"
    } catch (error: any) {
      setErrorMessage(error.message || "Login Failed")
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-foreground bg-background pb-25'>
      <BrickgramLogo />
      <Card className='w-full max-w-md p-6 shadow-xl'>
        <CardHeader className='justify-center'>
          <h1 className='font-bold text-xl'>Login</h1>
        </CardHeader>
        <CardBody>
          <Form className='flex flex-col gap-6' onSubmit={handleSubmit}>
            <Input label="Username or E-mail" labelPlacement='outside-top' value={identifier} onChange={(e) => setIdentifier(e.target.value)} required/>
            <PasswordInput value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} fullWidth={true}/>
            {errorMessage && (<p className='text-danger text-sm text-center'>{errorMessage}</p>)}
              <Checkbox color='success' isSelected={keepLoggedIn} onValueChange={setKeepLoggedIn}>Keep me logged in</Checkbox>
            <Button color='success' variant='bordered' className='text-lg w-full' type='submit' isLoading={isLoading}>Continue</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  )
}

export default LoginPage