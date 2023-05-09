import { Form, Button, Divider, Select, Space, Input } from "antd";
import { MinusCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function Composition(props) {
	const { nounsGroups, numsGroups, setSelectedGroups } = props;

	const [confirmed, setconfirmed] = useState(false);
	const [form] = Form.useForm();

	const onFinish = (data) => {
		const reqData = data.selectedGroups.map((item) => {
			const mapedData = item.data.map((elem) => {
				if (elem.title == 1) {
					return { ...nounsGroups[elem.value], name: elem.label };
				}
				if (elem.title == 0) {
					return { ...numsGroups[elem.value], name: elem.label };
				}
			});
			return { name: item.name || "", data: mapedData };
		});
		setSelectedGroups(reqData);
	};

	return (
		<Form name="groups" form={form} onFinish={onFinish}>
			<Divider />
			<Form.List name="selectedGroups">
				{(fields, { add, remove }) => (
					<>
						{fields.map(({ key, name, ...restField }, CompositionIdx) => (
							<Space
								key={key}
								style={{
									display: "flex",
								}}
								align="baseline"
							>
								<Form.Item
									{...restField}
									name={[name, "name"]}
									label={`组合名称`}
								>
									<Input style={{ width: 100 }} />
								</Form.Item>
								<Form.Item
									{...restField}
									label={`分组组合${CompositionIdx + 1}`}
									name={[name, "data"]}
									rules={[
										{
											required: true,
											message: "未选择属性",
										},
									]}
								>
									<Select
										mode="multiple"
										labelInValue
										style={{ width: 300 }}
										disabled={confirmed}
										notFoundContent={
											<Space align="center">
												<WarningOutlined />
												未添加分组
											</Space>
										}
										options={[...nounsGroups, ...numsGroups].map(
											(item, index) => {
												return {
													label: item.name,
													value: index,
													title: item.linkType,
												};
											}
										)}
									/>
								</Form.Item>
								<MinusCircleOutlined onClick={() => remove(name)} />
							</Space>
						))}
						<Space>
							<Button onClick={() => add()}>新增组合</Button>
							<Button
								htmlType="submit"
								disabled={!fields.length}
								onClick={() => setconfirmed(true)}
							>
								确认
							</Button>
						</Space>
					</>
				)}
			</Form.List>
		</Form>
	);
}
