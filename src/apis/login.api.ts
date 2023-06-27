const result = {
  userInfo: {
    id: 'eb3aAF4e-ADCC-e974-1eF4-A0F23c0f92Cc',
    account: 'aman',
    name: '阿满',
    avatar: 'http://aman-blog-oss.oss-cn-beijing.aliyuncs.com/2022-8-5/20190927103132_ZPTkU-2a8f20438489e4068a057f5e0f5458c0.jpeg',
  },
  access: [0, 1, 2, 3],
  token: '0ACdd3EF-E9DA-81d1-4eD8-Ccb6ed6d4f5e',
}
function login(param: Access.LoginParam): Promise<typeof result> {
  return post<typeof result>('/login', param)
}
function status(param: Access.StatusParam) {
  return get<typeof result>('/status', param)
}
export const loginApi = {
  login,
  status,
}
