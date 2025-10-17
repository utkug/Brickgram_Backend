import { useState } from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { Button, Input } from "@heroui/react";

interface PasswordInputProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  fullWidth?: boolean
}

function PasswordInput({value, onChange, fullWidth}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)
  return (
      <Input
        labelPlacement="outside-top"
        type={isVisible ? "text" : "password"}
        label="Password"
        fullWidth={fullWidth}
        value={value}
        onChange={onChange}
        required
        endContent={
          <Button
            onPress={toggleVisibility}
            disableRipple
            className="p-0 min-w-0 h-auto bg-transparent hover:bg-transparent shadow-none border-none"
          >
            {isVisible ? <IconEyeOff /> : <IconEye />}
          </Button>
        }
      />
  );
}

export default PasswordInput;
