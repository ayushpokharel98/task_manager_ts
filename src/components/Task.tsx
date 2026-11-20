import { Calendar, Check, Pen, Trash } from "lucide-react";
import type { TaskProps } from "../../types/task";

const Task = ({ task, onToggle }: TaskProps) => {

    return (
        <div className={`bg-white shadow-md p-4 rounded-xl flex gap-3 items-center ${task.isCompleted && "**:line-through! **:text-gray-300!"}`}>
            <div>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-md bg-white checked:bg-indigo-600 checked:border-indigo-600 transition-colors"
                        checked={task.isCompleted}
                        onChange={()=>onToggle(task.id)}
                    />
                    <Check className="absolute w-3.5 h-3.5 text-white left-0.5 pointer-events-none hidden peer-checked:block" />
                </label>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex w-full">
                    <div className="flex-1 flex flex-col">
                        <p className="font-semibold text-md">{task.taskName}</p>
                        <p className="text-sm text-gray-500">{task.taskDesc}</p>
                    </div>
                    <div className="flex gap-1">
                        <div className="p-2 rounded-xl text-gray-400 hover:text-indigo-400 hover:bg-indigo-400/30 transition duration-300">
                            <Pen size={17} />
                        </div>
                        <div className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-400/30 transition duration-300">
                            <Trash size={17} />
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 text-xs text-gray-400 font-semibold mt-4 items-center">
                    <p className={`${task.priority==="High"?"text-orange-400":task.priority==="Medium"?"text-indigo-400":"text-green-400"}`}>{task.priority} Priority</p>
                    <p className="flex gap-1 items-center"><Calendar size={13}/> {new Date(task.taskDate).toLocaleDateString(undefined, {weekday:"short", day:"numeric", month:"short", year:"2-digit"})}</p>
                    <p className="bg-gray-400/20 p-1 rounded-md">{task.taskList}</p>
                </div>
            </div>

        </div>
    )
}

export default Task