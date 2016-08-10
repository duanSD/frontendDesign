require("../../../css/model/public.less");
require("../../../css/model/index.less");
require("../../../css/model/enter.less");

var avalon=require("../../lib/avalon/main");
require("../../components/md5/md5")
var RSA=require("../../components/rsa/RSA");
require("../../components/store/avalon.store")
var config=require("../../lib/units/b2bconfig")
require("../../useComponents/header/header");
require("../../useComponents/menu-index/menu-index")
require("../../useComponents/footer/footer")
/*require("mmAnimate");
 require("mmRouter");*/

/*var button=require("../components/button-test/button");
 var panel=require("../components/panel-test/panel");
 var uptop=require("../components/uptop/avalon2.uptop");*/
var vm=avalon.define({
	$id: "index",
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



require(['jquery', 'TZB', 'Clipboard'], function($, TZB, Clipboard){
	var index = {
		userId: TZB.userInfor.userID,
		store:TZB.store,
		_tab: $('#tab'),
		_userNews: $('#user-news'),
		_userCancle: $('#user-cancle'),
		_userAdd: $('#user-add'),
		_userAll: $('#user-all'),
		_activity: $('#activity'),
		_header:$("#nav-header"),
		_pageType: false,
		dialog: new TZB.Dialog({
			text: '请确认操作'
		}),
		init: function(){
			var me = index;
			me.getFans(1);
			me.getCoupon(1);
			me.events();
			me.getsales();
		},
		getsales:function(){
			//debugger;
			var me = index;
			var role = me.store.get('role');
			var type;
			var objId;
			if(role ==1){
				type=1;
				objId=me.store.get('shopId');
			}else if(role ==0 || role ==2){
				type=2;
				objId=me.userId;
			}
			//shopId = TZB.shopId;
			//http://192.168.3.58:18081:18081/order/salesdata/sXRKQiXyQHS-QwJrXOQy6w
			aUrl = TZB.hostOrder+"/order/salesdata/"+objId+"/"+type;
			$.ajax({
				type : 'get',
				url : aUrl,
				contentType:"application/json;charset=utf-8",
				dataType:"json",
				//data: aData,
				success : function(res){
					//ret = $.parseJSON(ret);
					if (res.isSuccess == 1) {
						//me.fansHtml(ret.msg)
						saledata = res.data;
						$('#todoVerify').html(saledata.todoVerify);
						$('#todayOrder').html(saledata.todayOrder);
						$('#todayVolume').html(saledata.todayVolume);
						$('#goodsQty').html(saledata.goodsQty);
						$('#memberQty').html(saledata.memberQty);
						$('#distributionQty').html(saledata.distributionQty);
					}else{
						me.dialog.open({
							type: 0,
							canText: '关闭',
							text: '服务器异常，请重试'
						})
					}
				},
				error: function(){
					me.dialog.open({
						type: 0,
						canText: '关闭',
						text: '服务器异常，请重试'
					})
				}
			})
		},
		//获取粉丝
		getFans: function(date){
			var me = index;

			var aUrl = TZB.hoststro +'/api/pub/?action=get_statistics';
            var aData = { 
                userId: me.userId,
                day: date
            }
            $.ajax({
                type : 'POST',
                url : aUrl,
                data: aData,
                success : function(ret){
                	ret = $.parseJSON(ret);
                    if (ret.status == 1) {
                    	me.fansHtml(ret.msg)
                    }
                },
                error: function(){
                    me.dialog.open({
                    	type: 0,
                    	canText: '关闭',
                    	text: '服务器异常，请重试'
                    })
                }
            })
		},
		//获取优惠券列表
		getCoupon: function(page){
			var me = index;

			var aUrl = TZB.couService +'/coupon/list';
            var aData = JSON.stringify({
            	id: TZB.shopId,
            	name: me._nameVal,
                status: me._statusVal,
                pageNum: page,
                pageSize: 20
            })
            $.ajax({
                type : 'POST',
                url : aUrl,
                data: aData,
                dataType: 'json',
	            contentType:  'application/json;charset=utf-8',
            	beforeSend: function(xhr){
            		xhr.setRequestHeader('token',TZB.userInfor.token);
            	},
                success : function(ret){
                    if (ret.isSuccess == 1) {
                    	var _list = ret.data.params;
            			var _len = _list.length;
            			if (_len == 0) {
            				me._activity.html('<tr><td class="tac" colspan="7">没有相关数据</td></tr>');
            				$('#page').html('');
            			}else{
            				me.couponHtml(ret.data);
	                    	if (page == 1 && me._pageType == false) {
	                    		me._pageType == true
	                            var pageList = new TZB.Page({
	                                ui: $('#page'),
	                                pagesPage: 1,
	                                pagesMax: ret.data.pages,
	                                callBack: me.getCoupon
	                            });
	                            pageList.init()
	                        }; 
            			}
                    }else{
                    	me._activity.html('<tr><td class="tac" colspan="6">没有相关数据</td></tr>');
                    }
                },
                error: function(){
                    me.dialog.open({
                    	type: 0,
                    	canText: '关闭',
                    	text: '服务器异常，请重试'
                    })
                }
            })
		},
		//优惠券demo
		couponHtml: function(data){
			var me = index;
            var _data = data.params;
            var _len = _data.length;

			//活动数据
			var _activityHtml = '';
			for (var i = 0; i < _len; i++) {
				var _dI = _data[i];
				//停用状态
				//开始状态
				_activityHtml += '<tr>'
					+'<td class="action"><a class="event" href="seo.coupondetail.html?nav=seo&menu=coupon&lq='+_dI.lqnumber+'&id='+_dI.cp_couponInfoID+'">'+_dI.cp_couponName+'</a></td>'
					+'<td>'+_dI.cp_startTime+'至<br>'+_dI.cp_endTime+'</td>'
					+'<td>'+(_dI.cp_isStop == 1?'停用':_dI.status)+'</td>'
					+'<td>'+_dI.cp_total+'</td>'
					+'<td>'+_dI.lqnumber+'</td>'
					+'<td>'+_dI.hxnumber+'</td>'
					+'<td class="action">'
					var _codeUrl = TZB.hoststro+'/api/auth/userauth.php?action=get_userInfo&userId='+me.userId+'&reurl='+encodeURIComponent(TZB.hostName+'/html/web/coupon.html?userId='+TZB.shopId+'&couponId='+_dI.cp_couponInfoID);
					switch(_dI.cp_isStop){
						case '0': //启用中
						_dI.classStop = '';
						_dI.textStop = '停用';
						break;
						case '1': //停用中
						_dI.classStop = ' default';
						_dI.textStop = '启用';
						break;
					}

					switch(_dI.status){
						case '未开始':
						_activityHtml +='<span class="event'+_dI.classStop+' jsedit" data-type="url" data-id="'+_dI.cp_couponInfoID+'" data-url="'+_codeUrl+'">URL</span>'
							+'<a class="event" href="seo.couponadd.html?nav=seo&menu=coupon&type=edit&lq='+_dI.lqnumber+'&id='+_dI.cp_couponInfoID+'">编辑</a>'
							+'<span class="event default" data-type="off" data-id="'+_dI.cp_couponInfoID+'">核销</span>'
							+'<span class="event'+_dI.classStop+' jsedit" data-type="stop" data-id="'+_dI.cp_couponInfoID+'" data-stop="'+_dI.cp_isStop+'">'+_dI.textStop+'</span>'
						break;

						case '进行中':
						_activityHtml += '<span class="event'+_dI.classStop+' jsedit" data-type="url" data-id="'+_dI.cp_couponInfoID+'" data-url="'+_codeUrl+'">URL</span>'
							+'<span class="event default">编辑</span>'	
						if (_dI.cp_total == _dI.hxnumber) {
							_activityHtml += '<span class="event default" data-type="off" data-id="'+_dI.cp_couponInfoID+'">核销</span>'
						}else{
							_activityHtml +='<a class="event" href="seo.track.html?nav=seo&menu=track&type=1&id='+_dI.cp_couponInfoID+'">核销</a>'
						}
						_activityHtml += '<span class="event jsedit" data-type="stop" data-id="'+_dI.cp_couponInfoID+'" data-stop="'+_dI.cp_isStop+'">'+_dI.textStop+'</span>'
						break;

						case '已结束':
						_activityHtml +='<span class="event'+_dI.classStop+' default" data-type="url" data-id="'+_dI.cp_couponInfoID+'" data-url="'+_codeUrl+'">URL</span>'
							+'<span class="event default">编辑</span>'
							+'<span class="event default" data-type="off" data-id="'+_dI.cp_couponInfoID+'">核销</span>'
							+'<span class="event default" data-type="stop" data-id="'+_dI.cp_couponInfoID+'" data-stop="'+_dI.cp_isStop+'">'+_dI.textStop+'</span>'
						break;
					}
				_activityHtml += '</td>'
				+'</tr>'
			};
			me._activity.html(_activityHtml)
		},
		//概况demo
		fansHtml: function(data){
			var me = index;
			me._userNews.html(data.add_num)
			me._userCancle.html(data.cancel_num)
			me._userAdd.html(data.jing_num)
			me._userAll.html(data.total_num)
		},
		//停用
		stop: function(obj){
			var me = index;

			var _e = obj.ele;
			var _eStop = _e.attr('data-stop');
			var _eText = '';
			switch(_eStop){
				case '0': //启用中改停用
				_eStop = '1';
				_eText = '启用';
				_eTextTips = '已停用';
				break;

				case '1': //停用中改启用
				_eStop = '0';
				_eText = '停用';
				_eTextTips = '已启用';
				break;
			}
			var aUrl = TZB.couService +'/coupon';
			var aData = JSON.stringify({
				couponInfoID: obj.id,
				isStop: _eStop
			})
            $.ajax({
                type : 'PUT',
                url : aUrl,
                data: aData,
                dataType: 'json',
	            contentType:  'application/json;charset=utf-8',
            	beforeSend: function(xhr){
            		xhr.setRequestHeader('token',TZB.userInfor.token);
            	},
                success : function(ret){
                    if (ret.isSuccess == 1) {
                    	_e.html(_eText);
                    	_e.attr('data-stop', _eStop);
                    	var _eUrl = _e.siblings('[data-type="url"]');
                    	switch(_eStop){
                    		case '0': //已启用
                    		_eUrl.removeClass('default');
                    		_eUrl.addClass('jsedit');
                    		break;

                    		case '1': //已停用
                    		_eUrl.removeClass('jsedit');
                    		_eUrl.addClass('default');
                    		break; 
                    	}
                    	me.dialog.open({
                    		type: 0,
	                    	text: _eTextTips,
	                    	canText: '关闭'
	                    })
                    }else{
                    	me.dialog.open({
	                    	text: '停用失败，请重试',
	                    	canText: '关闭'
	                    })
                    }
                },
                error: function(){
                    me.dialog.open({
                    	type: 0,
                    	canText: '关闭',
                    	text: '服务器异常，请重试'
                    })
                }
            })
		},
		//事件
		openUrl: function(obj,position){
			var me = index;
			var clipboard = null;
			if ($('.pop-url')) {
				$('.pop-url').remove();
			};
			var _html = '<div class="pop-url fn-c" style="left:'+(position.left-370)+'px;top:'+position.top+'px;">'
				+'<img src="'+TZB.couService+'/coupon/code?url='+encodeURIComponent(obj.url)+'">'
				+'<div class="text">'
					+'<p id="copyURL">'+obj.url+'</p>'
					+'<a class="btn btn-orange-30 w-80" id="copyBtn" data-clipboard-action="copy" data-clipboard-target="#copyURL">复制链接</a>'
				+'</div>'
			+'</div>';
			$('body').append(_html);

			clipboard = new Clipboard('#copyBtn');

			// $('a[copy-id]').zclip({ 
			// 	path:'../js/plugins/zclip/ZeroClipboard.swf',
			// 	copy: function () { 
			// 	    return $(this.getAttribute('copy-id')).html(); 
			// 	} 
			// });
		},
		events: function(){
			var me = index;
			//切换
			me._tab.on('click', function(e) {
				var _e = $(e.target);
				_e.siblings('a.on').removeClass('on');
				_e.addClass('on');
				me.getFans(_e.attr('data-date'))
			});
			//操作
			me._activity.on('click', function(e) {
				var _e = $(e.target);
				if (_e.hasClass('jsedit') && !_e.hasClass('default')) {
					var _eId = _e.attr('data-id');
					var _eType = _e.attr('data-type');
					if (_eType == 'url') {
						me.openUrl({'url':_e.attr('data-url')},_e.position());
					}else{
						var _eText = '请确认操作'
						if(_eType == 'stop'){
							var _eStopType = _e.attr('data-stop');
							switch(_eStopType){
								case '0':
								var _eTextTips = '是否确定停用？'
								break;

								case '1':
								var _eTextTips = '是否确定启用？'
								break;
							}
						}
						me.dialog.open({
							type: 1,
							text: _eTextTips,
				        	fnConfirm: me[_eType],
				        	fnConfirmP: {
				        		ele: _e,
				        		id: _eId
				        	}
						})
					}
				};
			});
			//body
			$('body').on('click', function(e) {
				var _e = $(e.target);
				if (!(_e.attr('data-type') == 'url')) {
					if (!(_e.hasClass('pop-url') || _e.parents('.pop-url').hasClass('pop-url'))) {
						if ($('.pop-url')) {
							$('.pop-url').remove();
						};	
					};
				};
			});
		}
	}
	index.init();
});