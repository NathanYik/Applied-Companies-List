import { useState, useEffect, Fragment } from "react";
import EditCompany from "./EditCompany";
const ListCompanies = () => {
  const [companies, setCompanies] = useState([]);
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
      <h1>fsfs</h1>
      <tr>
        <th></th>
        <th>Company Name</th>
        <th>Date Applied (current date by default)</th>
        <th>Date Replied (if applicable)</th>
        <th>Status</th>
        <th>Notes</th>
      </tr>
      {companies.map((company, index) => (
        <tr key={company.id}>
          <td>#{index + 1}</td>
          <td>{company.name}</td>
          <td>{displayDate(company.applied)}</td>
          <td>{displayDate(company.replied)}</td>
          <td>{company.status}</td>
          <td>{company.notes}</td>
          <td>
            <EditCompany />
            <button onClick={() => deleteCompany(company.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ListCompanies;
