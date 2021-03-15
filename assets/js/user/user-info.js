$(function () {
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length < 1 || value.length > 6) {
                return '昵称长度在1-6之间'
            }
        }
    });
    //渲染,获取用户信息,多次使用函数

    initUserInfo()
    let layer = layui.layer
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',

            success: (res) => {
                console.log(res);
                //判断
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                form.val('formUserInfo', res.data)
            }
        })
    };
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        //从服务器获取数据渲染
        initUserInfo();
    })
    //修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('用户信息修改失败')
                }
                layer.msg('修改成功');
                window.parent.getUserInfo()
            }
        })
    })
})