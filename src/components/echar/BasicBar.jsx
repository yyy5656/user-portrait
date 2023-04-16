import { Modal, Button, Select } from "antd";
import styles from "@/styles/BasicBar.module.scss";
import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import {
  transfromLinkToSelect,
  transfromSeleToList,
  getBasicBarData,
} from "@/utils/utils";
import { getCharOption } from "./constant";
import api from "@/utils/api";

export default function BasicBar(props) {
  console.log(props);
  const { name, property, type, data } = props.charOption;
  const dom = useRef();

  // const [myChart, setMyChart] = useState();

  useEffect(() => {
    const myChart = echarts.init(dom.current, null, {
      width: 500,
      height: 400,
    });
    const option = getCharOption(type, data, name, property[0].linkComment);
    console.log(option);
    option && myChart.setOption(option);
  }, [dom.current]);

  return (
    <>
      <div className={styles.basicBar_container}>
        <div>{name}</div>
        <div className={styles.basicBar} ref={dom}></div>
      </div>
    </>
  );
}
