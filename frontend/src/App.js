import styles from "./App.module.scss";
import Input from "./components/Input";
import ListCompanies from "./components/ListCompanies";

function App() {
  return (
    <div className={styles.App}>
      <Input />
      <ListCompanies />
    </div>
  );
}

export default App;
