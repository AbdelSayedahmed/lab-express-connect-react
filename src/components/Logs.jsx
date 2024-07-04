import { useEffect, useState } from "react";
import LogListing from "./LogListing";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8008/logs")
      .then((response) => response.json())
      .then((data) => setLogs(data))
      .catch((error) => {
        console.error("Error fetching logs:", error);
        setLogs([]);
      });
  }, []);

  return (
    <div className="logs-container">
      {logs.map((log) => (
        <LogListing
          id={log.id}
          name={log.captainName}
          title={log.title}
          post={log.post}
          mistakes={log.mistakesWereMadeToday}
          crisis={log.daysSinceLastCrisis}
        />
      ))}
    </div>
  );
}
