import React, { Component } from 'react';
import { NavBar, Modal, Toast} from "antd-mobile";
import GoBack from "../assets/images/goback.png";
import styles from "./styles/bzchange.css";
import * as fetchs from '../utils/fetch';
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
// const operation = Modal.operation;
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
export default class Change extends Component {
    constructor() {
        super();
        this.state = {
            modal1: false,
            classData:[],
            selectInfoid:'',
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
    componentDidMount(){
        //获取转换关系
        fetchs.read_Token(fetchs.APIHost + "/coin/rules", fetchs.getAuth("/coin/rules")).then(response => response.json())
            .then(json => {
               // //console.log("分类", json)
                this.setState({ classData: json.data })
        });
    }
    showInfo =(i) => {
        //console.log(2, i)
        this.setState({
            modal1: true,
            selectInfoid: i,
        })
    }
    render() {
        const { history } = this.props;
        var that = this;
        // const NavbarProps = {
        //     history
        // }
        return (
            <div>
                <style>
                    {`
                        .am-modal-transparent{
                            width:90%;
                        }
                        .am-modal-transparent .am-modal-content{
                            padding:0;
                        }
                        .am-modal-header{
                            padding:0;
                            height:.65rem;
                            
                            
                        }
                        .am-modal-title{
                            height:.65rem;
                            line-height:.65rem;
                            color:#ffffff;
                            font-size:.26rem;
                            background:#00a3f0;
                        }
                        .am-modal-button-group-h .am-modal-button{
                            font-size:.32rem;
                            height:.6rem;
                            line-height:.6rem;
                        }
                         .am-toast-text-info{
                            font-size:.26rem;
                            line-height:.52rem;
                        }
                        .am-toast-notice-content .am-toast-text.am-toast-text-icon {
                            border-radius: .15rem;
                            padding: .25rem .15rem ;
                        }
                        .am-modal-button-group-h .am-modal-button:last-child{
                            background:#00a3f0;
                            color:#ffffff;
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
                        币种转换
                    </span>
                </NavBar>
                
                <div className={styles.main}>
                    <table className={styles.bzTab} border="0">
                        <tr>
                            <th>转换币种</th>
                            <th>转换后币种</th>
                            <th>操作</th>
                        </tr>
                        {/* <tr>
                            <td>糖果币</td>
                            <td>糖果币</td>
                            <td onClick={this.showModal('modal1')}>转换</td>
                        </tr> */}
                        {
                            this.state.classData.length > 0 ? this.state.classData.map(i=>{
                                return <tr key={i.id}>
                                    <td>{i.from === 1 ? 'KR币' : i.from === 2 ? '糖果币' : i.from === 3 ? '回购币' : i.from === 4 ? '商城币':'服务器错误'}</td>
                                    <td>{i.to === 1 ? 'KR币' : i.to === 2 ? '糖果币' : i.to === 3 ? '回购币' : i.to === 4 ? '商城币' : '服务器错误'}</td>
                                    <td onClick={() => that.showInfo(i.id)}>转换</td>
                                </tr>
                            }):""
                        }
                    </table>
                </div>
                <Modal
                    visible={this.state.modal1}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="币种转换"
                    footer={[
                        { text: '取消', onPress: () => { console.log('ok'); this.onClose('modal1')(); } },
                        { text: '转换', onPress: () => { 
                            Toast.loading("正在登录", 0);
                            const rules_id = this.state.selectInfoid;
                            const num = this.refs.num.value;
                            const s_pwd = this.refs.s_pwd.value;
                            const data = {
                                num,
                                s_pwd,
                                rules_id
                            }
                           
                            if (!num) { Toast.fail("转换数量不能为空"); return; }
                            if (num <= 0) { Toast.fail("转换数量需要大于0"); return; }
                            if (!s_pwd) { Toast.fail("支付密码不能为空"); return; }
                            //console.log("post", data)
                            fetchs.creat_Token(fetchs.APIHost + "/user/coin", fetchs.getAuth("/user/coin"),JSON.stringify(data)).then(response => response.json())
                                .then(json => {
                                    Toast.hide();
                                    //console.log("分类", json)
                                    this.onClose('modal1')()
                                    //this.setState({ classData: json.data })
                                    if (json.code === 1) {
                                        Toast.success(json.msg, 2);
                                    } else {
                                        Toast.fail(json.msg, 2);
                                    }
                                });
                         } },
                       
                    ]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                >
                    <div style={{ height: 300, overflow: 'scroll' }}>
                        <div className={styles.caozuo}>
                            <span>转换数量</span>
                            <div className={styles.czinput}>
                                <input placeholder="请输入数量" ref="num"/>
                            </div>
                            <div style={{height:"1rem"}}></div>
                            <span>支付密码</span>
                            <div className={styles.czinput}>
                                <input placeholder="请输入支付密码" ref="s_pwd" type="password" />
                            </div>
                        </div>
                    </div>
                </Modal>

            </div>
        )
    }
}