import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function RoleSwitcher() {
  const { role, setRole, user } = useContext(AppContext);
  
  return (
    <>
    
    <div className="p-4 flex justify-end">
    <div className="flex-1">{role === "admin" ? 
        <h1>Hello {user}</h1>: 
        <div>
            Hello viewer
        </div>
    }</div>
      <div className="flex-2">
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 rounded-lg"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
      </div>
    </div>
    </>
  );
}