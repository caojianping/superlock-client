import React from 'react';
import androidDownloadImg from '../assets/images/android-download.png';
import iosDownloadImg from '../assets/images/ios-download.png';
import bannerImg from '../assets/images/banner.png';
import intro01Img from '../assets/images/intro01.png';
import intro02Img from '../assets/images/intro02.png';
import intro03Img from '../assets/images/intro03.png';
import intro04Img from '../assets/images/intro04.png';
import intro05Img from '../assets/images/intro05.png';
import logoImg from '../assets/images/logo.png';
import logoMobileImg from '../assets/images/logo-mobile.png';

namespace Home {
    export interface Props {
        path: string;
    }

    export interface State {
        title01: string;
        title02: string;
        intros: Array<any>;
    }
}

class Home extends React.Component<Home.Props, Home.State> {
    constructor(props) {
        super(props);
        this.state = {
            title01: '锁仓宝',
            title02: '锁仓理财首选产品',
            intros: [
                { name: '高利率，高收益', img: intro01Img },
                { name: '多种不同理财周期可供选择', img: intro02Img },
                { name: '收益每日到账，投资有保障', img: intro03Img },
                { name: '实体资产抵押保障，确保资产无忧', img: intro04Img },
                {
                    name: '邀请好友锁仓，立即获得邀请奖励，可提现',
                    img: intro05Img,
                },
            ],
        };
    }

    render() {
        const { title01, title02, intros } = this.state;
        return (
            <div className="home">
                <div className="container">
                    <div className="header clearfix">
                        <div className="header-content">
                            <img
                                className="logo"
                                src={logoMobileImg}
                                alt="锁仓宝"
                            />

                            <h1 className="title01">{title01}</h1>
                            <h2 className="title02">{title02}</h2>

                            <ul className="downloads clearfix">
                                <li className="download-item">
                                    <a
                                        className="download-btn"
                                        href="https://app.scvip.vip/app/android/WealthShop.apk"
                                        target="_blank"
                                    >
                                        <i></i>
                                        <span>安卓下载</span>
                                    </a>
                                    <div className="download-modal">
                                        <img src={androidDownloadImg} alt="" />
                                    </div>
                                </li>
                                <li className="download-item">
                                    <a
                                        className="download-btn"
                                        href="itms-services://?action=download-manifest&url=https://app.scvip.vip/app/ios/manifest.plist"
                                        target="_blank"
                                    >
                                        <i></i>
                                        <span>IOS下载</span>
                                    </a>
                                    <div className="download-modal">
                                        <img src={iosDownloadImg} alt="" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <img
                            className="header-banner"
                            src={bannerImg}
                            alt="锁仓宝"
                        />
                    </div>

                    <ul className="intros clearfix">
                        {intros.map((intro: any, index: number) => (
                            <li className="clearfix" key={index}>
                                <img src={intro.img} alt={intro.name} />
                                <p>{intro.name}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="footer">
                    <img className="logo" src={logoImg} alt="锁仓宝" />
                    <p className="copyright">
                        版权所有@2020Wealth PTE LTD.版权所有
                    </p>
                    <p className="coins">
                        币种支持：
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                        <i></i>
                    </p>
                </div>
            </div>
        );
    }
}

export default Home;
