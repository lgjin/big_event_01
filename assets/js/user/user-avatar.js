$(window).on('load', function () {
    // 1.1 获取裁剪区域的 DOM 元素
    let $image = $('#image')
    // 1.2 配置选项
    let options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    $('#btnChanceImage').on('click', function () {
        $('#file').click();
    })
    //修改图片
    $('#file').on('change', function (e) {
        let file = e.target.files[0];
        if (file == undefined) {
            return layer.msg('请选择图片')
        }
        // 2. 将文件，转化为路径
        let imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    //上传头像更换
    $('#btnUpload').on('click', function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');
        $.ajax({
            url: '/my/update/avatar',
            type: 'POST',
            data: { avatar: dataURL },
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }

                layer.msg('上传成功');
                window.parent.getUserInfo()

            }
        })
    })
})