import React,{Component} from 'react';
import { List ,InputItem,Toast} from "antd-mobile";
// import IndexCSS from "../components/IndexCSS";
import MyNavBar from "../components/Navbar";
import styles from "./styles/myQRCode.css";
import HeadIcon from "../assets/images/icon.png";
import copy from 'copy-to-clipboard';

import QRCode from "../assets/images/qrcode.png";
import Ttuiguang from "../assets/images/ttuiguang.png";
const Item=List.Item;
export default class myQRCode extends Component {
    constructor() {  
        super();  
        this.state = {
            files:[],
            multiple: false,
            edit:false,
            url:"https://www.baidu.com/s?wd=npm&ie=UTF-8"
        };
      }

    copyCode=()=>{
        copy(this.state.url);
        Toast.success("复制成功!如未成功请手动复制!",2);
    }
    render(){
        const { files } = this.state;
        const {history} = this.props;
        const NavbarProps={
            history
        }
        return(
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
                <MyNavBar  {...NavbarProps}/>
                
                <div className={styles.main}>
                    <div className={styles.PlateTitle}>
                        <img className={styles.PlateTitleImg} src={Ttuiguang} />
                    </div>
                    <img className={styles.QRCode} src={QRCode} alt=""/>
                        <p>{this.state.url}</p>
                    
                    <div className={styles.PlateBodyBBtnDiv}>
                        <button className={styles.PlateBodyBBtn} onClick={()=>this.copyCode()}>一键复制</button>
                    </div>
                </div>
            </div>
        )
    }
}