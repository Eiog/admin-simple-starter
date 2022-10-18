const login = (param: Access.LoginParam) => {
  return post<Access.StatusResult>('/login', param);
};
const status = (param: Access.StatusParam) => {
  return post<Access.StatusResult>('/login/status', param);
};
export const loginApi = {
  login,
  status,
};
