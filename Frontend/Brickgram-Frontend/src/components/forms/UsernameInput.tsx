import { Input, Spinner } from "@heroui/react";
import { IconCheck, IconX } from "@tabler/icons-react";
import React, { useState } from "react";

function UsernameInput() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false)

  const checkUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true)
    setUsername(e.target.value)
    //Check...
  }
  
  return (
    <div className="flex flex-col w-full">
      <Input value={username} labelPlacement="outside-top" label="Username" onChange={checkUsername}/>
      <div className="flex flex-row items-center gap-2 mt-2">
      {isLoading && (
        <>
          <Spinner className="mt-1" size="sm" variant="default"/>
          <span className="text-sm text-gray-400">Checking the username</span>
        </>
      )}
      {!isLoading && isAvailable === true && (
        <>
          <IconCheck className="text-green-600"/>
          <span className="text-green-600 text-sm">Username is available!</span>
        </>
      )}
      {!isLoading && isAvailable === false && (
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
