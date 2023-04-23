const BASE_URL = "http://124.223.53.120:8088";

const RULES = {
  login_username: [
    { required: true, message: "请输入用户名" },
    { min: 1, max: 20, message: "长度应该1~20在个字符之间" },
  ],
  login_password: [
    { required: true, message: "请输入密码" },
    { min: 3, message: "长度应该大于3" },
  ],
  register_username: [
    { min: 1, max: 20, message: "长度应该1~20在个字符之间" },
    { required: true, message: "请输入用户名" },
  ],
  register_password: [
    { required: true, message: "请输入密码" },
    { min: 3, message: "长度应该大于3" },
  ],
  confirmPassword: [
    { required: true, message: "请输入确认密码" },
    { min: 3, message: "长度应该大于3" },
  ],
};

const MENU_CONFIG = {
  CREATE_TASK: "CREATE_TASK",
  MY_TASK: "MY_TASK",
  INQUIRE_TASK: "INQUIRE_TASK",
  PUBLIC_MANAGER: "PUBLIC_MANAGER",
  PUBLIC_CONNECTION: "PUBLIC_CONNECTION",
  SHARED_CONNECTION: "SHARED_CONNECTION",
};

export { BASE_URL, RULES, MENU_CONFIG };
