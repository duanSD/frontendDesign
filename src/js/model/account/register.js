require("../../../css/model/public.less");
require("../../../css/model/account.less");

var avalon=require("../../lib/avalon/main");
require("../../components/md5/md5")
var RSA=require("../../components/rsa/RSA");
require("../../components/store/avalon.store")
var config=require("../../lib/units/b2bconfig")
require("../../useComponents/footer-account/footer")
/*require("mmAnimate");
 require("mmRouter");*/

/*var button=require("../components/button-test/button");
 var panel=require("../components/panel-test/panel");
 var uptop=require("../components/uptop/avalon2.uptop");*/
var vm=avalon.define({
    $id: "register",
    //用户名和密码
    username:'',
    password:'',

    memberName:false,

    onregister:function(){
        location.href="register.html";
    },
    //验证信息显示条的状态
    vdtToggle:false,
    //验信息内容显示
    vdtCon:'',
    //登录1
    loginFn: function(data){
        var vm = this;
        avalon.ajax({
            url:'/ssoService/login',
            type: 'post',
            cache: true,
            data: data,
            dataType:'json',
            contentType: "application/json"
        }).done(function(ret) {
            var role = ret.data&&ret.data.role;
            var _autoVal=vm.memberName?3:0
            //存储用户名
            if (ret.isSuccess == 1 &&(role ==0 || role == 1 || role == 2 || role ==8)) {
                //var userData = JSON.stringify(ret.data);
                var userData=ret.data;
                if (_autoVal == 3) {
                    avalon.store.set('userInfor',userData);
                    avalon.store.set('shopId',userData.shopID);
                    avalon.store.set('role',userData.role);
                    //单点传输存储信息
                    /*               singLogin.login({
                     domainNow: TZB.hostName,
                     data: userData
                     });*/
                }else{
                    avalon.store.set('userInfor',userData);
                    avalon.store.set('shopId',userData.shopID);
                    avalon.store.set('role',userData.role);
                }
                if(role == 8){
                    location.href="../applySettled.html";
                }else{
                    location.href="../index.html";
                }

                //location.href="index.html";
            }else if(ret.isSuccess == 0){
                vm.vdtCon= '账号或密码错误'
                vm.vdtToggle=true;
            }else if(role==7){
                vm.vdtCon= '您没有权限登录此系统'
                vm.vdtToggle=true;
            }

        }).fail(function() {
            vm.vdtCon= '服务异常，请重试'
            vm.vdtToggle=true;
        })

    },
    //验证对象
    validateRegister: {
        onError: function (reasons) {
            var vm=avalon.vmodels['login'];
            reasons.forEach(function (reason) {
                vm.vdtToggle=true;
                vm.vdtCon=reason.getMessage();
            })
        },
        onSuccess:function(reasons){
            var vm=avalon.vmodels['login'];
            vm.vdtToggle=false;

        },
        onValidateAll: function (reasons) {
            var vm=avalon.vmodels['login'];
            var Rsa=RSA;
            if (reasons.length) {
                console.log('有表单没有通过')
            } else {
                console.log('全部通过')
                avalon.ajax({
                    url:'/ssoService/rasKey',
                    type: 'get',
                    cache: true,
                    dataType:'json'
                }).done(function(ret) {
                    if (ret.isSuccess == 1) {
                        var rsaData = ret.data;
                        Rsa.setMaxDigits(130);
                        var key = new Rsa.RSAKeyPair(rsaData.exponent,'',rsaData.modulus);
                        var _pawVal = Rsa.encryptedString(key,avalon.md5(vm.password));//对密码加密
                        var userInfor = JSON.stringify({
                            userName: vm.username,//用户名
                            passWord: _pawVal,//密码
                            expireDate: vm.memberName?3:0,//自动登录天数
                            rasId: rsaData.rasId//rsaId
                        });
                        vm.loginFn(userInfor)
                    }else{
                        vm.vdtCon= '服务异常，请重试'
                        return;
                    }

                }).fail(function() {
                    vm.vdtCon= '服务异常，请重试'
                });

            }
        }
    }

});

