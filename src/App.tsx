import React from "react";
import WorkTable from "./componets/WorkTable";
import Header from "./componets/Header";
import SideNav from "./componets/SideNav";
import "./App.css";

function App() {
  return (
    <div className="conteiner">
      <Header />
      <SideNav />
      <WorkTable />
    </div>
  );
}

export default App;
