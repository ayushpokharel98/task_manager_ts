import { useState } from "react";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

const App = () => {
  type Tabs = "all" | "today" | "upcoming" | "completed";
  const [selectedTab, setSelectedTab] = useState<Tabs>("all");
  const handleSelectedTab = (id:Tabs) => {
    setSelectedTab(id);
  }
  return (
    <div className="w-full h-screen bg-[#f7f7fc] flex overflow-x-hidden">
      <Sidebar selectedTab={selectedTab} handleSelectedTab={handleSelectedTab}/>
      <div>
        <TopBar activeTab={selectedTab}/>
      </div>
    </div>
  )
}

export default App