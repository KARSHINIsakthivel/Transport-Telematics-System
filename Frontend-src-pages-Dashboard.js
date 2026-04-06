import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Dashboard() {

  const [vehicles, setVehicles] = useState([
    {name:"Truck", driver:"Ravi", speed:45, lat:11.02, lng:77.01},
    {name:"Van", driver:"Arun", speed:0, lat:11.03, lng:77.02},
    {name:"Car", driver:"Kumar", speed:75, lat:11.04, lng:77.03}
  ]);

  const [showForm,setShowForm] = useState(false);

  const [formData,setFormData] = useState({
    name:"",
    driver:"",
    speed:""
  });

  // ⭐ Vehicle Movement Simulation
  useEffect(()=>{
    const interval = setInterval(()=>{
      setVehicles(prev =>
        prev.map(v => ({
          ...v,
          lat: v.lat + (Math.random()*0.001),
          lng: v.lng + (Math.random()*0.001)
        }))
      );
    },5000);

    return ()=>clearInterval(interval);
  },[]);

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const saveVehicle = ()=>{
    const newVehicle = {
      ...formData,
      lat:11.05,
      lng:77.05
    };
    setVehicles([...vehicles, newVehicle]);
    setShowForm(false);
  };

  const deleteVehicle = (index)=>{
    const newList = vehicles.filter((v,i)=> i !== index);
    setVehicles(newList);
  };

  const total = vehicles.length;
  const overspeed = vehicles.filter(v => v.speed > 60).length;
  const normal = vehicles.filter(v => v.speed <= 60).length;

  return (
    <div style={{padding:"20px"}}>

      <h2>Transport Telematics Dashboard</h2>

      {/* ⭐ Analytics Cards */}
      <div style={{display:"flex", gap:"20px"}}>

        <div style={{background:"lightblue", padding:"10px"}}>
          <h3>Total</h3>
          <p>{total}</p>
        </div>

        <div style={{background:"salmon", padding:"10px"}}>
          <h3>Overspeed</h3>
          <p>{overspeed}</p>
        </div>

        <div style={{background:"lightgreen", padding:"10px"}}>
          <h3>Normal</h3>
          <p>{normal}</p>
        </div>

      </div>

      <button onClick={()=>setShowForm(true)} style={{marginTop:"10px"}}>
        Add Vehicle
      </button>

      {showForm && (
        <div>
          <h3>Add Vehicle</h3>

          <input name="name" placeholder="Vehicle Name" onChange={handleChange}/><br/>
          <input name="driver" placeholder="Driver Name" onChange={handleChange}/><br/>
          <input name="speed" placeholder="Speed" onChange={handleChange}/><br/>

          <button onClick={saveVehicle}>Save</button>
        </div>
      )}

      <h3>Vehicle List</h3>

      <table border="1" cellPadding="10">
        <tr>
          <th>Name</th>
          <th>Driver</th>
          <th>Speed</th>
          <th>Action</th>
        </tr>

        {vehicles.map((v,i)=>(
          <tr key={i} style={{backgroundColor: v.speed > 60 ? "red":"white"}}>
            <td>{v.name}</td>
            <td>{v.driver}</td>
            <td>{v.speed}</td>
            <td>
              <button onClick={()=>deleteVehicle(i)}>Delete</button>
            </td>
          </tr>
        ))}

      </table>

      {/* ⭐ LIVE MAP */}
      <h3 style={{marginTop:"20px"}}>Live Vehicle Tracking</h3>

      <MapContainer
        center={[11.02,77.01]}
        zoom={13}
        style={{height:"400px", width:"100%"}}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {vehicles.map((v,i)=>(
          <Marker key={i} position={[v.lat, v.lng]}>
            <Popup>
              {v.name} <br/> Speed: {v.speed}
            </Popup>
          </Marker>
        ))}

      </MapContainer>

    </div>
  );
}

export default Dashboard;
