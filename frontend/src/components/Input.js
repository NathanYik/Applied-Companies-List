import { useState } from "react";
const Input = () => {
  let currDate = new Date();
  currDate = currDate.toString();
  currDate = currDate.split(" ").slice(1, 4).join(" ");
  const [name, setName] = useState();
  const [applied, setApplied] = useState(currDate);
  const [replied, setReplied] = useState();
  const [status, setStatus] = useState("Accepted");
  const [notes, setNotes] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const body = { name, applied, replied, status, notes };
    console.log(body);
    try {
      const response = await fetch("http://localhost:5000/companies", {
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
    <div>
      <h1>My list of companies that I've applied to</h1>
      <form onSubmit={onSubmit}>
        <input
          placeholder="Enter a company"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          value={applied}
          onChange={(e) => setApplied(e.target.value)}
        />
        <input
          type="date"
          value={replied}
          onChange={(e) => setReplied(e.target.value)}
        />
        <select
          name="status"
          id="status"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Accepted">Accepted</option>
          <option value="Rejected">Rejected</option>
          <option value="Ghosted :(">Ghosted</option>
          <option value="Pending...">Pending</option>
        </select>

        <input
          placeholder="Notes, extras, etc."
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default Input;
