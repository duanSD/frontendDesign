require("../../../css/model/public.less");
require("../../../css/model/account.less");

var avalon=require("../../lib/avalon/main");
require("../../components/md5/md5")
var RSA=require("../../components/rsa/RSA");
require("../../components/store/avalon.store")
var config=require("../../lib/units/b2bconfig")
require("../../useComponents/footer-account/footer")

var vm=avalon.define({
    $id: "forget",
    //用户名和密码
    status:1,//1，2，3分别为不同步骤显示的内容
    tel:'',//验证用的手机号码
    code:'',//手机验证码
    defaultCss:false,//禁用按键状态
    setTime:0,//倒计时显示
    vdtToggle:false
    ,vdtCon:'',

	vdtToggletel:false,
	vdtContel:'',
	vdtTogglecode:false,
	vdtConcode:'',

	password:'',
    _pawVal:'',
	confirm_password:'',
    sendCode:function(){
        var vm=this;
        if(this.tel!==''&&vm.checkTel() == false){
			vm.vdtToggletel=false;
            avalon.ajax({
                url:'/smsService/sms/'+this.tel+'/o2o',
                type: 'get',
                cache: false,
                dataType:'json'
            }).done(function(ret) {
                vm.defaultCss=true;
                vm.setTime=60;
                var timeFn = setInterval(function(){
                    vm.setTime--;;
                    if (vm.setTime == 0) {
                        vm.defaultCss=false;
                        clearInterval(timeFn);
                    };
                },1000)
            });
        }else{
            vm.vdtToggletel=true;
            vm.vdtContel= '请输入注册过的手机号码'
        }
    },
	//获取rsa加密协议
	rsaKey: function(){
		var vm = this;
		vm._pawVal = vm.password;
        var Rsa=RSA
		avalon.ajax({
			url:'/ssoService/rasKey',
			type: 'get',
			cache: true,
			dataType:'json'
		}).done(function(ret) {
			if (ret.isSuccess == 1) {
				vm.rsaData = ret.data;
                Rsa.setMaxDigits(130);
				var key = new Rsa.RSAKeyPair(vm.rsaData.exponent,'',vm.rsaData.modulus);
				vm._pawVal = Rsa.encryptedString(key,avalon.md5(vm._pawVal));//对密码加密
				vm.editPaw();
			}else{
                vm.vdtToggle=true;
                vm.vdtCon='服务异常，请重试';
				return;
			}
		});
	},
    editPaw: function(){
        var vm = this;
        avalon.ajax({
            type : 'POST',
            url :'/ssoService/passWord',
            data: JSON.stringify({
                'userName': vm.tel,
                'passWord': vm._pawVal,
                'expireDate': 0,//自动登录天数
                'rasId': vm.rsaData.rasId//rsaId
            }),
            dataType: 'json',
            contentType:  'application/json;charset=utf-8'
        }).done(function(ret) {
            if (ret.isSuccess == 1) {
               vm.status=3
            }
        }).fail(function() {
            vm.vdtToggle=true;
            vm.vdtCon='服务异常，请重试';
        });
    },
	//验证手机是否注册
	checkTel: function(){
		var vm = this;
		var telType = false;
		avalon.ajax({
			type: 'get',
			cache: true,
			dataType:'json',
			url :'/ssoService/userName/'+vm.tel,
			contentType: "application/json"
		}).done(function(ret) {
			if (ret.data == 0) {
				telType = true;
			}
			if (ret.data == 1) {
				vm.vdtToggletel=true;
				vm.vdtContel= '该号码没有注册'
			}
		}).fail(function() {
            vm.vdtToggle=true;
            vm.vdtCon='服务异常，请重试',
			vm.subType = true;
		});
		return telType;
	},


    //验证对象
	validateForget1: {
		 onValidateAll: function (reasons) {
            var vm=avalon.vmodels['forget'];
            var Rsa=RSA;
			vm.vdtToggletel=false;
			vm.vdtTogglecode=false;
            if (reasons.length) {
				reasons.forEach(function (reason) {
					vm['vdtToggle'+reason.element.id]=true;
					vm['vdtCon'+reason.element.id]=reason.getMessage();
				})
                console.log('有表单没有通过')
            } else {
                console.log('全部通过验证')
                avalon.ajax({
                    url:'/ssoService/isRight?mobile='+vm.tel+'&codes='+vm.code,
                    type: 'get',
                    cache: true,
					contentType: "application/json",
                    dataType:'json'
                }).done(function(ret) {
					vm.subType = true;
					if (ret.data == 1) {
						vm.status=2;
					}
					if (ret.data == 0) {
						vm.vdtTogglecode=true;
						vm.vdtConcode= '验证码错误'
					};
                }).fail(function() {
                   // vm.vdtCon= '服务异常，请重试'
                });

            }
        }
    },
    vdtTpassword:false,
    vdtTconfirm_password:false,
    vdtCpassword:'',
    vdtCconfirm_password:'',
	validateForget2: {
		onValidateAll: function (reasons) {
			var vm=avalon.vmodels['forget'];
			var Rsa=RSA;
			vm.vdtTpassword=false;
			vm.vdtTconfirm_password=false;
			if (reasons.length) {
				reasons.forEach(function (reason) {
					vm['vdtT'+reason.element.id]=true;
					vm['vdtC'+reason.element.id]=reason.getMessage();
				})
				console.log('有表单没有通过')
			} else {
				console.log('全部通过')
                vm.rsaKey();

			}
		}
	}
});


