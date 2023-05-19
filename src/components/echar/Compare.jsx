import React, { useState } from "react";
import { Modal, Form, Input, Select, Space, Button } from "antd";
import { charTypeConfig } from "./constant";
import api from "@/utils/api";

export default function Compare(props) {
	const { isCompareOpen, setIsCompareOpen, charList, addViewChar } = props;

	const [selectedBarId, setSelectedBarId] = useState([]);

	const length = charList.filter((item) => item.viewId === isCompareOpen)[0]
		.data.xAxisData.length;
	const barList = charList.filter((item) => {
		return (
			item.type === charTypeConfig.bar &&
			item.viewId !== isCompareOpen &&
			item.data.xAxisData.length === length
		);
	});

	const onCancel = () => {
		setIsCompareOpen(0);
	};

	const onOK = (data) => {
		const currentBar = charList.filter(
			(item) => item.viewId === isCompareOpen
		)[0];
		const selectedBar = barList.map((item) => {
			if (selectedBarId.includes(item.viewId)) {
				return { ...item };
			}
		});
		selectedBar.unshift(currentBar);
		const newData = {
			name: data.charName,
			type: charTypeConfig.multiBar,
			property: [{ linkComment: "自定义" }],
			data: {
				xAxisData: currentBar.data.xAxisData,
				series: selectedBar.map((item) => ({
					name: item.name,
					data: item.data.yAxisData,
				})),
			},
		};
		api.insertViewInfo({ viewData: JSON.stringify(newData) }).then((res) => {
			const viewId = res.data.msg;
			addViewChar(newData, viewId);
		});
		setIsCompareOpen(0);
	};

	return (
		<>
			<Modal
				title="生成对比图"
				width={600}
				okText="生成"
				open={isCompareOpen === 0 ? false : true}
				cancelText="取消"
				destroyOnClose={true}
				onCancel={onCancel}
				footer={[]}
			>
				{barList.length === 0 ? (
					<div>当前无可对比的柱状图</div>
				) : (
					<>
						<Form
							name="propertyForm"
							autoComplete="off"
							onFinish={onOK}
							style={{ width: "100%" }}
						>
							<Space
								size={"small"}
								direction="vertical"
								style={{ width: "100%" }}
								wrap
							>
								<div>
									可选对比图:
									{barList.map((item) => (
										<span style={{ marginLeft: 10 }} key={item.viewId}>
											{item.name}
										</span>
									))}
								</div>
								<Form.Item
									label={"对比图表名称:"}
									name={"charName"}
									rules={[{ required: true, message: "缺少图表名称" }]}
								>
									<Input style={{ width: 150 }} />
								</Form.Item>
								<Form.Item
									label={"对比图表名称:"}
									name={"chars"}
									rules={[{ required: true, message: "未选择合并表" }]}
								>
									<Select
										mode="multiple"
										style={{ width: "auto", minWidth: 100 }}
										options={barList.map((item) => ({
											label: item.name,
											value: item.viewId,
										}))}
										index
										onChange={setSelectedBarId}
									/>
								</Form.Item>
								<Space
									style={{
										width: "100%",
										display: "flex",
										justifyContent: "flex-end",
									}}
								>
									<Button onClick={onCancel}>取消</Button>
									<Button
										disabled={!selectedBarId.length}
										htmlType="submit"
										type="primary"
									>
										生成
									</Button>
								</Space>
							</Space>
						</Form>
					</>
				)}
			</Modal>
		</>
	);
}
