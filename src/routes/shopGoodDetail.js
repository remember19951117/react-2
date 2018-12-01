import React,{Component} from 'react';
import { Carousel, Icon, Modal, NavBar, Toast} from "antd-mobile";
import iconStyle from "./styles/font.css";
//import $ from "jquery";
import * as fetchs from '../utils/fetch';
import store from "store";
import styles from "./styles/shopDetail.css";
import banner01 from "../assets/images/shopImages/detailbanner.png";

import GoBack from "../assets/images/goback.png";

import DetailInfo01 from "../assets/images/shopImages/detailinfo.png";


function htmlspecialchars_decode(str, APIHost) {
    
    str = str.replace(/&amp;/g, '&');
    str = str.replace(/&lt;/g, '<');
    str = str.replace(/&gt;/g, '>');
    str = str.replace(/&quot;/g, '"');
    str = str.replace(/&#039;/g, "'");
   
    str = str.replace(/\/uploads/g, APIHost+"/uploads");
    return str;
}

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
export default class GoodDetail extends Component {
    constructor(props) {
    super(props);
    this.state = {
        modalChoose:false,
        AttrA:"",
        AttrB:"",
        GoodNum:1,
        goodsdetail:'',
        realprice:'',
        guige:'',
        sku_id:'',
        goods_id:'',

    };
    }

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

      chgAttr=(e,i)=>{
          //console.log("当前选择",i)
          this.setState({
              AttrA:e,
              realprice:i.realprice,
              guige: i.sku_name,
              sku_id: i.sku_id,
              goods_id: i.goods_id,
          })
          
          
      }
    
    // chgAttrN = (e) => {
       
    //     this.setState({
    //         AttrB: e
    //     })
    // }
      chgNum=(e)=>{
          let newNum=0;
          let oldNum=Number(this.state.GoodNum);
          if (e===0) {
            newNum=oldNum-1;
          }else{
            newNum=oldNum+1;
          }
          if(newNum<1){
              return;
          }
          this.setState({
            GoodNum:newNum
          })
      }
    
    componentDidMount() {
        
        let goodsid = this.props.location.search.replace("?id=","");
        let goodsdetaildata = {
            goods_id: goodsid
        }
        ////console.log("post",goodsdetaildata);
        fetchs.creat_Token(fetchs.APIHost + "/goods/get", fetchs.getAuth("/goods/get"), JSON.stringify(goodsdetaildata)).then(response => response.json())
            .then(json => {
                ////console.log("商品详情", json)
                
               // $(".innerhtml").html(json.msg.goods_detail)
                this.setState({ goodsdetail: json.msg })

        });
    }
    
    gobuy(){
        const { history} = this.props;
        if (this.state.guige == "") {
            Toast.offline("请选择规格!", 2);
            return;
        }
        //数量
        const num = this.state.GoodNum;
        //单价
        const soleprcie = this.state.goodsdetail.goods_sku ? this.state.goodsdetail.goods_sku[0].realprice : ""
        //图片
        const goodsimg = this.state.goodsdetail.pd_pic
        //姓名
        const goodsname = this.state.goodsdetail.pd_name
        //规格
        const guige = this.state.goodsdetail.goods_sku ? this.state.goodsdetail.goods_sku[0].goods_attr : ""
        //规格ID
        const sku_id = this.state.sku_id
        //商品ID
        const goods_id = this.state.goods_id
        //商户ID
        const shopid = this.state.goodsdetail.shop_id;
        // if (guige == '') {
        //     Toast.fail("请点击选择规格", 1)
        //     return false;
        // }
        // const data = {
        //     num,
        //     soleprcie,
        //     goodsimg,
        //     goodsname,
        //     guige,
        //     sku_id,
        //     id,
        // }
        
        const cartdata = {
            sku_id,
            goods_id,
            num,
            shopid,
        }
        // store.set("goodsinfo", data)
    
    //    history.push("/shopend");
        //console.log("post",cartdata)
        fetchs.creat_Token(fetchs.APIHost + '/cart/add', fetchs.getAuth('/cart/add'), JSON.stringify(cartdata)).then(response => response.json())
            .then(json => {
               // //console.log(json)
                //return json
                if (json.code == 1) {
                    Toast.success(json.msg, 2);
                    history.push("/cart")
                } else {
                    Toast.fail(json.msg, 2);
                }
                
        });
    }
    render(){
        const {history} = this.props;
        
        var goodsdetail = this.state.goodsdetail ? this.state.goodsdetail:"";
        
       
        //console.log("商品详情", goodsdetail)
        
        //const goodsimg = goodsdetail.pd_pics;
       // //console.log("商品tupian", goodsdetail.goods_sku? goodsdetail.goods_sku[0]:"2")
        
        // const NavbarProps={
        //     history
        // }
        var goods_detail = goodsdetail.goods_detail ? htmlspecialchars_decode(goodsdetail.goods_detail,fetchs.APIHost):'';
        ////console.log(goods_detail);
        return(
            <div>
                <style>
                    {`
                        .am-icon{
                            height:.4rem !important;
                            width:.4rem !important;
                        }


                        .am-modal-transparent{
                            width:auto;
                          }
                          .am-modal-transparent .am-modal-content .am-modal-body {
                            padding: 0 ;
                            overflow: visible !important;
                          }
                          .am-modal-transparent .am-modal-content {
                            border-radius: 0;
                            padding-top: 0;
                            overflow: visible !important;
                          }
                          .am-modal{
                            position: fixed;
                            left: 0;
                            bottom: 0;
                        }
                         .am-icon{
                            width:.50rem;
                            height:.50rem;
                        }
                        .am-toast-text-info{
                            font-size:.26rem;
                            line-height:.52rem;
                        }
                        .am-toast-notice-content .am-toast-text.am-toast-text-icon {
                            border-radius: .15rem;
                            padding: .25rem .15rem ;
                        }
                        .slider-list{
                            height:7.5rem;
                        }
                    `}
                </style>
                <NavBar
                    style={{ height: "7vh", background: "#00a3f0", color: "red" }}
                    mode="light"
                    icon={
                    <img src={GoBack} style={{ height: ".38rem" }} alt=""></img>
                    }
                    onLeftClick={() => history.goBack()}
                    
                    rightContent={
                        [<div onClick={() => history.push("/cart")} key={"2"}>
                            <span className={iconStyle.iconfont} style={{ fontSize: "0.3rem", lineHeight: '7vh', marginRight: "0.1rem", color: "#FFFFFF" }}>
                                &#xe606;
                            </span>
                            <span style={{ fontSize: "0.3rem", lineHeight: '7vh', color: "#FFFFFF" }} onClick={() => history.push("/Profitlists")}>购物车</span>
                        </div>
                        ]
                    }
                    key={"1"}
                >


                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        商品详情
                    </span>
                </NavBar>
                
                <div className={styles.main}>
                    {/*轮播*/}
                    {/* {
                        goodsimg.length > 0?( */}
                    <Carousel
                    autoplay={true}
                    infinite
                    dots={true}
                    TextareaItem={true}
                    selectedIndex={0}
                    
                    >
                        <div style={{ display: 'inline-block', width: '100%',height: '7.5rem'}}>
                             <img
                                        src={fetchs.APIHost +goodsdetail.goods_pic}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top', height: '7.5rem'  }}
                            />
                            </div>
                            
                        
                    
                    </Carousel>
                    {/* ):"" */}
                }
                    <div className={styles.goodName}>
                        {goodsdetail.goods_name}
                        <div style={{fontSize:".24rem"}}>描述：{goodsdetail.goods_note}</div>
                    </div>
                    <div className={styles.goodPrice}>
                        <span>¥{goodsdetail.goods_sku ? goodsdetail.goods_sku[0].realprice : ""}</span>
                        <span>¥{goodsdetail.goods_sku ? goodsdetail.goods_sku[0].oldprice : ""}</span>
                    </div>
                    <div className={styles.goodChooseType} onClick={this.showModal("modalChoose")}>
                    <span>点击选择属性</span>
                    <Icon type="right" />
                    </div>
                    <div className={styles.goodChooseType}>
                        <span>商家姓名</span>
                        <span>{goodsdetail ? goodsdetail.shop.shop_name : ""}</span>
                    </div>
                    <div className={styles.goodChooseType}>
                        <span>商家联系方式</span>
                        <span>{goodsdetail?goodsdetail.shop.shop_tel:""}</span>
                    </div>
                   
                    <div className={styles.goodInfo}>
                        <div className={styles.goodInfoTitle}>
                            商品详情/details
                        </div>
                        {/* <img src={DetailInfo01} alt=""/> */}
                        {/* {
                            goodsimg.length > 0 ? goodsimg.map(function (result, index) {
                                return <div style={{ display: 'inline-block', width: '100%', height: '7.5rem' }} key={index}>
                                    <img
                                        src={fetchs.APIHost + result}
                                        alt=""
                                        style={{ width: '100%', verticalAlign: 'top', height: '7.5rem' }}
                                    />
                                </div>

                            }) : ""  
                        } */}
                        
                        <span dangerouslySetInnerHTML={{
                            __html: `${goods_detail}`
                        }} className={styles.detailhtml}/>
                        {/* <span className="innerhtml">
                           {goodsdetail.goods_detail ? htmlspecialchars_decode(goodsdetail.goods_detail) : ''}
                        </span> */}
                        {/* <img
                            src={fetchs.APIHost + goodsdetail.goods_pic}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top', height: '7.5rem' }}
                        /> */}
                    </div>
                    


                    <div className={styles.buyBtnBox} onClick={this.showModal("modalChoose")}>
                        {/* <div onClick={this.showModal("modalChoose")}>
                            加入购物车
                         </div> */}
                        <div onClick={this.showModal("modalChoose")}>
                            加入购物车
                        </div>
                    </div>
                </div>




                {/*选择属性弹窗*/}
        <Modal
        visible={this.state.modalChoose}
        transparent
        styles={{width:"100vw"}}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
            <div  className={styles.ModalBox}>
                <div className={styles.ModalBoxCancel}>
                    <Icon type="cross-circle" onClick={this.onClose("modalChoose")}></Icon>
                </div>
                <div className={styles.ModalBoxTitle}>
                    <div className={styles.TitleImg}>
                                <img src={fetchs.APIHost + goodsdetail.goods_pic} alt=""/>
                    </div>
                    <div className={styles.TitleInfo}>
                        {/* <p>¥{goodsdetail.goods_sku ? goodsdetail.goods_sku[0].realprice : ""}</p> */}

                                <p>¥{this.state.realprice ? this.state.realprice: ""}</p> 
                                <p>已选择:{this.state.guige?this.state.guige:""}</p>
                        {/* <p>已选择:{this.state.AttrA}</p>  */}
                        {/* <p>已选择:{goodsdetail.goods_sku ? goodsdetail.goods_sku[0].sku_name : ""}</p>  */}
                    </div>
                </div>

                
                
                          
                   <div className={styles.GoodAttr}>
                    <div className={styles.GoodAttrTitle}>
                        规格
                    </div>
                    <div className={styles.GoodAttrBody}>
                    {/* <span className={styles.GoodAttrActive} onClick={() => this.chgAttr(goodsdetail.goods_sku ? goodsdetail.goods_sku[0].goods_attr : "")}>{goodsdetail.goods_sku ? goodsdetail.goods_sku[0].goods_attr : ""}</span> */}
                    {/* <span className={this.state.AttrA==="白色"?styles.GoodAttrActive:""} onClick={()=>this.chgAttr("白色")}>白色</span>
                    
                    <span className={this.state.AttrA==="紫色"?styles.GoodAttrActive:""} onClick={()=>this.chgAttr("紫色")}>紫色</span>
                    <span className={this.state.AttrA==="灰色"?styles.GoodAttrActive:""} onClick={()=>this.chgAttr("灰色")}>灰色</span> */}
                    {/* <span className={styles.GoodAttrActive} onClick={() => this.chgAttr(goodsdetail.goods_sku ? goodsdetail.goods_sku[0].sku_name : "")}>{goodsdetail.goods_sku ? goodsdetail.goods_sku[0].sku_name : ""}</span>  */}
                   
                        {
                                    goodsdetail ? goodsdetail.goods_sku.map( (i,index)=> {
                                        const name = i.sku_name

                                        return <span 
                                            className={this.state.AttrA == name ? styles.GoodAttrActive : ""}
                                            onClick={() => this.chgAttr(name,i)}
                                            key={index}
                                         >
                                            {name}
                                         </span>
                                    }):""
                        }
                    </div>
                </div>
                          
                
                <div className={styles.GoodAttr}>
                    <div className={styles.GoodAttrNum}>
                        <span>数量</span>
                        <div className={styles.NumChgBox}>
                            <span onClick={()=>this.chgNum(0)}>-</span>
                            <span>{this.state.GoodNum}</span>
                            <span onClick={()=>this.chgNum(1)}>+</span>
                        </div>
                    </div>
                </div>
                <div className={styles.ModalBtnBox}>
                    <div className={styles.ModalBtn} onClick={this.gobuy.bind(this)}>
                        加入购物车
                    </div>
                </div>
            </div>

        
        </Modal>

            </div>
        )
    }
}