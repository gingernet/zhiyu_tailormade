import { MyFooter } from '../page/components/footer.js'
import { getProductList, isMobilellq } from './server.js'
const ejs = require('ejs');
async function getList() {
    let data = await getProductList({});
    let template_1 = `
        <% data.forEach(function(item,index){ %>
            <li class="m-flex product-item">
                <% if(Math.floor(index/2) === (index/2)){ %>
                    <img class="gap-r wow fadeInUpBig" data-wow-duration="0.3s" data-wow-delay="<%= 0.2 * (index+1) %>s"  src="/media/<%= item.img %>" alt="图片">
                <% }%>
                
                <div class="<%= Math.floor(index/2) !== (index/2) ? 'gap-r' : '' %>">
                    <a href="/prdetails.html?id=<%= item.id %>">
                    <h5><%= item.name %></h5>
                    <p><%= item.excerpt %></p></a>
                </div>
                <% if(Math.floor(index/2) !== (index/2)){ %>
                    <img class="wow fadeInUpBig" data-wow-duration="0.5s" data-wow-delay="<%= 0.2 * (index+1) %>s"  src="/media/<%= item.img %>" alt="图片">
                <% }%>
            </li>
        <% }); %>`
    let a = ejs.render(template_1,{data: data.result});
    $('.s-product-main-ul').html(a);
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
    }
    
}
getList();