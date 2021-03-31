import { useState } from "react";
import styles from "../css/Input.module.scss";
const Input = () => {
  let currDate = new Date();
  currDate = currDate.toString();
  currDate = currDate.split(" ").slice(1, 4).join(" ");
  const [name, setName] = useState();
  const [applied, setApplied] = useState(currDate);
  const [replied, setReplied] = useState();
  const [status, setStatus] = useState("Pending...");
  const [notes, setNotes] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const body = { name, applied, replied, status, notes };
    console.log(body);
    try {
      const response = await fetch("/companies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(response.rows);
      window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className={styles.container}>
      <h1>Welcome to my Job Hunting Records</h1>
      <form onSubmit={onSubmit} className={styles.input}>
        <div className={styles.inputfield}>
          <label>Company Name</label>
          <input
            placeholder="Company Name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputfield}>
          <label>Status</label>
          <select
            name="status"
            id="status"
            onChange={(e) => setStatus(e.target.value)}
            defaultValue="Pending"
          >
            <option value="Pending...">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Ghosted">Ghosted</option>
          </select>
        </div>
        <div className={styles.inputfield}>
          <label>Date Applied (current date by default)</label>
          <input type="date" onChange={(e) => setApplied(e.target.value)} />
        </div>
        <div className={styles.inputfield}>
          <label>Date Replied (if applicable)</label>
          <input type="date" onChange={(e) => setReplied(e.target.value)} />
        </div>
        <div className={styles.text}>
          <label for="notes">Notes</label>
          <textarea
            placeholder="Notes, comments, extras, etc."
            name="notes"
            id="notes"
            cols="30"
            rows="10"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className={styles.submit}>
          <button>Add</button>
        </div>
      </form>
    </div>
  );
};

export default Input;
