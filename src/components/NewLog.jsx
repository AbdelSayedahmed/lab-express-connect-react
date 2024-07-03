import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewLog() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: null,
    daysSinceLastCrisis: "",
  });

  function createLog(log) {
    const options = {
      method: "POST",
      body: JSON.stringify(log),
      headers: { "Content-Type": "application/json" },
    };
    return fetch("http://localhost:8008/logs", options).then((response) => {
      return response.json();
    });
  }

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "radio" ? (value === "yes" ? true : false) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createLog(form)
      .then((response) => {
        navigate(`/logs/${response.id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="new-log-container">
      <h2 className="new-note-heading">New Note</h2>
      <form className="new-note_form" onSubmit={handleSubmit}>
        <div className="column-one">
          <label className="new-note_form_label" htmlFor="captainName">
            <br />
            <strong>Captain Name</strong>
            <br />
            <input
              className="new-note_input"
              type="text"
              id="captainName"
              name="captainName"
              value={form.captainName}
              onChange={handleChange}
              required
            />
          </label>
          <label className="new-note_form_label" htmlFor="title">
            <br />
            <strong>Title</strong>
            <br />
            <input
              className="new-note_input"
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>
          <label className="new-note_form_label" htmlFor="post">
            <br />
            <strong>Post</strong>
            <br />
            <textarea
              className="new-note_input"
              id="post"
              name="post"
              value={form.post}
              onChange={handleChange}
              required
            />
          </label>
          <label className="new-note_form_label" htmlFor="mistakes">
            <br />
            <strong>Were any mistakes made today?</strong>
            <br />
            <div>
              <input
                className="new-note_input"
                type="radio"
                id="mistakes-yes"
                name="mistakesWereMadeToday"
                value="yes"
                checked={form.mistakesWereMadeToday === true}
                onChange={handleChange}
                required
              />
              <label htmlFor="mistakes-yes">Yes</label>
              <br />
              <input
                className="new-note_input"
                type="radio"
                id="mistakes-no"
                name="mistakesWereMadeToday"
                value="no"
                checked={form.mistakesWereMadeToday === false}
                onChange={handleChange}
                required
              />
              <label htmlFor="mistakes-no">No</label>
            </div>
          </label>
          <label className="new-note_form_label" htmlFor="daysSinceLastCrisis">
            <br />
            <strong>Days since last crisis: </strong>
            <br />
            <input
              className="new-note_input"
              type="text"
              id="daysSinceLastCrisis"
              name="daysSinceLastCrisis"
              value={form.daysSinceLastCrisis}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Create Log</button>
      </form>
    </div>
  );
}
