import { useState, useEffect, Fragment } from "react";
import EditCompany from "./EditCompany";
const ListCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [sortMode, setSortMode] = useState("id");
  const [modalVisible, setModalVisible] = useState(-1);
  const [sortDirection, setSortDirection] = useState(true);
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
      const response = await fetch(`http://localhost:5000/companies/${id}`, {
        method: "DELETE",
      });
      getCompanies();
    } catch (err) {
      console.log(err.message);
    }
  };
  const editCompany = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/companies/${id}`, {
        method: "PUT",
      });
    } catch (err) {
      console.log(err.message);
    }
  };
  const getCompanies = async () => {
    try {
      const response = await fetch("http://localhost:5000/companies");
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
      <tr>
        <th>
          Entry
          <button
            onClick={() => {
              setSortMode("id");
              setSortDirection(true);
            }}
          >
            Up
          </button>
          <button
            onClick={() => {
              setSortMode("id");
              setSortDirection(false);
            }}
          >
            Down
          </button>
        </th>
        <th>
          Company Name
          <button
            onClick={() => {
              setSortMode("name");
              setSortDirection(true);
            }}
          >
            Up
          </button>
          <button
            onClick={() => {
              setSortMode("name");
              setSortDirection(false);
            }}
          >
            Down
          </button>
        </th>
        <th>
          Date Applied (current date by default)
          <button
            onClick={() => {
              setSortMode("applied");
              setSortDirection(true);
            }}
          >
            Up
          </button>
          <button
            onClick={() => {
              setSortMode("applied");
              setSortDirection(false);
            }}
          >
            Down
          </button>
        </th>
        <th>
          Date Replied (if applicable)
          <button
            onClick={() => {
              setSortMode("replied");
              setSortDirection(true);
            }}
          >
            Up
          </button>
          <button
            onClick={() => {
              setSortMode("replied");
              setSortDirection(false);
            }}
          >
            Down
          </button>
        </th>
        <th>
          Status
          <button
            onClick={() => {
              setSortMode("status");
              setSortDirection(true);
            }}
          >
            Up
          </button>
          <button
            onClick={() => {
              setSortMode("status");
              setSortDirection(false);
            }}
          >
            Down
          </button>
        </th>
        <th>
          Notes
          <button
            onClick={() => {
              setSortMode("notes");
              setSortDirection(true);
            }}
          >
            Up
          </button>
          <button
            onClick={() => {
              setSortMode("notes");
              setSortDirection(false);
            }}
          >
            Down
          </button>
        </th>
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
            <td>#{index + 1}</td>
            <td>{company.name ? company.name : "*No name given*"}</td>
            <td>{displayDate(company.applied)}</td>
            <td>{company.replied ? displayDate(company.replied) : "N/A"}</td>
            <td>{company.status}</td>
            <td>{company.notes}</td>
            <td>
              <button onClick={() => setModalVisible(index)}>Edit</button>
              <button onClick={() => deleteCompany(company.id)}>Delete</button>
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
            </td>
          </tr>
        ))}
    </>
  );
};

export default ListCompanies;
