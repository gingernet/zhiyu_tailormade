import { getSolutionDetail, getQueryVariable } from './server.js'
const ejs = require('ejs');

const Page = {
   
    getDetails: async (param)=>{
        let data = await getSolutionDetail(param);
        if(data.code == 200) {
            let a = ejs.render('<%- data.detail %>',{data: data.result});
            $('.s-detail-date').text(new Date(data.result.created_at).toLocaleString())
            $('.s-new-detail>h4 span').text(data.result.name )
            $('.detail-title').text(data.result.name)
            $('#detail-body').html(a)
        }
    }
};
async function getDetails() {
    let data = await getSolutionDetail({});
}

$(function(){
    const  sol_id = getQueryVariable('id');
    if(sol_id) {
        let formData = new FormData()
        formData.append('sol_id', sol_id -0)
        Page.getDetails(formData);
    } else alert('对不起，有误');
})

