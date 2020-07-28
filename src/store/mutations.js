export const userStatus = (state ,user,userId) => {
    if (user || userId) {
      state.userName = user;
      state.isLogin = true;
      state.userId = userId;
      console.log('ssss',state);
    }else if (user == null) {
      //登出的时候，清空sessionStorage里的东西
      sessionStorage.setItem("userName",null);
      state.userName =null;
    }
}

export const attachOrg = (state ,attachOrg) => {
  if (attachOrg) {
    state.attachOrg = attachOrg;
    console.log('aaaaa',state.attachOrg);
  }else if (attachOrg == null) {
    localStorage.setItem("attachOrg",null);
    state.attachOrg =null;
  }
}
