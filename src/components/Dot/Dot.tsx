import React from "react";
import styles from "./Dot.module.css";

interface Props {
  online: boolean;
}

const Dot: React.FC<Props> = ({ online }) => {
  return <div className={`${styles.dot} ${online ? styles.dot_online : styles.dot_offline}`} />;
};

export default Dot;
