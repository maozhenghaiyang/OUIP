
export default {
  namespace: 'global',

  state: {
    // 全局 UI 状态
    ui: {
      mainMenu: false,
      sideMenu: false,
      taskBar: false,
    },
    notices: [],
  },

  effects: {
   
  },

  reducers: {
    trigger (state , action) {
     const ui = {...state.ui}      
     ui[action.trigger] = !state.ui[action.trigger]
      return  {
        ...state,
        ui: {
          ...ui,
        },
      };
  },
   reset(state) {
     return {
       ...state,
       ui: {
        sideMenu: false,
        taskBar: false,
        mainMenu: false,
       },
     }
   },
},
};
