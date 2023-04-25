import QS from "qs";
import HTTP from "@/service/request";

const api = {

  /**
   * 1. 选择表项导入数据库
   * @param data
   * @returns {HTTP}
   */
  importProperty(data){
    return HTTP({
      url: "/import/importProperty",
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    });
  },

  /**
   * 2. 获得表项
   * @param data
   * @returns {HTTP}
   */
  getProperty(data) {
    return HTTP({
      url:"/import/getProperty",
      method:"POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data,
    })
  },

  /**
   * 3. 登录
   * @param data
   * @returns {HTTP}
   */
  login(data){
    return HTTP({
      url:"/user/login",
      method:"POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },

  /**
   * 4. 创建connection
   * @param data
   * @returns {HTTP}
   */
  createConnection(data) {
    return HTTP({
      url:"/user/createConnection",
      method:"POST",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },

  /**
   * 5. 获取所有connection
   * @returns {HTTP}
   */
  getConnection() {
    return HTTP({
      url:"/user/getConnection",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      }
    })
  },

  /**
   * 6. 删除connection
   * @param data
   * @returns {HTTP}
   */
  deleteConnection(data) {
    return HTTP({
      url:"/user/deleteConnection",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },

  /**
   * 7. 选择表项和数据行导入数据库
   * @param data
   * @returns {HTTP}
   */
  importPropertyByLine(data) {
    return HTTP({
      url:"/import/importPropertyByLine",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },

  /**
   * 8. 新增数据
   * @param data
   * @returns {HTTP}
   */
  import_addDataByLine(data) {
    return HTTP({
      url:"/import/addDataByLine",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },

  /**
   * 9. 检查用户名是否重复
   * @param data
   * @returns {HTTP}
   */
  checkUsername(data) {
    return HTTP({
      url:"/user/checkUsername",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },

  /**
   * 10. 注册
   * @param data
   * @returns {HTTP}
   */
  register(data) {
    return HTTP({
      url:"/user/register",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },

  /**
   * 11. 选择connection获得token
   * @param data
   * @returns {HTTP}
   */
  chooseConnection(data) {
    return HTTP({
      url:"/user/chooseConnection",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },

  /**
   * 12. 获得connection的属性
   * @returns {HTTP}
   */
  getLink() {
    return HTTP({
      url:"/import/getLink",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      }
    })
  },

  /**
   * 13. 删除属性
   * @param data
   * @returns {HTTP}
   */
  removeProperty(data) {
    return HTTP({
      url:"/import/removeProperty",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      }
    })
  },

  /**
   * 14. 创建小组
   * @param data
   * @returns {HTTP}
   */
  createGroup(data){
    return HTTP({
      url:"/data/createGroup",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      }
    })
  },

  /**
   * 15. 获得connection的所有小组
   * @returns {HTTP}
   */
  getGroups(){
    return HTTP({
      url:"/data/getGroups",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      }
    })
  },

  /**
   * 16. 删除小组
   * @param data
   * @returns {HTTP}
   */
  deleteGroup(data){
    return HTTP({
      url:"/data/deleteGroup",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },

  /**
   * 17. link属性获得对应全部数据
   * @param data
   * @returns {HTTP}
   */
  getDataByLinks(data) {
    return HTTP({
      url:"/data/getDataByLinks",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },


  /**
   * 18. 获得全部数据
   * @returns {HTTP}
   */
  getAllData() {
    return HTTP({
      url:"/data/getAllData",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      }
    })
  },

  // /**
  //  * 查询后单条更新信息
  //  * @param data
  //  * @returns {HTTP}
  //  */
  // updateDataById(data){
  //     return HTTP({
  //         url:"/data/updateDataById",
  //         method:"POST",
  //         headers:{
  //             "Content-Type": "application/json;charset=UTF-8",
  //         },
  //         data
  //     })
  // },

  /**
   * 19. 新增数据（属性）
   * @param data
   * @returns {HTTP}
   */
  addData(data){
    return HTTP({
      url:"/import/addData",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },

  /**
   * 20. 处理名称数据分组
   * @param data
   * @returns {HTTP}
   */
  getNouns(data) {
    return HTTP({
      url:"/data/getNouns",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },

  /**
   * 21. 转换：名词属性/数字属性
   * @param data
   * @returns {HTTP}
   */
  changeLinkType(data){
    return HTTP({
      url:"/data/changeLinkType",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },

  /**
   * 22. 处理数值属性分类
   * @param data
   * @returns {HTTP}
   */
  getNumerical(data){
    return HTTP({
      url:"/data/getNumerical",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },

  /**
   * 23. 根据属性分组拿到全部属性
   * @param data
   * @returns {HTTP}
   */
  getLinksByType(data) {
    return HTTP({
      url:"/data/getLinksByType",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },

  /**
   * 24. 更新数据
   * @param data
   * @returns {HTTP}
   */
  updateData(data){
    return HTTP({
      url:"/import/updateData",
      method:"POST",
      headers:{
        "Content-Type": "application/json;charset=UTF-8",
      },
      data
    })
  },

  /**
   * 单行更新数据(数据格式来自接口获得全部数据)
   * @param data
   * @returns {HTTP}
   */
  updateDataById(data){
    //     return HTTP({
    //         url:"/import/updateDataById",
    //         method:"POST",
    //         headers:{
    //             "Content-Type":"application/json;charset=UTF-8"
    //         },
    //         data
    //     })
  },

  /**
   * 25. 手动新增数据
   * @param data
   * @returns {*}
   */
  data_addDataByLine(data){
    return HTTP({
      url:"/data/addDataByLine",
      method:"POST",
      headers:{
        "Content-Type":"application/json;charset=UTF-8"
      },
      data
    })
  },

  /**
   * 26. 删除单条数据
   * @param data
   * @returns {HTTP}
   */
  deleteDataById(data){
    return HTTP({
      url:"/data/deleteDataById",
      method:"POST",
      headers:{
        "Content-Type":"application/json;charset=UTF-8"
      },
      data
    })
  },

  /**
   * 根据属性模糊查询数据
   * @param data
   * @returns {*}
   */
  queryData(data){
    return HTTP({
      url:"/data/queryData",
      method:"POST",
      headers:{
        "Content-Type":"application/json;charset=UTF-8"
      },
      data
    })
  }

};

export default api;