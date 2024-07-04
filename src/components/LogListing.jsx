import React from "react";
import { Link } from "react-router-dom";

export default function LogListing({ id, name, title, post, mistakes, crisis }) {
  return (
    <div className="log-listing-container">
      <h3>Captain {name}</h3>
      <h4>Title: {title}</h4>
      <p>Post: {post}</p>
      <p>Mistakes made today: {mistakes ? "Yes" : "No"}</p>
      <p>Days since last crisis: {crisis}</p>
      <Link to={`${id}`}>View log</Link>
    </div>
  );
}
