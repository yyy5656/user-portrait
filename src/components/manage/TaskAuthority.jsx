import { useEffect, useRef } from "react";
import { CloseOutlined } from "@ant-design/icons";
import styles from "@/styles/PublicManager.module.scss";
import { Table, Space, Tag } from "antd";

export default function TaskAuthority(props) {
  console.log(props);
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
      dataIndex: "shared",
      key: "shared",
    },
    {
      title: "权限",
      dataIndex: "authority",
      key: "authority",
      //   render: (_, tag) => (
      //     <Tag color={"geekblue"} key={tag}>
      //       {tag}
      //     </Tag>
      //   ),
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>
            <CloseOutlined />
          </a>
        </Space>
      ),
    },
  ];

  const dataSource = [
    {
      key: 1,
      taskName: "任务一",
      userName: "用户1",
      shared: "用户2",
      authority: "已读",
    },
    {
      key: 2,
      taskName: "任务二",
      userName: "用户1",
      shared: "用户2",
      authority: "已读",
    },
  ];

  return (
    <>
      <div className={styles.allTask_container}>
        <div className={styles.title}>指定可见详情</div>
        <Table columns={columns} dataSource={dataSource} />
      </div>
    </>
  );
}
