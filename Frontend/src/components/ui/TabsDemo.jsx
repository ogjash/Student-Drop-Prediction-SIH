"use client";

import { Tabs } from "./Tabs.jsx"

// Import demo images
import overviewImg from "../../assets/images/demo/overview.png";
import studentsImg from "../../assets/images/demo/students.png";
import detailsImg from "../../assets/images/demo/details.png";
import reportImg from "../../assets/images/demo/reports.png";
import alertsImg from "../../assets/images/demo/alerts.png";

export function TabsDemo() {
  const tabs = [
    {
      title: "Overview",
      value: "overview",
      content: (
        <div
          className="w-full overflow-hidden relative h-fit min-h-[170px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] max-h-[80vh] rounded-xl sm:rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center p-1 sm:p-2 md:p-3">
          <OverviewContent />
        </div>
      ),
    },
    {
      title: "Students",
      value: "students",
      content: (
        <div
          className="w-full overflow-hidden relative h-fit min-h-[170px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] max-h-[80vh] rounded-xl sm:rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center p-1 sm:p-2 md:p-3">
          <StudentsContent />
        </div>
      ),
    },
    {
      title: "Details",
      value: "details",
      content: (
        <div
          className="w-full overflow-hidden relative h-fit min-h-[170px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] max-h-[80vh] rounded-xl sm:rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center p-1 sm:p-2 md:p-3">
          <DetailsContent />
        </div>
      ),
    },
    {
      title: "Reports",
      value: "reports",
      content: (
        <div
          className="w-full overflow-hidden relative h-fit min-h-[170px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] max-h-[80vh] rounded-xl sm:rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center p-1 sm:p-2 md:p-3">
          <ReportsContent />
        </div>
      ),
    },
    {
      title: "Alerts",
      value: "alerts",
      content: (
        <div
          className="w-full overflow-hidden relative h-fit min-h-[170px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[400px] max-h-[80vh] rounded-xl sm:rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-300 flex items-center justify-center p-1 sm:p-2 md:p-3">
          <AlertsContent />
        </div>
      ),
    },
  ];

  return (
    <div
      className="h-fit min-h-[18rem] sm:min-h-[22rem] md:min-h-[30rem] lg:min-h-[35rem] xl:min-h-[40rem] max-h-[90vh] [perspective:1000px] relative flex flex-col w-[98%] sm:w-[90%] md:w-[85%] lg:w-[75rem] xl:w-[85rem] max-w-full my-6 sm:my-8 md:my-12 lg:my-16 mx-auto px-2 sm:px-4">
      <Tabs tabs={tabs} />
    </div>
  );
}

const OverviewContent = () => {
  return (
    <img
      src={overviewImg}
      alt="Overview dashboard"
      className="max-w-full max-h-full object-contain object-center rounded-lg sm:rounded-xl"
    />
  );
};

const StudentsContent = () => {
  return (
    <img
      src={studentsImg}
      alt="Students management"
      className="max-w-full max-h-full object-contain object-center rounded-lg sm:rounded-xl"
    />
  );
};

const DetailsContent = () => {
  return (
    <img
      src={detailsImg}
      alt="Student details"
      className="max-w-full max-h-full object-contain object-center rounded-lg sm:rounded-xl"
    />
  );
};

const ReportsContent = () => {
  return (
    <img
      src={reportImg}
      alt="Reports and analytics"
      className="max-w-full max-h-full object-contain object-center rounded-lg sm:rounded-xl"
    />
  );
};

const AlertsContent = () => {
  return (
    <img
      src={alertsImg}
      alt="Alerts and notifications"
      className="max-w-full max-h-full object-contain object-center rounded-lg sm:rounded-xl"
    />
  );
};
