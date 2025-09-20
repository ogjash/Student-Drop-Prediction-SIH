"use client";
import React, { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation, Link, useNavigate } from 'react-router-dom'
import { Sidebar, SidebarBody, SidebarLink } from '../../components/ui/Sidebar.jsx'
import { verify } from '../../api/auth.js'
import { 
  IconBrandTabler,
  IconUsers,
  IconSettings,
  IconLogout,
  IconReportAnalytics,
  IconBell,
  IconUserPlus,
  IconPin,
  IconPinFilled
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const DashboardLayout = () => {
  const isAuthenticated = true // Temporarily set to true for development
  const location = useLocation()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(true);

  // Fetch user information on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await verify();
        if (response.data && response.data.user) {
          setUserInfo(response.data.user);
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        navigate('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserInfo();
    }
  }, [isAuthenticated, navigate]);

  // Manage sidebar open state when pinned/unpinned
  useEffect(() => {
    if (!animate) {
      // When pinned, force sidebar to be open
      setOpen(true);
    }
  }, [animate]);

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    
    // Redirect to home page
    navigate('/', { replace: true });
  };

  const sidebarLinks = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-zinc-800 dark:text-zinc-200" />
    },
    {
      label: "Students",
      href: "/dashboard/students",
      icon: <IconUsers className="h-5 w-5 shrink-0 text-zinc-800 dark:text-zinc-200" />
    },
    {
      label: "Reports",
      href: "/dashboard/reports",
      icon: <IconReportAnalytics className="h-5 w-5 shrink-0 text-zinc-800 dark:text-neutral-200" />
    },
    {
      label: "Alerts",
      href: "/dashboard/alerts",
      icon: <IconBell className="h-5 w-5 shrink-0 text-zinc-800 dark:text-neutral-200" />
    },
    {
      label: "Add User",
      href: "/dashboard/add-user",
      icon: <IconUserPlus className="h-5 w-5 shrink-0 text-zinc-800 dark:text-neutral-200" />
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: <IconSettings className="h-5 w-5 shrink-0 text-zinc-800 dark:text-neutral-200" />
    },
  ];

  return (
    <div className={cn(
      "mx-auto flex w-full flex-1 flex-col rounded-md border border-zinc-300 bg-zinc-100 md:flex-row dark:border-neutral-700 dark:bg-neutral-800",
      "min-h-screen"
    )}>
      <Sidebar open={open} setOpen={setOpen} animate={animate}>
        <SidebarBody className="justify-between gap-6">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {(open || !animate) ? <Logo animate={animate} setAnimate={setAnimate} /> : <LogoIcon />}
            <div className="mt-10 flex flex-col gap-2">
              {sidebarLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          
          {/* Username section */}
          <div className="w-full">
            <div className="flex items-center justify-between rounded-lg hover:bg-zinc-100 dark:hover:bg-neutral-800 transition-colors">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className="h-7 w-7 shrink-0 rounded-full bg-zinc-400 flex items-center justify-center text-zinc-50 text-sm font-bold">
                  {loading ? "..." : (userInfo?.username?.[0]?.toUpperCase() || userInfo?.name?.[0]?.toUpperCase() || "A")}
                </div>
                {(open || !animate) && (
                  <span className="text-sm text-zinc-500 dark:text-zinc-200 truncate">
                    {loading ? "Loading..." : (userInfo?.username || userInfo?.name || "Admin User")}
                  </span>
                )}
              </div>
              {(open || !animate) && (
                <button
                  onClick={handleLogout}
                  className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors shrink-0"
                  title="Logout"
                >
                  <IconLogout className="h-5 w-5 text-zinc-600 dark:text-neutral-400" />
                </button>
              )}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div className={cn(
        "flex-1 transition-all duration-300",
        // When animate is true (unpinned): responsive sidebar behavior
        animate ? (
          open ? "ml-0 md:ml-[200px]" : "ml-0 md:ml-[48px]"
        ) : (
          // When animate is false (pinned): always show full sidebar
          "ml-0 md:ml-[200px]"
        )
      )}>
        <DashboardContent animate={animate} open={open} />
      </div>
    </div>
  )
}

const Logo = ({ animate, setAnimate }) => {
  const togglePin = () => {
    setAnimate(!animate);
  };

  return (
    <motion.div 
      className="relative z-20 flex items-center justify-between py-1 text-sm font-normal text-zinc-800"
      animate={{
        backgroundColor: animate ? "transparent" : "rgba(0,0,0,0.05)",
        transition: { duration: 0.3 }
      }}
    >
      <Link
        to="/dashboard"
        className="flex items-center space-x-2">
        <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-zinc-800 dark:bg-white" />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-medium whitespace-pre text-zinc-800 dark:text-white">
          ImpactCrew
        </motion.span>
      </Link>
      <motion.button
        onClick={togglePin}
        className="p-1 rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        title={animate ? "Pin sidebar" : "Unpin sidebar"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          backgroundColor: animate ? "transparent" : "rgba(59, 130, 246, 0.1)",
          transition: { duration: 0.2 }
        }}
      >
        <motion.div
          animate={{ 
            rotate: animate ? 0 : 45,
            transition: { duration: 0.3 }
          }}
        >
          {animate ? (
            <IconPin className="h-4 w-4 text-zinc-600 dark:text-neutral-400" />
          ) : (
            <IconPinFilled className="h-4 w-4 text-zinc-800 dark:text-gray-500" />
          )}
        </motion.div>
      </motion.button>
    </motion.div>
  );
};

const LogoIcon = () => {
  return (
    <Link
      to="/dashboard"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-zinc-800">
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-zinc-800 dark:bg-white" />
    </Link>
  );
};

const DashboardContent = ({ animate, open }) => {
  return (
    <motion.div 
      className="flex flex-1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        transition: {
          duration: animate ? 0.3 : 0.5,
          ease: "easeInOut"
        }
      }}
      key={animate ? 'animated' : 'pinned'} // Force re-animation when pin state changes
    >
      <motion.div 
        className="enhanced-scrollbar flex w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-zinc-300 bg-zinc-50 p-2 md:p-10 dark:border-zinc-600 dark:bg-zinc-900"
        animate={{
          scale: animate ? (open ? 1 : 1.02) : 1,
          transition: {
            duration: 0.2,
            ease: "easeInOut"
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.4,
              delay: animate ? 0.1 : 0.2
            }
          }}
        >
          <Outlet />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardLayout
