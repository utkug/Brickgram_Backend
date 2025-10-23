import { checkUsernameAvailablety } from "@/api/auth";
import { Input, Spinner } from "@heroui/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";

interface UsernameInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  isAvailable: boolean | null
  isChecking: boolean
  onCheckStart: () => void
  onCheckFinish: (available: boolean) => void
  onResetCheck: () => void
}

function UsernameInput({isAvailable, value, isChecking, onChange, onCheckStart, onCheckFinish, onResetCheck}: UsernameInputProps) {

  useEffect(() => {
    if (!value.trim()){
      onResetCheck()
      return
    }
    const timer = setTimeout(async () => {
      try {
        onCheckStart()
        const available = await checkUsernameAvailablety(value)
        onCheckFinish(available)
      } catch (error) {
        onCheckFinish(false)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [value])
  
  return (
    <div className="flex flex-col w-full">
      <Input value={value} labelPlacement="outside-top" label="Username" onChange={onChange}/>
      <p>c {isChecking ? "yes" : "no"} and a {isAvailable ? "yes" : "no"}</p>
      <div className="flex flex-row items-center gap-2 mt-2">
      {isChecking && (
        <>
          <Spinner className="mt-1" size="sm" variant="default"/>
          <span className="text-sm text-gray-400">Checking the username</span>
        </>
      )}
      {!isChecking && isAvailable === true && (
        <>
          <IconCheck className="text-green-600"/>
          <span className="text-green-600 text-sm">Username is available!</span>
        </>
      )}
      {!isChecking && isAvailable === false && (
        <>
          <IconX className="text-red-500"/>
          <span className="text-red-500 text-sm">Username is not available!</span>
        </>
      )}
    </div>
    </div>
  );
}

export default UsernameInput;
