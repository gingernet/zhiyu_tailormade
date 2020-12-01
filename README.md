# web-build
线上地址：http://www.wenwoha.com:8080/index.html
#### css配置
- clss    m: 公共类
- class all: 两端共同的 *
- class   y: 移动端 *
- class   w: p端 *
- id      j：Jquery的使用名称 *



#### 注意点
- ejs的模板配置内图片的引用[博客](https://www.jianshu.com/p/ae0c46c8e99c),underscore-template-loader；
```html
<img src="<%= require('./public/image/bannes.png') %>" alt="banner图">
```
- webpack的图片打包路径问题[参考](https://www.jianshu.com/p/794c5f301169)
- 解决webpack打包html里面img后src为“[object Module]：在url-loader的option里面esModule: false
- css与js分包打包mini-css-extract-plugin


#### ejs的模板使用[官网](http://ejs.co/)
1. 变量传值
```html
<div><%=htmlWebpackPlugin.options.data.header%></div>
````

```javascript
new htmlWebpackPlugin({ // 创建一个 在内存中 生成 HTML  页面的插件
        template: path.join(__dirname, './src/page/we.ejs'), // 指定 模板页面
        filename: 'we.html',
        data:{header:'我可以是一个文本也可以是一段html代码字符串'}, // 可以在配置文件内读取文件内容然后赋给变量即可
        chunks: ['main', 'we']
    })
```

2.引用之间传值
@require('./components/header.ejs', {"tag": "we"}) ，对象必须是json格式，对标属性与索引都是双引号



#### echart
```javascript
option = {
    title: {
        text: '股票配资年成交量13'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:['2015', '2016', '2017', '2018', '2019', '2020']
    },
    grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        containLabel: true
    },
 
    series: [
        
        {
            type: 'pie',
            name: '2015',
            data:[{name:'2015',value: 1},
            {name:'2016',value: 2},{name:'2017',value: 3},
            {name:'2018',value: 2},{name:'2019',value: 4},
            {name:'2020',value: 1},]
        }
    ]
};


```
