$(function () {
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 新密码不能和旧密码一样
        samepwd: function (value) {
            if (value == $('input[name=oldPwd]').val()) {
                return '旧密码不能和新密码一致'
            }
        },
        //新密码必须和确认密码一样
        repwd: function (value) {
            if (value != $('input[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    });
    //修改密码
    $('form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg('修改成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})