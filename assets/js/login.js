//点击按钮切换显示隐藏
$('#regiLogo').click(function () {
    // console.log(1);
    $('.loginBox').hide()
    $('.regiBox').show()
})
$('#loginLogo').click(function () {
    // console.log(1);
    $('.loginBox').show()
    $('.regiBox').hide()
})

// 登录的表单项添加自定义校验规则
let form = layui.form
form.verify({
    //我们既支持上述函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    pass: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    //判断两次密码输入的是否一致
    repass: function (value, item) {
        // console.log(value, item)
        //获取密码输入框的内容
        let pwd = $('.regiBox [name=password').val()
        console.log(value, pwd);  //value: 确认密码框的值  pwd 密码框的值
        if (value !== pwd) {
            return '两次密码不一致'
        }
    }
  });  

  //a注册的xios请求,获取用户输入信息
  //给表单注册submit事件
  $('.regiBox form').on('submit', function (e) {
      e.preventDefault()
      let data = $(this).serialize()
      axios.post('http://api-breakingnews-web.itheima.net/api/reguser', data).then((res) => {
          console.log(res)
          //判断status=0注册成功
          if (res.data.status !== 0) {
            // layer.msg('只想弱弱提示')
              return layer.msg(res.data.message)
          }
          layer.msg('注册成功')
          //点击事件跳转至登录
          $('#loginLogo').click()
      })
  })

//   登录的ajax请求
$('.loginBox form').on('submit', function (e) {
    e.preventDefault()
    let data = $(this).serialize()
    axios.post('http://api-breakingnews-web.itheima.net/api/login', data).then((res) => {
        console.log(res)
       //判断status!==0时登录失败
       if (res.data.status !== 0) {
           return layer.msg(res.data.message)
       }
    //    layer.msg('关闭后想做些什么', function(){
    //     //do something
    //   });

    // token 是服务器给我们的身份认证的信息，我们需要在登录成功的时候，将其存储到本地
    //本地存储
    localStorage.setItem('token', res.data.token)
    //登录成功跳转至首页
       layer.msg('登录成功,即将跳转至首页', function () {
           location.href = '/home/index.html'
       })
    })
})

