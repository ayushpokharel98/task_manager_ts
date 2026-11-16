export type Tabs = "all" | "today" | "upcoming" | "completed";

export interface SidebarProps {
    selectedTab: Tabs,
    handleSelectedTab: (id:Tabs) => void,
}

export interface TopBarProps {
    activeTab: Tabs,
}