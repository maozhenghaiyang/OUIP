export default {
  namespace : 'global',
  state : {
    // 全局 UI 状态
    ui: {
      mainMenu: false,
      sideMenu: false,
    },
    session: {
      user: {},
      menuTree: {
        menus: [
          {
            id: 1,
            name: '菜单1',
            sequence: 1,
            childrens: [
              {
                id: 2,
                name: '子菜单1',
                sequence: 1,
                function: {
                  id: 1,
                  code: 'OUIP0001',
                  name: '子菜单1功能码',
                  action: 'http://www.baidu.com',
                },
              },
            ],
          },
        ],
      },
    },
    menu: {
      mainMenus: [],
    },
    notices: [],
  },

  effects : {},

  reducers : {
    triggerMainMenu(state) {
      const ui = {
        ...state.ui,
        mainMenu: !state.ui.mainMenu,
        sideMenu: false,
      }
      return {
        ...state,
        ui: {
          ...ui,
        },
      };
    },
    triggerSideMenu(state) {
      const ui = {
        ...state.ui,
        sideMenu: !state.ui.sideMenu,
        mainMenu: false,
      }
      return {
        ...state,
        ui: {
          ...ui,
        },
      };
    },
    hidden(state) {
      return {
        ...state,
        ui: {
          sideMenu: false,
          mainMenu: false,
        },
      }
    },
  },
};
