import React from "react";
import vehicles from "../data/vehicles";

function Vehicles() {

  const deleteVehicle = (id) => {
    alert("Vehicle deleted: " + id);
  };

  return (
    <div>
      <h2>Vehicle List</h2>

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {vehicles.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.status}</td>
              <td>
                <button onClick={() => deleteVehicle(v.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default Vehicles;
