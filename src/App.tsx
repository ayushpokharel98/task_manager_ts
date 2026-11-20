import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import type { FormData, Tabs, Priority, Task as TaskType } from "../types/task"
import { CheckCheck, Clock, Logs, X } from "lucide-react";
import Task from "./components/Task";

const App = () => {
  const [selectedTab, setSelectedTab] = useState<Tabs>("all");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const handleSelectedTab = (id: Tabs) => {
    setSelectedTab(id);
    setIsSidebarOpen(false);
  }
  const todayDate = new Date();
  const yyyy = todayDate.getFullYear();
  const mm = String(todayDate.getMonth() + 1).padStart(2, '0');
  const dd = String(todayDate.getDate()).padStart(2, '0');
  const getLandingText = (): string => {
    return selectedTab === "all" ? "A clear mind starts with a clear plan." : selectedTab === "today" ? "Focus on what matters most today" : selectedTab === "upcoming" ? "A little planning makes tomorrow easier." : "Look at everything you have accomplished."
  }
  const handleTaskSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newTask: TaskType = {
      ...formData,
      id: crypto.randomUUID()
    };
    setTasks(prev => [...prev, newTask]);
    setAddTaskModal(false);
  };
  const [formData, setFormData] = useState<FormData>({
    taskName: "",
    taskDesc: "",
    taskDate: `${yyyy}-${mm}-${dd}`,
    taskList: "Work",
    priority: "High",
    isCompleted: false,
  });

  const setPriority = (value: Priority): void => {
    setFormData((prev) => ({
      ...prev,
      priority: value,
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const [tasks, setTasks] = useState<TaskType[]>(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");

      if (!savedTasks) return [];

      const parsedTasks = JSON.parse(savedTasks) as Partial<TaskType>[];

      return Array.isArray(parsedTasks)
        ? parsedTasks.map((task) => ({
          ...task,
          id: task.id || crypto.randomUUID()
        } as TaskType))
        : [];

    } catch (err) {
      console.error("Failed to load tasks:", err);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const completedTasks = tasks.filter((tasks) => tasks.isCompleted);
  const incompleteTasks = tasks.filter((tasks) => !tasks.isCompleted);

  const progress = (completedTasks.length / tasks.length)*100;

  const tasksToShow = selectedTab === "all" ? tasks :
                      selectedTab === "completed" ? tasks.filter((task)=>task.isCompleted):
                      selectedTab === "today" ? tasks.filter((task)=> new Date(task.taskDate).toLocaleDateString()===todayDate.toLocaleDateString()):
                      selectedTab === "upcoming"? tasks.filter((task)=> new Date(task.taskDate).toLocaleDateString()>todayDate.toLocaleDateString()): [];

  const handleTaskToggle = (id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  return (
    <div className="w-full h-screen bg-[#f7f7fc] flex overflow-x-hidden">
      <Sidebar
        selectedTab={selectedTab}
        handleSelectedTab={handleSelectedTab}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        progress={progress}
      />
      <div className="w-full">
        <TopBar activeTab={selectedTab} showSideBaronMobile={() => setIsSidebarOpen(true)} handleAddTaskModal={() => setAddTaskModal(true)} />
        <div className="main w-full overflow-y-auto px-9 py-6">
          <div>
            <p className="text-md tracking-wide font-semibold text-violet-500 mb-4 uppercase leading-tight font-mono">
              {todayDate.toLocaleDateString(undefined, { day: "numeric", month: 'long', weekday: 'long' })}
            </p>
            <div className="flex flex-col gap-1">
              <h1 className="font-bold text-3xl flex">
                {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)} <span className="text-indigo-500">.</span>
              </h1>
              <h1 className="text-gray-500 font-semibold text-sm">
                {getLandingText()}
              </h1>
            </div>
          </div>
          <div className="grid grid-rows-3 gap-5 mt-8 text-[10px] tracking-wider sm:grid-rows-1 sm:grid-cols-3">
            <div className="bg-white p-3 rounded-2xl flex flex-col gap-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="bg-indigo-300/30 p-2 rounded-xl text-indigo-600">
                  <Logs className="size-4 sm:size-6" />
                </div>
                <p className="font-mono uppercase text-gray-500 font-semibold">All tasks</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold font-mono text-4xl">{tasks.length}</p>
                <p className="text-gray-500">on your plate</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-2xl flex flex-col gap-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="bg-green-300/30 p-2 rounded-xl text-green-600">
                  <CheckCheck className="size-4 sm:size-6" />
                </div>
                <p className="font-mono uppercase text-gray-500 font-semibold">Completed</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold font-mono text-4xl">{completedTasks.length}</p>
                <p className="text-green-500 font-semibold">{progress}% of your total</p>
              </div>
            </div>
            <div className="bg-white p-3 rounded-2xl flex flex-col gap-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="bg-yellow-300/30 p-2 rounded-xl text-yellow-600">
                  <Clock className="size-4 sm:size-6" />
                </div>
                <p className="font-mono uppercase text-gray-500 font-semibold">Still to do</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-bold font-mono text-4xl">
                  {incompleteTasks.length}
                </p>
                <p className="text-gray-500">one step at a time</p>
              </div>
            </div>

          </div>
          <div className="bg-white px-6 py-3 rounded-2xl flex flex-col gap-4 shadow-md mt-8">
            <div className="flex">
              <div className="flex-1">
                <p className="text-sm font-bold">Your daily process</p>
                <p className="text-xs text-gray-500">Every checked task is a little win</p>
              </div>
              <p className="place-content-end text-xl font-bold text-indigo-500">{progress}%</p>
            </div>
            <div className="w-full h-2 mt-1 bg-indigo-400/50 rounded">
              <div
                className="h-2 bg-indigo-400 rounded transition duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-gray-400 flex justify-between">
              <p>{completedTasks.length} task completed</p>
              <p>{incompleteTasks.length} task remaining</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <p className="text-gray-500 text-sm font-semibold">Your tasks</p>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 text-gray-500 font-semibold text-xs">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                  High Priority
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-semibold text-xs">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
                  Medium
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-semibold text-xs">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  Low
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-3">
              {
                tasksToShow.length > 0 ? (
                  tasksToShow.map((task, index) =>
                    <Task key={index} task={task} onToggle={handleTaskToggle} />
                  )
                ) : (
                  <p className="text-sm text-center w-full text-gray-400">No tasks found!</p>
                )
              }
            </div>
          </div>
        </div>

      </div>
      {
        addTaskModal && (
          <div className="w-full h-screen absolute backdrop-blur-md bg-black/20 z-60 flex justify-center items-center px-4">
            <div className="bg-white rounded-3xl shadow-md w-xl">
              <div className="flex items-center p-6 border-b border-gray-300 justify-between">
                <div>
                  <p className="text-indigo-500 text-sm font-mono tracking-wider font-semibold">A NEW BEGINNING</p>
                  <p className="font-bold text-2xl">Create a task</p>
                </div>
                <div className="text-gray-600 bg-gray-400/30 rounded-xl p-2" onClick={() => setAddTaskModal(false)}>
                  <X size={20} />
                </div>
              </div>
              <div className="p-6">
                <form onSubmit={handleTaskSubmit}>
                  <div className="flex flex-col mb-5">
                    <label htmlFor="taskName" className="text-gray-500 text-xs font-semibold mb-1">Task Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      name="taskName"
                      className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 p-1.5 rounded-xl text-sm placeholder:text-xs px-4 py-2"
                      placeholder="e.g. Finish Landing Page Design"
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col mb-5">
                    <label htmlFor="taskDesc" className="text-gray-500 text-xs font-semibold mb-1">Description (optional)</label>
                    <textarea
                      name="taskDesc"
                      className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 p-1.5 rounded-xl resize-none text-sm placeholder:text-xs px-4 py-2"
                      placeholder="Add a little detail..."
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flex w-full justify-between gap-2">
                    <div className="flex flex-col mb-5 w-full">
                      <label htmlFor="taskDate" className="text-gray-500 text-xs font-semibold mb-1">Due Date</label>
                      <input
                        type="date"
                        defaultValue={`${yyyy}-${mm}-${dd}`}
                        name="taskDate"
                        className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 p-1.5 rounded-xl text-sm placeholder:text-xs px-4 py-2"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <label htmlFor="taskList" className="text-gray-500 text-xs font-semibold mb-1">List </label>
                      <select name="taskList" id="" className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 p-1.5 rounded-xl text-sm placeholder:text-xs px-4 py-2" onChange={handleInputChange}>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Study">Study</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col mb-5 w-full">
                    <p className="text-gray-500 text-xs font-semibold mb-1">Priority</p>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        className={`px-4 hover:bg-orange-300/20 font-semibold text-gray-400 hover:text-orange-400 text-sm py-2 rounded-xl flex items-center gap-2 border border-gray-400 transition duration-300 ${formData?.priority === "High" && "bg-orange-300/20"}`}
                        onClick={() => setPriority("High")}
                      >
                        <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                        High
                      </button>
                      <button
                        type="button"
                        className={`px-4 hover:bg-indigo-300/20 font-semibold text-gray-400 hover:text-indigo-400 text-sm py-2 rounded-xl flex items-center gap-2 border border-gray-400 transition duration-300 ${formData?.priority === "Medium" && "bg-indigo-300/20"}`}
                        onClick={() => setPriority("Medium")}
                      >
                        <div className="w-1 h-1 bg-indigo-400 rounded-full"></div>
                        Medium
                      </button>
                      <button
                        type="button"
                        className={`px-4 hover:bg-green-300/20 font-semibold text-gray-400 hover:text-green-400 text-sm py-2 rounded-xl flex items-center gap-2 border border-gray-400 transition duration-300 ${formData?.priority === "Low" && "bg-green-300/20"}`}
                        onClick={() => setPriority("Low")}
                      >
                        <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                        Low
                      </button>
                    </div>
                  </div>

                  <button type="submit" className="w-full bg-indigo-400/80 p-2 rounded-xl hover:bg-indigo-400 transition duration-300 text-white active:scale-95 font-semibold">Create task</button>
                </form>
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default App