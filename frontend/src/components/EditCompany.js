import styles from "../css/EditCompany.module.scss";
import { useState } from "react";
const EditCompany = ({
  eid,
  ename,
  eapplied,
  ereplied,
  estatus,
  enotes,
  setModalVisible,
}) => {
  const [editName, setName] = useState(ename);
  const [editApplied, setApplied] = useState(eapplied);
  const [editReplied, setReplied] = useState(ereplied);
  const [editStatus, setStatus] = useState(estatus);
  const [editNotes, setNotes] = useState(enotes);
  const onSubmit = async () => {
    const name = editName;
    const applied = editApplied;
    const replied = editReplied;
    const status = editStatus;
    const notes = editNotes;
    const body = { name, applied, replied, status, notes };
    console.log(body);
    try {
      const response = await fetch(`http://localhost:5000/companies/${eid}`, {
        method: "PUT",
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
    <div className={styles.popup}>
      <form>
        <input
          placeholder="Enter a company"
          defaultValue={ename}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          defaultValue={eapplied}
          onChange={(e) => setApplied(e.target.value)}
        />
        <input
          type="date"
          defaultValue={ereplied}
          onChange={(e) => setReplied(e.target.value)}
        />
        <select
          defaultValue={estatus}
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
          defaultValue={enotes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </form>
      <button onClick={() => onSubmit()}>Change</button>
      <button onClick={() => setModalVisible(-1)}>Close</button>
    </div>
  );
};

export default EditCompany;
