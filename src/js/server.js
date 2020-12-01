import $ from 'jquery'
import axios from 'axios';
axios.defaults.headers.common['Api-Token']='zhifish-76358255-2095-4dd9-932c-274702f99435';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const querst = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(url, params || {}).then(res => {
            resolve(res.data)
        }, (err) => {
            reject(err)
        }).catch(function(err) {
            reject(err)
            console.log('系统出错', err);
        });
    })
}

export const getQueryVariable =  (variable) =>{
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

export const isMobilellq =  () =>{
    var u = window.navigator.userAgent;
    return /Mobile/.test(u);//是否为移动终端
}


const querstG = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url).then(res => {
            // console.log('请求结果', res.data)
            resolve(res.data.data)
        }, (err) => {
            reject(err)
        }).catch(function(err) {
            console.log('系统出错', err);
        });
    })
}

// get
// 首页信息
export const getIndexInfo = (params) => {
    return new Promise( async (resolve, reject)=>{
        let data = await querst('/api/v1/get_index/', params);
        resolve(data)
     })
}


// post
// 新闻接口
export const getNewList = (params) => {
    // return axios.post('/api/v1/get_news_list/', params);
    return new Promise( async (resolve, reject)=>{
       let data = await querst('/api/v1/get_news_list/', params);
       resolve(data)
    })
}

// 新闻详情接口
export const getNewsDetail = (params) => {
    return new Promise( async (resolve, reject)=>{
       let data = await querst('/api/v1/get_news_detail/', params);
       resolve(data)
    })
}

// 产品接口
export const getProductList = (params) => {
    return new Promise( async (resolve, reject)=>{
       let data = await querst('/api/v1/get_product_list/', params);
       resolve(data)
    })
}

// 产品详情接口
export const getproductDetail = (params) => {
    return new Promise( async (resolve, reject)=>{
       let data = await querst('/api/v1/get_product_detail/', params);
       resolve(data)
    })
}

// 帮助文档详情接口
export const getHelpDetail = (params) => {
    return new Promise( async (resolve, reject)=>{
       let data = await querst('/api/v1/get_product_docs/', params);
       resolve(data)
    })
}

// 客户列表
export const getCosList = (params) => {
    return new Promise( async (resolve, reject)=>{
       let data = await querst('/api/v1/get_cos_list/', params);
       resolve(data)
    })
}

// 关于我们
export const getWeInfo = (params) => {
    return new Promise( async (resolve, reject)=>{
       let data = await querst('/api/v1/get_about/', params);
       resolve(data)
    })
}

// 客户列表
export const getSolveList = (params) => {
    return new Promise( async (resolve, reject)=>{
       let data = await querst('/api/v1/get_solution_list/', params);
       resolve(data)
    })
}

// 留言板
export const  createMsg= (params) => {
    return new Promise( async (resolve, reject)=>{
       let data = await querst('/api/v1/create_online_msg/', params);
       resolve(data)
    })
}

// 解决方案详情
export const getSolutionDetail= (params) => {
    return new Promise( async (resolve, reject)=>{
       let data = await querst('/api/v1/get_solution_detail/', params);
       resolve(data)
    })
}
