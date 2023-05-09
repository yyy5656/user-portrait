import { Button, Select, Input, Form, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import styles from "@/styles/AddChar.module.scss";
import { useRef } from "react";

export default function DataGroup(props) {
	const { charData, selectProperty, setNounsGroups } = props;
		const formRef = useRef(null);

	const options = charData.map((item) => {
		return {
			value: `${item.name}:${selectProperty.linkId}`,
			label: item.name
		};
	});
	const handleSelectChange = (value, other) => {
		/* setSelectedItems(other.map((item) => item.linkId)); */
	};
	const onFinish = (value) => {
		const data = value.group.map((item) => {
			const propsData = item.data.split(":")
			return {name: item.name,value:propsData[0], linkId: propsData[1], linkType:selectProperty.linkType};
		});
		setNounsGroups(pre => [...pre, ...data]);
		formRef?.current.resetFields();
	};

	return (
		<>
			<Form
				ref={formRef}
				style={{
					maxWidth: 600,
				}}
				autoComplete="off"
				onFinish={onFinish}
			>
				<Form.List name="group">
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Space
									key={key}
									style={{
										display: "flex",
									}}
									align="baseline"
								>
									<Form.Item
										{...restField}
										label="分组名:"
										name={[name, "name"]}
										rules={[
											{
												required: true,
												message: "缺少分组名",
											},
										]}
									>
										<Input placeholder="请输入分组名" />
									</Form.Item>
									<Form.Item
										{...restField}
										label="选择属性"
										name={[name, "data"]}
										rules={[
											{
												required: true,
												message: "未选择属性",
											},
										]}
									>
										<Select
											style={{ width: 200 }}
											options={options}
											onChange={handleSelectChange}
										/>
									</Form.Item>
									<MinusCircleOutlined onClick={() => remove(name)} />
								</Space>
							))}
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => add()}
									icon={<PlusOutlined />}
								>
									添加分组
								</Button>
								<Button
									type="primary"
									htmlType="submit"
									disabled={!fields.length}
								>
									确认添加
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
			</Form>
		</>
	);
}