/*
require(['jquery', 'cookie', 'validate', 'vdate', 'md5', 'RSA', 'TZB'], function($, cookie, validate, vdate, md5, RSA, TZB){
	var register = {
		_form: $('#register'),
		_btnCode: $('#btn-code'),
		vFrom: '',
		time: 60,
		subType: true,
		dialog: new TZB.Dialog({
			text: '请确认操作'
		}),
		//初始化
		init: function(){
			var me = this;
			me.vation();
			me.getCode();
		},
		//验证
		vation: function(){
			var me = this;

			me.vFrom = me._form.validate({
				onkeyup: false,
				errorPlacement: function(error, element) {
					$(element).parents('dd').next('dd.v-text')
							.append(error);
				},
				rules: {
					user: {
						required: true,
						rangelength: [4,10],
						pureNumber:true
					},
					tel: {
						required: true,
						mobile: true
					},
					code: {
						required: true,
						rangelength: [4,4]
					},
					/!*rec: {
					 rangelength: [6,6]
					 },*!/
					password: {
						required: true,
						rangelength: [6,16],
						password: true
					},
					confirm_password: {
						required: true,
						rangelength: [6,16],
						password: true,
						equalTo: '#password'
					},
					agreement: {
						required: true
					}
				},
				messages: {
					user: {
						required: '请输入登录账号',
						rangelength: '请输入4~10个字符',
						pureNumber:'请输入数字加英文的4-10位的登录名'
					},
					tel: {
						required: '请输入手机号',
						mobile: '请输入正确有效的手机号码'
					},
					code: {
						required: '请输入验证码',
						rangelength: '验证码错误'
					},
					/!*rec: {
					 rangelength: '推荐号错误'
					 },*!/
					password: {
						required: '请输入密码',
						rangelength: '请输入6-16位密码',
						password: '请输入数字加英文的6-16位密码'
					},
					confirm_password: {
						required: '请再次输入密码',
						rangelength: '请输入6-16位密码',
						password: '请输入数字加英文的6-16位密码',
						equalTo: '两次密码输入不一致'
					},
					agreement: {
						required: '请同意协议'
					}
				},
				submitHandler: function() {
					if(me.subType == true) {
						me.subType = false;
						me.checkShop();
					}
				}
			});
		},
		//验证店铺名称
		checkShop: function(){
			var me = this;
			me._shopNameVal = $('#user').val();
			$.ajax({
				type : 'get',
				url : TZB.ssoService +'/userName/'+me._shopNameVal,
				contentType: "application/json",
				success : function(ret){
					if (ret.data == 0) {
						$('#user').parents('dd').next('dd.v-text').html('<span></span><label id="tel-error" class="error" for="tel" style="display: inline;">该账号已被注册</label>');
						me.subType = true;
						return;
					}
					if (ret.data == 1) {
						me.isRight();
					}
				},
				error: function(){
					me.dialog.open({
						type: 0,
						canText: '关闭',
						text: '服务异常，请重试'
					})
					me.subType = true;
				}
			})
		},
		//获取验证码
		getCode: function(){
			var me = this;
			me._btnCode.on('click', function(e) {
				var _that = $(this);
				if (!_that.hasClass('default')) {
					me._telVal = $('#tel').val();
					var account =$('#user').val();
					if (me._telVal.length < 1) {
						_that.parents('dd').next('dd.v-text').html('<span></span><label id="tel-error" class="error" for="tel" style="display: inline;">请输入手机号</label>');
						return;
					}else if(!new RegExp(vdate.vRegExp.mobile).test(me._telVal)){
						_that.parents('dd').next('dd.v-text').html('<span></span><label id="tel-error" class="error" for="tel" style="display: inline;">请输入正确的手机号</label>');
						return;
					}
					if(me._telVal==account){
						$('#user').parents('dd').next('dd.v-text').html('<span></span><label id="tel-error" class="error" for="tel" style="display: inline;">手机号和登录账号不能相同</label>');
						return;
					}
					if (me.checkTel() == false) {
						return;
					};
					_that.addClass('default');
					_that.html('发送验证码（'+me.time+'）')
					var timeFn = setInterval(function(){
						me.time--;
						_that.html('发送验证码（'+me.time+'）')
						if (me.time == 0) {
							_that.removeClass('default')
							_that.html('发送验证码')
							clearInterval(timeFn)
							me.time = 60;
						};
					},1000)
				}else{
					return;
				}
				$.ajax({
					type : 'get',
					url : TZB.smsService +'/sms/'+me._telVal+'/【淘猪宝】验证码：',
					success : function(ret){
						return false;
					}
				})
			});
		},
		//验证手机是否注册
		checkTel: function(){
			var me = this;
			me._telVal = $('#tel').val();
			var telType = false;
			$.ajax({
				type : 'get',
				async: false,
				url : TZB.ssoService +'/userName/'+me._telVal,
				contentType: "application/json",
				success : function(ret){
					if (ret.data == 0) {
						$('#tel').parents('dd').next('dd.v-text').html('<span></span><label id="tel-error" class="error" for="tel" style="display: inline;">该号码已被注册</label>');
						me.subType = true;
					}
					if (ret.data == 1) {
						// me.isRight();
						telType = true;
					}
				},
				error: function(){
					me.dialog.open({
						type: 0,
						canText: '关闭',
						text: '服务异常，请重试'
					})
					me.subType = true;
				}
			})
			return telType;
		},
		//验证手机号与验证码
		isRight: function(){
			var me = this;
			me._codeVal = $('#code').val();
			$.ajax({
				type : 'get',
				url : TZB.ssoService +'/isRight?mobile='+me._telVal+'&codes='+me._codeVal,
				contentType: "application/json",
				success : function(ret){
					if (ret.data == 1) {
						me.rsaKey();
					}
					if (ret.data == 0) {
						$('#code').parents('dd').next('dd.v-text').html('<span></span><label id="tel-error" class="error" for="tel" style="display: inline;">验证码错误</label>');
						me.subType = true;
					};
				},
				error: function(){
					me.dialog.open({
						type: 0,
						canText: '关闭',
						text: '服务异常，请重试'
					})
					me.subType = true;
				}
			})
		},
		//获取rsa加密协议
		rsaKey: function(){
			var me = this;
			me._pawVal = $('#password').val();

			$.get(TZB.ssoService + '/rasKey', function(ret){
				if (ret.isSuccess == 1) {
					me.rsaData = ret.data;
					setMaxDigits(130);
					var key = new RSAKeyPair(me.rsaData.exponent,'',me.rsaData.modulus);
					me._pawVal = encryptedString(key,$.md5(me._pawVal));//对密码加密
					me.loginFn();
				}else{
					me.subType = true;
					return;
				}
			});
		},
		//注册
		loginFn: function(data){
			var me = this;
			me.account = $('#user').val();
			me._telVal = $('#tel').val();
			if(me._telVal==me.account){
				$('#user').parents('dd').next('dd.v-text').html('<span></span><label id="tel-error" class="error" for="tel" style="display: inline;">手机号和登录账号不能相同</label>');
				return;
			}
			$.ajax({
				type : 'POST',
				url : TZB.ssoService +'/register/1',
				data: JSON.stringify({
					'account':me.account,
					'phone': me._telVal,
					'passWord': me._pawVal,
					'expireDate': 0,//自动登录天数
					'rasId': me.rsaData.rasId//rsaId
				}),
				dataType: 'json',
				contentType:  'application/json;charset=utf-8',
				success : function(ret){
					// var ret = ret;
					if (ret.isSuccess == 1) {
						me._form.remove();
						$('#ok').show();
					}else if(ret.isSuccess == 0){
						me.dialog.open({
							type: 0,
							canText: '关闭',
							text: '注册失败，请重试'
						})
					}
					me.subType = true;
				},
				error: function(){
					me.dialog.open({
						type: 0,
						canText: '关闭',
						text: '服务异常，请重试'
					})
					me.subType = true;
				}
			})
		},
		//事件
		events: function(){
			var me = this;
		}
	}
	register.init();
});*/
