import type {TopBarProps} from "../../types/task"
const TopBar = ({activeTab}:TopBarProps) => {
  return (
    <div className="bg-white border border-gray-100 p-4">
        <p className="text-[0.7rem] text-gray-400">Workspace &gt; {activeTab}</p>
    </div>
  )
}

export default TopBar