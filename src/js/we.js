import { getWeInfo } from './server.js'
import $ from 'jquery';
const ejs = require('ejs');

async function getInfo() {
    let data = await getWeInfo({});
    if(data.code == 200) {
        $('.w-jj').html(data.result.company_intro.detail)
        $('.w-td').html(data.result.tech_team.detail)

        const template = `<% data.forEach(function(item,index){ %>
            <li class="m-flex">
                <span ><%= item.period%></span>
                <div><%= item.detail%></div>
            </li>
       <% });%>`;
        const c  = ejs.render(template,{data: data.result.dev_his_list});
        $('.s-fz-ul').html(c)

        const tem = `<li class="m-flex"><i></i><%=data.qq %></li>
        <li class="m-flex"><i></i><%= data.phone%></li>
        <li class="m-flex"><i></i><%= data.email%></li>`;
        const d  = ejs.render(tem,{data: data.result.contract_us});
        $('.we-contact-list').html(d)

    }
}
getInfo();