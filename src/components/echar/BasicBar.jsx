import { Modal, Button, Select } from "antd";
import styles from "@/styles/BasicBar.module.scss";
import * as echarts from "echarts";
import { useEffect, useRef, useState } from "react";
import {
  transfromLinkToSelect,
  transfromSeleToList,
  getBasicBarData,
} from "@/utils/utils";
import api from "@/utils/api";

export default function BasicBar(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPieModalOpen, setIsPieModalOpen] = useState(false);
  const [xOption, setXOption] = useState();
  const [yOption, setYOption] = useState();
  const [data, setData] = useState();
  const dom = useRef();

  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
      },
    ],
  };

  const pieOption = {
    title: {
      text: "Referer of a Website",
      subtext: "Fake Data",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  const [myChart, setMyChart] = useState();

  // let myChart = null;
  useEffect(() => {
    const myChart = echarts.init(dom.current, null, {
      width: 500,
      height: 400,
    });
    setMyChart(myChart);
    // option && myChart.setOption(option);
  }, [dom.current]);

  const handleOk = () => {
    api.getAllData().then((res) => {
      const basicData = getBasicBarData(res.data.data, xOption, yOption);
      const newOption = {};
      newOption.xAxis = {
        type: xOption,
        data: basicData.xAxis,
      };
      newOption.yAxis = {
        type: yOption,
      };
      newOption.series = {
        data: basicData.yAxis,
        type: "bar",
      };
      newOption && myChart.setOption(newOption);
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleXOptionChange = (value, option) => {
    setXOption(option);
    console.log(`selected ${value}`);
  };
  const handleYOptionChange = (value, option) => {
    setYOption(option);
  };
  const handlePieOk = () => {
    console.log(xOption, yOption);

    api
      .getDataByLinks({
        links: transfromSeleToList([xOption, yOption]),
      })
      .then((res) => {
        console.log(res.data.data);
        let yAxisWon = 0;
        let yAxisMan = 0;
        res.data.data.map((item) => {
          if (item[yOption.value] === "男") {
            yAxisMan++;
          } else {
            yAxisWon++;
          }
        });
        const newOption = {
          tooltip: {
            trigger: "item",
          },
          series: [
            {
              name: yOption.label,
              type: "pie",
              radius: "50%",
              data: [
                { value: yAxisMan, name: "男" },
                { value: yAxisWon, name: "女" },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };

        myChart && myChart.setOption(newOption);
      });
  };
  return (
    <>
      <div className={styles.basicBar_container}>
        <div className={styles.left}>
          <Button
            onClick={() => {
              setIsModalOpen(true);
              api.getAllData();
            }}
          >
            生成柱状图
          </Button>
          <Button
            style={{ marginTop: "20px" }}
            onClick={() => {
              setIsPieModalOpen(true);
              api.getAllData((res) => {
                console.log(res);
                setData(res.data.data);
              });
            }}
          >
            生成饼状图
          </Button>
        </div>

        <div className={styles.basicBar} ref={dom}></div>
      </div>

      <Modal
        title="生成柱状图"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="生成"
        cancelText="取消"
        width={400}
      >
        <div>
          横轴：
          <Select
            style={{ width: 200 }}
            onChange={handleXOptionChange}
            options={transfromLinkToSelect(props.linkList)}
          />
        </div>

        <div>
          数轴：
          <Select
            style={{ width: 200, marginTop: "20px" }}
            onChange={handleYOptionChange}
            options={transfromLinkToSelect(props.linkList)}
          />
        </div>
      </Modal>

      <Modal
        title="生成饼状图"
        open={isPieModalOpen}
        onOk={handlePieOk}
        onCancel={() => {
          setIsPieModalOpen(false);
        }}
        okText="生成"
        cancelText="取消"
        width={400}
      >
        <div>
          属性一：
          <Select
            style={{ width: 200 }}
            onChange={handleXOptionChange}
            options={transfromLinkToSelect(props.linkList)}
          />
        </div>

        <div>
          属性二：
          <Select
            style={{ width: 200, marginTop: "20px" }}
            onChange={handleYOptionChange}
            options={transfromLinkToSelect(props.linkList)}
          />
        </div>
      </Modal>
    </>
  );
}
