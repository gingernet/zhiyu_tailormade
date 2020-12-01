import { getIndexInfo, getCosList, isMobilellq } from './server.js'
import Swiper from 'swiper'
const ejs = require('ejs');
$(function(){
    // swiper
    var mySwiper = new Swiper('#swiper-banner', {
        // direction: 'vertical', // 垂直切换选项
        loop: true, // 循环模式选项
        speed: 500,
        autoplay: {
            delay: 3000
        },
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        },

        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });
})

async function getInfo(){
    let data = await getIndexInfo({});
    if(data.code==200){
        let body = data.result;
        let cpgn = `<% data.forEach(function(item,index){ %>
            <li class="wow bounceInUp" data-wow-duration="0.8s" data-wow-delay="<%= (index+1) * 0.2%>s">
                <img src="/media/<%= item.icon %>" alt="<%= item.name %>">
                <p><%= item.name %></p>
            </li>
        <% }); %>` + `<i></i><i></i><i></i>`
        const a = ejs.render(cpgn,{data: body.product});
        $('.s-item-1-ul').html(a)

        let jjfa = `<% data.forEach(function(item,index){ %>
                <a href="sloeDetail.html?id=<%= item.id%>" class="s-j-item wow zoomIn" data-wow-duration="0.5s" data-wow-delay="0.2s">
                    <img src="/media/<%= item.img %>" alt="<%= item.name %>">
                    <p><%= item.name %></p>
                    <span><%= item.excerpt %></span>
                </a>
            <% }); %>` + `<i></i><i></i><i></i>`
        ;
        const b = ejs.render(jjfa,{data: body.solution});
        $('.s-item-2-ul').html(b)

        let zyzx = `<% data.forEach(function(item,index){ %>
            <li class="s-j-item m-flex wow fadeInUpBig" data-wow-duration="1s" data-wow-delay="<%= (index +1) * 0.1 %>s">
            <img src="/media/<%= item.img %>" alt="">
            <a href="details.html?id=<%=item.id %>"><p><%= item.title %></p></a>
        </li>
        <% }); %>` + `<i></i><i></i><i></i>`
        ;
        const c = ejs.render(zyzx,{data: body.news});
        $('.s-item-3-ul').html(c)

        const template = `<% data.forEach(function(item,index){ %>
            <li class="wow zoomIn" data-wow-duration="0.5s" data-wow-delay="<%= 0.2 * (index +1)%>s"><a href="javascript:;"><%= item.name%></a></li>
       <% });%>` + `<i></i><i></i><i></i><i></i><i></i><i></i>`;
        const d  = ejs.render(template,{data: body.costomer});
        $('.s-item-4-ul').html(d);

        let wow = new WOW.WOW({
                animateClass: 'animated',
                offset:       100,
                callback:     function(box) {
                // console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
                }
            }
        );
        if(!isMobilellq()) {
            wow.init();
        }
    }
}
getInfo();
