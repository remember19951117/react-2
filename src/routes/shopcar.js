import React, { Component } from 'react';
import { NavBar, Checkbox, Stepper, Toast} from "antd-mobile";
import GoBack from "../assets/images/goback.png";
import styles from "./styles/cart.css";
import * as fetchs from '../utils/fetch';

import store from "store";
// import Navstyles from "./styles/nav.css";
// import iconStyle from "./styles/font.css";
// import HeadIcon from "../assets/images/icon.png";
// import Shenqing from "../assets/images/user/shenqing.png";
// import Bizhong from "../assets/images/user/bizhong.png";
// import Code from "../assets/images/user/code.png";
// import huiyuan from "../assets/images/user/tianjia.png";
// import kefu from "../assets/images/user/kefu.png";
// import jia from "../assets/images/user/jia.png";
// import GoBack from "../assets/images/goback.png";
// import IndexCSS from "../components/IndexCSS";
// import GoodImg01 from "../assets/images/shopImages/goodimg01.png";
const CheckboxItem = Checkbox.CheckboxItem;

// const data = [
//     { value: 0, setval:2,price:1000 },
//     { value: 1, setval: 1, price: 2000},
//     { value: 2, setval: 3, price: 3000},
// ];
var shopcatid = []
export default class Change extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartgoods:"",
            val1: 1,
            num:0,
            shopcatid,
            GoodNum:1
        };
    }
    
    
    onSetChange(val) {
       //console.log(val);
        
        // this.setState({ val1: val});
    }
    chgNum = (e) => {
        let newNum = 0;
        let oldNum = Number(this.state.GoodNum);
        if (e == 0) {
            newNum = oldNum - 1;
        } else {
            newNum = oldNum + 1;
        }
        if (newNum < 1) {
            return;
        }
        this.setState({
            GoodNum: newNum
        })
    }
    onChekChange(e,val) {
        let checked = e.target.checked;
        let num=this.state.num;
        let that = this;
        this.state.cartgoods.map(function (result,index) {
            if (index==val){
                if (checked) {
                    num += result.sku.realprice * result.goods_num
                    var obj ={
                        id: result.id,
                        shop_id: result.shop_id
                    }
                    shopcatid.push(obj)
                    return num;
                  }else{
                    num -= result.sku.realprice * result.goods_num
                    shopcatid.splice(index, 1);
                    return num;
                    
                }
               // //console.log("11", num);
            }
        })
        //console.log(shopcatid)
        this.setState({
            num,
            shopcatid,
        })
        
       
    }
    componentDidMount() {
        ////console.log("post",goodsdetaildata);
        fetchs.read_Token(fetchs.APIHost + "/cart", fetchs.getAuth("/cart")).then(response => response.json())
            .then(json => {
                //console.log("购物车", json)
                this.setState({ cartgoods: json.data})
            });
    }
    goorder(){
        const {history} = this.props;
        ////console.log("333", this.state.shopcatid.length == 0)
        if (this.state.shopcatid.length == 0) {
            Toast.offline("请选择商品!", 2);
            return;
        }
        const data = this.state.shopcatid;
        const all = this.refs.all.innerText;
       // //console.log("111", all)
        var that = this;
        //console.log("post",data)
        // fetchs.creat_Token(fetchs.APIHost + "/order/create", fetchs.getAuth("/order/create"), JSON.stringify(data)).then(response => response.json())
        //     .then(json => {
        //         //console.log("添加订单", json)
        //        // this.setState({ cartgoods: json.data })
        //     });
        fetchs.creat_Token(fetchs.APIHost + "/order/add", fetchs.getAuth("/order/add"),JSON.stringify(data)).then(response => response.json())
            .then(json => {
                //return json
                //console.log("添加订单", json)
                if (json.code == 1) {
                    Toast.success(json.msg, 2);
                    
                    store.set("orderid", json.data.orderid)
                    store.set("all", all)
                    // store.get("goodsinfo", that.refs.all.text())
                    history.push("/shopend")
                } else {
                    Toast.fail(json.msg, 2);
                }
        });
        
    }
    render() {
        const { history } = this.props;
        var that = this;
        // const NavbarProps = {
        //     history
        // }
        ////console.log("reen", this.state.cartgoods)
        const cartgoods = this.state.cartgoods ? this.state.cartgoods:''
        return (
            <div>
                <style>
                    {`
                        .am-list-item{
                            height:2.3rem;
                            margin-top:0.3rem;
                        }
                        .am-checkbox{
                            width:.5rem;
                            height:.5rem;

                        }
                        .am-checkbox-inner{
                           width:.5rem;
                            height:.5rem;
                            border:1px solid #00a3f0; 
                        }
                        .am-checkbox-inner:after{
                                top: 1.5px;
                                right: 0.1rem;
                                z-index: 999;
                                width: .14rem;
                                height: .28rem;
                                font-size:.26rem;
                        }
                        .am-stepper.showNumber{
                            margin-top:1rem;
                        }
                        .am-stepper-handler, .am-stepper-handler-up-inner, .am-stepper-handler-down-inner{
                             width:.32rem;
                            height:.32rem;
                        }
                        .am-icon-xxs{
                            width:.32rem;
                            height:.32rem;
                        }
                        .am-stepper-input{
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
                        
                    `}
                </style>
                <NavBar
                    style={{ height: "7vh", background: "#00a3f0", color: "red" }}
                    mode="light"
                    icon={
                        <img src={GoBack} style={{ height: ".38rem" }} alt=""></img>
                    }
                    onLeftClick={() => history.push("ShopIndex")}
                >
                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        购物车
                    </span>
                </NavBar>

                <div className={styles.main}>
                    <ul className={styles.cartlists}>
                    {       
                            cartgoods !== "" ? cartgoods.map(function (result,index) {
                                //console.log("result",result)
                                return <CheckboxItem key={index} onChange={(e) => that.onChekChange(e,index)}>
                                    <div className={styles.goodsimg}>
                                        <img src={fetchs.APIHost + result.goods.goods_pic} alt="" />
                                    </div>
                                    <div className={styles.goodsinfo} style={{marginLeft:".12rem"}}>
                                        <p>{result.goods.goods_name}   </p>
                                        
                                        <p>
                                            <span style={{ marginTop: ".2rem",color:"#ddd" }}>{result.sku.sku_name}</span>
                                        </p>
                                        <p>
                                            <span style={{ color: 'red' }}>商城币：{result.sku.realprice}</span>
                                        </p>
                                    </div>
                                    <div className={styles.jia}>
                                        <Stepper
                                            style={{ width: '100%', minWidth: '100px' }}
                                            showNumber
                                            max={10}
                                            min={1}
                                            step={1}
                                            value={result.goods_num}
                                            //onChange={() => this.onSetChange(i.setval)}
                                            disabled
                                        />
                                        {/* <div className={styles.NumChgBox}>
                                            <span onClick={() => that.chgNum(0)}>-</span>
                                            <span>{that.state.GoodNum}</span>
                                            <span onClick={() => that.chgNum(1)}>+</span>
                                        </div> */}
                                    </div>
                                </CheckboxItem>
                            }):""
                        }
                       

                    </ul>
                </div>
                <div className={styles.suerorder} >
                    <div>
                        <span>总计：</span>
                        <span style={{ color: "red" }} ref="all">{this.state.num}</span>
                        <span style={{ color: "red" }}>商城币</span>
                    </div>
                    <div onClick={this.goorder.bind(this)}>
                        <span>结算</span>
                    </div>
                </div>
            </div>
        )
    }
}