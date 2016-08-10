webpackJsonp([0,4],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	!/* require */(/* empty */function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [!(function webpackMissingModule() { var e = new Error("Cannot find module \"jquery\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module \"validate\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module \"vdate\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module \"md5\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module \"RSA\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()), !(function webpackMissingModule() { var e = new Error("Cannot find module \"TZB\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())]; (function($, validate, vdate, md5, RSA, TZB){
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
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}());

/***/ }
]);