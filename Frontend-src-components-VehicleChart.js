import vehicles from "../data/vehicles";

function VehicleTable() {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
          <th>Speed</th>
        </tr>
      </thead>

      <tbody>
        {vehicles.map(v => (
          <tr key={v.id}>
            <td>{v.id}</td>
            <td>{v.name}</td>
            <td>{v.status}</td>
            <td>{v.speed}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VehicleTable;
