export class MyFooter extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({
            mode: 'open'
        }); // 开放的可以直接被js使用等同于this.shadowRoot

        // 使用了innerHTML之后就不用再像之前一样获取template在appendChild(e);
        shadowRoot.innerHTML = `      
        <style>
        li,a,p,h5,ul,* {
            list-style: none;
            margin: 0;
            padding: 0;
            text-decoration: none;
        }
        .all-footer {
            width: 100%;
            overflow: hidden;
            background-color: #212538;
        }
        .all-footer .all-share-png {
            width: 100px;
            height: 100px;
            
        }
        .all-footer .all-share-png img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
        }
        .all-footer .all-footer-top {
            padding: 30px 0;
            width: 50%;
            max-width: 1200px;
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            margin: 0 auto;
            color: #8C8D91;
            font-size: 14px;
        }
        .all-footer-top .w-f-t-item h5{
            font-size: 15px;
            margin-bottom: 10px;
        }
        .all-footer-top li a {
            color: #8C8D91;
        }
        .all-footer-top p,li {
            line-height: 25px;
        }
        .all-footer .all-footer-db {
            overflow: hidden;
            padding: 20px 0;
            color: #666;
            font-size: 12px;
            background-color: #191D2C;
        }
        .w-f-t-item p {
            text-align: center
        }
        .all-footer-db p {
            display: -webkit-box;
            display: -webkit-flex;
            display: -moz-box;
            display: -ms-flexbox;
            display: flex;
            justify-content: center;
            margin: 5px 0;
            color: #AAAAAA;
            text-align: center
        }
        .all-footer-db p a {color: #AAAAAA;}
        
        </style>
        <div id="footer-container">
            <div class="all-footer w-footer">
                <div class="all-footer-top">
                    <div class="w-f-t-item">
                        <h5>关于我们</h5>
                        <ul>
                            <li><a href="#">服务热线</a></li>
                            <li><a href="#">知鱼简介</a></li>
                            <li><a href="#">技术团队</a></li>
                            <li><a href="#">发展流程</a></li>
                            <li><a href="#">加入我们</a></li>
                        </ul>
                    </div>
                    <div class="w-f-t-item">
                        <h5>合作流程</h5>
                        <ul>
                            <li><a href="#">确定需求</a></li>
                            <li><a href="#">项目设计</a></li>
                            <li><a href="#">项目开发</a></li>
                            <li><a href="#">项目部署</a></li>
                            <li><a href="#">项目上线</a></li>
                            <li><a href="#">项目维护</a></li>
                        </ul>
                    </div>
                    <div class="w-f-t-item">
                        <h5>集团子公司</h5>
                        <ul>
                            <li><a href="#">知鱼网络科技</a></li>
                            <li><a href="#">木姜子科技</a></li>
                            <li><a href="#">问我学院</a></li>
                            <li><a href="#">知鱼财经</a></li>
                        </ul>
                    </div>
                    <div class="w-f-t-item">
                        <p></p>
                        <div class="all-share-png">
                            <img src="../image/weixin.png" alt="">
                        </div>
                        <p>关注微信</p>
                    </div>
                </div>
                <div class="all-footer-db">
                    <p>
                        <span>© 2018-2020 知鱼网络（天津）科技有限公司 | 知鱼网络（贵州）科技有限公司 | All Rights Reserved</span>
                    </p>
                    <p>
                        <a target="_blank" href="#">
                        友情链接： 木姜子科技 | 知鱼财经 | 问我学院</a>
                    </p>
                </div>
            </div>
        </div>    
        `;
        // console.log(this.shadowRoot == shadowRoot) // true两个都指向同一个对象
        this.container = shadowRoot.querySelector('#footer-container');
    }
}