import React from "react";

export default function LogListing({ name, title, post, mistakes, crisis }) {
  return (
    <div className="log-container">
      <h3>{name}</h3>
      <h4>{title}</h4>
      <p>{post}</p>
      <p>Mistakes made today: {mistakes ? "Yes" : "No"}</p>
      <p>Days since last crisis: {crisis}</p>
    </div>
  );
}
