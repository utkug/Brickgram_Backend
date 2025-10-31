import {
  Avatar,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Textarea,
} from "@heroui/react";
import { IconLock, IconLockOpen2, IconEdit } from "@tabler/icons-react";
import { useHover } from "@react-aria/interactions";
import { useEffect, useRef, useState } from "react";
import { updateUser } from "@/api/auth";

interface EditProfileInput {
  isOpen?: boolean;
  onClose?: () => void;
  onOpenChange?: () => void;
  currentUser?: User | null | undefined
}

function EditProfile({ isOpen, onOpenChange, currentUser }: EditProfileInput) {
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [bannerUrl, setBannerUrl] = useState<string | undefined>("");
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | undefined>("");

  useEffect(() => {
    if (currentUser) {
      setProfilePictureUrl(currentUser.profile_picture)
      setBannerUrl(currentUser.banner)
      setBio(currentUser.bio ?? "");
      setLocation(currentUser.location ?? "");
      setName(currentUser.name ?? "");
      setIsPrivate(currentUser.is_private ?? false);
    }
  }, [currentUser, isOpen]);



  const [isBannerHovered, setIsBannerHovered] = useState(false);
  const [isPPHovered, setIsPPHovered] = useState(false);

  const bannerInputRef = useRef<HTMLInputElement | null>(null);
  const profilePictureInputRef = useRef<HTMLInputElement | null>(null);

  const { hoverProps: bannerHoverProps } = useHover({
    onHoverStart: () => setIsBannerHovered(true),
    onHoverEnd: () => setIsBannerHovered(false),
  });

  const { hoverProps: ppHoverProps } = useHover({
    onHoverStart: () => setIsPPHovered(true),
    onHoverEnd: () => setIsPPHovered(false),
  });

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setBannerUrl(URL.createObjectURL(file));
  };

  const handleProfilePictureChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) setProfilePictureUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({
        id: currentUser?.id,
        name: name.trim(),
        bio: bio.trim(),
        location: location.trim(),
        is_private: isPrivate,
        profile_picture: profilePictureUrl,
        banner: bannerUrl,
      });
      window.location.reload()
      console.log("✅ Profile updated!");
    } catch (error) {
      console.error("❌ Update failed:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader>
              <h1>Edit Your Profile</h1>
            </ModalHeader>

            <ModalBody className="flex flex-col items-center">
              {/* Banner */}
              <div
                className="relative w-full h-48 md:h-33 rounded-2xl overflow-hidden cursor-pointer bg-gray-700/50 flex justify-center items-center"
                {...bannerHoverProps}
                onClick={() => bannerInputRef.current?.click()}
              >
                <img
                  src={bannerUrl}
                  alt="Banner"
                  className={`w-full h-full object-contain transition-opacity duration-300 bg-black ${
                    isBannerHovered ? "opacity-50" : "opacity-100"
                  }`}
                />
                {isBannerHovered && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <IconEdit size={36} className="text-white" />
                  </div>
                )}
                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleBannerChange}
                />
              </div>

              {/* Avatar */}
              <div
                className="relative cursor-pointer -mt-15"
                {...ppHoverProps}
                onClick={() => profilePictureInputRef.current?.click()}
              >
                <Avatar
                  className="size-25 z-10 border-4 border-background cursor-pointer"
                  src={profilePictureUrl}
                />
                {isPPHovered && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <IconEdit size={36} className="text-white opacity-100" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  ref={profilePictureInputRef}
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
              </div>

              <Input label="Full Name" value={name} onValueChange={setName} />
              <Input label="Username" isDisabled value={currentUser?.username} />
              <Input label="E-mail" isDisabled value={currentUser?.email}/>
              <Input
                label="Location"
                value={location}
                onValueChange={setLocation}
              />
              <Textarea label="Bio" value={bio} onValueChange={setBio} />
              <Switch
                className="self-start"
                isSelected={isPrivate}
                onValueChange={setIsPrivate}
                startContent={<IconLock />}
                endContent={<IconLockOpen2 />}
              >
                Private
              </Switch>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" onPress={onClose}>
                Cancel
              </Button>
              <Button color="success" type="submit">
                Save
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}

export default EditProfile;
