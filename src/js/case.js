import { getCosList, isMobilellq } from './server.js'
import $ from 'jquery';
const ejs = require('ejs');

async function getList() {
    let data = await getCosList({});
    let template_1 = `
        <% data.forEach(function(item,index){ %>
            <li class="wow zoomIn" data-wow-duration="0.3s" data-wow-delay="<%= 0.2 * (index+1) %>s">
                <div class="m-flex">
                    <i><img src="/media/<%= item.logo%>" alt="" srcset=""></i>
                    <p><%= item.name %></p>
                </div>
                <div>
                    <%= item.excerpt %>
                </div>
            </li>
    <% }); %>` + `<i></i><i></i><i></i><i></i>`
    let a = ejs.render(template_1,{data: data.result});
    $('.s-case-kehu-ul').html(a)
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
getList();