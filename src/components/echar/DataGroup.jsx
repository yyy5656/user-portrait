import {
	Modal,
	Button,
	Select,
	Input,
	InputNumber,
	Checkbox,
	message,
} from "antd";
import styles from "@/styles/AddChar.module.scss";
import { useEffect, useRef, useState } from "react";

const CheckboxGroup = Checkbox.Group;

export default function DataGroup(props) {
	const { charData } = props;
	const [groupList, setGroupList] = useState([]);
	const [isChangeGroup, setIsChangeGroup] = useState(false);

	return (
		<>
			{!isChangeGroup ? (
				<div>
					当前分组：
					{charData.map((item, index) => (
						<span key={index} style={{ marginRight: "10px" }}>
							{item.name}
						</span>
					))}
				</div>
			) : (
				<div>
					当前分组：
					{groupList.map((item, index) => (
						<span key={index} style={{ marginRight: "10px" }}>
							{item.name}
						</span>
					))}
				</div>
			)}
			<div>
				<div>
					分组：
					<Button
						type="primary"
						onClick={() => {
							setGroupList([...groupList, {}]);
						}}
					>
						添加分组
					</Button>
				</div>
				{groupList &&
					groupList.map((item, index) => (
						<div className={styles.interval_group} key={index}>
							<Input
								placeholder="输入分组名"
								style={{ width: "130px", marginRight: "20px" }}
								onChange={(e) => {
									const newGourpList = [...groupList];
									newGourpList[index].name = e.target.value;
									setGroupList(newGourpList);
								}}
							/>
							<CheckboxGroup
								options={JSON.parse(JSON.stringify(props.charData)).map(
									(item) => ({
										value: item.value,
										label: item.name,
									})
								)}
								onChange={(value) => {
									console.log(value);
									const res = value.reduce((pre, cur) => pre + cur, 0);
									const newGourpList = [...groupList];
									newGourpList[index].value = res;
									setGroupList(newGourpList);
								}}
							/>
							<Button
								onClick={() => {
									setIsChangeGroup(true);
									props.changeCharListGroup(groupList);
									message.success("添加成功");
								}}
							>
								确认添加
							</Button>
							<Button
								onClick={() => {
									setIsChangeGroup(true);
									groupList.splice(index, 1);
									console.log(groupList);
									setGroupList(groupList);
									props.changeCharListGroup(groupList);
									message.success("删除成功");
								}}
							>
								删除分组
							</Button>
						</div>
					))}
			</div>
		</>
	);
}
