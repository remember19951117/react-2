import * as fetchs from '../utils/fetch';

// 用户登录地址
export async function login(params){
  var data2={
    "mobile":params.username,
    "password":params.password
  }
 
  return fetchs.creat_Token(fetchs.APIHost + "/login", fetchs.getAuth("/login",params.username,params.password),JSON.stringify(data2)).then(response => response.json())
    .then(json => {
      console.log(json)
      return json
    });  
}
//用户注册
export async function reg(params) {
  
  return fetchs.creat_Token(fetchs.APIHost + "/reg", fetchs.getAuth("/reg"), JSON.stringify(params)).then(response => response.json())
    .then(json => {
      return json
    });
}
//获取用户个人信息
export async function getuserinfo() {
  return fetchs.read_Token(fetchs.APIHost + '/user/get', fetchs.getAuth('/user/get')).then(response => response.json())
    .then(json => {
      console.log()
      return json
    });
}
//发送验证码
export async function smscode(params) {
  return fetchs.creat_Token(fetchs.APIHost + '/smscode', fetchs.getAuth('/smscode'), JSON.stringify(params)).then(response => response.json())
    .then(json => {
      console.log()
      return json
    });
}
//修改密码
export async function change(params) {
  return fetchs.creat_Token(fetchs.APIHost + '/user/put', fetchs.getAuth('/user/put'), JSON.stringify(params)).then(response => response.json())
    .then(json => {
      console.log()
      return json
    });
}
//商家申请
export async function mssq(params) {
  return fetchs.read_Token(fetchs.APIHost + '/user/toshop', fetchs.getAuth('/user/toshop')).then(response => response.json())
    .then(json => {
      console.log("商家",json)
      return json
    });
   
}

//获取城市列表
export async function getProvinceLists(params) {
  // if (!params.page) { params.page = 1 }
  // if (!params.limit) { params.limit = 10 }
  return fetchs.read_Token(fetchs.APIHost + "/province", fetchs.getAuth("/province")).then(response => response.json())
    .then(json => { return json });
    
}
//获取分类列表
export async function getClassLists(params) {
  // if (!params.page) { params.page = 1 }
  // if (!params.limit) { params.limit = 10 }
  return fetchs.read_Token(fetchs.APIHost + "/goods/cate", fetchs.getAuth("/goods/cate")).then(response => response.json())
    .then(json => { return json });
}
//添加商品
export async function addshop(params) {
  return fetchs.creat_Token(fetchs.APIHost + '/goods/create', fetchs.getAuth('/goods/create'), JSON.stringify(params)).then(response => response.json())
    .then(json => {
      console.log()
      return json
    });
}
//货币转换
export async function changehuobi(params) {
  return fetchs.creat_Token(fetchs.APIHost + '/candy/buy', fetchs.getAuth('/candy/buy'), JSON.stringify(params)).then(response => response.json())
    .then(json => {
      console.log()
      return json
    });
}
//交易大厅出售糖果币
export async function saletg(params) {
  return fetchs.creat_Token(fetchs.APIHost + '/user/sell', fetchs.getAuth('/user/sell'), JSON.stringify(params)).then(response => response.json())
    .then(json => {
      console.log()
      return json
    });
}


// // 获取公告列表
// export async function  getNotice(params) {
//   if(!params.page){params.page=1}
//   if(!params.limit){params.limit=10}
//   return fetchs.read_Token(fetchs.APIHost+"/message/index?page="+params.page+"&limit="+params.limit,fetchs.getAuth("/index.php/message/index")).then(response => response.json())
//     .then(json => {return json});
// }

// // 获取出售列表
// export async function  getSellList(params) {
//   if(!params.page){params.page=1}
//   if(!params.limit){params.limit=10}
//   if(!params.status){params.status=0}
//   return fetchs.read_Token(fetchs.APIHost+"/sell/index?page="+params.page+"&limit="+params.limit+"&status="+params.status,fetchs.getAuth("/index.php/message/index")).then(response => response.json())
//     .then(json => {return json});
// }

// // 出售商品
// export async function  sell(params) {
//   return fetchs.creat_Token(fetchs.APIHost+"/sell/add",fetchs.getAuth("/index.php/message/index"),JSON.stringify(params)).then(response => response.json())
//     .then(json => {return json});
// }
