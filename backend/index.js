const express = require("express");
const app = express();
const pool = require("./db");
const cors = require("cors");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.post("/companies", async (req, res) => {
  try {
    const { name, applied, replied, status, notes } = req.body;
    const newCompany = await pool.query(
      "INSERT INTO companies (name, applied, replied, status, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, applied, replied, status, notes]
    );
    res.json(newCompany.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get("/companies", async (req, res) => {
  try {
    const allCompanies = await pool.query("SELECT * FROM companies");
    res.json(allCompanies.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.get("/companies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const companies = await pool.query(
      "SELECT * FROM companies WHERE (id = $1)",
      [id]
    );

    res.json(companies.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.put("/companies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, applied, replied, status, notes } = req.body;
    const updateCompany = await pool.query(
      "UPDATE companies set name = $1, applied = $2, replied = $3, status = $4, notes = $5 WHERE id = $6",
      [name, applied, replied, status, notes]
    );

    res.json(updateCompany.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.delete("/companies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCompany = await pool.query(
      "DELETE FROM companies WHERE id = $1",
      [id]
    );
    res.send("YAY done");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
