import React from 'react';
import { HashRouter, Route, Switch} from 'dva/router';

import dynamic from 'dva/dynamic';
function RouterConfig({ history,app }) {
  
  const IndexPage = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/IndexPage'),
  });
  //注册
  const Reg = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/reg'),
  });
   // 购买msc
  //  const Buy = dynamic({
  //   app,
  //   models: () => [
  //     import('./models/example'),
  //   ],
  //   component: () => import('./routes/buy'),
  // });
  // 登录
  const Login = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/login'),
     });
      // 修改密码
      const ChgPWD = dynamic({
       app,
       models: () => [
         import('./models/example'),
       ],
       component: () => import('./routes/chgpwd'),
     });
     // 修改密码
      const Changeaddress = dynamic({
       app,
       models: () => [
         import('./models/example'),
       ],
       component: () => import('./routes/changeaddress'),
     });
  // //平台规则和简介
  // const About = dynamic({
  //   app,
  //   models: () => [
  //     import('./models/example'),
  //   ],
  //   component: () => import('./routes/about'),
  // });
  // //个人信息
  const Mine = dynamic({
    app,
    models: () => [
      import('./models/user'),
    ],
    component: () => import('./routes/mine'),
  });
  // //推广
  // const myQRCode = dynamic({
  //   app,
  //   models: () => [
  //     import('./models/example'),
  //   ],
  //   component: () => import('./routes/myQRCode'),
  // });
  //团队
  const Team = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/team'),
  });
  const Teamlists = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/Teamlists'),
  });
  
  const mineshop = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/mineshop'),
  });
  //收益
  const Profit = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/profit'),
  });
  //留言
  const liuyan = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/liuyan'),
  });
  
  const liuyanjilu = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/liuyanjilu'),
  });
  //收益记录
  // const ProfitLists = dynamic({
  //   app,
  //   models: () => [
  //     import('./models/example'),
  //   ],
  //   component: () => import('./routes/profitlists'),
  // });
  //糖果机记录
  const tgrecord = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/tgrecord'),
  });
  const tgearecord = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/tgearecord'),
  });
  const recordbuyuser = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/recordbuyuser'),
  });
  //币种转换
  const Change = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/change'),
  });
  //币种转换2
  const bzchange = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/bzchange'),
  });
  //二维码
  const Code = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/code'),
  });
  //支付成功页
  const shopresult = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/shopresult'),
  });
  //商家添加商品
  const Sjshop = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/sjaddshop'),
  });
  
  const sjShopLists = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/sjaddshoplists'),
  });

  
  const gerenmingxi = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/gerenmingxi'),
  });
  // //提现
  // const Withdraw = dynamic({
  //   app,
  //   models: () => [
  //     import('./models/example'),
  //   ],
  //   component: () => import('./routes/withdraw'),
  // });
  //交易记录
  const Record = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/record'),
  });
  const Record2 = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/dailijilu'),
  });
  
  const Setting = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/setting'),
  });
  //  //系统通知
  //  const Notice = dynamic({
  //   app,
  //   models: () => [
  //     import('./models/example'),
  //   ],
  //   component: () => import('./routes/notice'),
  // });
  //商城
  const ShopIndex = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/shopIndex'),
  });
  //类别
  const Classfy = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/classfy'),
  });
  //搜索结果
  const Come = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/come'),
  });
  //购物车
  const Cart = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/shopcar'),
  });

  //商城
  const GoodDetail = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/shopGoodDetail'),
  });
  //商城最终
  const ShopEnd = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/shopEnd'),
  });
  //个人设置（密码）
  const settingpsw = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/settingpsw'),
  });
  //个人设置（银行卡）
  const settingbank = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/settingbank'),
  });
  //个人设置（二级密码）
  const settingtwopsw = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/settingtwopsw'),
  });
  //个人设置（支付宝）
  const settingzfb = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/settingzfb'),
  });
  //个人设置（微信）
  const settingwx = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/settingwx'),
  });
  //个人设置（头像）
  const settingheaderimg = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/settingheaderimg'),
  });
  //代理记录
  const recordbuydl = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/recordbuydl'),
  });
  //商家订单记录
  
  const mineshoporder = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/mineshoporder'),
  });
  //代理管理

  const minedl = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/minedl'),
  });
  const minedlorder = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/minedlorder'),
  });
  
  const minedlcz = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/minedlcz'),
  });
  
  const userorderlists = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/userorderlists'),
  });
  
  const classfysearch = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/classfysearch'),
  });
  const xitong = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/xitong'),
  });
  const xitongid = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/xitongid'),
  });


  const comereg = dynamic({
    app,
    models: () => [
      import('./models/example'),
    ],
    component: () => import('./routes/comereg'),
  });
  return (
    <HashRouter >
      <Switch>
        <Route path="/comereg" exact component={comereg} />
      	<Route path="/" exact component={Login} />
        <Route path="/chgpwd" exact component={ChgPWD} />
        <Route path="/index" exact component={IndexPage} />
        <Route path="/ShopIndex" exact component={ShopIndex} />
        <Route path="/Team" exact component={Team} />
        <Route path="/Teamlists" exact component={Teamlists} />
        <Route path="/Profit" exact component={Profit} />
        {/* //<Route path="/Profitlists" exact component={ProfitLists} /> */}
        <Route path="/Mine" exact component={Mine} />
        
        <Route path="/settingbank" exact component={settingbank} />
        <Route path="/Change" exact component={Change} />
        <Route path="/bzchange" exact component={bzchange} />
        <Route path="/Reg" exact component={Reg} />
        <Route path="/Code" exact component={Code} />
        <Route path="/sjshop" exact component={Sjshop} />
        <Route path="/sjShopLists" exact component={sjShopLists} />
        <Route path="/gooddetail" exact component={GoodDetail} />
                      
        <Route path="/shopend" exact component={ShopEnd} />
        <Route path="/changeaddress" exact component={Changeaddress} />
        <Route path="/cart" exact component={Cart} />
        
        <Route path="/classfy" exact component={Classfy} />
        <Route path="/come" exact component={Come} />
        <Route path="/jilu" exact component={Record} />
        <Route path="/dailijilu" exact component={Record2} />
        <Route path="/recordbuyuser" exact component={recordbuyuser} />
        <Route path="/recordbuydl" exact component={recordbuydl} />
        <Route path="/tgrecord" exact component={tgrecord} />
        <Route path="/tgearecord" exact component={tgearecord} />
        <Route path="/setting" exact component={Setting} />
        <Route path="/settingpsw" exact component={settingpsw} />
        <Route path="/settingtwopsw" exact component={settingtwopsw} />
        <Route path="/settingzfb" exact component={settingzfb} />
        <Route path="/settingwx" exact component={settingwx} />
        <Route path="/settingheaderimg" exact component={settingheaderimg} />
        
        <Route path="/shopresult" exact component={shopresult} />
        <Route path="/liuyanjilu" exact component={liuyanjilu} />
        <Route path="/mineshop" exact component={mineshop} />
        <Route path="/mineshoporder" exact component={mineshoporder} />
        <Route path="/minedl" exact component={minedl} />
        <Route path="/liuyan" exact component={liuyan} />
        <Route path="/minedlorder" exact component={minedlorder} />
        <Route path="/minedlcz" exact component={minedlcz} />
        <Route path="/userorderlists" exact component={userorderlists} />
        
        <Route path="/gerenmingxi" exact component={gerenmingxi} />
        <Route path="/classfysearch" exact component={classfysearch} />
        <Route path="/xitong" exact component={xitong} />
        <Route path="/xitongid" exact component={xitongid} />
      </Switch>
    </HashRouter>
  );
}

export default RouterConfig;
