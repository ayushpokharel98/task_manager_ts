import type { LucideIcon } from "lucide-react";

export type Tabs = "all" | "today" | "upcoming" | "completed";

export interface SidebarProps {
    selectedTab: Tabs,
    handleSelectedTab: (id: Tabs) => void,
    isSidebarOpen: boolean,
    setIsSidebarOpen: (open: boolean) => void,
    progress: number
}

export interface TopBarProps {
    activeTab: Tabs,
    showSideBaronMobile: ()=> void,
    handleAddTaskModal: () => void,
}


export interface WorkSpaceInterface {
    id: Tabs,
    icon: LucideIcon,
    text: string,
    count: number
}

export interface ButtonProps{
    text?: string,
    Component?: LucideIcon | null;
}

export interface CardsProps{
    title: string,
    Component: LucideIcon,
    allTasks: number
}

export type Priority = "High" | "Medium" | "Low";

export interface FormData {
    taskName: string,
    taskDesc: string,
    taskDate: string,
    taskList: string,
    priority: Priority,
    isCompleted: boolean,
}

export interface Task extends FormData{
    id: string;
}

export interface TaskProps{
    task: Task,
    onToggle: (id: string) => void;
}