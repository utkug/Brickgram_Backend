import { Avatar, Button } from "@heroui/react";
import { IconUserCancel } from "@tabler/icons-react";

interface UserProfileHeaderInput {
  profile_picture?: string
}

function UserProfileHeader({profile_picture}: UserProfileHeaderInput) {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Avatar
        className="size-30 -translate-y-1/2 z-10"
        src={profile_picture || "./LSW_PhotoIcons_KitFisto.png"} 
      />
      <Button
        className="rounded-full absolute right-2 -mt-6 -translate-y-1/2"
        variant="bordered"
        color="danger"
        size="sm"
        startContent={<IconUserCancel />}
      ></Button>
    </div>
  );
}

export default UserProfileHeader;
