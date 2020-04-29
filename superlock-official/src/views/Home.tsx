import React from 'react';
import androidImg from '../assets/images/android.png';
import iosImg from '../assets/images/ios.png';
import androidDownloadImg from '../assets/images/android-download.png';
import iosDownloadImg from '../assets/images/ios-download.png';
import bannerImg from '../assets/images/banner.png';
import intro01Img from '../assets/images/intro01.png';
import intro02Img from '../assets/images/intro02.png';
import intro03Img from '../assets/images/intro03.png';
import intro04Img from '../assets/images/intro04.png';
import intro05Img from '../assets/images/intro05.png';
import coin01Img from '../assets/images/coin01.png';
import coin02Img from '../assets/images/coin02.png';
import coin03Img from '../assets/images/coin03.png';
import coin04Img from '../assets/images/coin04.png';
import coin05Img from '../assets/images/coin05.png';
import coin06Img from '../assets/images/coin06.png';
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
            title01: 'BCB矿场',
            title02: '锁仓<span>挖矿</span>，<span>理财</span>首选',
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
                            <img className="logo" src={logoMobileImg} alt="BCB矿场" />

                            <h1 className="title01">{title01}</h1>
                            <h2 className="title02" dangerouslySetInnerHTML={{ __html: title02 }} />

                            <ul className="downloads clearfix">
                                <li className="download-item">
                                    <a className="download-btn" href="https://app.scvip.vip/app/android/WealthShop.apk" target="_blank">
                                        <img src={androidImg} alt="" />
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
                                        <img src={iosImg} alt="" />
                                        <span>IOS下载</span>
                                    </a>
                                    <div className="download-modal">
                                        <img src={iosDownloadImg} alt="" />
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <img className="header-banner" src={bannerImg} alt="BCB矿场" />
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
                    <img className="logo" src={logoImg} alt="BCB矿场" />
                    <p className="copyright">版权所有@2020WealthShop PTE LTD.版权所有</p>
                    <p className="coins">
                        币种支持：
                        <img src={coin01Img} alt="" />
                        <img src={coin02Img} alt="" />
                        <img src={coin03Img} alt="" />
                        <img src={coin04Img} alt="" />
                        <img src={coin05Img} alt="" />
                        <img src={coin06Img} alt="" />
                    </p>
                </div>
            </div>
        );
    }
}

export default Home;
