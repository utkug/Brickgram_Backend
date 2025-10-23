import { IconRosetteDiscountCheckFilled } from "@tabler/icons-react";
import MapPinIcon from "../MapPinIcon";
import VerifiedIcon from "../VerifiedIcon";

interface UserInfoInputs {
  username?: string
  name?: string
  bio?: string
  location?: string
  is_verified?: boolean
}
// For Verified Icon -> <div className="relative inline-block"> <h1 className="text-xl font-bold text-center">{name}</h1> <IconRosetteDiscountCheckFilled color="#30D5C8" className="absolute top-1/2 translate-y-[-50%] right-[-28px]" /> </div>
function UserInfo({username, name, bio, location, is_verified}: UserInfoInputs) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl -mt-15 flex items-center gap-2">
        {name}
        {is_verified && <IconRosetteDiscountCheckFilled className="" />}
      </h1>
      <p className="text-gray-400">@{username}</p>
      <p>{bio}</p>
      <p className="text-gray-400 flex items-center">{location ? <><MapPinIcon />{location}</> : "" }</p>
    </div>
  );
}

export default UserInfo;
