import { CloseOutlined } from "@ant-design/icons";
import styles from "@/styles/BasicBar.module.scss";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { getCharOption } from "./constant";

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
        <div className={styles.cancel} onClick={()=>{
          props.deleteViewChar(props.viewId)
        }}><CloseOutlined /></div>
        <div>{name}</div>
        <div className={styles.basicBar} ref={dom}></div>
      </div>
    </>
  );
}
