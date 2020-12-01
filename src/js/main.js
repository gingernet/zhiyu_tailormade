
import { getProductList, createMsg,isMobilellq } from './server.js'
import './../css/swiper.min.css'
import './../css/main.less';
import './../css/all.less'
import './../css/wpc.less';
import './../css/ydd.less';
import './../css/style.less'; // 首页的css
import './../css/media.less';
import './../css/animate.less'
const ejs = require('ejs');

$(function() {
    let animateTime = 300;
    // header 导航
    $("#j-header #j-item li").hover(function() {
        $(this).find(".w-sub-bx").slideDown(animateTime).parent().siblings().find(".w-sub-bx").stop(true, true).slideUp()
    }, function() {
        $(".w-sub-bx").stop(true, true).slideUp()
    })

    $("#y-header-open").click(function() {
        $(this).parent().find(".y-header-modal").slideDown(animateTime)
    })

    $("#y-header-close").click(function() {
        $(this).parent().slideUp(animateTime)
    });

    //菜单子类展开效果
    $("#y-h-nav dd>a:last").css({ "border": "none" });
    $("#y-h-nav dt").click(function() {
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            $(this).next("dd").slideUp();
        } else {
            $(this).addClass("open").siblings("dt").removeClass("open");
            $(this).next("dd").slideDown().siblings("dd").slideUp();
        };
    });

   
    getProductList({}).then((res)=>{
        if(res.code ==200){
            let jjfa = `
                <div class="w-sub-bx m-flex">
                <% data.forEach(function(item,index){ %>
                    <a href="prdetails.html?id=<%= item.id%>" title="三年定期" class=""><%= item.name%></a>
                <% })%>
                </div>
            `;
        const b = ejs.render(jjfa,{data: res.result});
        $('.w-header-nav .product').append(b)
        }
    })
    let userModal = `<div class="user-modal">
            <div class="user-main wow tada">
                <span class="user-close">
                    <svg style="color: '#389af1'" viewBox="64 64 896 896" focusable="false" class="" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg>
                </span>
                <h5>留言板</h5>
                <form class="userForm" name="userForm" onsubmit="return mySubmit(this)">
                    <ul class="user-form-ul">
                        <li>
                            <p>姓名：</p>
                            <input name="name" type="text" placeholder="请输入您的姓名">
                        </li>
                        <li>
                            <p>手机：</p>
                            <input name="phone" type="text" placeholder="请输入您的联系方式">
                        </li>
                        <li>
                        <p>邮箱：</p>
                            <input name="email" type="text" placeholder="请输入您的邮箱">
                        </li>
                        <li>
                            <p>内容：</p>
                            <textarea name="content" id="" cols="10" rows="5" placeholder="请输入您的需求..."></textarea>
                        </li>
                        <p class="user-err-info"></p>
                        <li class="user-btn">
                            <button class="user-confirm" type="button">提交</button>
                        </li>
                    </ul>
                </form>

            </div>
        </div>`;
    $('body').append(ejs.render(userModal))
    let setTimers = null;
    
    function addTimers(s) {
        // if(sessionStorage.getItem('isLY')=='true'){
        //     return false;
        // }
        // setTimers = setTimeout(() => {
            document.querySelector('.user-modal').classList.add('user-block');
            // clearTimeout(setTimers)
            // setTimers = null;
        // }, s || 3500);
    }
    

    document.querySelector('.user-close').addEventListener('click', () => {
        document.querySelector('.user-modal').classList.remove('user-block');
        setTimers = null;
        const s = Math.floor(Math.random() * 10) * 1000 + 5;
        // addTimers(s);
    }, false)

    $('.user-confirm').click(function(){
        let formData = new FormData(document.querySelector('.userForm'));
        let err = '';
        if(!formData.get('content')) {
            err = '您好，留言必填'
        }
        var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
        if(!formData.get('email')) {
            err = '您好，邮箱必填'
        } else if(!myReg.test(formData.get('email'))){
            err = '您好，邮箱格式不对'
        }

        if(!formData.get('phone')) {
            err = '您好，手机必填'
        }else if(!/^1[3456789]\d{9}$/.test(formData.get('phone'))){ 
            err = '您好，手机号格式不对'
        }
        if(!formData.get('name')){
            err = '您好，姓名必填'
        }

        if(err) {
            $('.user-err-info').text(err)
            return false;
        }else  {
            $('.user-err-info').text('')
        }

        createMsg(formData).then((res)=>{
            document.querySelector('.user-modal').classList.remove('user-block');
            if(res.code ==200){
                alert('谢谢，提交成功')
                sessionStorage .setItem('isLY','true')
            }else {
                const s = Math.floor(Math.random() * 10) * 1000 + 5;
                // addTimers(s);
            }
        })
    })

     let wow = new WOW.WOW({
            animateClass: 'animated',
            offset:       100,
            callback:     function(box) {
            }
        }
    );
    $('.now-call').click(function(){
        addTimers();
    })
    if(!isMobilellq()){
        wow.init();
        // addTimers();
        $('.fiexd-btn')[0].style.display = 'block';
    }
})