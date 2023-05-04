import { CloseOutlined } from "@ant-design/icons";
import styles from "@/styles/BasicBar.module.scss";
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
import { getCharOption } from "./constant";

export default function BasicBar(props) {
	const { name, property, type, data, status } = props.charOption;
	const dom = useRef();

	useEffect(() => {
		const myChart = echarts.init(dom.current, null, {
			width: 500,
			height: 400,
		});
		let option = getCharOption(type, data, name, property[0].linkComment);
		option && myChart.setOption(option);
		return () => {
			option = null;
		};
	}, [dom.current, data]);

	return (
		<>
			<div className={styles.basicBar_container}>
				<div
					className={styles.cancel}
					onClick={() => {
						props.changeStatus(props.index, status);
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
