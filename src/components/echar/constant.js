export const charTypeConfig = {
  pie: "PIE",
  bar: "BAR",
  line: "LINE",
};

// mock一些
export const charListData = [
  {
    name: "图表1",
    type: charTypeConfig.pie,
    property: [
      {
        connectionId: 18,
        linkComment: "性别",
        linkId: 72,
      },
    ],
    data: [
      { value: 200, name: "男" },
      { value: 735, name: "女" },
    ],
  },
];

export const charType = [
  {
    type: charTypeConfig.bar,
    value: charTypeConfig.bar,
    label: "柱状图",
  },
  {
    type: charTypeConfig.pie,
    value: charTypeConfig.pie,
    label: "饼状图",
  },
  {
    type: charTypeConfig.line,
    value: charTypeConfig.line,
    label: "折线图",
  },
];

export const getCharOption = (type, data, title, linkComment) => {
  switch (type) {
    case charTypeConfig.bar:
      return {
        title: {
          text: title,
          // subtext: "Fake Data",
          left: "center",
        },
        xAxis: {
          name: linkComment,
          type: "category",
          data: data.xAxisData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: data.yAxisData,
            type: "bar",
          },
        ],
      };
    case charTypeConfig.line:
      return {
        title: {
          text: title,
          // subtext: "Fake Data",
          left: "center",
        },
        xAxis: {
          name: linkComment,
          type: "category",
          data: data.xAxisData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: data.yAxisData,
            type: "line",
          },
        ],
      };
    case charTypeConfig.pie:
      return {
        title: {
          text: title,
          // subtext: "Fake Data",
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
            name: linkComment,
            type: "pie",
            radius: "50%",
            data: data,
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
  }
};
