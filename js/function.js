var Function = {
	dom:{},
	init:function(){
		this.initDom();
		this.bindEvent();
	},
	initDom:function(){
		var dom = this.dom;
		dom.search = $(".search");
		dom.sline = $(".sline");
		dom.cha = $(".cha");
		dom.lishow = $(".l_list");
		/*dom.hideBar = $(".hideBar");*/
		dom.zixun = $(".right_po .mid");
		dom.tel = $(".right_po .fourth");
		dom.totop = $(".right_po .bottom");
		dom.eleft = $(".eleft img");

		/*修改信息页面*/
		dom.c_infoli = $(".c_manage li:has(ul)");
		dom.c_info_noli = $(".c_manage li:not(:has(ul))");

		/*付款页面pay.html表单验证*/

		/*注册页面*/
		dom.registerBtn = $(".btn");

		/*登录页面*/
		dom.loginBtn = $("#logbtn");//登录按钮
		dom.remempwd = $("#rememberpwd");//记住密码复选框



		
		
	},
	bindEvent:function(){
		var dom = this.dom;
		//点击搜索，弹出搜索框
		dom.search.click(function(){
			dom.sline.show();
		});
		//点击×号，退出搜索
		dom.cha.click(function(){
			dom.sline.hide();
		});
		//点击品牌系列，弹出侧边栏
		dom.lishow.mouseover(function(){
			$(this).find("ul").show();
		})
		dom.lishow.mouseout(function(){
			$(this).find("ul").hide();
		})

		//点击咨询按钮，弹出电话框
		dom.zixun.mouseover(function(){
			/*$(this).siblings().eq(3).show();*/
			dom.tel.show();
		})
		dom.zixun.mouseout(function(){
			/*$(this).siblings().eq(3).show();*/
			dom.tel.hide();
		})

		//回到顶部效果
		/*$(window).scroll(function(){
			if($(window).scrollTop >= 1000){
				dom.totop.show();
			}else{
				dom.totop.hide();
			}
		})*/
		dom.totop.click(function(){
			$("html,body").animate({"scrollTop" : 0}, 1000);
		})

		/*每张图片的移动动画*/
		dom.eleft.mouseover(function(){
			$(this).animate({left:"50px",opacity:"0.4",width:"324px"}, 1000);
		})
		dom.eleft.mouseout(function(){
			$(this).animate({left:0,opacity:"1",width:"162px"}, 1000);
		})


		/*修改信息页面效果*/
		dom.c_infoli.click(function(event){
			if (this == event.target) {
                if ($(this).find('ul').is(':hidden')) {
                    $(this).find('ul').slideDown();

                    $(this).css('list-style-image', 'url(images/-.gif)');
                } else {
                    $(this).find('ul').slideUp();
                    $(this).css('list-style-image', 'url(images/1.gif)');
                }
            }
		})

		dom.c_info_noli.css('list-style', 'none');



		/*付款页面pay.html表单验证*/
		/*自定义验证方法*/
		/*验证邮箱*/
		$.validator.addMethod(
			"fomular",
			function(value,element,param){
				return this.optional(element) || value.length == param;
			},"请输入6个数字");
		/*验证手机号*/
		$.validator.addMethod(
			"phone",
			function(value,element,param){
				return this.optional(element) || value.length == param;
			},"请输入11位的手机号码");
		/*验证收货人*/
		/*$.validator.addMethod(
			"receive",
			function(value,element,param){
				return this.optional(element) || value.length == param;
			},"姓名不能为空");*/

			
		$("#pay_address").validate({
			rules:{
				receive:{required:true},//收货人
				con_address:{required:true},//详细地址
				postalcode:{required:true, fomular:"6"},//邮编
				phone:{required:true,phone:"11"},//手机
				fixed_phone:{number:true}//固定电话
			}
		});



		/*注册页面的校验*/
		$("#register").validate({
			rules:{
				reg_phone:{required:true,phone:"11"},//手机
				reg_psd:{required:true},//密码
				psdack:{required:true, equalTo:".password1"}//确认密码
			},

			messages:{
				psdack:{required:"请输入您的密码",equalTo:"两次密码不一致"}
			}

		});


		/*将注册页面的数据写入数据库*/
		dom.registerBtn.click(function(){
			var name = $("input[name = 'reg_phone']").val();
			var pwd = $("input[name = 'reg_psd']").val();
			/*var nickname = $("input[name = 'nickname']").val();*/

			$.post("http://localhost/php/register.php", 
				{
					name:name,
					password:pwd,
					/*nickname:nickname*/
				},function(data){
							if(data && data == 0 ){
								alert(data.msg);
							}else{
								alert(data.msg);
							}
						},"json")

		})


		/*登录页面的校验*/
		$("#login").validate({
			/*校验规则*/
			rules:{
				username:{required:true},//用户名
				password:{required:true},//密码
				validate:{required:true}//验证码
			},
			/*提示信息*/
			messages:{
				username:{required:"请输入用户名"},
				password:{required:"请输入密码"},
				validate:{required:"请输入验证码"}
			}
		});

		/*登录页面表单提交*/
		$("#login").ajaxForm(function(){
			$("output1").html("提交成功欢迎下次再来").show();
		});

		//登录页面设置cookie
		var COOKIE_NAME = "username";
		if($.cookie(COOKIE_NAME)){
			$("#username").val($.cookie(COOKIE_NAME));
		}
		dom.remempwd.click(function(){
			if(this.checked){
				$.cookie(COOKIE_NAME, $("#username").val(), {path:'/',expires:10});
			}else{
				$.cookie(COOKIE_NAME, null, {path:'/'});
			}
		})


		//登录页面请求login.php
		dom.loginBtn.click(function(){
			var name  = $("input[name = 'username']").val();
			var pwd  = $("input[name = 'password']").val();

			$.get("http://localhost/php/login.php", {
				name:name,
				password:pwd
			}, function(data){
				if(data && data.code == 0){
					alert(data.msg);
				}else{
					alert(data.msg);
				}
			},"json")
		})

		

	








		
		
	}

}
$(function(){
	Function.init();
})