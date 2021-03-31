import { useState, useEffect, Fragment } from "react";
import EditCompany from "./EditCompany";
import styles from "../css/ListCompanies.module.scss";
import SortArrows from "./SortArrows";
import { FaHeartBroken } from "react-icons/fa";
const ListCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [sortMode, setSortMode] = useState("id");
  const [modalVisible, setModalVisible] = useState(-1);
  const [sortDirection, setSortDirection] = useState(true);
  const [color, setColor] = useState();
  function findReplied(replied) {
    return replied ? (
      <td>{displayDate(replied)}</td>
    ) : (
      <td className={styles.notfound}>N/A</td>
    );
  }
  function findName(name) {
    return name ? (
      <td>{name}</td>
    ) : (
      <td className={styles.notfound}>No Name</td>
    );
  }
  function findColor(status) {
    switch (status) {
      case "Accepted":
        return <td className={styles.green}>{status}</td>;
      case "Rejected":
        return <td className={styles.red}>{status}</td>;
      case "Pending...":
        return <td className={styles.yellow}>{status}</td>;
      case "Ghosted":
        return (
          <td>
            <div className={styles.darkRed}>
              {status} <FaHeartBroken />
            </div>
          </td>
        );
    }
  }
  function displayDate(date) {
    if (date) {
      const year = date.substring(0, 4);
      let month = parseInt(date.substring(5, 7));
      let day = parseInt(date.substring(8, 10));
      let suffix = parseInt(date.substring(9, 10));
      switch (month) {
        case 1:
          month = "January";
          break;
        case 2:
          month = "February";
          break;
        case 3:
          month = "March";
          break;
        case 4:
          month = "April";
          break;
        case 5:
          month = "May";
          break;
        case 6:
          month = "June";
          break;
        case 7:
          month = "July";
          break;
        case 8:
          month = "August";
          break;
        case 9:
          month = "September";
          break;
        case 10:
          month = "October";
          break;
        case 11:
          month = "November";
          break;
        case 12:
          month = "December";
          break;
        default:
          break;
      }
      switch (suffix) {
        case 1:
          day < 9 || day > 19
            ? (day = day.toString() + "st")
            : (day = day.toString() + "th");
          break;
        case 2:
          day < 9 || day > 19
            ? (day = day.toString() + "nd")
            : (day = day.toString() + "th");
          break;
        case 3:
          day < 9 || day > 19
            ? (day = day.toString() + "rd")
            : (day = day.toString() + "th");
          break;
        default:
          day = day.toString() + "th";
          break;
      }
      return month + " " + day + ", " + year;
    }
  }
  const deleteCompany = async (id) => {
    try {
      const response = await fetch(`/companies/${id}`, {
        method: "DELETE",
      });
      getCompanies();
    } catch (err) {
      console.log(err.message);
    }
  };
  // const editCompany = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/companies/${id}`, {
  //       method: "PUT",
  //     });
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
  const getCompanies = async () => {
    try {
      const response = await fetch("/companies");
      const jsonData = await response.json();
      setCompanies(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getCompanies();
    return () => {};
  }, []);
  // console.log(companies);
  return (
    <>
      <h1>Companies</h1>
      <div>
        <table>
          <tr>
            <th>Entry</th>
            <th>
              <div className={styles.box}>
                Company Name
                <SortArrows
                  setSortMode={setSortMode}
                  setSortDirection={setSortDirection}
                  sortMode="name"
                />
              </div>
            </th>
            <th>
              <div className={styles.box}>
                Date Applied
                <SortArrows
                  setSortMode={setSortMode}
                  setSortDirection={setSortDirection}
                  sortMode="applied"
                />
              </div>
            </th>
            <th>
              <div className={styles.box}>
                Date Replied
                <SortArrows
                  setSortMode={setSortMode}
                  setSortDirection={setSortDirection}
                  sortMode="replied"
                />
              </div>
            </th>
            <th>
              <div className={styles.box}>
                Status
                <SortArrows
                  setSortMode={setSortMode}
                  setSortDirection={setSortDirection}
                  sortMode="status"
                />
              </div>
            </th>
            <th>
              <div className={styles.box}>
                Notes
                <SortArrows
                  setSortMode={setSortMode}
                  setSortDirection={setSortDirection}
                  sortMode="notes"
                />
              </div>
            </th>
            <th></th>
          </tr>
          {companies
            .sort((a, b) => {
              const first = a[sortMode] ? a[sortMode] : "zzzzzzz";
              const second = b[sortMode] ? b[sortMode] : "zzzzzzz";
              return first < second
                ? sortDirection
                  ? -1
                  : 1
                : sortDirection
                ? 1
                : -1;
            })
            .map((company, index) => (
              <tr key={company.id}>
                <td>{index + 1}</td>
                {findName(company.name)}
                <td>{displayDate(company.applied)}</td>
                {findReplied(company.replied)}
                {findColor(company.status)}
                <td>{company.notes}</td>
                <td>
                  <button
                    className={styles.ok}
                    onClick={() => setModalVisible(index)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.cancel}
                    onClick={() => deleteCompany(company.id)}
                  >
                    Delete
                  </button>
                </td>
                {modalVisible == index && (
                  <EditCompany
                    eid={company.id}
                    ename={company.name}
                    eapplied={company.applied}
                    ereplied={company.replied}
                    estatus={company.status}
                    enotes={company.notes}
                    setModalVisible={setModalVisible}
                  />
                )}
              </tr>
            ))}
        </table>
      </div>
    </>
  );
};

export default ListCompanies;
