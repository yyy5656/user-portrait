import { Button, Input, InputNumber, Form, Space } from "antd";
import styles from "@/styles/AddChar.module.scss";
import { useRef } from "react";

export default function IntervalDataGroup(props) {
	const { numberScope, setCurScope, curScope, selectProperty, setNumsGroups } =
		props;

	const formRef = useRef(null);

	const handleMinChange = (value) => {
		setCurScope((pre) => ({ ...pre, start: value }));
	};
	const handleMaxChange = (value) => {
		setCurScope((pre) => ({ ...pre, end: value }));
	};

	const onFinish = (data) => {
		setNumsGroups((pre) => [
			...pre,
			{
				linkId: selectProperty.linkId,
				start: data.min,
				end: data.max,
				name: data.name,
				linkType: selectProperty.linkType,
			},
		]);
		formRef.current?.resetFields();
	};

	return (
		<>
			{
				<div>
					<div>
						可选范围:{numberScope.min}~{numberScope.max}
					</div>
					<Form
						name="numsData"
						ref={formRef}
						autoComplete="off"
						onFinish={onFinish}
					>
						<Space
							style={{
								display: "flex",
							}}
							align="baseline"
						>
							<Form.Item
								name="name"
								label="标签名:"
								rules={[
									{
										required: true,
										message: "缺少标签名",
									},
								]}
							>
								<Input placeholder="请输入标签名" style={{ width: 120 }} />
							</Form.Item>
							<Form.Item label="最小值" name="min">
								<InputNumber
									style={{ width: 70 }}
									min={numberScope.min}
									max={curScope.max}
									onChange={handleMinChange}
								/>
							</Form.Item>
							<Form.Item label="最大值" name="max">
								<InputNumber
									style={{ width: 70 }}
									min={curScope.min}
									max={numberScope.max}
									onChange={handleMaxChange}
								/>
							</Form.Item>
						</Space>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								确认添加
							</Button>
						</Form.Item>
					</Form>
				</div>
			}
		</>
	);
}
