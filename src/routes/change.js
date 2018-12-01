import React, { Component } from 'react';
import { NavBar, Radio, List, Picker, Toast} from "antd-mobile";
import * as user from "../services/user";
import styles from "./styles/mine.css";
import arrayTreeFilter from 'array-tree-filter';

import { district, provinceLite } from 'antd-mobile-demo-data';
// import Navstyles from "./styles/nav.css";
// import iconStyle from "./styles/font.css";
// import HeadIcon from "../assets/images/icon.png";
// import Shenqing from "../assets/images/user/shenqing.png";
// import Bizhong from "../assets/images/user/bizhong.png";
// import Code from "../assets/images/user/code.png";
// import huiyuan from "../assets/images/user/tianjia.png";
// import kefu from "../assets/images/user/kefu.png";
import huobi from "../assets/images/user/huobi.png";
import GoBack from "../assets/images/goback.png"; 
// import IndexCSS from "../components/IndexCSS";
const RadioItem = Radio.RadioItem;

export default class Change extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            data2: [],
            cols: 1,
            cols2: 1,
            
            asyncValue: [],
            asyncValue2: [],
            
            visible: false,
        };
    }
    onClick = () => {
        
    };
    onClick2 = () => {
        // setTimeout(() => {
        //     this.setState({
        //         data: provinceLite,
        //     });
        // }, 120);
    };
    onPickerChange = (val) => {
        
        let colNum = 1;
        const d = [...this.state.data];
        const asyncValue = [...val];
        this.setState({
            data: d,
            cols: colNum,
            asyncValue,
        });
        
    };
    onPickerChange2 = (val2) => {
        
        let colNum2 = 1;
        const d2 = [...this.state.data2];
        //console.log("onPickerChange2", d2)
        const asyncValue2 = [...val2];
        this.setState({
            data2: d2,
            cols2: colNum2,
            asyncValue2,
        });
    };
    
    async tap(){
        const {history} = this.props;
        const type_id = this.state.asyncValue.toString();
        const coin_id = this.state.asyncValue2.toString();
        // const num = this.refs.num.value;
        // const s_pwd = this.refs.s_pwd.value;
        // if (!from) { Toast.fail("请选择要转换的货币"); return; }
        // if (!to) { Toast.fail("请选择转换后的货币"); return; }
        // if (!num) { Toast.fail("转换数量不能为空"); return; }
        // if (num <= 0) { Toast.fail("转换数量需要大于0"); return; }
        // if (!s_pwd) { Toast.fail("支付密码不能为空"); return; }
        // //console.log(to)
        var data ={
            type_id: type_id,
            coin_id: coin_id
        }
         //console.log("post",data)
        const sever = await user.changehuobi(data)
        if (sever.code == 1) {
            Toast.success(sever.msg, 2);
            history.push("/index")
        } else {
            Toast.fail(sever.msg, 2);
        }
    }
    render() {
    const { history } = this.props;
        const { value, value2 } = this.state;
        const data = [
            { value: '1', label: '小型糖果机' },
            { value: '2', label: '中型糖果机' },
            { value: '3', label: '中大型糖果机' },
            { value: '4', label: '大型糖果机' },
            { value: '5', label: '代理糖果机' },
           
        ];
        const data2 = [
            { value: '1', label: 'KR币' },
            { value: '3', label: '回购币' },
           
        ];
        // const NavbarProps = {
        //     history
        // }
        return (
            <div>
                <style>
                    {`
                       .am-list-header{
                           height:.83rem;
                           line-height:.83rem;
                           color:#000000;
                           font-size:.32rem;
                       }
                       .am-list-body{
                           background:#f2f2f2;
                       }
                       .am-list-item{
                           margin-top:0.1rem;
                           height:0.8rem;
                           line-height:.8rem;
                           font-size:.38rem;
                       }
                       .am-list-item .am-list-line .am-list-content{
                           font-size:.32rem;
                       }
                       .am-radio-inner:after{
                           width:14px;
                           height:28px;
                       }
                       .am-list-item .am-list-line .am-list-extra{
                           font-size:.32rem;
                        }
                        .am-list-item{
                            margin: 15px 15px 9px 15px;
                            border: 0;
                            border: 1px solid #a7a8aa;
                            color: #a7a8aa;
                            width: 5.06rem;
                            height: .56rem;
                            font-size: .32rem;
                            border-radius: 0.15rem;
                            overflow: hidden;
                        }
                        .am-toast-text-info{
                            font-size:.26rem;
                            line-height:.52rem;
                        }
                        .am-toast-notice-content .am-toast-text.am-toast-text-icon {
                            border-radius: .15rem;
                            padding: .25rem .15rem ;
                        }
                        .am-picker-col-item-selected{
                            font-size:.32rem;
                        }
                        .am-picker-popup-item{
                            height:.8rem;
                        }
                        .am-picker-popup-item{
                            font-size:.32rem
                        }
                        .am-picker-col-item{
                            height:.6rem;
                            line-height:.6rem;
                        }
                        .am-picker-col-indicator{
                            height:.6rem;
                        }
                        .am-picker-col-item{
                            font-size:.32rem
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
                    >
                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        糖果机购买
                    </span>
                </NavBar>

                <div className={styles.main}>

                    {/* <div className="am-list-header">货币转换关系示意图:</div>
                    <div className={styles.changeimg}>
                       <img src={huobi}/>
                    </div> */}
                    <div className="am-list-header">请点击选择要购买的糖果机:</div>
                    <Picker
                        data={data}
                        cols={this.state.cols}
                        value={this.state.asyncValue}
                        onPickerChange={this.onPickerChange}
                        onOk={v => { this.setState({ asyncValue: v})}}
                    >
                        <List.Item arrow="horizontal" onClick={this.onClick}>你选择的糖果机</List.Item>
                    </Picker>
                    <div className="am-list-header">请点击选择使用的货币:</div>
                    <Picker
                        data={data2}
                        cols={this.state.cols2}
                        value={this.state.asyncValue2}
                        onPickerChange={this.onPickerChange2}
                        onOk={v => { this.setState({ asyncValue2: v }) }}
                    >
                        <List.Item arrow="horizontal" onClick={this.onClick2}>你使用的货币</List.Item>
                    </Picker>

                    {/* <div className="am-list-header">转换数量:</div>
                    <div className={styles.changeInput}>
                        <input placeholder="请输入转换数量" ref='num'/>
                    </div> */}
                    {/* <div className="am-list-header">支付密码:</div>
                    <div className={styles.changeInput}>
                        <input placeholder="请输入支付密码" type="password" ref="s_pwd"/>
                    </div> */}
                    <button className={styles.changeSure} onClick={this.tap.bind(this)}>确定</button>
                </div>
            </div>
        )
    }
}