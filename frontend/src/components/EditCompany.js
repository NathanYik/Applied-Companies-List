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
      const response = await fetch(`companies/${eid}`, {
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
      <form className={styles.input}>
        <h1 className={styles.title}>Edit Company</h1>
        <div className={styles.inputfield}>
          <label>Company Name</label>
          <input
            placeholder="Company Name"
            type="text"
            defaultValue={ename}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputfield}>
          <label>Status</label>
          <select
            name="status"
            id="status"
            onChange={(e) => setStatus(e.target.value)}
            defaultValue={estatus}
          >
            <option value="Pending...">Pending</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Ghosted">Ghosted</option>
          </select>
        </div>
        <div className={styles.inputfield}>
          <label>Date Applied (current date by default)</label>
          <input
            defaultValue={eapplied}
            type="date"
            onChange={(e) => setApplied(e.target.value)}
          />
        </div>
        <div className={styles.inputfield}>
          <label>Date Replied (if applicable)</label>
          <input
            defaultValue={ereplied}
            type="date"
            onChange={(e) => setReplied(e.target.value)}
          />
        </div>
        <div className={styles.text}>
          <label for="notes">Notes</label>
          <textarea
            defaultValue={enotes}
            placeholder="Notes, comments, extras, etc."
            name="notes"
            id="notes"
            cols="30"
            rows="10"
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <button className={styles.ok} onClick={() => onSubmit()}>
          Change
        </button>
        <button className={styles.cancel} onClick={() => setModalVisible(-1)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditCompany;
