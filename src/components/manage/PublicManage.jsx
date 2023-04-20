import { CloseOutlined } from "@ant-design/icons";
import styles from "@/styles/BasicBar.module.scss";
import { useEffect, useRef } from "react";

import AllTask  from "./AllTask";
import TaskAuthority from "./TaskAuthority";

export default function PublicManager(props) {
  console.log(props);

  return (
    <>
      <div>任务共享管理</div>
      <AllTask />
      <TaskAuthority />
    </>
  );
}
