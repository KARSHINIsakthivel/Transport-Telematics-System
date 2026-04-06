import React from "react";

function Sidebar() {
  return (

    <div style={{
      width:"200px",
      height:"100vh",
      background:"#1f2937",
      color:"white",
      padding:"20px"
    }}>

      <h2>Telematics</h2>

      <ul style={{listStyle:"none",padding:0}}>

        <li>
          <a href="/" style={{color:"white"}}>Dashboard</a>
        </li>

        <li>
          <a href="/vehicles" style={{color:"white"}}>Vehicles</a>
        </li>

      </ul>

    </div>

  );
}

export default Sidebar;
