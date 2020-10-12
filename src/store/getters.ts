const getters = {
  // 公共
  common: (state: any) => {
    return {
      // 菜单栏显隐
      menuHidden: state.common.menuHidden,
      // 用户资料
      userInfo: state.common.userInfo,
      // 用户列表
      creatorList: state.common.creatorList,
    };
  },
};

// @ts-ignore
export default getters;
