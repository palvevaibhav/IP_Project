import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import GraphPanel from "../components/GraphPanel";
import { useState } from "react";
import BottomPanel from "../components/BottomPanel";
import DiscoveryModal from "../components/DiscoveryModal";

export default function Dashboard() {
  const [openDiscovery, setOpenDiscovery] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLayer, setSelectedLayer] = useState({
    id: "L7", name: "L7 eNodeB / RAN", desc: "Radio access layer view"
  });
  const [selectedProtocols, setSelectedProtocols] = useState(["IS-IS"]);

  // console.log("Selected Protocols:", selectedProtocols);

  return (
    <div className="h-screen flex bg-gray-100">
      {/* MAIN AREA */}
      <div className="flex flex-col flex-1">
        {/* TOP HEADER */}
        <Header openDiscovery={openDiscovery} setOpenDiscovery={setOpenDiscovery} setSearchQuery={setSearchQuery} />

        {/* BODY */}
        <div className="flex flex-1">
          {/* Sidebar AREA */}
          <div className="w-[240px] border-r bg-white">
            <Sidebar selectedLayer={selectedLayer} setSelectedLayer={setSelectedLayer} setSelectedProtocols={setSelectedProtocols} />
          </div>

          {/* GRAPH AREA */}
          {/* <div className="flex-1"> */}
            <GraphPanel selectedLayer={selectedLayer} selectedProtocols={selectedProtocols} searchQuery={searchQuery}/>
          {/* </div> */}
        </div>

        <BottomPanel />
      </div>
      <DiscoveryModal open={openDiscovery} setOpen={setOpenDiscovery} />
    </div>
  );
}