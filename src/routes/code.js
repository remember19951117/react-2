import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { loggedIn } from '../utils/fetch';
import { connect } from 'dva';
import { List, InputItem, Toast, NavBar} from "antd-mobile";
// import IndexCSS from "../components/IndexCSS";
import MyNavBar from "../components/Navbar";
import styles from "./styles/myQRCode.css";
import HeadIcon from "../assets/images/icon.png";
import copy from 'copy-to-clipboard';
import GoBack from "../assets/images/goback.png";
// import QRCode from "../assets/images/qrcode.png";
import Ttuiguang from "../assets/images/ttuiguang.png";
import store from 'store';
var QRCode = require('qrcode.react');
const Item = List.Item;
@connect(state => ({
    user: state.user
}))
export default class myQRCode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            multiple: false,
            edit: false,
            url: ""
        };
    }
    // componentWillMount() {
    //     const { dispatch } = this.props;
    //     const user = loggedIn();
    //     if (!user) {
    //         dispatch(routerRedux.push({ pathname: '/login' }));
    //     }
    // }

    copyCode = (url) => {
        copy(url);
        Toast.success("复制成功!如未成功请手动复制!", 2);
    }

    render() {
        const { files } = this.state;
        const { history } = this.props;
        
        var cometel = store.get("userinfo").tel
        const NavbarProps = {
            history
        }
        return (
            <div>
                <style>
                    {`
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
                        二维码推广
                    </span>
                </NavBar>

                <div className={styles.main}>
                    <div className={styles.PlateTitle}>
                        <img className={styles.PlateTitleImg} src={Ttuiguang} />
                    </div>

                    <QRCode className={styles.QRCode} value={"http://"+window.location.host + "/#/comereg" + "?" + "id=" + cometel} />,
                        <p>{"http://"+window.location.host + "/#/comereg" + "?" + "id=" + cometel}</p>

                    <div className={styles.PlateBodyBBtnDiv}>
                        <a className={styles.PlateBodyBBtn} onClick={() => this.copyCode("http://"+window.location.host + "/#/comereg" + "?" +"id="+cometel)}>一键复制</a>
                    </div>
                </div>
            </div>
        )
    }
}