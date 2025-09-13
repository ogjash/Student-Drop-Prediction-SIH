"use client";

import { Tabs } from "./Tabs.jsx"

export function TabsDemo() {
  const tabs = [
    {
      title: "Product",
      value: "product",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-[#e1e5ec] to-[#ccced2]">
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-[#e1e5ec] to-[#ccced2]">
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Playground",
      value: "playground",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-[#e1e5ec] to-[#ccced2]">
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Content",
      value: "content",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-[#e1e5ec] to-[#ccced2]">
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Random",
      value: "random",
      content: (
        <div
          className="w-full overflow-hidden relative h-full rounded-2xl bg-gradient-to-br from-[#e1e5ec] to-[#ccced2]">
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <div
      className="h-[50rem] [perspective:1000px] relative b flex flex-col mx-auto w-[80rem] my-20">
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
