import QS from "qs";
import HTTP, { SHAREDHTTP } from "@/service/request";
import { headers } from "../../next.config";

const api = {
  /**
   * 1.选择表项导入数据库
   * @param data
   * @returns {HTTP}
   */
  importProperty(data) {
    return HTTP({
      url: "/import/importProperty",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 2.获得表项
   * @param data
   * @returns {HTTP}
   */
  getProperty(data) {
    return HTTP({
      url: "/import/getProperty",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data,
    });
  },

  /**
   * 3.登录
   * @param data
   * @returns {HTTP}
   */
  login(data) {
    return HTTP({
      url: "/user/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 4.创建connection
   * @param data
   * @returns {HTTP}
   */
  createConnection(data) {
    return HTTP({
      url: "/user/createConnection",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 5.获取所有connection
   * @returns {HTTP}
   */
  getConnection() {
    return HTTP({
      url: "/user/getConnection",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },

  /**
   * 6.删除connection
   * @param data
   * @returns {HTTP}
   */
  deleteConnection(data) {
    return HTTP({
      url: "/user/deleteConnection",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        token: localStorage.getItem("token"),
      },
      data,
    });
  },

  /**
   * 7.选择表项和数据行导入数据库
   * @param data
   * @returns {HTTP}
   */
  importPropertyByLine(data) {
    return HTTP({
      url: "/import/importPropertyByLine",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 8.新增数据
   * @param data
   * @returns {HTTP}
   */
  import_addDataByLine(data) {
    return HTTP({
      url: "/import/addDataByLine",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 9.检查用户名是否重复
   * @param data
   * @returns {HTTP}
   */
  checkUsername(data) {
    return HTTP({
      url: "/user/checkUsername",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 10.注册
   * @param data
   * @returns {HTTP}
   */
  register(data) {
    return HTTP({
      url: "/user/register",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 11.选择connection获得token
   * @param data
   * @returns {HTTP}
   */
  chooseConnection(data) {
    return HTTP({
      url: "/user/chooseConnection",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 12.获得connection的属性
   * @returns {HTTP}
   */
  getLink() {
    return HTTP({
      url: "/import/getLink",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },

  /**
   * 13.删除属性
   * @param data
   * @returns {HTTP}
   */
  removeProperty(data) {
    return HTTP({
      url: "/import/removeProperty",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },

  /**
   * 14.创建小组
   * @param data
   * @returns {HTTP}
   */
  createGroup(data) {
    return HTTP({
      url: "/data/createGroup",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },

  /**
   * 15.获得connection的所有小组
   * @returns {HTTP}
   */
  getGroups() {
    return HTTP({
      url: "/data/getGroups",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },

  /**
   * 16.删除小组
   * @param data
   * @returns {HTTP}
   */
  deleteGroup(data) {
    return HTTP({
      url: "/data/deleteGroup",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 17.link属性获得对应全部数据
   * @param data
   * @returns {HTTP}
   */
  getDataByLinks(data) {
    return HTTP({
      url: "/data/getDataByLinks",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 18.获得全部数据
   * @returns {HTTP}
   */
  getAllData() {
    return HTTP({
      url: "/data/getAllData",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },

  getAllDataByPage(pagination) {
    return HTTP({
      url: "/data/getAllDataByPage",
      method: "POST",
      data: pagination,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },

  /**
   * 20.新增数据（属性）
   * @param data
   * @returns {HTTP}
   */
  addData(data) {
    return HTTP({
      url: "/import/addData",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },
  importMoreData(data) {
    return HTTP({
      url: "/import/importMoreData",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 21.处理名称数据分组
   * @param data
   * @returns {HTTP}
   */
  getNouns(data) {
    return HTTP({
      url: "/data/getNouns",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 22.转换：名词属性/数字属性
   * @param data
   * @returns {HTTP}
   */
  changeLinkType(data) {
    return HTTP({
      url: "/data/changeLinkType",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 23.处理数值属性分类
   * @param data
   * @returns {HTTP}
   */
  getNumerical(data) {
    return HTTP({
      url: "/data/getNumerical",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 24.根据属性分组拿到全部属性
   * @param data
   * @returns {HTTP}
   */
  getLinksByType(data) {
    return HTTP({
      url: "/data/getLinksByType",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 25.更新数据
   * @param data
   * @returns {HTTP}
   */
  updateData(data) {
    return HTTP({
      url: "/import/updateData",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 26.单行更新数据(数据格式来自接口获得全部数据)
   * @param data
   * @returns {HTTP}
   */
  updateDataById(data) {
    return HTTP({
      url: "/data/updateDataById",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 27.手动新增数据
   * @param data
   * @returns {*}
   */
  data_addDataByLine(data) {
    return HTTP({
      url: "/data/addDataByLine",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 28.删除单条数据
   * @param data
   * @returns {HTTP}
   */
  deleteDataById(data) {
    return HTTP({
      url: "/data/deleteDataById",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 29.根据属性模糊查询数据
   * @param data
   * @returns {*}
   */
  queryData(data) {
    return HTTP({
      url: "/data/queryData",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        token: localStorage.getItem("token"),
      },
      data,
    });
  },

  /**
   * ry的视图——新增视图数据
   * @param data
   * @returns {*}
   */
  insertViewInfo(data) {
    return HTTP({
      url: "/data/insertViewInfo",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * ry的视图——获得任务所有视图数据
   * @returns {*}
   */
  getViewInfo() {
    return HTTP({
      url: "/data/getViewInfo",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },
  share_getViewInfo() {
    return SHAREDHTTP({
      url: "/share/getViewInfo",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },
  getPublicViewInfo() {
    return SHAREDHTTP({
      url: "/share/getViewInfo",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },

  /**
   * ry的视图——更新指定视图数据
   * @param data
   * @returns {*}
   */
  updateViewInfo(data) {
    return HTTP({
      url: "/data/updateViewInfo",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * ry的视图——删除指定视图数据
   * @param data
   * @returns {*}
   */
  deleteViewInfo(data) {
    return HTTP({
      url: "/data/deleteViewInfo",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 2.1查询其他所有用户名
   * @param data
   * @returns {*}
   */
  getOtherAllUser() {
    return HTTP({
      url: "/share/getOtherALlUser",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },

  /**
   * 2.2共享设置
   * @param data
   * @returns {*}
   */
  changeConnectionType(data) {
    return HTTP({
      url: "/share/changeConnectionType",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 2.3根据共享类型获得任务
   * @param data
   * @returns {*}
   */
  getConnectionsByType(data) {
    return HTTP({
      url: "/share/getConnectionsByType",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 2.4查询所有指定用户设置
   * @param data
   * @returns {*}
   */
  getShareList(data) {
    return HTTP({
      url: "/share/getShareList",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 2.5删除指定用户共享
   * @param data
   * @returns {*}
   */
  deleteShareById(data) {
    return HTTP({
      url: "/share/deleteShareById",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 2.6查询公开的connection
   * @returns {*}
   */
  getPublicConnection() {
    return HTTP({
      url: "/share/getPublicConnection",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },

  /**
   * 2.6.1获取共享任务的token
   * @param data
   * @returns {*}
   */
  choosePublicConnection(data) {
    return HTTP({
      url: "/share/choosePubicConnection",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 2.7查询他人分享给自己的任务
   * @param data
   * @returns {*}
   */
  getSharedConnection(data) {
    return HTTP({
      url: "/share/getSharedConnection",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 2.8(共享)选择任务获得token
   * @param data
   * @returns {*}
   */
  share_chooseConnection(data) {
    return HTTP({
      url: "/share/chooseConnection",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  /**
   * 2.9(共享)查询任务的属性
   * @returns {*}
   */
  share_getLink() {
    return SHAREDHTTP({
      url: "/share/getLink",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },

  getNumericalScope(data) {
    return HTTP({
      url: "/data/getNumericalScope",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  getNounsAndNumerical(data) {
    return HTTP({
      url: "/data/getNounsAndNumerical",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data,
    });
  },

  getAddInfo() {
    return HTTP({
      url: "/import/getAddInfo",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    });
  },

  getPiePersent(data) {
    return HTTP({
      url: "/data/getPIEPercent",
      method: "post",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: { data },
    });
  },
};

export default api;
