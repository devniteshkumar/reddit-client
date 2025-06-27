import { useState } from "react";
import Sidebar from "./components/sidebar.jsx";
import Lcontainer from "./components/lanecontainer.jsx";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex">
      <Lcontainer />
      <Sidebar />
    </div>
  );
}

export default App;
