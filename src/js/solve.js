import { getSolveList, isMobilellq } from './server.js'
const ejs = require('ejs');

async function getList() {
    let data = await getSolveList({});
    if(data.code == 200) {
        const template = `<% data.forEach(function(item,index){ %>
            <a href="sloeDetail.html?id=<%= item.id%>" class="s-j-item s-solve-f wow zoomIn" data-wow-duration="0.5s" data-wow-delay="<%= 0.2 * (index+1) %>s">
                <img src="/media/<%= item.img %>" alt="logo" srcset="">
                <p><%= item.name %></p>
                <span><%= item.excerpt %></span>
            </a>
       <% });%>` + `<li class="s-j-item s-solve-no"></li><li class="s-j-item s-solve-no"></li>`;
        const c  = ejs.render(template,{data: data.result});
        $('.s-solve-main-ul').html(c)
        let wow = new WOW.WOW(
            {
                animateClass: 'animated',
                offset:       100,
                callback:     function(box) {
                // console.log("WOW: animating <" + box.tagName.toLowerCase() + ">")
                }
            }
        );
        if(!isMobilellq()){
            wow.init();
        };
    }
}
getList();