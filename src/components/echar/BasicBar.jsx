import { CloseOutlined } from "@ant-design/icons";
import styles from "@/styles/BasicBar.module.scss";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { getCharOption } from "./constant";

export default function BasicBar(props) {
  console.log("123", props);
  const { name, property, type, data } = props.charOption;
  const dom = useRef();

  // const [myChart, setMyChart] = useState();

  useEffect(() => {
    let option = getCharOption(type, data, name, property[0].linkComment);
    console.log("123", option);
  }, []);

  useEffect(() => {
    const myChart = echarts.init(dom.current, null, {
      width: 500,
      height: 400,
    });
    let option = getCharOption(type, data, name, property[0].linkComment);
    console.log("123", option);
    option && myChart.setOption(option);
    return () => {
      option = null;
    };
  }, [dom.current]);

  return (
    <>
      <div className={styles.basicBar_container}>
        <div
          className={styles.cancel}
          onClick={() => {
            props.deleteViewChar(props.viewId);
          }}
        >
          <CloseOutlined />
        </div>
        <div>{name}</div>
        <div className={styles.basicBar} ref={dom}></div>
      </div>
    </>
  );
}
