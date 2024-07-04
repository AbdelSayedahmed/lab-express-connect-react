import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditLog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: null,
    daysSinceLastCrisis: "",
  });

  useEffect(() => {
    async function fetchLog() {
      try {
        const response = await fetch(`http://localhost:8008/logs/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch log");
        }
        const data = await response.json();
        setForm(data);
      } catch (error) {
        console.error("Unable to fetch log:", error);
      }
    }
    fetchLog();
  }, [id]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: newValue,
    }));
  }

  async function handleSave(event) {
    event.preventDefault();
    try {
      const options = {
        method: "PUT",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      };
      const response = await fetch(`http://localhost:8008/logs/${id}`, options);
      if (!response.ok) {
        throw new Error("Failed to update log");
      }
      const data = await response.json();
      navigate(`/logs/${data.id}`);
    } catch (error) {
      console.error("Error updating log:", error);
    }
  }

  return (
    <div className="edit-log_container">
      <h2 className="new-log-heading">Edit Log</h2>
      <form className="new-log_form" onSubmit={handleSave}>
        <div className="column-one">
          <label className="new-log_form_label" htmlFor="captainName">
            <br />
            <strong>Captain Name</strong>
            <br />
            <input
              className="new-log_input"
              type="text"
              id="captainName"
              name="captainName"
              value={form.captainName}
              onChange={handleChange}
              required
            />
          </label>
          <label className="new-log_form_label" htmlFor="title">
            <br />
            <strong>Title</strong>
            <br />
            <input
              className="new-log_input"
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>
          <label className="new-log_form_label" htmlFor="post">
            <br />
            <strong>Post</strong>
            <br />
            <textarea
              className="new-log_input"
              id="post"
              name="post"
              value={form.post}
              onChange={handleChange}
              required
            />
          </label>
          <label className="new-log_form_label" htmlFor="mistakes">
            <br />
            <strong>Were any mistakes made today?</strong>
            <br />
            <div>
              <input
                className="new-log_input"
                type="radio"
                id="mistakes-yes"
                name="mistakesWereMadeToday"
                value="true"
                checked={form.mistakesWereMadeToday === true}
                onChange={handleChange}
                required
              />
              <label htmlFor="mistakes-yes">Yes</label>
              <br />
              <input
                className="new-log_input"
                type="radio"
                id="mistakes-no"
                name="mistakesWereMadeToday"
                value="false"
                checked={form.mistakesWereMadeToday === false}
                onChange={handleChange}
                required
              />
              <label htmlFor="mistakes-no">No</label>
            </div>
          </label>
          <label className="new-log_form_label" htmlFor="daysSinceLastCrisis">
            <br />
            <strong>Days since last crisis: </strong>
            <br />
            <input
              className="new-log_input"
              type="text"
              id="daysSinceLastCrisis"
              name="daysSinceLastCrisis"
              value={form.daysSinceLastCrisis}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Save Log</button>
      </form>
    </div>
  );
}
