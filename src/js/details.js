import { getNewsDetail, getQueryVariable } from './server.js'
const ejs = require('ejs');

const Page = {
   
    getDetails: async (param)=>{
        let data = await getNewsDetail(param);
        if(data.code == 200) {
            let a = ejs.render('<%- data.body %>',{data: data.result});
            $('.s-detail-date').text(new Date(data.result.created_at).toLocaleString() + " " + data.result.author)
            $('.s-new-detail>h4 span').text(data.result.title )
            $('.detail-title').text(data.result.title)
            $('#detail-body').html(a)
        }
    }
};
async function getDetails() {
    let data = await getNewsDetail({});
}

$(function(){

    const  n_id = getQueryVariable('id');
    if(n_id) {
        let formData = new FormData()
        formData.append('n_id', n_id -0)
        Page.getDetails(formData);
    } else alert('对不起，有误');
    
    // getDetails();
})

