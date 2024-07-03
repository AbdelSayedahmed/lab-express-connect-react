import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="nav-container">
      <Link to="/logs"><span>Logs</span></Link>
      <Link to="/logs/new"><span>New Log</span></Link>
      <Link to="/"><span>Home</span></Link>
    </nav>
  );
}
