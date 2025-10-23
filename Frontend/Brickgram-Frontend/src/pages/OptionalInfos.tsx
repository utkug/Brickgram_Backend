import { Button, Card, CardHeader, CardBody } from '@heroui/react'
import React from 'react'
import { Form } from 'react-router-dom'

//Just a idea now
function OptionalInfos() {
  return (
    <div>
      <Card className='w-full max-w-md p-6 shadow-xl'>
        <CardHeader className='justify-center'>
          <h1 className='font-bold text-xl'>Additional Informations</h1>
        </CardHeader>
        <CardBody>
          <Form className='flex flex-col gap-6'>
          </Form> 
        </CardBody>
      </Card>
    </div>
  )
}

export default OptionalInfos