
import { CalendarDays, CheckCheck, CircleCheck, Inbox, Sparkles, Sun, X } from "lucide-react";
import { useState } from "react";
import type { SidebarProps, WorkSpaceInterface } from "../../types/task";

const Sidebar = ({
  selectedTab,
  handleSelectedTab,
  isSidebarOpen,
  setIsSidebarOpen,
  progress
}: SidebarProps) => {

  const workspace: WorkSpaceInterface[] = [
    { id: "all", icon: Inbox, text: "All tasks", count: 0 },
    { id: "today", icon: Sun, text: "Today", count: 0 },
    { id: "upcoming", icon: CalendarDays, text: "Upcoming", count: 0 },
    { id: "completed", icon: CircleCheck, text: "Completed", count: 0 },
  ];

  return (
    <>
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm sm:hidden"
        />
      )}

      <div
        className={`
          fixed sm:static inset-y-0 left-0 z-50
          h-screen w-64 sm:w-50 bg-white p-3
          flex flex-col justify-between shrink-0
          transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}
        `}
      >
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-500 rounded-xl w-10 h-10 flex items-center justify-center">
                <CheckCheck color="white" />
              </div>
              <div>
                <p className="text-xl font-bold">dayflow</p>
                <p className="text-[0.5rem] text-gray-400 font-semibold tracking-widest">
                  MAKE TODAY COUNT
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSidebarOpen(false)}
              className="sm:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-10">
            <p className="text-[0.6rem] text-gray-400 font-semibold tracking-widest px-3 mb-3">
              WORKSPACE
            </p>

            <div className="flex flex-col gap-0.5">
              {workspace.map((ele) => {
                const Icon = ele.icon;
                const isActive = ele.id === selectedTab;

                return (
                  <button
                    key={ele.id}
                    onClick={() => handleSelectedTab(ele.id)}
                    className={`font-semibold flex w-full text-sm items-center p-3 rounded-xl transition duration-300 hover:bg-indigo-500/20 hover:text-indigo-600 ${
                      isActive
                        ? "text-indigo-600 bg-indigo-500/20"
                        : "text-gray-400"
                    }`}
                  >
                    <div className="flex items-center flex-1 gap-2">
                      <Icon size={20} />
                      <p>{ele.text}</p>
                    </div>
                    <p>{ele.count}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-[0.6rem] text-gray-400 font-semibold tracking-widest px-3 mb-3">
              YOUR LISTS
            </p>

            {["Work", "Personal", "Study"].map((list, index) => (
              <button
                key={list}
                className="font-semibold flex w-full text-sm items-center p-3 rounded-xl text-gray-400 hover:bg-indigo-500/20 hover:text-indigo-600"
              >
                <div className="flex items-center flex-1 gap-2">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${
                      index === 0
                        ? "bg-indigo-400"
                        : index === 1
                        ? "bg-yellow-400"
                        : "bg-green-400"
                    }`}
                  />
                  {list}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl bg-indigo-400/20 p-4">
          <div className="w-10 h-10 rounded-xl bg-white flex justify-center items-center text-indigo-500">
            <Sparkles size={20} />
          </div>
          <p className="font-semibold text-sm tracking-wide mt-2">
            Small steps add up.
          </p>
          <p className="text-gray-400 text-[0.7rem] tracking-wide">
            A little progress each day creates remarkable results.
          </p>
          <div className="w-full h-1.5 mt-2 bg-indigo-400/50 rounded">
            <div
              className="h-1.5 bg-indigo-400 rounded transition duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[0.6rem]">{progress}% complete</p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
