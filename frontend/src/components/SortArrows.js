import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import styles from "../css/SortArrows.module.scss";
const SortArrows = ({ setSortMode, setSortDirection, sortMode }) => {
  return (
    <span className={styles.arrows}>
      {/* <div className={styles.arrows}> */}
      <FaCaretUp
        className={styles.arrow}
        onClick={() => {
          setSortMode(sortMode);
          setSortDirection(true);
        }}
      />
      <FaCaretDown
        className={styles.arrow}
        onClick={() => {
          setSortMode(sortMode);
          setSortDirection(false);
        }}
      />
      {/* </div> */}
    </span>
  );
};

export default SortArrows;
