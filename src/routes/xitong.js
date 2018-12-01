import React, { Component } from 'react';
import { NavBar } from "antd-mobile";
import GoBack from "../assets/images/goback.png";
import styles from "./styles/xitong.css";
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


export default class Change extends Component {
    constructor() {
        super();
        this.state = {
            ggdata:[]
        };
    }
    componentDidMount(){
        fetchs.read_Token(fetchs.APIHost + '/notice/lists', fetchs.getAuth("/notice/lists")).then(response => response.json())
            .then(json => {
               // //console.log("公告", json)
                this.setState({ ggdata: json.data })
         });
    }
    render() {
        const { history } = this.props;
        const NavbarProps = {
            history
        }
       //console.log(this.state.ggdata)
    const  ggdata = this.state.ggdata.length > 0 ? this.state.ggdata:''
        return (
            <div>
                <style>
                    {`
                        
                    `}
                </style>
                <NavBar
                    style={{ height: "7vh", background: "#00a3f0", color: "red" }}
                    mode="light"
                    icon={
                        <img src={GoBack} style={{ height: ".38rem" }}></img>
                    }
                    onLeftClick={() => history.goBack()}
                >
                    <span style={{ fontSize: "0.4rem", color: "#FFFFFF" }}>
                        系统公告
                    </span>
                </NavBar>

                <div className={styles.main}>
                    {
                        ggdata ? ggdata.map((i)=>{
                            return <div className={styles.cont} key={i.id} onClick={() => history.push("/xitongid?id=" + i.id)}>
                               <span>标题：{i.n_title}</span>
                               {/* <span dangerouslySetInnerHTML={{
                                   __html: i.n_message
                               }} /> */}
                                <span>></span>
                            </div>
                    }):""
                }
                    
                   
                </div>
            </div>
        )
    }
}