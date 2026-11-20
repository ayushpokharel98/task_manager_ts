import { Menu, Plus, Search } from "lucide-react";
import type { TopBarProps } from "../../types/task"
import Button from "./Button";
const TopBar = ({ activeTab, showSideBaronMobile, handleAddTaskModal }: TopBarProps) => {
  return (
    <div className="bg-white border border-gray-100 p-4 flex items-center justify-between w-full sticky">
      <div className="flex gap-3 items-center">
        <div onClick={showSideBaronMobile} className="sm:hidden">
          <Button Component={Menu} />
        </div>
        <p className="text-[0.7rem] text-gray-400">Workspace &gt; <span className="text-black font-semibold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span></p>
      </div>
      <div className="flex gap-1 items-center">
        <div className="relative">
          <input type="text" className="border border-gray-300 rounded-md text-[0.8rem] focus:outline-none px-5 py-2 focus:ring-2 focus:ring-indigo-400 w-28 sm:w-40" placeholder="Search tasks..." />
          <Search size={14} className="text-indigo-400 absolute top-1/2 bottom-1/2 -translate-y-1/2 left-0.5" />
        </div>
        <button className="text-white bg-indigo-500 hover:bg-indigo-600 p-2 rounded-md transition duration-300 active:scale-95 flex items-center gap-1" onClick={handleAddTaskModal}>
          <Plus size={20}/>
          <p className="hidden sm:block text-sm">Add new task</p>
        </button>

      </div>

    </div>
  )
}

export default TopBar