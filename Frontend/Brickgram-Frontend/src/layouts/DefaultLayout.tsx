import React from "react";
import { Avatar, Chip, Image } from "@heroui/react";
import { IconHome, IconSearch, IconBell, IconUser, IconSettings, IconPlus } from "@tabler/icons-react";


function DefaultLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="min-h-screen flex justify-between bg-background text-foreground ">
      {/* 🔹 Sol Sidebar */}
      <aside className="hidden md:flex flex-col items-center justify-between w-1/4 pb-6 sticky top-0 h-screen">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <a href="/main">  <Image
            src="/brickgram_logo.png"
            alt="Brickgram Logo"
            className="w-48 h-auto object-contain"
          /></a>
          {/* Kısayollar */}
          <nav className="flex flex-col items-start gap-6 mt-8">
            <SidebarLink icon={<IconHome size={24} />} label="Home" />
            <SidebarLink icon={<IconSearch size={24} />} label="Explore" />
            <SidebarLink icon={<IconBell size={24} />} label="Notifications" />
            <SidebarLink icon={<IconUser size={24} />} label="Profile" />
            <SidebarLink icon={<IconSettings size={24} />} label="Settings" />
          </nav>

          <button className="mt-8 flex items-center gap-2 bg-success text-black font-semibold py-2 px-4 rounded-full hover:opacity-90 transition">
            <IconPlus size={18} />
            <span>Post</span>
          </button>
        </div>
        <div className="w-52 flex items-center gap-3 bg-success/15 hover:bg-success/25 transition-colors rounded-full px-4 py-2 cursor-pointer">
                  <img
            src="/LSW_PhotoIcons_KitFisto.png"
            alt="Profile"
            className="w-12 h-12 rounded-full border border-gray-500 cursor-pointer"
          /> 
          <div className="flex flex-col">
            <p className="text-base font-semibold text-success">Utku</p>
            <p className="text-sm text-gray-400">@Utkugulmez07</p>
            </div> 
        </div>
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
function SidebarLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex cursor-pointer items-center gap-3 text-lg text-gray-300 hover:text-success transition-colors">
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default DefaultLayout;
