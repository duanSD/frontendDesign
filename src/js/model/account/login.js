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
var doc=$(document.body);
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

});
