import { getNewList, querst, isMobilellq } from './server.js'
import $ from 'jquery';
// const ejs = require('ejs');
const ejs = require('ejs');
import Swiper from 'swiper';

async function getList() {
    let data = await getNewList({});
    let template_1 = `
        <% data.forEach(function(item,index){ %>
            <li class="m-flex wow zoomIn" data-wow-duration="0.5s" data-wow-delay="<%= 0.2 * (index+1) %>s">
            <% let dY = new Date(item.created_at).getFullYear() %>
            <% let dd = new Date(item.created_at).toLocaleDateString().slice(5)%>
                <div class="s-date"><p><%= dd %></p><p><%= dY%></p></div>
                <div class="s-line"></div>
                <img src="/media/<%= item.img %>" alt="">
                    <div class="s-content">
                        <a href="details.html?id=<%= item.id %>">
                            <h5><%= item.title %> </h5>
                            <p><%= item.excerpt %></p>
                        </a>
                        
                    </div>
                </li>
        <% }); %>`
    let a = ejs.render(template_1,{data: data.result});
    $('#ejs-template').html(a)
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