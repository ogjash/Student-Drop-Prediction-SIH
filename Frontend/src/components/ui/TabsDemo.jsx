"use client";

import { Tabs } from "./Tabs.jsx"

// Import demo images
import overviewImg from "../../assets/images/demo/overview.png"
import studentsImg from "../../assets/images/demo/students.png"
import detailsImg from "../../assets/images/demo/details.png"
import reportImg from "../../assets/images/demo/report.png"
import alertsImg from "../../assets/images/demo/alerts.png"

export function TabsDemo() {
  const tabs = [
    {
      title: "Overview",
      value: "overview",
      content: (
        <div
          className="w-full overflow-hidden relative h-auto min-h-[400px] rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
          <OverviewContent />
        </div>
      ),
    },
    {
      title: "Students",
      value: "students",
      content: (
        <div
          className="w-full overflow-hidden relative h-auto min-h-[400px] rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
          <StudentsContent />
        </div>
      ),
    },
    {
      title: "Details",
      value: "details",
      content: (
        <div
          className="w-full overflow-hidden relative h-auto min-h-[400px] rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
          <DetailsContent />
        </div>
      ),
    },
    {
      title: "Reports",
      value: "reports",
      content: (
        <div
          className="w-full overflow-hidden relative h-auto min-h-[400px] rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
          <ReportsContent />
        </div>
      ),
    },
    {
      title: "Alerts",
      value: "alerts",
      content: (
        <div
          className="w-full overflow-hidden relative h-auto min-h-[400px] rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center">
          <AlertsContent />
        </div>
      ),
    }
  ];

  return (
    <div
      className="h-auto min-h-[30rem] sm:min-h-[35rem] md:min-h-[45rem] lg:min-h-[55rem] xl:min-h-[60rem] [perspective:1000px] relative flex flex-col w-[95%] sm:w-[45rem] md:w-[60rem] lg:w-[80rem] xl:w-[90rem] max-w-full my-20 mx-auto">
      <Tabs tabs={tabs} />
    </div>
  );
}

const OverviewContent = () => {
  return (
    <img
      src={overviewImg}
      alt="Overview dashboard"
      className="max-w-full max-h-full object-contain p-3 rounded-xl"
    />
  );
};

const StudentsContent = () => {
  return (
    <img
      src={studentsImg}
      alt="Students management"
      className="max-w-full max-h-full object-contain p-3 rounded-xl"
    />
  );
};

const DetailsContent = () => {
  return (
    <img
      src={detailsImg}
      alt="Student details"
      className="max-w-full max-h-full object-contain p-3 rounded-xl"
    />
  );
};

const ReportsContent = () => {
  return (
    <img
      src={reportImg}
      alt="Reports and analytics"
      className="max-w-full max-h-full object-contain p-3 rounded-xl"
    />
  );
};

const AlertsContent = () => {
  return (
    <img
      src={alertsImg}
      alt="Alerts and notifications"
      className="max-w-full max-h-full object-contain p-3 rounded-xl"
    />
  );
};
