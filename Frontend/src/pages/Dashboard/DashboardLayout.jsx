"use client";
import React, { useState } from "react";
import { Navigate, Outlet, useLocation, Link } from 'react-router-dom'
import { Sidebar, SidebarBody, SidebarLink } from '../../components/ui/Sidebar.jsx'
import { 
  IconBrandTabler,
  IconUsers,
  IconSettings,
  IconArrowLeft,
  IconReportAnalytics,
  IconBell,
  IconUserPlus
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const DashboardLayout = () => {
  const isAuthenticated = true // Temporarily set to true for development
  const location = useLocation()
  const [open, setOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  const sidebarLinks = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Students",
      href: "/dashboard/students",
      icon: <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Reports",
      href: "/dashboard/reports",
      icon: <IconReportAnalytics className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Alerts",
      href: "/dashboard/alerts",
      icon: <IconBell className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Add User",
      href: "/dashboard/add-user",
      icon: <IconUserPlus className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
    {
      label: "Logout",
      href: "/auth/logout",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    },
  ];

  return (
    <div className={cn(
      "mx-auto flex w-full flex-1 flex-col rounded-md border border-neutral-200 bg-gray-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
      "min-h-screen"
    )}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {sidebarLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Admin User",
                href: "#",
                icon: (
                  <div className="h-7 w-7 shrink-0 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm font-bold">
                    A
                  </div>
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <DashboardContent />
    </div>
  )
}

const Logo = () => {
  return (
    <Link
      to="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white">
        ImpactCrew
      </motion.span>
    </Link>
  );
};

const LogoIcon = () => {
  return (
    <Link
      to="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </Link>
  );
};

const DashboardContent = () => {
  return (
    <div className="flex flex-1">
      <div className="enhanced-scrollbar flex w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout
