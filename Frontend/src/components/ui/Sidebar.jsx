import { cn } from "@/lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen, animate } = useSidebar();

  const handleMouseEnter = () => {
    if (animate) {
      setOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (animate) {
      setOpen(false);
    }
  };

  return (
    <>
      <motion.div
        className={cn(
          "fixed left-0 top-0 h-screen px-4 py-4 hidden md:flex md:flex-col bg-zinc-100 dark:bg-zinc-800 w-[300px] shrink-0 z-50",
          "fixed left-0 top-0 h-screen px-2 py-4 hidden md:flex md:flex-col bg-zinc-100 dark:bg-zinc-800 w-[200px] shrink-0 z-50",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
          width: animate ? (open ? "200px" : "48px") : "200px",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}>
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}) => {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <div
        className={cn(
          "h-10 px-4 py-4 flex flex-row md:hidden  items-center justify-between bg-zinc-100 dark:bg-zinc-800 w-full"
        )}
        {...props}>
        {/* Logo */}
        <Link
          to="/dashboard"
          className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-zinc-800">
          <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-zinc-800 dark:bg-white" />
          <span className="font-medium whitespace-pre text-zinc-800 dark:text-white">
            ImpactCrew
          </span>
        </Link>

        {/* Hamburger Menu */}
        <div className="flex justify-end z-20">
          <IconMenu2
            className="text-zinc-800 dark:text-zinc-200"
            onClick={() => setOpen(!open)} />
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-zinc-50 dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
                className
              )}>
              <div
                className="absolute right-10 top-10 z-50 text-zinc-800 dark:text-neutral-200"
                onClick={() => setOpen(!open)}>
                <IconX />
              </div>
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}) => {
  const { open, animate, setOpen } = useSidebar();

  // Handle custom onClick functions (like logout)
  if (link.onClick) {
    return (
      <button
        onClick={(e) => {
          link.onClick(e);
          // Close sidebar on mobile after clicking
          if (window.innerWidth < 768) {
            setOpen(false);
          }
        }}
        className={cn("flex items-center justify-start gap-2 group/sidebar py-2 w-full text-left bg-transparent border-none cursor-pointer", className)}
        {...props}>
        {link.icon}
        <motion.span
          animate={{
            display: animate ? (open ? "inline-block" : "none") : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          className="text-zinc-500 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
          {link.label}
        </motion.span>
      </button>
    );
  }

  // Handle regular navigation links
  return (
    <Link
      to={link.href}
      onClick={() => {
        // Close sidebar on mobile after clicking a navigation link
        if (window.innerWidth < 768) {
          setOpen(false);
        }
      }}
      className={cn("flex items-center justify-start gap-2  group/sidebar py-2", className)}
      {...props}>
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-zinc-500 dark:text-zinc-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0">
        {link.label}
      </motion.span>
    </Link>
  );
};