import { Modal, Button, Select, Input, Checkbox, message } from "antd";
import styles from "@/styles/AddChar.module.scss";
import { useEffect, useState } from "react";


export default function DataGroup(props) {
	const { charData, selectProperty, setGroupData, groupData } = props;
	const options = charData.map((item) => ({ value: item.name + "" }));
	const handleSelectChange = (value) => {
		const newGroup = {
			linkId: selectProperty.linkId,
			value: value,
			linkType: selectProperty.linkType,
		};
		setGroupData((pre) => ({ ...pre, [selectProperty.linkId]: newGroup }));
	};

	return (
		<>
			<div className={styles.interval_group}>
				{charData.length && (
					<Select
						style={{ width: 100 }}
						options={options}
						onChange={handleSelectChange}
					/>
				)}
			</div>
		</>
	);
}
