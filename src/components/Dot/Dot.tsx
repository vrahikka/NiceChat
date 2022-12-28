import React from "react";
import styles from "./Dot.module.css";

interface Props {
  online: boolean;
}

const Dot: React.FC<Props> = ({ online }) => {
  return <div className={online ? styles.onlineDot : styles.offlineDot} />;
};

export default Dot;
