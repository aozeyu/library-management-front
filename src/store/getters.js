const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  nickName: state => state.user.nickName,
  permissionRoutes: state => state.permission.routes,
  permissions: state => state.user.permissions
}
export default getters
