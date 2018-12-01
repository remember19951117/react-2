
import React, { Component } from 'react';
import { NavBar,Picker } from "antd-mobile";
import { createForm } from 'rc-form';
// import arrayTreeFilter from 'array-tree-filter';
import { district } from 'antd-mobile-demo-data';

import GoBack from "../assets/images/goback.png";
import styles from "./styles/changeaddress.css";
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
const CustomChildren = props => (
    <div
        onClick={props.onClick}
        style={{ backgroundColor: '#fff'}}
    >
        <div className="test" style={{ display: 'flex', height: '0.55rem', lineHeight:' 0.55rem'}}>
            <div style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{props.children}</div>
            <div style={{ textAlign: 'right', color: '#888', marginRight: "0.33rem" }}>{props.extra}</div>
        </div>
    </div>
);
class Test extends React.Component {
    state = {
        data: [],
       pickerValue: [],
        visible: false,
    };
   
    render() {
       // const { getFieldProps } = this.props.form;
        return (<div>
            
                <Picker
                    title="选择地区"
                    
                    data={district}
                    value={this.state.pickerValue}
                    onChange={v => this.setState({ pickerValue: v })}
                    onOk={v => this.setState({ pickerValue: v })}
                >
                    <CustomChildren>请选择收货地址</CustomChildren>
                </Picker>
         </div>);
    }
}

const TestWrapper = createForm()(Test);

export default class Changeaddress extends Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        const { history } = this.props;
        // const NavbarProps = {
        //     history
        // }
        return (
            <div>
                <style>
                    {`
                       .picker-list .am-list-item .am-list-line .am-list-extra {
                            flex-basis: initial;
                            }

                            .test {
                            position: relative;
                            border-bottom: 0;
                            
                            }

                            .test:after {
                            content: '';
                            position: absolute;
                            background-color: #ddd;
                            display: block;
                            z-index: 1;
                            top: auto;
                            right: auto;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: 1PX;
                            -webkit-transform-origin: 50% 100%;
                            -ms-transform-origin: 50% 100%;
                            transform-origin: 50% 100%;
                            -webkit-transform: scaleY(0.5);
                            -ms-transform: scaleY(0.5);
                            transform: scaleY(0.5);
                            } 
                            .am-picker-popup{
                                font-size:.32rem;
                            }
                            .am-picker-popup-item{
                                height:0.55rem;
                                font-size:.32rem;
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
                          修改地址
                    </span>
                </NavBar>

                <div className={styles.main}>
                    <div className={styles.changename}>
                        <span>
                            收货人
                        </span>
                        <input placeholder="请输入收货人姓名"/>
                    </div> 
                    <div className={styles.changename}>
                        <span>
                            联系电话
                        </span>
                        <input placeholder="请输入收货人联系电话" />
                    </div> 
                    <div className={styles.changename2}>
                        
                        <TestWrapper/>
                    </div>
                    <div className={styles.changename}>
                        <span>
                            详细地址
                        </span>
                        <input placeholder="请输入收货人详细地址" />
                    </div>
                </div>
                <button className={styles.changesure}>
                    确定修改
                 </button> 
            </div>
        )
    }
}