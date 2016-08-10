webpackJsonp([1,4],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../css/model/public.less\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../css/model/account.less\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

	var avalon=__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"main\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../components/md5/md5\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	var RSA=__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../components/rsa/RSA\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../components/store/avalon.store\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	var config=__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../lib/units/b2bconfig\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../useComponents/footer-account/footer\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()))
	/*require("mmAnimate");
	 require("mmRouter");*/

	/*var button=require("../components/button-test/button");
	 var panel=require("../components/panel-test/panel");
	 var uptop=require("../components/uptop/avalon2.uptop");*/
	var vm=avalon.define({
	    $id: "login",
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
	            url:'/ssoService/b2bLogin',
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
	                    //avalon.store.set('shopId',userData.shopID);
	                    /*//单点传输存储信息
	                     singLogin.login({
	                     domainNow: TZB.hostName,
	                     data: userData
	                     });*/
	                }else{
	                    avalon.store.set('userInfor',userData);
	                    //avalon.store.set('shopId',userData.shopID);
	                }

	                //location.href="index.html";
	            }else if(ret.isSuccess == 0){
	                vm.vdtCon= '账号或密码错误'
	                vm.vdtToggle=true;
	            }

	        }).fail(function() {
	            vm.vdtCon= '服务异常，请重试'
	            vm.vdtToggle=true;
	        })

	    },
	    //验证对象
	    validateLogin: {
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

	})

	/*



	require(['jquery', 'cookie', 'vdate', 'singLogin', 'md5', 'RSA', 'TZB'], function($, cookie, vdate, singLogin, md5, RSA, TZB){
		var login = {
			_tips: $('#tips'),
			_name: $('#name'),
			_nameVal: '',
			_paw: $('#password'),
			_pawVal: '',
			_submit: $('#submit'),
			_auto: $('#auto'),
			_autoVal: '',
			store:TZB.store,
			rsaKey: null,
			init: function(){
				var me = this;
				// console.log(TZB.user())//获取本地用户信息
				if (TZB.userInfor) {
					
				};
				me.vation();
			},
			vation: function(){
				var me = this;
				me._submit.click(function(e) {
					// e.preventDefault();
					//验证用户名
					me._nameVal = me._name.val();
					
					if (me._nameVal.length < 1) {
						me._tips.html('请输入手机号或登录名');
						return;
					}/!*else if(!new RegExp(vdate.vRegExp.mobile).test(me._nameVal)){
						me._tips.html('请输入正确的手机号');
						return;
					}*!/

					//验证密码
					me._pawVal = me._paw.val();
					if (me._pawVal.length < 1) {
						me._tips.html('请输入密码');
						return;
					}else if (me._pawVal.length < 6 || me._pawVal.length > 16) {
						me._tips.html('请输入6-16位密码');
						return;
					}else if(!/^(?=.*[a-zA-Z]+)(?=.*[0-9]+)[a-zA-Z0-9]+$/.test(me._pawVal)){
						me._tips.html('密码格式错误');
						return;
					}

					me._tips.html('');
					if (me._auto.is(':checked')) {
						me._autoVal = 3;
					}else{
						me._autoVal = 0;
					}
					$.ajax({
						type : 'GET',
						url : TZB.ssoService + '/rasKey',
						contentType: "application/json",
						success : function(ret) {
	                        if (ret.isSuccess == 1) {
	                            me.rsaData = ret.data;
	                            setMaxDigits(130);
	                            var key = new RSAKeyPair(me.rsaData.exponent,'',me.rsaData.modulus);
	                            me._pawVal = encryptedString(key,$.md5(me._pawVal));//对密码加密
	                            var userInfor = JSON.stringify({
	                                userName: me._nameVal,//用户名
	                                passWord: me._pawVal,//密码
	                                expireDate: me._autoVal,//自动登录天数
	                                rasId: me.rsaData.rasId//rsaId
	                            });
	                            me.loginFn(userInfor)
	                        }else{
	                            me._tips.html('服务异常，请重试');
	                            return;
	                        }
	                    }

					})
					/!*$.get(TZB.ssoService + '/rasKey', function(ret){
						if (ret.isSuccess == 1) {
							me.rsaData = ret.data;
	            			setMaxDigits(130);
	            			var key = new RSAKeyPair(me.rsaData.exponent,'',me.rsaData.modulus);
	           				me._pawVal = encryptedString(key,$.md5(me._pawVal));//对密码加密
	           				var userInfor = JSON.stringify({
					            	userName: me._nameVal,//用户名
					            	passWord: me._pawVal,//密码
					            	expireDate: me._autoVal,//自动登录天数
					            	rasId: me.rsaData.rasId//rsaId
					            });
			        		me.loginFn(userInfor)
						}else{
							me._tips.html('服务异常，请重试');
							return;
						}
	        		});*!/
				});
			},
			//登录
			loginFn: function(data){
				var me = this;
				$.ajax({
		            type : 'POST',
		            url : TZB.ssoService +'/login',
		            data: data,
	                contentType: "application/json;charset=UTF-8",
		            success : function(ret){
						if(ret.isSuccess == 1){
							var role = ret.data.role;
						}
		            	//存储用户名
		            	if (ret.isSuccess == 1 &&(role ==0 || role == 1 || role == 2 || role ==8)) {
		            		//var userData = JSON.stringify(ret.data);
							var userData=ret.data;
		            		if (me._autoVal == 3) {
								me.store.set('userInfor',userData);
								me.store.set('shopId',userData.shopID);
								me.store.set('role',userData.role);
			            		//单点传输存储信息
							  	singLogin.login({
							  		domainNow: TZB.hostName, 
							  		data: userData
							  	});
			            	}else{
								me.store.set('userInfor',userData);
								me.store.set('shopId',userData.shopID);
								me.store.set('role',userData.role);
			            	}
							if(role == 8){
								location.href="../applySettled.html?nav";
							}else{
								location.href="../index.html?nav";
							}
		            	}else if(ret.isSuccess == 0){
		            		me._tips.html('账号或密码错误');
		            	}else if(role==7){
							me._tips.html('您没有权限登录此系统');
						}
		            },
		            error: function(){
		            	me._tips.html('服务异常，请重试');
		            }
		        })
			},
			events: function(){
				var me = this;
			}
		} 
		login.init();
	});*/


/***/ }
]);