/*
require(['jquery', 'validate', 'vdate', 'md5', 'RSA', 'TZB'], function($, validate, vdate, md5, RSA, TZB){
	var register = {
		setpType: 1,
		_setp1: $('li[data-step="1"]'),
		_setp2: $('li[data-step="2"]'),
		_setp3: $('li[data-step="3"]'),
		_forget1: $('#forget-1'),
		_forget2: $('#forget-2'),
		_forget3: $('#forget-3'),
		vFrom: '',
		_btnCode: $('#btn-code'),
		time: 60,
		subType: true,
		dialog: new TZB.Dialog({
			text: '请确认操作'
		}),
		//初始化
		init: function(){
			var me = this;
			me.getCode();
			me.vation1();
		},
		//获取验证码
		getCode: function(){
			var me = this;
			me._btnCode.on('click', function(e) {
				var _that = $(this);
				if (!_that.hasClass('default')) {
					me._telVal = $('#tel').val();
					if (me._telVal.length < 1) {
						_that.parents('dd').next('dd.v-text').html('<span></span><label id="tel-error" class="error" for="tel" style="display: inline;">请输入手机号</label>');
						return;
					}else if(!new RegExp(vdate.vRegExp.mobile).test(me._telVal)){
						_that.parents('dd').next('dd.v-text').html('<span></span><label id="tel-error" class="error" for="tel" style="display: inline;">请输入正确的手机号</label>');
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
		//验证手机号与验证码
		isRight: function(){
			var me = this;
			me._codeVal = $('#code').val();
			$.ajax({
	            type : 'get',
	            url : TZB.ssoService +'/isRight?mobile='+me._telVal+'&codes='+me._codeVal,
	            contentType: "application/json",
	            success : function(ret){
	            	me.subType = true;
 if (ret.data == 1) {
 me._forget1.hide();
 me._forget2.show();
 me._setp1.removeClass('on').addClass('ok');
 me._setp2.addClass('on');
 me.vation2();
 }
 if (ret.data == 0) {
 $('#code').parents('dd').next('dd.v-text').html('<span></span><label id="tel-error" class="error" for="tel" style="display: inline;">验证码错误</label>');
 };
	            },
	            error: function(){
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
       				me.editPaw();
				}else{
					me.dialog.open({
						type: 0,
                    	canText: '关闭',
                    	text: '服务异常，请重试'
					})
					me.subType = true;
					return;
				}
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
						telType = true;
	            	}
	            	if (ret.data == 1) {
	            		// me.isRight();
	            		$('#tel').parents('dd').next('dd.v-text').html('<span></span><label id="tel-error" class="error" for="tel" style="display: inline;">该号码没有注册</label>');
	            		me.subType = true;
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
		editPaw: function(){
			var me = this;
			$.ajax({
	            type : 'POST',
	            url : TZB.ssoService +'/passWord',
	            data: JSON.stringify({
	            	'userName': me._telVal,
	            	'passWord': me._pawVal,
	            	'expireDate': 0,//自动登录天数
			        'rasId': me.rsaData.rasId//rsaId
	            }),
	            dataType: 'json',
           	 	contentType:  'application/json;charset=utf-8',
	            success : function(ret){
	            	if (ret.isSuccess == 1) {
	            		me._forget2.hide();
			        	me._forget3.show();
			        	me._setp2.removeClass('on').addClass('ok');
			        	me._setp3.addClass('on');
			        	me.subType = true;
	            	}
	            },
	            error: function(){
	            	me.subType = true;
	            }
	        })
		},
		//验证第一步
		vation1: function(){
			var me = this;
			me._forget1.validate({
				onkeyup: false,
				errorPlacement: function(error, element) {
					$(element).parents('dd').next('dd.v-text')
						.append(error);
				},
			    rules: {
					tel: {
						required: true,
						mobile: true
					},
					code: {
						required: true,
						rangelength: [4,4],
						digits:true
					}
				},
				messages: {
					tel: {
						required: '请输入手机号',
						mobile: '请输入正确有效的手机号码'
					},
					code: {
						required: '请输入验证码',
						rangelength: '验证码错误',
						digits:'验证码错误'
					}
				},
		        submitHandler: function() {
		        	if (me.subType == true) {
		        		me.subType = false;
		        		me.isRight();
		        	};
				}
			});
		},
		//验证第二步
		vation2: function(){
			var me = this;
			me._forget2.validate({
				onkeyup: false,
				errorPlacement: function(error, element) {
					$(element).parents('dd').next('dd.v-text')
						.append(error);
				},
			    rules: {
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
					}
				},
				messages: {
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
					}
				},
		        submitHandler: function() {
					if (me.subType == true) {
		        		me.subType = false;
		        		me.rsaKey();
		        	};
				}
			});
		},
		//事件
		events: function(){
			var me = this;
		}
	}
	register.init();
});*/
