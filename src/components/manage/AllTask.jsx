import { CloseOutlined } from "@ant-design/icons";
import styles from "@/styles/PublicManager.module.scss";
import { useEffect, useState } from "react";
import { Divider, Space, Tag, Empty, Modal, Select, message } from "antd";
import api from "@/utils/api";

export default function AllTask(props) {
  //console.log(props);
  const [allTaskList, setAllTaskList] = useState([]);
  const [publicTaskList, setPublicTaskList] = useState([]);
  const [orderTaskList, setOrderTaskList] = useState([]);

  // model用
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskInfo, setTaskInfo] = useState();
  const [taskType, setTaskType] = useState();
  const [userList, setUserList] = useState([]);
  const [sharedUserId, setSharedUserId] = useState();
  const [shareType, setSharedType] = useState();

  const taskTypeConfig = {
    all: "-1",
    public: "0",
    order: "1",
  };

  const handleFetch = (response, handleFn = () => {}) => {
    //console.log(response);
    if (
      response.status === 200 &&
      response.data.code === 200 &&
      response.data.data
    ) {
      return response.data.data;
    } else {
      handleFn();
      return response.data;
    }
  };

  const fetchData = () => {
    const fetchList = [
      {
        type: taskTypeConfig.all,
        handleRes: (value) => {
          //console.log(value);
          setAllTaskList(value);
        },
      },
      {
        type: taskTypeConfig.public,
        handleRes: (value) => setPublicTaskList(value),
      },
      {
        type: taskTypeConfig.order,
        handleRes: (value) => setOrderTaskList(value),
      },
    ];
    fetchList.map(async (item) => {
      item.handleRes(
        handleFetch(
          await api.getConnectionsByType({
            connectionType: item.type,
          })
        )
      );
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const fetchUserData = async () => {
        const res = await api.getOtherAllUser();
        const data = handleFetch(res);
        setUserList(data);
      };
      fetchUserData();
    }
  }, [isModalOpen]);
  useEffect(() => {
    fetchData();
  }, [props.dataSource.length]);

  const handleClick = (task) => {
    setTaskInfo(task);
    setIsModalOpen(true);
  };

  // modal用
  const handleOk = () => {
    setIsModalOpen(false);
    const params = {
      connectionId: taskInfo.connectionId,
      connectionType: taskType,
      shareInfo: {
        sharedUserId,
        shareType,
      },
    };
    api.changeConnectionType(params).then((res) => {
      message.success("设置成功");
      fetchData();
      if (taskType === taskTypeConfig.order) {
        props.fetchTableData();
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChange = (value) => {
    setTaskType(value);
  };

  return (
    <>
      <div className={styles.allTask_container}>
        <div className={styles.title}>所有任务</div>
        <Divider orientation="left">私有任务</Divider>
        <Space size={[0, 8]} wrap style={{ padding: "2px 10px" }}>
          {allTaskList?.length ? (
            allTaskList.map((item) => (
              <Tag
                style={{ cursor: "pointer" }}
                key={item.connectionId}
                onClick={() => {
                  handleClick(item);
                }}
              >
                {item.tableName}
              </Tag>
            ))
          ) : (
            <Empty imageStyle={{ width: "40px" }} />
          )}
        </Space>
        <Divider orientation="left">公开任务</Divider>
        <Space size={[0, 8]} wrap>
          {publicTaskList?.length ? (
            publicTaskList.map((item) => (
              <Tag
                key={item.connectionId}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleClick(item);
                }}
              >
                {item.tableName}
              </Tag>
            ))
          ) : (
            <Empty description="没有数据" />
          )}
        </Space>
        <Divider orientation="left">指定可见任务</Divider>
        <Space size={[0, 8]} wrap>
          {orderTaskList?.length ? (
            orderTaskList.map((item) => (
              <Tag
                key={item.connectionId}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleClick(item);
                }}
              >
                {item.tableName}
              </Tag>
            ))
          ) : (
            <Empty description="没有数据" />
          )}
        </Space>
      </div>
      <Modal
        title="共享设置"
        width={300}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <div>任务名： {taskInfo?.tableName}</div>
        <div className={styles.modal_container}>
          <span>类别</span>：
          <Select
            defaultValue={
              taskInfo?.connectionType == -1
                ? "私有"
                : taskInfo?.connectionType == 0
                ? "公开"
                : "指定可见"
            }
            style={{ width: 120 }}
            onChange={handleChange}
            options={[
              { value: "-1", label: "私有" },
              { value: "0", label: "公开" },
              { value: "1", label: "指定可见" },
            ]}
          />
        </div>
        {taskType === taskTypeConfig.order ? (
          <>
            <div className={styles.modal_container}>
              <span>指定用户：</span>
              <Select
                style={{ width: 120 }}
                onChange={(value) => {
                  console.log(value);
                  setSharedUserId(value);
                }}
                options={userList?.map((item) => ({
                  label: item.username,
                  value: item.userId,
                }))}
              />
            </div>
            <div className={styles.modal_container}>
              <span>用户权限：</span>
              <Select
                style={{ width: 120 }}
                onChange={(value) => {
                  setSharedType(value);
                }}
                options={[
                  { value: "0", label: "只读" },
                  { value: "1", label: "修改视图" },
                ]}
              />
            </div>
          </>
        ) : null}
      </Modal>
    </>
  );
}
