import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Log() {
  const [log, setLog] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  async function handleDelete() {
    try {
      const options = { method: "DELETE" };
      const response = await fetch(`http://localhost:8008/logs/${id}`, options);
      if (response.ok) {
        setLog({});
        navigate("/logs");
      } else {
        console.error("Failed to delete log:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  }

  async function getLog(logId) {
    const response = await fetch(`http://localhost:8008/logs/${logId}`);
    return await response.json();
  }

  useEffect(() => {
    getLog(id)
      .then((response) => {
        setLog(response);
      })
      .catch((error) => {
        console.error("Fetching log failed:", error);
      });
  }, [id]);

  return (
    <div className="log-container">
      <div className="log-display">
        <h2>{log.title}</h2>
        <p>{log.post}</p>
        <p>{log.mistakesWereMadeToday ? "" : "No"} mistakes were made today</p>
        <p>Days since last crisis: {log.daysSinceLastCrisis}</p>
        <p>- {log.captainName}</p>
        <button className="edit" onClick={() => navigate(`/logs/${id}/edit`)}>
          Edit
        </button>
        <button className="delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
