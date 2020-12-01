import { getproductDetail, getQueryVariable } from './server.js'
import $ from 'jquery';
const ejs = require('ejs');

const Page = {

    getproductDetail: async (param)=>{
        let data = await getproductDetail(param);
        if(data.code == 200) {
            let body = data.result;
            $('.p-main-title').text(body.name)
            let cpgn = `<% data.forEach(function(item,index){ %>
                <li>
                    <h6><%= item.name %></h6>
                    <p><%= item.excerpt%></p>
                </li>
            <% }); %>` + `<i></i><i></i><i></i>`
            const a = ejs.render(cpgn,{data: body.product_func});
            $('.ejs-ul-1').html(a)
            const b  = ejs.render(cpgn,{data: body.product_adv});
            $('.ejs-ul-2').html(b)

            const yycj = `<% data.forEach(function(item,index){ %>
                        <li class="m-flex">
                            <img src="/media/<%= item.logo %>" alt="logo" srcset="">
                            <div>
                                <p class="title"><%= item.name %></p>
                                <p class="p-p"><%= item.excerpt%></p>
                            </div>
                        </li>
                   <% });%>
                `;
            const c  = ejs.render(yycj,{data: body.product_cos});
            $('.ejs-ul-3').html(c)

            const bzwd = `<% data.forEach(function(item,index){ %>
                        <li class="m-flex">
                          <a href="help.html?id=<%= item.id%>">
                            <img src="/media/<%= item.img %>" alt="logo" srcset="">
                            <p class="title"><%= item.name %></p>
                            <p class="p-p"><%= item.excerpt %></p>
                          </a>
                        </li>
                    <% });%>`+ `<i></i><i></i><i></i>`;
            const d  = ejs.render(bzwd,{data: body.product_docs});
            $('.ejs-ul-4').html(d)

        }
    }
};


$(function(){
    const  n_id = getQueryVariable('id');
    if(n_id) {
        let formData = new FormData()
        formData.append('pro_id', n_id -0)
        Page.getproductDetail(formData);
    } else alert('对不起，有误');
    
})
