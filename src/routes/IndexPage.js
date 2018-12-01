import React,{Component} from 'react';
// import { connect } from 'dva';
// import { routerRedux } from 'dva/router';
import { Modal, List, Button, WhiteSpace, WingBlank, Toast } from 'antd-mobile';
import iconStyle from "./styles/font.css";
import { NavBar } from "antd-mobile";
import * as fetchs from '../utils/fetch';
import Titleing from "../assets/images/title.png";
import tGimg1 from "../assets/images/1.png";
import tGimg2 from "../assets/images/2.png";
import tGimg3 from "../assets/images/3.png";
import tGimg4 from "../assets/images/4.png";
import tGimg5 from "../assets/images/5.png";

import store from "store";
// import PropTypes from 'prop-types';

// import { loggedIn } from '../utils/fetch';
// import { sell } from "../services/user";
import styles from './styles/IndexPage.css';
import { Carousel } from 'antd-mobile';
const operation = Modal.operation;
// @connect(state => ({
//   user: state.user
// }))
function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

export default class IndexPage extends Component {
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }
  constructor(props) {  
    super(props);  
    this.state = {
      data: ['1', '2', '3'],
      imgdata: [
        // { tGimg: tGimg1},
        // { tGimg: tGimg2 },
        // { tGimg: tGimg3 },
        // { tGimg: tGimg4 },
        // { tGimg: tGimg5 },
       ],
      modal1: true,
      imgHeight: 176,
      slideIndex: 0,
      ggdata:[]
    };
  }

  
  componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
    //请求阳国际数据
    fetchs.read_Token(fetchs.APIHost + '/candy/my', fetchs.getAuth("/candy/my")).then(response => response.json())
        .then(json => {
          ////console.log("json",json)
           this.setState({ imgdata :json.data})
    });
    //请求公告
    fetchs.read_Token(fetchs.APIHost + '/notice/list', fetchs.getAuth("/notice/list")).then(response => response.json())
      .then(json => {
        //console.log("公告", json)
        this.setState({ ggdata: json.data})
      });
    
  }
  buyTg(frist,index){
    //console.log(frist)
    const data ={
      type_id: frist,
      coin_id: 1,
    }
    //console.log("psot", data)
    fetchs.creat_Token(fetchs.APIHost + '/candy/buy', fetchs.getAuth("/candy/buy"), JSON.stringify(data)).then(response => response.json())
      .then(json => {
        //console.log("json", json)
        //this.setState({ imgdata: json.data })
    });
  }

 
 
  componentWillMount (){
    // const { dispatch } = this.props;
		// const user = loggedIn();
		// if(!user){
		// 	dispatch(routerRedux.push({pathname: '/login'}));
    // }
  }
  render(){
    const {
      history
    } = this.props;
    const that = this;
    var ggdata = this.state.ggdata ? this.state.ggdata:'';
    //console.log("this.state.imgdata", this.state.imgdata)
   return(
      <div className={styles.main}>
        <div>
            <style>
              {`
                .am-navbar-left {
                  padding-left: .4rem;
                }
                .am-navbar-light .am-navbar-title{
                  color:#ffffff;
                  font-size:0.34rem
                }
                // .am-list-header{
                //   height:.8rem;
                //   font-size:.32rem;
                // }
                // .am-list-item{
                //   height:0.9rem;
                // }
                .am-modal-button-group-v .am-modal-button{
                  height:0.9rem;
                  line-height:0.9rem;
                  font-size:.32rem;
                }
                .am-toast-text-info{
		                    font-size:.26rem;
		                    line-height:.52rem;
		                }
		                .am-toast-notice-content .am-toast-text.am-toast-text-icon {
		                    border-radius: .15rem;
		                    padding: .25rem .15rem ;
		                }
		                .am-toast-notice-content .am-toast-text{
                            width:1.5rem;
                            height:2rem;
                        }
                        .am-modal-transparent{
                          width:6rem;
                        }
                        .am-modal-title{
                          font-size:.36rem;
                        }
                        // .am-modal-content{
                        //   height:7.7rem;
                        // }
                        // .am-modal-body{
                        //   height:5.8rem;
                        // }
                        
              `}
            </style>
            {/*头部*/}
            <NavBar
              style={{ height: "7vh", background: "#00a3f0", color: "red" }}
              mode="light"
              icon={
                [<div key="123213">
                <span 
                  key={"11-5"}
                  className={iconStyle.iconfont} style={{ fontSize: "0.3rem", lineHeight: '7vh', marginRight: "0.1rem", color: "#FFFFFF" }}>
                    &#xe757;
                  </span>
                  <span 
                    key={"11-1"}
                  style={{ fontSize: "0.3rem", lineHeight: '7vh', color: "#FFFFFF" }} onClick={() => history.push("/tgearecord")}>释放记录</span>
                </div>
                ]
               }
                        


            rightContent={
              [<div key="123213">
                <span className={iconStyle.iconfont}
                style={{ fontSize: "0.3rem", lineHeight: '7vh', marginRight: "0.1rem", color: "#FFFFFF" }}
                key={"100"}
                >
                  &#xe757;
                </span>
                <span 
                key={"110"}
                style={{ fontSize: "0.3rem", lineHeight: '7vh', color: "#FFFFFF" }} onClick={() => history.push("/tgrecord")}>购买记录</span>
              </div>
              ]
            }
              >
              <span>
                 <img src={Titleing} style={{  marginRight: "0.2rem",marginTop: "0.1rem" }} alt=""></img>
              </span>
              <span>
              KR-糖果网
              </span>
            </NavBar>
        </div>
      {/*内容区*/}
      <div className={styles.banner}>
        <div className={styles.swiperBG}>
                
        </div>
         <div className={styles.content}>
           {
             this.state.imgdata.length > 0 ? <Carousel className="space-carousel"
               frameOverflow="visible"
               cellSpacing={10}
               slideWidth={0.8}
               infinite
               beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
               afterChange={index => this.setState({ slideIndex: index })}
             >
               {this.state.imgdata.map((val, index) => (

                 <a
                   key={index}
                   // href="http://www.alipay.com"
                   style={{
                     display: 'block',
                     position: 'relative',
                     top: this.state.slideIndex === index ? -10 : 0,
                     height: this.state.imgHeight,
                     height: "8rem",
                     background: "#FFFFFF"
                   }}
                 >
                   <div className={styles.swapTiele}>
                     {val.candym_type.type_name}
                   </div>
                   <div className={styles.swapImg}>
                     <img src={fetchs.APIHost + val.candym_type.candy_pic} alt="" />
                   </div>


                   {/* <img
                   src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                   alt=""
                   style={{ width: '100%', verticalAlign: 'top' }}
                   onLoad={() => {
                     // fire window resize event to change height
                     window.dispatchEvent(new Event('resize'));
                     this.setState({ imgHeight: 'auto' });
                   }}
                 />  */}
                   <div
                     className={styles.swapState}
                   //onClick={
                   //    () => operation([
                   //    { text: '请选择支付方式', onPress: () => //console.log('支付方式点击了') },
                   //    { text: 'kR币', onPress: () => {
                   //     // //console.log(this.state.slideIndex)
                   //      var type_id = this.state.slideIndex + 1;
                   //      const data = {
                   //        type_id: type_id,
                   //        coin_id: 1,
                   //      }
                   //      //console.log("psot", data)
                   //      fetchs.creat_Token(fetchs.APIHost + '/candy/buy', fetchs.getAuth("/candy/buy"), JSON.stringify(data)).then(response => response.json())
                   //        .then(json => {
                   //          //console.log("json", json)
                   //          //this.setState({ imgdata: json.data })
                   //          if (json.code == 1) {

                   //            Toast.success(json.msg, 2);

                   //          } else {
                   //            Toast.fail(json.msg, 2);
                   //          }
                   //        });

                   //    } },
                   //    { text: '回购币', onPress: () => {
                   //      var type_id = this.state.slideIndex + 1;
                   //      const data = {
                   //        type_id: type_id,
                   //        coin_id: 3,
                   //      }
                   //      //console.log("psot", data)
                   //      fetchs.creat_Token(fetchs.APIHost + '/candy/buy', fetchs.getAuth("/candy/buy"), JSON.stringify(data)).then(response => response.json())
                   //        .then(json => {
                   //          //console.log("json", json)
                   //          //this.setState({ imgdata: json.data })
                   //          if (json.code == 1) {

                   //            Toast.success(json.msg, 2);


                   //          } else {
                   //            Toast.fail(json.msg, 2);
                   //          }
                   //        });
                   //    }},
                   //  ])}
                     onClick={
                       () => history.push("/tgearecord?cmid=" + val.cm_id)
                     }
                   >
                     查看收益

                   </div>
                   <div className={styles.swapCL}>
                     <div className={styles.swapLeft}>
                       <p>剩余天数</p>
                       <p> {val.left_days}</p>
                     </div>
                     <div style={{ width: '2%', float: "left", textAlign: "center", fontSize: "0.4rem", lineHeight: "1.06rem", color: "#000000" }}>|</div>
                     <div className={styles.swapLeft}>
                       <p>产生糖果币</p>
                       <p>{val.candy_now}</p>
                     </div>

                   </div>
                 </a>
               ))}
             </Carousel>:<div className={styles.nobuy}>
                <h1>糖果机</h1>
                <p>你当前没有糖果机</p>
                 <button onClick={() => history.push("/Change")}>点击购买</button>
             </div>
           }
            
        </div>          
      </div>


       {/*底部*/}
        <div className={styles.nav}>
         <ul className={styles.navlists}>
           <li className={styles.active} onClick={() => history.push("/index")}>
              <p className={iconStyle.iconfont} style={{ }}>&#xe626;</p>
              <p>首页</p>
            </li>
           <li onClick={() => history.push("/ShopIndex")}>
             <p className={iconStyle.iconfont} style={{  }}>&#xe624;</p>
             <p>商城</p>
           </li>
           <li onClick={() => history.push("/Team")}>
             <p className={iconStyle.iconfont} style={{ fontSize:"0.40rem"}}>&#xe61c;</p>
             <p>团队</p>
           </li>
           <li onClick={() => history.push("/Profit")}>
             <p className={iconStyle.iconfont} style={{ fontSize: "0.44rem"}}>&#xe757;</p>
             <p>转账</p>
           </li>
           <li onClick={() => history.push("/Mine")}>
             <p className={iconStyle.iconfont} style={{ fontSize: "0.40rem" }}>&#xe60d;</p>
             <p>我的</p>
           </li>
          </ul>
        </div>
       
      
       {
         ggdata ?<Modal
           visible={store.get("gg") == 1 ? false:true}
         transparent
         maskClosable={false}
         onClose={this.onClose('modal1')}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        footer={[{ text: '我知道了，点击关闭', onPress: () => {
          store.set("gg",1)

          this.onClose('modal1')();
          
          } }]}
       >
       <div>
             <div className={styles.ggtitle}>{ggdata.n_title}</div>
             <div className={styles.ggcont}>
               {/* <span className="innerhtml">
                 {ggdata.length > 0 ? dangerouslySetInnerHTML(ggdata[0].n_message) : ''}
               </span> */}
               <span dangerouslySetInnerHTML={{
                 __html: ggdata.n_message
               }} />
          </div>
             <div className={styles.ggtime}>
               {ggdata.create_time}
          </div>
        </div>
       </Modal>:""
       }
      </div>
  
    )
  }
}
