export const setUser = ({commit},user,userId)=>{
  commit("userStatus",user)
}
export const attachOrg = ({commit},attachOrg)=>{
  commit("attachOrg",attachOrg)
}
