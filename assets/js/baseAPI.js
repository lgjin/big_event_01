
let baseurl = 'http://api-breakingnews-web.itheima.net';
$.ajaxPrefilter(function (option) {
    // console.log(option.url)
    //开发环境url

    //测试环境url
    // let baseurl = 'http://api-breakingnews-web.itheima.net';
    //生产环境url
    // let baseurl = 'http://api-breakingnews-web.itheima.net';
    option.url = baseurl + option.url;

    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
        //登录拦截
        option.complete = function (res) {
            // console.log(res)
            // console.log(res.responseJSON)
            let obj = res.responseJSON;
            if (obj.status == 1 && obj.message == "身份认证失败！") {
                localStorage.removeItem('token');
                location.href = '/login.html'
            }

        }
    }
})