import React, { useEffect } from "react";
import { Avatar, Chip, Image, user } from "@heroui/react";
import { IconHome, IconSearch, IconBell, IconUser, IconSettings, IconPlus } from "@tabler/icons-react";
import { getCurrentUser } from "@/api/auth";
import { useUserStore } from "@/store/userStore";


function DefaultLayout({children}: {children: React.ReactNode}) {

  const setUser = useUserStore(state => state.setUser)
  const user = useUserStore(state => state.user)

  useEffect(() => {
    (async () => {
      try {
        const data = await getCurrentUser()
        setUser(data)
      } catch (error) {
        // token expired -> logout
      }
    })()
  }, [])
  return (
    <div className="min-h-screen flex justify-between bg-background text-foreground ">
      {/* 🔹 Sol Sidebar */}
      <aside className="hidden md:flex flex-col items-center justify-between w-1/4 pb-6 sticky top-0 h-screen">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <a href="/home">  <Image
            src="/brickgram_logo.png"
            alt="Brickgram Logo"
            className="w-48 h-auto object-contain"
          /></a>
          {/* Kısayollar */}
          <nav className="flex flex-col items-start gap-6 mt-8">
            <SidebarLink icon={<IconHome size={24} />} label="Home" link="/home" />
            <SidebarLink icon={<IconSearch size={24} />} label="Explore" link="/home" />
            <SidebarLink icon={<IconBell size={24} />} label="Notifications" link="/notifications" />
            <SidebarLink icon={<IconUser size={24} />} label="Profile" link={`/profile/${user?.username}`} />
            <SidebarLink icon={<IconSettings size={24} />} label="Settings" link="/home"/>
          </nav>

          <button className="mt-8 flex items-center gap-2 bg-success text-black font-semibold py-2 px-4 rounded-full hover:opacity-90 transition">
            <IconPlus size={18} />
            <span>Post</span>
          </button>
        </div>
        <a href={`/profile/${user?.username}`}>
        <div className="w-52 flex items-center gap-3 bg-success/15 hover:bg-success/25 transition-colors rounded-full px-4 py-2 cursor-pointer">
          <img
            src={user?.profile_picture}
            alt="Profile"
            className="w-12 h-12 rounded-full border border-gray-500 cursor-pointer"
          /> 
          <div className="flex flex-col">
            <p className="text-base font-semibold text-success">Utku</p>
            <p className="text-sm text-gray-400">@Utkugulmez07</p>
            </div> 
        </div>
        </a>
      </aside>

      {/* 🔹 Ana içerik */}
      <main
        className="
          flex flex-col w-full max-w-2xl 
          min-h-screen mx-auto 
          bg-content1/40 
          p-6 
          rounded-2xl 
          shadow-lg 
          border border-gray-700/50 
          transition-all 
          hover:border-success/30
        "
      >
        {children}
      </main>

      {/* 🔹 Sağ taraf (şimdilik boş) */}
      <div className="hidden md:block w-1/5 p-4"></div>
    </div>
  );
}

/* 🔸 Basit Sidebar Link bileşeni */
function SidebarLink({ icon, label, link }: { icon: React.ReactNode; label: string, link: string }) {
  return (
    <button className="flex cursor-pointer items-center gap-3 text-lg text-gray-300 hover:text-success transition-colors" onClick={() => window.location.href = link}>
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default DefaultLayout;
