import { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from "@/styles/PublicManager.module.scss";
import { Table, Space, Tag, message } from "antd";
import api from "@/utils/api";

export default function TaskAuthority(props) {
	//console.log(props);
	const { dataSource } = props;
	const columns = [
		{
			title: "任务名",
			dataIndex: "taskName",
			key: "taskName",
		},
		{
			title: "分享者",
			dataIndex: "userName",
			key: "userName",
		},
		{
			title: "被分享者",
			dataIndex: "sharedUsername",
			key: "sharedUsername",
		},
		{
			title: "权限",
			dataIndex: "authority",
			key: "authority",
			render: (_, tag, index) => (
				<Tag color={"geekblue"} key={index}>
					{tag.authority}
				</Tag>
			),
		},
		{
			title: "操作",
			key: "action",
			render: (_, record) => (
				<Space size="middle">
					<a
						onClick={() => {
							//console.log(record);
							const { shareId } = record;
							api.deleteShareById({ shareId }).then((res) => {
								message.success(res.data.msg);
							});
						}}
					>
						<CloseOutlined />
					</a>
				</Space>
			),
		},
	];

	return (
		<>
			<div className={styles.allTask_container}>
				<div className={styles.title}>指定可见任务详情</div>
				<Table columns={columns} dataSource={dataSource} />
			</div>
		</>
	);
}
