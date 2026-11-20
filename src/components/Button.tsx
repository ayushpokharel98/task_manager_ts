import type { ButtonProps } from "../../types/task";

const Button = ({text, Component=null}:ButtonProps) => {
    return (
        <button className="text-white bg-indigo-500 hover:bg-indigo-600 p-2 rounded-md transition duration-300 active:scale-95 flex items-center gap-1">{Component && <Component size={20} color="white" />}{text && text}</button>
    )
}

export default Button