"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName
}) => {
  const [active, setActive] = useState(propTabs[0]);
  const [tabs, setTabs] = useState(propTabs);

  const moveSelectedTabToTop = (idx) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex items-center justify-center w-full",
          containerClassName
        )}
      >
        <div className="px-2 md:px-4">
          <div className="grid grid-cols-2 sm:flex mb-4 md:mb-8 -mt-px relative gap-1 md:gap-0">
            {propTabs.map((tab, idx) => (
              <button
                key={tab.title}
                onClick={() => moveSelectedTabToTop(idx)}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className={cn(
                  "py-3 md:py-5 px-5 md:px-10 border border-[#d6d9e4] bg-white text-[#505967] hover:text-black transition text-sm md:text-base",
                  "md:flex-1",
                  idx === 4 && "col-span-2 justify-self-center w-1/2", // Center the 5th item in mobile
                  active.value === tab.value
                    ? "bg-gray-200 text-black"
                    : "",
                  tabClassName
                )}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {active.value === tab.value && (
                  <motion.div
                    layoutId="clickedbutton"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    className={cn(
                      "absolute inset-0 bg-gray-200",
                      activeTabClassName
                    )}
                  />
                )}
                <span className="relative block">{tab.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-6 md:mt-10 px-0", contentClassName)}
      />
    </>
  );
};

export const FadeInDiv = ({ className, tabs, hovering }) => {
  const isActive = (tab) => {
    return tab.value === tabs[0].value;
  };

  return (
    <div className="relative w-auto mx-10 h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn(
            "w-full h-full absolute top-0 left-0",
            "transform-gpu",
            className
          )}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
