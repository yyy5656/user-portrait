import { Form, Button, Select, Space, Input } from "antd";
import { MinusCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { useEffect, useMemo } from "react";

export default function Composition(props) {
	const {
		nounsGroups,
		numsGroups,
		setSelectedGroups,
		confirmed,
		setConfirmed,
		uniqueLinks,
	} = props;

	const [form] = Form.useForm();

	const options = useMemo(() => {
		let idx = -1;
		return uniqueLinks.map((item) => {
			return {
				label: item.name,
				options: [...nounsGroups, ...numsGroups]
					.filter((obj) => obj.linkId === item.linkId)
					.map((item, index) => {
						idx++;
						return {
							label: item.name,
							value: idx,
							title: item.linkType,
						};
					}),
			};
		});
	}, [uniqueLinks])

	const onFinish = (data) => {
		const reqData = data.selectedGroups.map((item) => {
			const mapedData = item.data.map((elem) => {
				if (elem.title == 1) {
					return { ...nounsGroups[elem.value], name: elem.label };
				}
				if (elem.title == 0) {
					return { ...nounsGroups.concat(numsGroups)[elem.value], name: elem.label };
				}
			});
			return { name: item.groupName || "", data: mapedData };
		});
		setConfirmed(true);
		setSelectedGroups(reqData);
	};

	useEffect(() => {
		const originData = form.getFieldsValue().selectedGroups;
		if (!originData) return;
		if (!nounsGroups.length && !numsGroups.length) {
			form.resetFields();
			return;
		}
		//重置分组组合中的选项
		form.setFieldValue(
			"selectedGroups",
			originData.map((item) => ({ ...item, data: [] }))
		);
	}, [numsGroups, nounsGroups]);

		return (
			<Form
				name="groups"
				form={form}
				onFinish={onFinish}
				style={{ minHeight: "115px" }}
			>
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
										name={[name, "groupName"]}
										label={`组合名称`}
										rules={[
											{
												required: true,
												message: "未输入组合名称",
											},
										]}
									>
										<Input style={{ width: 100 }} />
									</Form.Item>
									<Form.Item
										{...restField}
										label={`分组组合${CompositionIdx + 1}`}
										name={[name, "data"]}
									>
										<Select
											mode="multiple"
											labelInValue
											style={{ width: 250 }}
											disabled={confirmed}
											notFoundContent={
												<Space align="center">
													<WarningOutlined />
													未添加分组
												</Space>
											}
											options={options}
										/>
									</Form.Item>
									{!confirmed && (
										<MinusCircleOutlined onClick={() => remove(name)} />
									)}
								</Space>
							))}
							<Space>
								<Button
									disabled={
										(!nounsGroups.length && !numsGroups.length) || confirmed
									}
									onClick={() => add()}
								>
									新增分组
								</Button>
								{
									<Button
										htmlType="submit"
										type="primary"
										disabled={!fields.length || confirmed}
									>
										锁定
									</Button>
								}
							</Space>
						</>
					)}
				</Form.List>
			</Form>
		);
}
