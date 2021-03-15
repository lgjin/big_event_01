$(function () {
    getUserInfo()

    //退出
    let layer = layui.layer;
    $('.loginout').on('click', function () {
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //删除身份认证
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = '/login.html';
            layer.close(index);
        });
    })
});
//封装一个函数
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'GET',
        data: {},
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        // complete: function (res) {
        //     console.log(res)
        // },
        success: (res) => {
            console.log(res.data);
            if (res.status !== 0) {
                return layer.msg(res.message, { icon: 5 });
            }
            renderAvatar(res.data)
        }
    })
};
function renderAvatar(user) {
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    }
    else {
        $('.layui-nav-img').hide();

        let text = name[0].toUpperCase();
        $('.text-avatar').show().html(text);
    }
}