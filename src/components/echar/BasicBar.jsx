import { CloseOutlined } from "@ant-design/icons";
import { Table } from "antd";
import styles from "@/styles/BasicBar.module.scss";
import * as echarts from "echarts";
import { useEffect, useMemo, useRef } from "react";
import { getCharOption } from "./constant";

export default function BasicBar(props) {
	const { name, property, type, data, status } = props.charOption;
	const dom = useRef();
	useEffect(() => {
		const myChart = echarts.init(dom.current, null, {
			width: 600,
			height: 400,
		});
		let option = getCharOption(type, data, name, property[0].linkComment);
		option && myChart.setOption(option);
		return () => {
			option = null;
		};
	}, [dom.current, data]);

	const columns = [
		...property.map((item) => ({
			title: item.linkComment,
			dataIndex: item.linkComment,
			key: item.linkComment,
		})),
		{ title: "数量", dataIndex: "value" },
	];

	//根据数据类型生成对应图表数据
	const tableData = useMemo(() => {
		if (Array.isArray(data)) {
			const tableData = data.map((item, idx) => ({
				[property[0].linkComment]: item.name,
				value: item.value,
				key: idx,
			}));
			return tableData;
		} else {
			return Object.values(data)[1].map((item, index) => {
				console.log(item);
				return {
					value: item,
					key: index,
					[property[0].linkComment]: data.xAxisData[index],
				};
			});
		}
	}, [data]);
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
				<div style={{ display: "flex" }}>
					<div className={styles.basicBar} ref={dom}></div>
					<Table
						bordered
						size="small"
						columns={columns}
						dataSource={tableData}
						pagination={{ hideOnSinglePage: true, defaultPageSize: 7 }}
					/>
				</div>
			</div>
		</>
	);
}
