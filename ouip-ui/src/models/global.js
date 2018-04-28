
const defaultMenus = [[],[],[],[]];

const defaultSelectMenus = [];

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
                  name: '子菜单1功能码很长很长',
                  action: 'https://cn.bing.com/',
                },
              },
              {
                id: 21,
                name: '子菜单21',
                sequence: 2,
                childrens: [
                  {
                    id: 211,
                    name: '子菜单211',
                    sequence: 1,
                    function: {
                      id: 211,
                      code: 'OUIP0211',
                      name: '子菜单211功能码很长很长',
                      action: 'https://cn.bing.com/',
                    },
                  },
                ],
              },
            ],
          }, {
            id: 3,
            name: '菜单2',
            sequence: 2,
            childrens: [
              {
                id: 4,
                name: '子菜单2',
                sequence: 1,
                function: {
                  id: 2,
                  code: 'OUIP0002',
                  name: '子菜单2功能码',
                  action: 'https://cn.bing.com/',
                },
              },
            ],
          }, {
            id: 4,
            name: '菜单3',
            sequence: 3,
            function: {
              id: 2,
              code: 'OUIP0002',
              name: '子菜单2功能码非常非常的长',
              action: 'http://localhost:8000/index1.html',
            },
          }, {
            id: 5,
            name: '菜单4',
            sequence: 4,
            function: {
              id: 3,
              code: 'OUIP0003',
              name: '子菜单3功能码',
              action: 'http://webo.com',
            },
          },
        ],
      },
    },
    menus: defaultMenus,
    selectMenus: [],
    activeFunction: '9999',
    functions: [
      {
        id: 9999,
        code: 'OUIP9999',
        name: '首页',
        action: 'http://projects.spring.io/spring-cloud/',
        closable: false,
      },
    ],
    faqMenus: [
      {
        id: 5,
        name: '这是一个非常非常长非常长的菜单啊非常的长',
        sequence: 5,
        function: {
          id: 3,
          code: 'OUIP0003',
          name: '子菜单3功能码',
          action: 'http://www.baidu.com/',
        },
      },
      {
        id: 6,
        name: '常用菜单2',
        sequence: 6,
        function: {
          id: 4,
          code: 'OUIP0004',
          name: '子菜单4功能码',
          action: 'http://www.baidu.com/',
        },
      },
    ],
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
        menus: defaultMenus,
        selectMenus: defaultSelectMenus,
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
        menus: defaultMenus,
        selectMenus: defaultSelectMenus,
      };
    },
    hidden(state) {
      return {
        ...state,
        ui: {
          sideMenu: false,
          mainMenu: false,
        },
        menus: defaultMenus,
        selectMenus: defaultSelectMenus,
      }
    },
    openFunction(state, action) {
      const {functions} = state;
      if (functions.filter((f) => f.id === action.function.id).length > 0) {
        return {
          ...state,
          activeFunction: `${action.function.id}`,
          ui: {
            mainMenu: false,
          },
          menus: defaultMenus,
          selectMenus: defaultSelectMenus,
        }
      } else {
        functions.push({...action.function,closable: true});
        return {
          ...state,
          ui: {
            mainMenu: false,
          },
          menus: defaultMenus,
          selectMenus: defaultSelectMenus,
          functions,
          activeFunction: `${action.function.id}`,
        }
      }

    },
    closeFunction(state, action) {
      let lastIndex;
      let {activeFunction} = state;
      state.functions.forEach((f, i) => {
        if (action.id === `${f.id}`) {
          lastIndex = i - 1;
        }
      });
      const functions = state.functions.filter((f) => `${f.id}`  !== action.id);
      if(`${state.activeFunction}` === action.id) {
         if(lastIndex >= 0) {
          activeFunction = `${functions[lastIndex].id}`;
         } else {
          activeFunction = `${functions[0].id}`;
         }
      }
      
      return {
        ...state,
        ui: {
          mainMenu: false,
        },
        menus: defaultMenus,
        selectMenus: defaultSelectMenus,
        functions,
        activeFunction,
      }
    },
    activeFunction(state, action) {
      return {
        ...state,
        activeFunction: action.id,
      }
    },
    selectMenu(state, action) {
      const {select,level} = action
      
      const newMenus = state.menus.map((menus,index)=> {
        if(index < level) {
          return menus;
        } else {
          return index === level ? select.childrens: []
        }
      } );
      const newSelectMenus = state.selectMenus.filter((m,index)=>index<level)
      newSelectMenus.push(select.id);
      return {
        ...state,
        menus: newMenus,
        selectMenus: newSelectMenus,
      }
    },
  },
};
