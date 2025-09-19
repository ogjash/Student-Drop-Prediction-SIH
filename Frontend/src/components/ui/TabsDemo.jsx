"use client";

import { Tabs } from "./Tabs.jsx"

export function TabsDemo() {
  const tabs = [
    {
      title: "Overview",
      value: "overview",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300">
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Students",
      value: "students",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300">
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Alerts",
      value: "alerts",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300">
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Reports",
      value: "reports",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300">
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Admins",
      value: "admins",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300">
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <div
      className="h-[27rem] sm:h-[30rem] md:h-[40rem] lg:h-[50rem] xl:h-[55rem] [perspective:1000px] relative flex flex-col w-[100%] sm:w-[40rem] md:w-[50rem] lg:w-[70rem] xl:w-[80rem] max-w-7xl my-20 mx-auto px-auto">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <img
      src="https://colorlib.com/wp/wp-content/uploads/sites/2/free-dashboard-templates-1.jpg.avif"
      alt="Dashboard demo image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[100%] absolute p-3 w-[100%] rounded-xl mx-auto"
    />

  );
};