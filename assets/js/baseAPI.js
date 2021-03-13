$.ajaxPrefilter(function (option) {
    console.log(option.url)
    //开发环境url
    let baseurl = 'http://api-breakingnews-web.itheima.net';
    //测试环境url
    // let baseurl = 'http://api-breakingnews-web.itheima.net';
    //生产环境url
    // let baseurl = 'http://api-breakingnews-web.itheima.net';
    option.url = baseurl + option.url
})