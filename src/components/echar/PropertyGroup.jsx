import { useEffect, useState } from "react";
import { Button, Modal, Select, Card, Tag, Space, Input } from "antd";
import api from "@/utils/api";
import styles from "@/styles/PropertyGroup.module.scss";
import { transfromSeleToList } from "@/utils/utils";

export default function PropertyGroup(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupData, setgroupData] = useState([]);
  // 新建group的分组名和选择属性
  const [groupName, setgroupName] = useState();
  const [selectGroupData, setSelectGroupData] = useState([]);

  const createGroup = () => {
    console.log(props);
    setIsModalOpen(true);
  };
  const deleteGroup = () => {
    // api.deleteGroup()
  };
  const handleOk = () => {
    setIsModalOpen(false);
    const fetchGroup = async (selectGroupData) => {
      await api
        .chooseConnection({ connectionId: selectGroupData[0].connectionId })
        .then((res) => {
        //   localStorage.setItem("token", res.data.data);
        });
      const res = await api.createGroup({
        groupName,
        groupLinks: selectGroupData,
      });
      console.log(res);
      await api.getGroups().then(res=>{
        setgroupData(res.data.data)
      })
    };
    fetchGroup(selectGroupData);
  };

  const handleChange = (value, option) => {
    console.log(value, option);
    console.log(transfromSeleToList(option));
    setSelectGroupData(transfromSeleToList(option));
  };

  useEffect(() => {
    api.getGroups().then((res) => {
      setgroupData(res.data.data);
    });
  }, []);

  return (
    <>
    <div style={{height:200}}>dsa</div>
      {/* <div className={styles.group_div}>
        <div className={styles.group_title}>
          <div>分组</div>
          <Button onClick={createGroup}>添加分组</Button>
          <Button onClick={deleteGroup}>删除分组</Button>
        </div>

        <Modal
          title={"创建分组"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={() => {
            setgroupName('');
            setSelectGroupData([])
            setIsModalOpen(false);
          }}
          okText="创建"
          cancelText="取消"
          okButtonProps={{ disabled: !groupName && selectGroupData.length > 0 }}
        >
          <span>分组名：</span>
          <Input
            placeholder="Basic usage"
            style={{ width: "80%", margin: "10px 0 0 10px" }}
            onChange={(e) => {
              setgroupName(e.target.value);
            }}
          />
          <div>
            选择属性：
            <Select
              mode="multiple"
              allowClear
              style={{ width: "80%", marginTop: "20px" }}
              placeholder="Please select"
              onChange={handleChange}
              options={transfromLinkToSelect(props.linkList)}
            />
          </div>
        </Modal>


        <Modal
          title={"创建分组"}
          open={isModalOpen}
          style={{ width: "340px" }}
          onOk={handleOk}
          onCancel={() => {
            setgroupName('');
            setSelectGroupData([])
            setIsModalOpen(false);
          }}
          okText="创建"
          cancelText="取消"
          okButtonProps={{ disabled: !groupName && selectGroupData.length > 0 }}
        >
          <span>分组名：</span>
          <Input
            placeholder="Basic usage"
            style={{ width: "80%", margin: "10px 0 0 10px" }}
            onChange={(e) => {
              setgroupName(e.target.value);
            }}
          />
          <div>
            选择属性：
            <Select
              mode="multiple"
              allowClear
              style={{ width: "80%", marginTop: "20px" }}
              placeholder="Please select"
              onChange={handleChange}
              options={transfromLinkToSelect(props.linkList)}
            />
          </div>
        </Modal> */}

        {/* {groupData.length && groupData.map((item, index) => (
          <Card key={index} title={item.groupName}>
            <Space size={[0, 8]} wrap>
              {item.groupLinks.map((item, index) => (
                <Tag key={index}>{item.linkComment}</Tag>
              ))}
            </Space>
          </Card>
        ))} */}
      {/* </div> */}
    </>
  );
}
