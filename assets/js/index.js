$(function () {
    $('#go-regs').on('click', function () {
        $('.login-box').hide();
        $('.regs-box').show()
    });
    $('#go-login').on('click', function () {
        $('.login-box').show();
        $('.regs-box').hide()
    });
    //密码校验 layui对象内form
    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let form = $('.regs-box input[name=password]').val()
            if (value != form) {
                return '输入密码不一致'
            }
        }
    });
    $('#form-res').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $('.regs-box input[name=username]').val(),
                password: $('.regs-box input[name=password]').val()
            },
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    $('#form-res')[0].reset()
                    // $('.regs-box input[name=username]').val('');
                    // $('.regs-box input[name=password]').val('');
                    // $('.regs-box input[name=repassword]').val('')
                    return layer.msg(res.message, { icon: 5 });
                }

                // alert('注册成功')
                layer.msg('注册成功', { icon: 6 });
                $('#go-login').click();
                //原生js代码重置注册表单内容,reset()
                $('#form-res')[0].reset()


            }
        })
    })
    $('#form-login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status !== 0) {
                    // $('#form-res')[0].reset()
                    // $('.regs-box input[name=username]').val('');
                    // $('.regs-box input[name=password]').val('');
                    // $('.regs-box input[name=repassword]').val('')
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('登录成功', { icon: 6 });
                localStorage.setItem('token', res.token)
                location.href = '/index.html';

            }
        })
    })
})