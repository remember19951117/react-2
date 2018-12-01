import { login, getNotice, getSellList, getuserinfo} from '../services/user';
import {Toast} from 'antd-mobile';
export default {

  //空间对象名称
  namespace: 'user',
  //state 对象
  state: {
    user:{},
    notice:[],
    loading:false,
    sell:{},
    sellListPage:1,
  },

  //加载组件前执行的请求
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/') {
          dispatch({
            type: 'query',
            payload: location.query
          });
          dispatch({
            type: 'noticeList'
          });
          dispatch({
            type: 'sellList'
          });
        } else if (location.pathname === '/Mine'){
          dispatch({
            type: 'userinfo'
          });
        }
      })
    }
  },

  //远程请求信息
  effects: {
    *query({ payload }, {call, put}) {
      const data = yield call(login, payload?payload:{})
      if (data.code==1) {
        yield put({
          type: 'getUser',
          payload: {user: data.data}
        })
      }
    },
    // 公告列表
    *noticeList({ payload }, {call, put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(getNotice, payload?payload:{})
      if (data.code==1) {
        yield put({
          type: 'getUser',
          payload: {notice: data.data.data}
        })
      }
    },
    
    // 获取用户信息
     *userinfo({ payload }, { call, put }) {
      yield put({ type: 'showLoading' });
       const data = yield call(getuserinfo, payload ? payload : {})
      if (data.code == 1) {
        yield put({
          type: 'getUser',
          payload: { user: data.data }
        })
      }
    },
    *noticeList({ payload }, {call, put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(getNotice, payload?payload:{})
      if (data.code==1) {
        yield put({
          type: 'getUser',
          payload: {notice: data.data.data}
        })
      }
    },
    // 出售列表
    *sellList({ payload }, {call, put}) {
      let newPage;
      if (payload) {
        payload.page?newPage=payload.page:newPage=1;
      }
      Toast.loading("正在加载!",0);      
      yield put({ type: 'showLoading' });
      const data = yield call(getSellList, payload?payload:{})
      
      if (data.code==1) {
        yield put({
          type: 'getUser',
          payload: {
            sell: data.data,
            sellListPage:newPage
          }
        })
      }
      Toast.hide();
    },
    // 公告列表
    *sell({ payload }, {call, put}) {
      yield put({ type: 'showLoading' });
      const data = yield call(getNotice, payload?payload:{})
      if (data.code==1) {
        yield put({
          type: 'getUser',
          payload: {notice: data.data.data}
        })
      }
    },
  },

  //reducer 改变数据的唯一途径
  reducers: {
    getUser(state, action) {
      return { ...state, ...action.payload };
    },
    showLoading (state) {
      return { ...state, loading: true }
    },
    hideLoading (state) {
      return { ...state, loading: false }
    },
    typeNotes(state, action){
      //const {notes} = action.payload;
      return { ...state, ...action.payload };
    },
  },

};
