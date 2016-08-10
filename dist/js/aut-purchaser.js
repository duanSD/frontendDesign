webpackJsonp([4,5],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/6/8.
	 */
	//引入css

	__webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../../css/model/style.css\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var avalon=__webpack_require__(6);
	var config=__webpack_require__(92)
	__webpack_require__(93);
	__webpack_require__(97);
	__webpack_require__(99);
	__webpack_require__(101);
	__webpack_require__(103);
	__webpack_require__(105);
	var companyInfo='';
	var Day=__webpack_require__(115);

	//docm=$(document.body);

	var vm=avalon.define({
	    $id: "aut-purchaser",
	    companyName:'',//公司名称
	    regCapital:0,//注册资本
	    vdtregCapital:'',
	    regNumber:'',//营业执照注册号
	    vdtregNumber:'',
	    creatTime:'',//成立时间
	    vdtcreatTime:'',//成立时间
	    //营业期限
	    startTime:'',//开始时间
	    vdtstartTime:'',//开始时间
	    endTime:'',//结束时间
	    vdtendTime:'',//结束时间
	    legalPerson:'',//法定代表人
	    vdtlegalPerson:'',//法定代表人
	    idNumber:''//法人身份证号
	    ,vdtidNumber:''//法人身份证号

	    ,agree:false
	    ,vdtagree:''

	    ,onwdatePicker:function(e){
	        Day.setday(e.target,'yyyy-MM-dd','2010-01-01','2010-12-30',1);
	    },
	    dialogText:'弹出层提示内容',
	    dialog:{
	        toggle:true
	    },
	    header:{
	        selectNav:'zhgl'
	    },
	    menLeft:{
	        selectindex:3
	    }
	    ,upload:{
	        imgscon:'身份证反面',
	        title:'请上传有最新年检的营业执照副本',//提示标题
	        content:'图片仅支持JPG、GIF、PNG格式，建议图片大小800*600，不<br />超过1MB，文件名称不要使用标点符号及特殊字符'
	    }
	    ,upload1:{
	        imgscon:'身份证正面'

	    }
	    ,upload2:{
	        imgscon:'身份证反面'
	    }
	    ,uploader:{
	        imgscon:'身份证反面'
	    }

	    //验证对象
	    ,validateLogin: {
	        validateInBlur:true,
	        onError: function (reasons) {
	            var vm=avalon.vmodels['aut-purchaser'];
	            reasons.forEach(function (reason) {
	                var key='vdt'+reason.element.id;
	                vm[key]=reason.getMessage();
	            })
	        },
	        onSuccess:function(reasons){
	            var vm=avalon.vmodels['aut-purchaser'];
	            var key='vdt'+this.id;
	            vm[key]='';
	            reasons.forEach(function (reason) {
	                var key='vdt'+reason.element.id;
	                vm[key]='';
	            })
	        },
	        onValidateAll: function (reasons) {
	            var vm=avalon.vmodels['aut-purchaser'];
	            reasons.forEach(function (reason) {
	                var key='vdt'+reason.element.id;
	                vm[key]=reason.getMessage();
	            })
	            if (reasons.length) {
	                console.log('有表单没有通过')
	            } else {
	                console.log('全部通过')
	                avalon.ajax({
	                    url:'/ssoService/companyInformation',
	                    type: 'POST',
	                    data:JSON.stringify({

	                    }),
	                    cache: true,
	                    dataType:'json'
	                }).done(function(ret) {
	                    if (ret.data == 1) {

	                    }else{
	                        vm.errMsg= '验证码错误'
	                    }
	                }).fail(function() {
	                    vm.errMsg= '服务异常，请重试'
	                });

	            }
	            location.href='pinpairenzheng-succeed.html'
	        }
	    }
	});

	avalon.ajax({
	    url: '/ssoService/companyInformation/'+avalon.store.get('userInfor')['userID'],
	    type: 'get',
	    cache: true,
	    dataType:'json'
	}).done(function(ret) {
	    if (ret.isSuccess == 1) {
	        me.rsaData = ret.data;
	        Rsa.setMaxDigits(130);
	        var key = new Rsa.RSAKeyPair(me.rsaData.exponent,'',me.rsaData.modulus);
	        me._pawVal = Rsa.encryptedString(key,avalon.md5(vm._pawVal));//对密码加密
	        me.loginFn();
	    }else{
	        me.subType = true;
	        return;
	    }
	}).fail(function() {
	    vm.errMsg= '服务异常，请重试'
	})



/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/6/7.
	 */

	var avalon=__webpack_require__(7);
	__webpack_require__(88);
	__webpack_require__(89);
	__webpack_require__(90);
	__webpack_require__(91);

	//require('./mmRouter');
	//require('./mmState');

	module.exports=avalon;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	
	var avalon = __webpack_require__(8) //这个版本兼容IE6

	__webpack_require__(15)
	__webpack_require__(21)
	__webpack_require__(26)
	__webpack_require__(42)
	__webpack_require__(73)
	avalon.onComponentDispose = __webpack_require__(80)
	__webpack_require__(82)

	module.exports = avalon




/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	
	__webpack_require__(9)
	var avalon = __webpack_require__(10)
	var browser = __webpack_require__(11)

	avalon.shadowCopy(avalon, browser)

	__webpack_require__(12)
	__webpack_require__(13)
	__webpack_require__(14)

	module.exports = avalon

/***/ },
/* 9 */
/***/ function(module, exports) {

	
	/**
	 * 此模块不依赖任何模块,用于修复语言的底层缺陷
	 */

	var ohasOwn = Object.prototype.hasOwnProperty

	if (!'司徒正美'.trim) {
	    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
	    String.prototype.trim = function () {
	        return this.replace(rtrim, '')
	    }
	}
	var hasDontEnumBug = !({
	    'toString': null
	}).propertyIsEnumerable('toString'),
	        hasProtoEnumBug = (function () {
	        }).propertyIsEnumerable('prototype'),
	        dontEnums = [
	            'toString',
	            'toLocaleString',
	            'valueOf',
	            'hasOwnProperty',
	            'isPrototypeOf',
	            'propertyIsEnumerable',
	            'constructor'
	        ],
	        dontEnumsLength = dontEnums.length;
	if (!Object.keys) {
	    Object.keys = function (object) { //ecma262v5 15.2.3.14
	        var theKeys = []
	        var skipProto = hasProtoEnumBug && typeof object === 'function'
	        if (typeof object === 'string' || (object && object.callee)) {
	            for (var i = 0; i < object.length; ++i) {
	                theKeys.push(String(i))
	            }
	        } else {
	            for (var name in object) {
	                if (!(skipProto && name === 'prototype') &&
	                        ohasOwn.call(object, name)) {
	                    theKeys.push(String(name))
	                }
	            }
	        }

	        if (hasDontEnumBug) {
	            var ctor = object.constructor,
	                    skipConstructor = ctor && ctor.prototype === object
	            for (var j = 0; j < dontEnumsLength; j++) {
	                var dontEnum = dontEnums[j]
	                if (!(skipConstructor && dontEnum === 'constructor') && ohasOwn.call(object, dontEnum)) {
	                    theKeys.push(dontEnum)
	                }
	            }
	        }
	        return theKeys
	    }
	}
	if (!Array.isArray) {
	    Array.isArray = function (a) {
	        return Object.prototype.toString.call(a) === '[object Array]'
	    }
	}

	if (!Array.isArray.bind) {
	    Function.prototype.bind = function (scope) {
	        if (arguments.length < 2 && scope === void 0)
	            return this
	        var fn = this,
	                argv = arguments
	        return function () {
	            var args = [],
	                    i
	            for (i = 1; i < argv.length; i++)
	                args.push(argv[i])
	            for (i = 0; i < arguments.length; i++)
	                args.push(arguments[i])
	            return fn.apply(scope, args)
	        }
	    }
	}
	//https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
	/**
	* Shim for "fixing" IE's lack of support (IE < 9) for applying slice
	* on host objects like NamedNodeMap, NodeList, and HTMLCollection
	* (technically, since host objects have been implementation-dependent,
	* at least before ES6, IE hasn't needed to work this way).
	* Also works on strings, fixes IE < 9 to allow an explicit undefined
	* for the 2nd argument (as in Firefox), and prevents errors when
	* called on other DOM objects.
	*/

	var _slice = Array.prototype.slice
	try {
	    // Can't be used with DOM elements in IE < 9
	    _slice.call(document.documentElement)
	} catch (e) { // Fails in IE < 9
	    // This will work for genuine arrays, array-like objects,
	    // NamedNodeMap (attributes, entities, notations),
	    // NodeList (e.g., getElementsByTagName), HTMLCollection (e.g., childNodes),
	    // and will not fail on other DOM objects (as do DOM elements in IE < 9)
	    Array.prototype.slice = function (begin, end) {
	        // IE < 9 gets unhappy with an undefined end argument
	        end = (typeof end !== 'undefined') ? end : this.length

	        // For native Array objects, we use the native slice function
	        if (Array.isArray(this) ) {
	            return _slice.call(this, begin, end)
	        }

	        // For array like object we handle it ourselves.
	        var i, cloned = [],
	                size, len = this.length

	        // Handle negative value for "begin"
	        var start = begin || 0
	        start = (start >= 0) ? start : len + start

	        // Handle negative value for "end"
	        var upTo = (end) ? end : len
	        if (end < 0) {
	            upTo = len + end
	        }

	        // Actual expected size of the slice
	        size = upTo - start

	        if (size > 0) {
	            cloned = new Array(size)
	            if (this.charAt) {
	                for (i = 0; i < size; i++) {
	                    cloned[i] = this.charAt(start + i)
	                }
	            } else {
	                for (i = 0; i < size; i++) {
	                    cloned[i] = this[start + i]
	                }
	            }
	        }

	        return cloned
	    }
	}

	function iterator(vars, body, ret) {
	    var fun = 'for(var ' + vars + 'i=0,n = this.length; i < n; i++){' +
	            body.replace('_', '((i in this) && fn.call(scope,this[i],i,this))') +
	            '}' + ret
	    /* jshint ignore:start */
	    return Function('fn,scope', fun)
	    /* jshint ignore:end */
	}

	var ap = Array.prototype
	if (!/\[native code\]/.test(ap.map)) {
	    var shim = {
	        //定位操作，返回数组中第一个等于给定参数的元素的索引值。
	        indexOf: function (item, index) {
	            var n = this.length,
	                    i = ~~index
	            if (i < 0)
	                i += n
	            for (; i < n; i++)
	                if (this[i] === item)
	                    return i
	            return -1
	        },
	        //定位操作，同上，不过是从后遍历。
	        lastIndexOf: function (item, index) {
	            var n = this.length,
	                    i = index == null ? n - 1 : index
	            if (i < 0)
	                i = Math.max(0, n + i)
	            for (; i >= 0; i--)
	                if (this[i] === item)
	                    return i
	            return -1
	        },
	        //迭代操作，将数组的元素挨个儿传入一个函数中执行。Prototype.js的对应名字为each。
	        forEach: iterator('', '_', ''),
	        //迭代类 在数组中的每个项上运行一个函数，如果此函数的值为真，则此元素作为新数组的元素收集起来，并返回新数组
	        filter: iterator('r=[],j=0,', 'if(_)r[j++]=this[i]', 'return r'),
	        //收集操作，将数组的元素挨个儿传入一个函数中执行，然后把它们的返回值组成一个新数组返回。Prototype.js的对应名字为collect。
	        map: iterator('r=[],', 'r[i]=_', 'return r'),
	        //只要数组中有一个元素满足条件（放进给定函数返回true），那么它就返回true。Prototype.js的对应名字为any。
	        some: iterator('', 'if(_)return true', 'return false'),
	        //只有数组中的元素都满足条件（放进给定函数返回true），它才返回true。Prototype.js的对应名字为all。
	        every: iterator('', 'if(!_)return false', 'return true')
	    }

	    for (var i in shim) {
	        ap[i] = shim[i]
	    }
	}
	module.exports = {}

/***/ },
/* 10 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {//avalon的核心,这里都是一些不存在异议的*核心*方法与属性
	function avalon(el) {
	    return new avalon.init(el)
	}

	global.avalon = avalon
	if(typeof window !== 'undefined'){
	    window.avalon = avalon
	}

	avalon.init = function (el) {
	    this[0] = this.element = el
	}

	avalon.fn = avalon.prototype = avalon.init.prototype


	avalon.shadowCopy = function (destination, source) {
	    for (var property in source) {
	        destination[property] = source[property]
	    }
	    return destination
	}

	var rword = /[^, ]+/g

	var hasConsole = global.console

	avalon.shadowCopy(avalon, {
	    noop: function () {
	    },
	    //切割字符串为一个个小块，以空格或逗号分开它们，结合replace实现字符串的forEach
	    rword: rword,
	    inspect: ({}).toString,
	    ohasOwn: ({}).hasOwnProperty,
	    log: function () {
	        if (hasConsole && avalon.config.debug) {
	            // http://stackoverflow.com/questions/8785624/how-to-safely-wrap-console-log
	            Function.apply.call(console.log, console, arguments)
	        }
	    },
	    warn: function () {
	        if (hasConsole && avalon.config.debug) {
	            var method = console.warn || console.log
	            // http://qiang106.iteye.com/blog/1721425
	            Function.apply.call(method, console, arguments)
	        }
	    },
	    error: function (str, e) {
	        throw (e || Error)(str)
	    },
	    //将一个以空格或逗号隔开的字符串或数组,转换成一个键值都为1的对象
	    oneObject: function (array, val) {
	        if (typeof array === 'string') {
	            array = array.match(rword) || []
	        }
	        var result = {},
	                value = val !== void 0 ? val : 1
	        for (var i = 0, n = array.length; i < n; i++) {
	            result[array[i]] = value
	        }
	        return result
	    }

	})

	module.exports = avalon
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 11 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var window = global
	var browser = {
	    window: window,
	    document: {//方便在nodejs环境不会报错
	        createElement: function () {
	            return {}
	        },
	        createElementNS: function(){
	            return {}
	        },
	        contains: Boolean
	    },
	    root: {
	        outerHTML: 'x'
	    },
	    msie: NaN,
	    modern: true,
	    avalonDiv: {},
	    avalonFragment: null
	}

	if(window.location && window.navigator && window.window){
	    var document = window.document
	    browser.document = document
	    browser.modern = window.dispatchEvent
	    browser.root = document.documentElement
	    browser.avalonDiv = document.createElement('div')
	    browser.avalonFragment = document.createDocumentFragment()
	    if (window.VBArray) {
	        browser.msie = document.documentMode || (window.XMLHttpRequest ? 7 : 6)
	    }
	}


	module.exports = browser
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 12 */
/***/ function(module, exports) {

	//这里放置存在异议的方法

	var serialize = avalon.inspect
	var rwindow = /^\[object (?:Window|DOMWindow|global)\]$/
	var rnative = /\[native code\]/ //判定是否原生函数
	var rarraylike = /(Array|List|Collection|Map|Arguments)\]$/
	var ohasOwn = avalon.ohasOwn
	// avalon.quote
	//https://github.com/bestiejs/json3/blob/master/lib/json3.js
	var Escapes = {
	    92: "\\\\",
	    34: '\\"',
	    8: "\\b",
	    12: "\\f",
	    10: "\\n",
	    13: "\\r",
	    9: "\\t"
	}

	// Internal: Converts `value` into a zero-padded string such that its
	// length is at least equal to `width`. The `width` must be <= 6.
	var leadingZeroes = "000000"
	var toPaddedString = function (width, value) {
	    // The `|| 0` expression is necessary to work around a bug in
	    // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
	    return (leadingZeroes + (value || 0)).slice(-width)
	};
	var unicodePrefix = "\\u00"
	var escapeChar = function (character) {
	    var charCode = character.charCodeAt(0), escaped = Escapes[charCode]
	    if (escaped) {
	        return escaped
	    }
	    return unicodePrefix + toPaddedString(2, charCode.toString(16))
	};
	var reEscape = /[\x00-\x1f\x22\x5c]/g
	function quote(value) {
	    reEscape.lastIndex = 0
	    return '"' + ( reEscape.test(value)? String(value).replace(reEscape, escapeChar) : value ) + '"'
	}

	avalon.quote = typeof JSON !== 'undefined' ? JSON.stringify : quote

	// avalon.type
	var class2type = {}
	'Boolean Number String Function Array Date RegExp Object Error'.replace(avalon.rword, function (name) {
	    class2type['[object ' + name + ']'] = name.toLowerCase()
	})

	avalon.type = function (obj) { //取得目标的类型
	    if (obj == null) {
	        return String(obj)
	    }
	    // 早期的webkit内核浏览器实现了已废弃的ecma262v4标准，可以将正则字面量当作函数使用，因此typeof在判定正则时会返回function
	    return typeof obj === 'object' || typeof obj === 'function' ?
	            class2type[serialize.call(obj)] || 'object' :
	            typeof obj
	}

	var rfunction = /^\s*\bfunction\b/

	avalon.isFunction = typeof alert === 'object' ? function (fn) {
	    try {
	        return rfunction.test(fn + '')
	    } catch (e) {
	        return false
	    }
	} : function (fn) {
	    return serialize.call(fn) === '[object Function]'
	}

	avalon.isWindow = function (obj) {
	    if (!obj)
	        return false
	    // 利用IE678 window == document为true,document == window竟然为false的神奇特性
	    // 标准浏览器及IE9，IE10等使用 正则检测
	    return obj == obj.document && obj.document != obj //jshint ignore:line
	}


	function isWindow(obj) {
	    return rwindow.test(serialize.call(obj))
	}

	if (isWindow(avalon.window)) {
	    avalon.isWindow = isWindow
	}

	var enu, enumerateBUG
	for (enu in avalon({})) {
	    break
	}
	enumerateBUG = enu !== '0' //IE6下为true, 其他为false

	/*判定是否是一个朴素的javascript对象（Object），不是DOM对象，不是BOM对象，不是自定义类的实例*/
	avalon.isPlainObject = function (obj, key) {
	    if (!obj || avalon.type(obj) !== 'object' || obj.nodeType || avalon.isWindow(obj)) {
	        return false
	    }
	    try { //IE内置对象没有constructor
	        if (obj.constructor &&
	                !ohasOwn.call(obj, 'constructor') &&
	                !ohasOwn.call(obj.constructor.prototype || {}, 'isPrototypeOf')) {
	            return false
	        }
	    } catch (e) { //IE8 9会在这里抛错
	        return false
	    }
	    if (enumerateBUG) {
	        for (key in obj) {
	            return ohasOwn.call(obj, key)
	        }
	    }
	    for (key in obj) {
	    }
	    return key === void 0 || ohasOwn.call(obj, key)
	}


	if (rnative.test(Object.getPrototypeOf)) {
	    avalon.isPlainObject = function (obj) {
	        // 简单的 typeof obj === 'object'检测，会致使用isPlainObject(window)在opera下通不过
	        return serialize.call(obj) === '[object Object]' &&
	                Object.getPrototypeOf(obj) === Object.prototype
	    }
	}

	//与jQuery.extend方法，可用于浅拷贝，深拷贝
	avalon.mix = avalon.fn.mix = function () {
	    var options, name, src, copy, copyIsArray, clone,
	            target = arguments[0] || {},
	            i = 1,
	            length = arguments.length,
	            deep = false

	    // 如果第一个参数为布尔,判定是否深拷贝
	    if (typeof target === 'boolean') {
	        deep = target
	        target = arguments[1] || {}
	        i++
	    }

	    //确保接受方为一个复杂的数据类型
	    if (typeof target !== 'object' && !avalon.isFunction(target)) {
	        target = {}
	    }

	    //如果只有一个参数，那么新成员添加于mix所在的对象上
	    if (i === length) {
	        target = this
	        i--
	    }

	    for (; i < length; i++) {
	        //只处理非空参数
	        if ((options = arguments[i]) != null) {
	            for (name in options) {
	                try {
	                    src = target[name]
	                    copy = options[name] //当options为VBS对象时报错
	                } catch (e) {
	                    continue
	                }

	                // 防止环引用
	                if (target === copy) {
	                    continue
	                }
	                if (deep && copy && (avalon.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {

	                    if (copyIsArray) {
	                        copyIsArray = false
	                        clone = src && Array.isArray(src) ? src : []

	                    } else {
	                        clone = src && avalon.isPlainObject(src) ? src : {}
	                    }

	                    target[name] = avalon.mix(deep, clone, copy)
	                } else if (copy !== void 0) {
	                    target[name] = copy
	                }
	            }
	        }
	    }
	    return target
	}

	/*判定是否类数组，如节点集合，纯数组，arguments与拥有非负整数的length属性的纯JS对象*/
	function isArrayLike(obj) {
	    if (!obj)
	        return false
	    var n = obj.length
	    if (n === (n >>> 0)) { //检测length属性是否为非负整数
	        var type = serialize.call(obj).slice(8, -1)
	        if (rarraylike.test(type))
	            return false
	        if (type === 'Array')
	            return true
	        try {
	            if ({}.propertyIsEnumerable.call(obj, 'length') === false) { //如果是原生对象
	                return rfunction.test(obj.item || obj.callee)
	            }
	            return true
	        } catch (e) { //IE的NodeList直接抛错
	            return !obj.window //IE6-8 window
	        }
	    }
	    return false
	}


	avalon.each = function (obj, fn) {
	    if (obj) { //排除null, undefined
	        var i = 0
	        if (isArrayLike(obj)) {
	            for (var n = obj.length; i < n; i++) {
	                if (fn(i, obj[i]) === false)
	                    break
	            }
	        } else {
	            for (i in obj) {
	                if (obj.hasOwnProperty(i) && fn(i, obj[i]) === false) {
	                    break
	                }
	            }
	        }
	    }
	}

	module.exports = {
	    avalon: avalon,
	    isArrayLike: isArrayLike
	}



/***/ },
/* 13 */
/***/ function(module, exports) {

	var cssHooks = {}
	var rhyphen = /([a-z\d])([A-Z]+)/g
	var rcamelize = /[-_][^-_]/g
	var rhashcode = /\d\.\d{4}/
	var rescape = /[-.*+?^${}()|[\]\/\\]/g

	var _slice = [].slice
	function defaultParse(cur, pre, binding) {
	       cur[binding.name] = avalon.parseExpr(binding)
	}
	avalon.shadowCopy(avalon, {
	    caches: {}, //avalon2.0 新增
	    vmodels: {},
	    filters: {},
	    components: {},//放置组件的类
	    directives: {},
	    eventHooks: {},
	    eventListeners: {},
	    validators: {},
	    scopes: {},
	    cssHooks: cssHooks,
	    parsers: {
	        number: function (a) {
	            return a === '' ? '' : /\d\.$/.test(a) ? a : parseFloat(a) || 0
	        },
	        string: function (a) {
	            return a === null || a === void 0 ? '' : a + ''
	        },
	        boolean: function (a) {
	            if(a === '')
	                return a
	            return a === 'true'|| a == '1'
	        }
	    },
	    version: "2.18",
	    slice: function (nodes, start, end) {
	        return _slice.call(nodes, start, end)
	    },
	    css: function (node, name, value, fn) {
	        //读写删除元素节点的样式
	        if (node instanceof avalon) {
	            node = node[0]
	        }
	        if(node.nodeType !==1){
	            return
	        }
	        var prop = avalon.camelize(name)
	        name = avalon.cssName(prop) || prop
	        if (value === void 0 || typeof value === 'boolean') { //获取样式
	            fn = cssHooks[prop + ':get'] || cssHooks['@:get']
	            if (name === 'background') {
	                name = 'backgroundColor'
	            }
	            var val = fn(node, name)
	            return value === true ? parseFloat(val) || 0 : val
	        } else if (value === '') { //请除样式
	            node.style[name] = ''
	        } else { //设置样式
	            if (value == null || value !== value) {
	                return
	            }
	            if (isFinite(value) && !avalon.cssNumber[prop]) {
	                value += 'px'
	            }
	            fn = cssHooks[prop + ':set'] || cssHooks['@:set']
	            fn(node, name, value)
	        }
	    },
	    directive: function (name, definition) {
	        definition.parse = definition.parse || defaultParse
	        return this.directives[name] = definition
	    },
	    isObject: function (a) {//1.6新增
	        return a !== null && typeof a === 'object'
	    },
	    /* avalon.range(10)
	     => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
	     avalon.range(1, 11)
	     => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	     avalon.range(0, 30, 5)
	     => [0, 5, 10, 15, 20, 25]
	     avalon.range(0, -10, -1)
	     => [0, -1, -2, -3, -4, -5, -6, -7, -8, -9]
	     avalon.range(0)
	     => []*/
	    range: function (start, end, step) { // 用于生成整数数组
	        step || (step = 1)
	        if (end == null) {
	            end = start || 0
	            start = 0
	        }
	        var index = -1,
	                length = Math.max(0, Math.ceil((end - start) / step)),
	                result = new Array(length)
	        while (++index < length) {
	            result[index] = start
	            start += step
	        }
	        return result
	    },
	    hyphen: function (target) {
	        //转换为连字符线风格
	        return target.replace(rhyphen, '$1-$2').toLowerCase()
	    },
	    camelize: function (target) {
	        //提前判断，提高getStyle等的效率
	        if (!target || target.indexOf('-') < 0 && target.indexOf('_') < 0) {
	            return target
	        }
	        //转换为驼峰风格
	        return target.replace(rcamelize, function (match) {
	            return match.charAt(1).toUpperCase()
	        })
	    },
	    //生成UUID http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
	    makeHashCode: function (prefix) {
	        prefix = prefix || 'avalon'
	        return String(Math.random() + Math.random()).replace(rhashcode, prefix)
	    },
	    escapeRegExp: function (target) {
	        //http://stevenlevithan.com/regex/xregexp/
	        //将字符串安全格式化为正则表达式的源码
	        return (target + '').replace(rescape, '\\$&')
	    },
	    Array: {
	        merge: function (target, other) {
	            //合并两个数组 avalon2新增
	            target.push.apply(target, other)
	        },
	        ensure: function (target, item) {
	            //只有当前数组不存在此元素时只添加它
	            if (target.indexOf(item) === -1) {
	                return target.push(item)
	            }
	        },
	        removeAt: function (target, index) {
	            //移除数组中指定位置的元素，返回布尔表示成功与否
	            return !!target.splice(index, 1).length
	        },
	        remove: function (target, item) {
	            //移除数组中第一个匹配传参的那个元素，返回布尔表示成功与否
	            var index = target.indexOf(item)
	            if (~index)
	                return avalon.Array.removeAt(target, index)
	            return false
	        }
	    }
	})

	if(typeof performance !== 'undefined' && performance.now){
	    avalon.makeHashCode = function (prefix) {
	        prefix = prefix || 'avalon'
	        return (prefix + performance.now()).replace('.', '')
	    }
	}

	var UUID = 1
	module.exports = {
	    //生成事件回调的UUID(用户通过ms-on指令)
	    avalon: avalon,
	    getLongID: function (fn) {
	        return fn.uuid || (fn.uuid = avalon.makeHashCode('e'))
	    },
	    //生成事件回调的UUID(用户通过avalon.bind)
	    getShortID: function (fn) {
	        return fn.uuid || (fn.uuid = '_' + (++UUID))
	    }
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	
	function kernel(settings) {
	    for (var p in settings) {
	        if (!avalon.ohasOwn.call(settings, p))
	            continue
	        var val = settings[p]
	        if (typeof kernel.plugins[p] === 'function') {
	            kernel.plugins[p](val)
	        } else if (typeof kernel[p] === 'object') {
	            avalon.shadowCopy(kernel[p], val)
	        } else {
	            kernel[p] = val
	        }
	    }
	    return this
	}

	avalon.config = kernel

	var plugins = {
	    interpolate: function (array) {
	        var openTag = array[0]
	        var closeTag = array[1]
	        /*eslint-disable */
	        if (openTag === closeTag) {
	            throw new SyntaxError('openTag!==closeTag')
	        }
	        var test = openTag + 'test' + closeTag
	        var div = avalon.avalonDiv
	        div.innerHTML = test
	        if (div.innerHTML !== test && div.innerHTML.indexOf('&lt;') > -1) {
	            throw new SyntaxError('此定界符不合法')
	        }
	        div.innerHTML = ''
	        /*eslint-enable */
	        kernel.openTag = openTag
	        kernel.closeTag = closeTag
	        var o = avalon.escapeRegExp(openTag)
	        var c = avalon.escapeRegExp(closeTag)
	        kernel.rexpr = new RegExp(o + '([\\s\\S]*)' + c)
	        kernel.rexprg = new RegExp(o + '([\\s\\S]*)' + c, 'g')
	        kernel.rbind = new RegExp(o + '[\\s\\S]*' + c + '|\\bms-|\\bslot\\b')
	    }
	}
	kernel.plugins = plugins
	avalon.config({
	    interpolate: ['{{', '}}'],
	    debug: true
	})


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	
	var number = __webpack_require__(16)
	var sanitize = __webpack_require__(17)
	var date = __webpack_require__(18)
	var arrayFilters = __webpack_require__(19)
	var eventFilters = __webpack_require__(20)
	var filters = avalon.filters

	function K(a) {
	    return a
	}

	avalon.__format__ = function (name) {
	    var fn = filters[name]
	    if (fn) {
	        return fn.get ? fn.get : fn
	    }
	    return K
	}


	avalon.mix(filters, {
	    uppercase: function (str) {
	        return String(str).toUpperCase()
	    },
	    lowercase: function (str) {
	        return String(str).toLowerCase()
	    },
	    truncate: function (str, length, truncation) {
	        //length，新字符串长度，truncation，新字符串的结尾的字段,返回新字符串
	        length = length || 30
	        truncation = typeof truncation === "string" ? truncation : "..."
	        return str.length > length ?
	                str.slice(0, length - truncation.length) + truncation :
	                String(str)
	    },
	    camelize: avalon.camelize,
	    date: date,
	    escape: avalon.escapeHtml,
	    sanitize: sanitize,
	    number: number,
	    currency: function (amount, symbol, fractionSize) {
	        return (symbol || "\uFFE5") +
	                number(amount,
	                        isFinite(fractionSize) ? fractionSize : 2)
	    }
	}, arrayFilters, eventFilters)


	module.exports = avalon

/***/ },
/* 16 */
/***/ function(module, exports) {

	function number(number, decimals, point, thousands) {
	    //form http://phpjs.org/functions/number_format/
	    //number 必需，要格式化的数字
	    //decimals 可选，规定多少个小数位。
	    //point 可选，规定用作小数点的字符串（默认为 . ）。
	    //thousands 可选，规定用作千位分隔符的字符串（默认为 , ），如果设置了该参数，那么所有其他参数都是必需的。
	    number = (number + '')
	            .replace(/[^0-9+\-Ee.]/g, '')
	    var n = !isFinite(+number) ? 0 : +number,
	            prec = !isFinite(+decimals) ? 3 : Math.abs(decimals),
	            sep = thousands || ",",
	            dec = point || ".",
	            s = '',
	            toFixedFix = function (n, prec) {
	                var k = Math.pow(10, prec)
	                return '' + (Math.round(n * k) / k)
	                        .toFixed(prec)
	            }
	    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
	    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
	            .split('.')
	    if (s[0].length > 3) {
	        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
	    }
	    if ((s[1] || '')
	            .length < prec) {
	        s[1] = s[1] || ''
	        s[1] += new Array(prec - s[1].length + 1)
	                .join('0')
	    }
	    return s.join(dec)
	}

	module.exports = number

	//处理 货币 http://openexchangerates.github.io/accounting.js/

/***/ },
/* 17 */
/***/ function(module, exports) {

	var rscripts = /<script[^>]*>([\S\s]*?)<\/script\s*>/gim
	var ron = /\s+(on[^=\s]+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g
	var ropen = /<\w+\b(?:(["'])[^"]*?(\1)|[^>])*>/ig
	var rsanitize = {
	    a: /\b(href)\=("javascript[^"]*"|'javascript[^']*')/ig,
	    img: /\b(src)\=("javascript[^"]*"|'javascript[^']*')/ig,
	    form: /\b(action)\=("javascript[^"]*"|'javascript[^']*')/ig
	}


	//https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	//    <a href="javasc&NewLine;ript&colon;alert('XSS')">chrome</a> 
	//    <a href="data:text/html;base64, PGltZyBzcmM9eCBvbmVycm9yPWFsZXJ0KDEpPg==">chrome</a>
	//    <a href="jav	ascript:alert('XSS');">IE67chrome</a>
	//    <a href="jav&#x09;ascript:alert('XSS');">IE67chrome</a>
	//    <a href="jav&#x0A;ascript:alert('XSS');">IE67chrome</a>
	module.exports = function sanitize(str) {
	    return str.replace(rscripts, "").replace(ropen, function (a, b) {
	        var match = a.toLowerCase().match(/<(\w+)\s/)
	        if (match) { //处理a标签的href属性，img标签的src属性，form标签的action属性
	            var reg = rsanitize[match[1]]
	            if (reg) {
	                a = a.replace(reg, function (s, name, value) {
	                    var quote = value.charAt(0)
	                    return name + "=" + quote + "javascript:void(0)" + quote// jshint ignore:line
	                })
	            }
	        }
	        return a.replace(ron, " ").replace(/\s+/g, " ") //移除onXXX事件
	    })
	}


/***/ },
/* 18 */
/***/ function(module, exports) {

	/*
	 'yyyy': 4 digit representation of year (e.g. AD 1 => 0001, AD 2010 => 2010)
	 'yy': 2 digit representation of year, padded (00-99). (e.g. AD 2001 => 01, AD 2010 => 10)
	 'y': 1 digit representation of year, e.g. (AD 1 => 1, AD 199 => 199)
	 'MMMM': Month in year (January-December)
	 'MMM': Month in year (Jan-Dec)
	 'MM': Month in year, padded (01-12)
	 'M': Month in year (1-12)
	 'dd': Day in month, padded (01-31)
	 'd': Day in month (1-31)
	 'EEEE': Day in Week,(Sunday-Saturday)
	 'EEE': Day in Week, (Sun-Sat)
	 'HH': Hour in day, padded (00-23)
	 'H': Hour in day (0-23)
	 'hh': Hour in am/pm, padded (01-12)
	 'h': Hour in am/pm, (1-12)
	 'mm': Minute in hour, padded (00-59)
	 'm': Minute in hour (0-59)
	 'ss': Second in minute, padded (00-59)
	 's': Second in minute (0-59)
	 'a': am/pm marker
	 'Z': 4 digit (+sign) representation of the timezone offset (-1200-+1200)
	 format string can also be one of the following predefined localizable formats:
	 
	 'medium': equivalent to 'MMM d, y h:mm:ss a' for en_US locale (e.g. Sep 3, 2010 12:05:08 pm)
	 'short': equivalent to 'M/d/yy h:mm a' for en_US locale (e.g. 9/3/10 12:05 pm)
	 'fullDate': equivalent to 'EEEE, MMMM d,y' for en_US locale (e.g. Friday, September 3, 2010)
	 'longDate': equivalent to 'MMMM d, y' for en_US locale (e.g. September 3, 2010
	 'mediumDate': equivalent to 'MMM d, y' for en_US locale (e.g. Sep 3, 2010)
	 'shortDate': equivalent to 'M/d/yy' for en_US locale (e.g. 9/3/10)
	 'mediumTime': equivalent to 'h:mm:ss a' for en_US locale (e.g. 12:05:08 pm)
	 'shortTime': equivalent to 'h:mm a' for en_US locale (e.g. 12:05 pm)
	 */

	function toInt(str) {
	    return parseInt(str, 10) || 0
	}

	function padNumber(num, digits, trim) {
	    var neg = ''
	    if (num < 0) {
	        neg = '-'
	        num = -num
	    }
	    num = '' + num
	    while (num.length < digits)
	        num = '0' + num
	    if (trim)
	        num = num.substr(num.length - digits)
	    return neg + num
	}

	function dateGetter(name, size, offset, trim) {
	    return function (date) {
	        var value = date["get" + name]()
	        if (offset > 0 || value > -offset)
	            value += offset
	        if (value === 0 && offset === -12) {
	            value = 12
	        }
	        return padNumber(value, size, trim)
	    }
	}

	function dateStrGetter(name, shortForm) {
	    return function (date, formats) {
	        var value = date["get" + name]()
	        var get = (shortForm ? ("SHORT" + name) : name).toUpperCase()
	        return formats[get][value]
	    }
	}

	function timeZoneGetter(date) {
	    var zone = -1 * date.getTimezoneOffset()
	    var paddedZone = (zone >= 0) ? "+" : ""
	    paddedZone += padNumber(Math[zone > 0 ? "floor" : "ceil"](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2)
	    return paddedZone
	}
	//取得上午下午

	function ampmGetter(date, formats) {
	    return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1]
	}
	var DATE_FORMATS = {
	    yyyy: dateGetter("FullYear", 4),
	    yy: dateGetter("FullYear", 2, 0, true),
	    y: dateGetter("FullYear", 1),
	    MMMM: dateStrGetter("Month"),
	    MMM: dateStrGetter("Month", true),
	    MM: dateGetter("Month", 2, 1),
	    M: dateGetter("Month", 1, 1),
	    dd: dateGetter("Date", 2),
	    d: dateGetter("Date", 1),
	    HH: dateGetter("Hours", 2),
	    H: dateGetter("Hours", 1),
	    hh: dateGetter("Hours", 2, -12),
	    h: dateGetter("Hours", 1, -12),
	    mm: dateGetter("Minutes", 2),
	    m: dateGetter("Minutes", 1),
	    ss: dateGetter("Seconds", 2),
	    s: dateGetter("Seconds", 1),
	    sss: dateGetter("Milliseconds", 3),
	    EEEE: dateStrGetter("Day"),
	    EEE: dateStrGetter("Day", true),
	    a: ampmGetter,
	    Z: timeZoneGetter
	}
	var rdateFormat = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/
	var raspnetjson = /^\/Date\((\d+)\)\/$/
	function dateFilter(date, format) {
	    var locate = dateFilter.locate,
	            text = "",
	            parts = [],
	            fn, match
	    format = format || "mediumDate"
	    format = locate[format] || format
	    if (typeof date === "string") {
	        if (/^\d+$/.test(date)) {
	            date = toInt(date)
	        } else if (raspnetjson.test(date)) {
	            date = +RegExp.$1
	        } else {
	            var trimDate = date.trim()
	            var dateArray = [0, 0, 0, 0, 0, 0, 0]
	            var oDate = new Date(0)
	            //取得年月日
	            trimDate = trimDate.replace(/^(\d+)\D(\d+)\D(\d+)/, function (_, a, b, c) {
	                var array = c.length === 4 ? [c, a, b] : [a, b, c]
	                dateArray[0] = toInt(array[0])     //年
	                dateArray[1] = toInt(array[1]) - 1 //月
	                dateArray[2] = toInt(array[2])     //日
	                return ""
	            })
	            var dateSetter = oDate.setFullYear
	            var timeSetter = oDate.setHours
	            trimDate = trimDate.replace(/[T\s](\d+):(\d+):?(\d+)?\.?(\d)?/, function (_, a, b, c, d) {
	                dateArray[3] = toInt(a) //小时
	                dateArray[4] = toInt(b) //分钟
	                dateArray[5] = toInt(c) //秒
	                if (d) {                //毫秒
	                    dateArray[6] = Math.round(parseFloat("0." + d) * 1000)
	                }
	                return ""
	            })
	            var tzHour = 0
	            var tzMin = 0
	            trimDate = trimDate.replace(/Z|([+-])(\d\d):?(\d\d)/, function (z, symbol, c, d) {
	                dateSetter = oDate.setUTCFullYear
	                timeSetter = oDate.setUTCHours
	                if (symbol) {
	                    tzHour = toInt(symbol + c)
	                    tzMin = toInt(symbol + d)
	                }
	                return ''
	            })

	            dateArray[3] -= tzHour
	            dateArray[4] -= tzMin
	            dateSetter.apply(oDate, dateArray.slice(0, 3))
	            timeSetter.apply(oDate, dateArray.slice(3))
	            date = oDate
	        }
	    }
	    if (typeof date === 'number') {
	        date = new Date(date)
	    }
	    if (avalon.type(date) !== 'date') {
	        return
	    }
	    while (format) {
	        match = rdateFormat.exec(format)
	        if (match) {
	            parts = parts.concat(match.slice(1))
	            format = parts.pop()
	        } else {
	            parts.push(format)
	            format = null
	        }
	    }
	    parts.forEach(function (value) {
	        fn = DATE_FORMATS[value]
	        text += fn ? fn(date, locate) : value.replace(/(^'|'$)/g, "").replace(/''/g, "'")
	    })
	    return text
	}


	var locate = {
	    AMPMS: {
	        0: '上午',
	        1: '下午'
	    },
	    DAY: {
	        0: '星期日',
	        1: '星期一',
	        2: '星期二',
	        3: '星期三',
	        4: '星期四',
	        5: '星期五',
	        6: '星期六'
	    },
	    MONTH: {
	        0: '1月',
	        1: '2月',
	        2: '3月',
	        3: '4月',
	        4: '5月',
	        5: '6月',
	        6: '7月',
	        7: '8月',
	        8: '9月',
	        9: '10月',
	        10: '11月',
	        11: '12月'
	    },
	    SHORTDAY: {
	        '0': '周日',
	        '1': '周一',
	        '2': '周二',
	        '3': '周三',
	        '4': '周四',
	        '5': '周五',
	        '6': '周六'
	    },
	    fullDate: 'y年M月d日EEEE',
	    longDate: 'y年M月d日',
	    medium: 'yyyy-M-d H:mm:ss',
	    mediumDate: 'yyyy-M-d',
	    mediumTime: 'H:mm:ss',
	    'short': 'yy-M-d ah:mm',
	    shortDate: 'yy-M-d',
	    shortTime: 'ah:mm'
	}
	locate.SHORTMONTH = locate.MONTH
	dateFilter.locate = locate

	module.exports = dateFilter

/***/ },
/* 19 */
/***/ function(module, exports) {

	
	function orderBy(array, criteria, reverse) {
	    var type = avalon.type(array)
	    if (type !== 'array' && type !== 'object')
	        throw 'orderBy只能处理对象或数组'
	    var order = (reverse && reverse < 0) ? -1 : 1

	    if (typeof criteria === 'string') {
	        var key = criteria
	        criteria = function (a) {
	            return a && a[key]
	        }
	    }
	    array = convertArray(array)
	    array.forEach(function (el) {
	        el.order = criteria(el.value, el.key)
	    })
	    array.sort(function (left, right) {
	        var a = left.order
	        var b = right.order
	        if (Number.isNaN(a) && Number.isNaN(b)) {
	            return 0
	        }
	        return a === b ? 0 : a > b ? order : -order
	    })
	    var isArray = type === 'array'
	    var target = isArray ? [] : {}
	    return recovery(target, array, function (el) {
	        if (isArray) {
	            target.push(el.value)
	        } else {
	            target[el.key] = el.value
	        }
	    })
	}

	function filterBy(array, search) {
	    var type = avalon.type(array)
	    if (type !== 'array' && type !== 'object')
	        throw 'filterBy只能处理对象或数组'
	    var args = avalon.slice(arguments, 2)
	    var stype = avalon.type(search)
	    if (stype === 'function') {
	        var criteria = search
	    } else if (stype === 'string' || stype === 'number' ) {
	        if (search === '') {
	            return array
	        } else {
	            var reg = new RegExp(avalon.escapeRegExp(search), 'i')
	            criteria = function(el){
	                return reg.test(el)
	            }
	        }
	    } else {
	        return array
	    }

	    array = convertArray(array).filter(function (el, i) {
	        return !!criteria.apply(el, [el.value,i].concat(args) )
	    })
	    var isArray = type === 'array'
	    var target = isArray ? [] : {}
	    return recovery(target, array, function (el) {
	        if (isArray) {
	            target.push(el.value)
	        } else {
	            target[el.key] = el.value
	        }
	    })
	}

	function selectBy(data, array, defaults) {
	    if (avalon.isObject(data) && !Array.isArray(data)) {
	        var target = []
	        return recovery(target, array, function (name) {
	            target.push(data.hasOwnProperty(name) ? data[name] : defaults ? defaults[name] : '')
	        })
	    } else {
	        return data
	    }
	}

	Number.isNaN = Number.isNaN || function (a) {
	    return a !== a
	}

	function limitBy(input, limit, begin) {
	    var type = avalon.type(input)
	    if (type !== 'array' && type !== 'object')
	        throw 'limitBy只能处理对象或数组'
	    //尝试将limit转换数值
	    if (Math.abs(Number(limit)) === Infinity) {
	        limit = Number(limit)
	    } else {
	        limit = parseInt(limit, 10)
	    }
	    //转换不了返回
	    if (Number.isNaN(limit)) {
	        return input
	    }
	    //将目标转换为数组
	    if (type === 'object') {
	        input = convertArray(input)
	    }
	    limit = Math.min(input.length, limit)
	    begin = (!begin || Number.isNaN(begin)) ? 0 : ~~begin
	    if (begin < 0) {
	        begin = Math.max(0, input.length + begin)
	    }

	    var data = []
	    for (var i = begin; i < limit; i++) {
	        data.push(input[i])
	    }
	    var isArray = type === 'array'
	    if (isArray) {
	        return data
	    }
	    var target = {}
	    return recovery(target, data, function (el) {
	        target[el.key] = el.value
	    })
	}

	function recovery(ret, array, callback) {
	    for (var i = 0, n = array.length; i < n; i++) {
	        callback(array[i])
	    }
	    return ret
	}


	function convertArray(array) {
	    var ret = [], i = 0
	    avalon.each(array, function (key, value) {
	        ret[i++] = {
	            value: value,
	            key: key
	        }
	    })
	    return ret
	}

	module.exports = {
	    limitBy: limitBy,
	    orderBy: orderBy,
	    selectBy: selectBy,
	    filterBy: filterBy
	}

/***/ },
/* 20 */
/***/ function(module, exports) {

	
	var eventFilters = {
	    stop: function (e) {
	        e.stopPropagation()
	        return e
	    },
	    prevent: function (e) {
	        e.preventDefault()
	        return e
	    }
	}
	var keyCode = {
	    esc: 27,
	    tab: 9,
	    enter: 13,
	    space: 32,
	    del: 46,
	    up: 38,
	    left: 37,
	    right: 39,
	    down: 40
	}

	avalon.each(keyCode, function (name, keyCode) {
	    eventFilters[name] = function (e) {
	        if (e.which !== keyCode) {
	            e.$return = true
	        }
	        return e
	    }
	})

	module.exports = eventFilters

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 虚拟DOM的3大构造器
	 */
	var VText = __webpack_require__(22)
	var VComment = __webpack_require__(24)
	var VElement = __webpack_require__(25)

	avalon.vdomAdaptor = function (obj, method) {
	    if (!obj) {//obj在ms-for循环里面可能是null
	        return (method === "toHTML" ? '' :
	            avalon.avalonFragment.cloneNode(false))
	    }
	    switch (obj.nodeType) {
	        case 3:
	            return VText.prototype[method].call(obj)
	        case 8:
	            return VComment.prototype[method].call(obj)
	        case 1:
	            return VElement.prototype[method].call(obj)
	        default:
	            if (Array.isArray(obj)) {
	                if (method === "toHTML") {
	                    return obj.map(function (a) {
	                        return avalon.vdomAdaptor(a, 'toHTML')
	                    }).join('')
	                } else {
	                    var f = avalon.avalonFragment.cloneNode(false)
	                    obj.forEach(function (a) {
	                        f.appendChild(avalon.vdomAdaptor(a, 'toDOM'))
	                    })
	                    return f
	                }
	            }
	    }
	}

	module.exports = {
	    VText: VText,
	    VComment: VComment,
	    VElement: VElement
	}


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var rexpr = avalon.config.rexpr
	var decode = __webpack_require__(23)
	function VText(text) {
	    if (typeof text === 'string') {
	        this.type = '#text'
	        this.nodeValue = text
	        this.skipContent = !rexpr.test(text)
	        this.nodeType = 3
	    } else {
	        for (var i in text) {
	            this[i] = text[i]
	        }
	    }
	}

	VText.prototype = {
	    constructor: VText,
	    toDOM: function () {
	       var v = decode(this.nodeValue)
	       return document.createTextNode(v)
	    },
	    toHTML: function () {
	        return this.nodeValue
	    }
	}

	module.exports = VText

/***/ },
/* 23 */
/***/ function(module, exports) {

	/* 
	 * 对html实体进行转义
	 * https://github.com/substack/node-ent
	 * http://www.cnblogs.com/xdp-gacl/p/3722642.html
	 * http://www.stefankrause.net/js-frameworks-benchmark2/webdriver-java/table.html
	 */

	var rentities = /&[a-z0-9#]{2,10};/
	var temp = avalon.avalonDiv
	module.exports = function (str) {
	    if (rentities.test(str)) {
	        temp.innerHTML = str
	        return temp.innerText || temp.textContent
	    }
	    return str
	}

/***/ },
/* 24 */
/***/ function(module, exports) {

	
	function VComment(text) {
	    if (typeof text === 'string') {
	        this.type = '#comment'
	        this.nodeValue = text
	        this.skipContent = true
	        this.nodeType = 8
	    } else {
	        for (var i in text) {
	            this[i] = text[i]
	        }
	    }
	}
	VComment.prototype = {
	    constructor: VComment,
	    toDOM: function () {
	        return document.createComment(this.nodeValue)
	    },
	    toHTML: function () {
	        return '<!--' + this.nodeValue + '-->'
	    }
	}

	module.exports = VComment

/***/ },
/* 25 */
/***/ function(module, exports) {

	
	function VElement(type, props, children) {
	    if (typeof type === 'object') {
	        for (var i in type) {
	            this[i] = type[i]
	        }
	    } else {
	        this.nodeType = 1
	        this.type = type
	        this.props = props
	        this.children = children
	    }
	}
	function skipFalseAndFunction(a) {
	    return a !== false && (Object(a) !== a)
	}
	var specal = {
	    "class": function (dom, val) {
	        dom.className = val
	    },
	    style: function (dom, val) {
	        dom.style.cssText = val
	    },
	    'for': function (dom, val) {
	        dom.htmlFor = val
	    }
	}

	function createVML(type) {
	    if (document.styleSheets.length < 31) {
	        document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
	    } else {
	        // no more room, add to the existing one
	        // http://msdn.microsoft.com/en-us/library/ms531194%28VS.85%29.aspx
	        document.styleSheets[0].addRule(".rvml", "behavior:url(#default#VML)");
	    }
	    var arr = type.split(':')
	    if (arr.length === 1) {
	        arr.unshift('v')
	    }
	    var tag = arr[1]
	    var ns = arr[0]
	    if (!document.namespaces[ns]) {
	        document.namespaces.add(ns, "urn:schemas-microsoft-com:vml")
	    }
	    return  document.createElement('<' + ns + ':' + tag + ' class="rvml">');
	}

	function createSVG(type) {
	    return document.createElementNS('http://www.w3.org/2000/svg', type)
	}
	var svgTags = avalon.oneObject('circle,defs,ellipse,image,line,' +
	        'path,polygon,polyline,rect,symbol,text,use,g,svg')
	var VMLTags = avalon.oneObject('shape,line,polyline,rect,roundrect,oval,arc,' +
	        'curve,background,image,shapetype,group,fill,' +
	        'stroke,shadow, extrusion, textbox, imagedata, textpath')

	var rvml = /^\w+\:\w+/

	VElement.prototype = {
	    constructor: VElement,
	    toDOM: function () {
	        var dom, tagName = this.type
	        if (avalon.modern && svgTags[tagName]) {
	            dom = createSVG(tagName)
	        } else if (!avalon.modern && (VMLTags[tagName] || rvml.test(tagName))) {
	            dom = createVML(tagName)
	        } else {
	            dom = document.createElement(tagName)
	        }
	        var wid = this.props['ms-important'] ||
	                this.props['ms-controller'] || this.wid
	        if (wid) {
	            var scope = avalon.scopes[wid]
	            var element = scope && scope.vmodel && scope.vmodel.$element
	            if (element) {
	                var oldVdom = element.vtree[0]
	                if (oldVdom.children) {
	                    this.children = oldVdom.children
	                }
	                return element
	            }
	        }
	        for (var i in this.props) {
	            var val = this.props[i]
	            if (skipFalseAndFunction(val)) {
	                if (specal[i] && avalon.msie < 8) {
	                    specal[i](dom, val)
	                } else {
	                    dom.setAttribute(i, val + '')
	                }
	            }
	        }
	        var c = this.children || []
	        var template = c[0] ? c[0].nodeValue : ''
	        switch (this.type) {
	            case 'script':
	                dom.text = template
	                break
	            case 'style':
	                if ('styleSheet' in dom) {
	                    dom.setAttribute('type', 'text/css')
	                    dom.styleSheet.cssText = template
	                } else {
	                    dom.innerHTML = template
	                }
	                break
	            case 'xmp'://IE6-8,XMP元素里面只能有文本节点,不能使用innerHTML
	            case 'noscript':
	                dom.innerText = dom.textContent = template
	                break
	            case 'template':
	                dom.innerHTML = template
	                break
	            default:
	                if (!this.isVoidTag) {
	                    this.children.forEach(function (c) {
	                        c && dom.appendChild(avalon.vdomAdaptor(c, 'toDOM'))
	                    })
	                }
	                break
	        }
	        return dom
	    },
	    toHTML: function () {
	        var arr = []
	        for (var i in this.props) {
	            var val = this.props[i]
	            if (skipFalseAndFunction(val)) {
	                arr.push(i + '=' + avalon.quote(this.props[i] + ''))
	            }
	        }
	        arr = arr.length ? ' ' + arr.join(' ') : ''
	        var str = '<' + this.type + arr
	        if (this.isVoidTag) {
	            return str + '/>'
	        }
	        str += '>'
	        if (this.children.length) {
	            str += this.children.map(function (c) {
	                return c ? avalon.vdomAdaptor(c, 'toHTML') : ''
	            }).join('')
	        }
	        return str + '</' + this.type + '>'
	    }
	}

	module.exports = VElement

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 *                          DOM Api
	 * shim,class,data,css,val,html,event,ready  
	 * ------------------------------------------------------------
	 */
	__webpack_require__(27)
	__webpack_require__(28)
	__webpack_require__(29)
	__webpack_require__(32)
	__webpack_require__(33)
	__webpack_require__(34)
	__webpack_require__(37)
	__webpack_require__(39)

	module.exports = avalon

/***/ },
/* 27 */
/***/ function(module, exports) {

	function fixContains(root, el) {
	    try { //IE6-8,游离于DOM树外的文本节点，访问parentNode有时会抛错
	        while ((el = el.parentNode))
	            if (el === root)
	                return true
	        return false
	    } catch (e) {
	        return false
	    }
	}

	avalon.contains = fixContains
	//IE6-11的文档对象没有contains
	if (!avalon.document.contains) {
	    avalon.document.contains = function (b) {
	        return fixContains(document, b)
	    }
	}

	if (window.Node && !document.createTextNode('x').contains) {
	    Node.prototype.contains = function (arg) {//IE6-8没有Node对象
	        return !!(this.compareDocumentPosition(arg) & 16)
	    }
	}

	//firefox 到11时才有outerHTML
	if (window.HTMLElement && !avalon.root.outerHTML) {
	    HTMLElement.prototype.__defineGetter__('outerHTML', function () {
	        var div = document.createElement('div')
	        div.appendChild(this)
	        return div.innerHTML
	    })
	}




/***/ },
/* 28 */
/***/ function(module, exports) {

	var rnowhite = /\S+/g
	var fakeClassListMethods = {
	    _toString: function () {
	        var node = this.node
	        var cls = node.className
	        var str = typeof cls === 'string' ? cls : cls.baseVal
	        var match = str.match(rnowhite)
	        return match ? match.join(' ') : ''
	    },
	    _contains: function (cls) {
	        return (' ' + this + ' ').indexOf(' ' + cls + ' ') > -1
	    },
	    _add: function (cls) {
	        if (!this.contains(cls)) {
	            this._set(this + ' ' + cls)
	        }
	    },
	    _remove: function (cls) {
	        this._set((' ' + this + ' ').replace(' ' + cls + ' ', ' '))
	    },
	    __set: function (cls) {
	        cls = cls.trim()
	        var node = this.node
	        if (typeof node.className === 'object') {
	            //SVG元素的className是一个对象 SVGAnimatedString { baseVal='', animVal=''}，只能通过set/getAttribute操作
	            node.setAttribute('class', cls)
	        } else {
	            node.className = cls
	        }
	    } //toggle存在版本差异，因此不使用它
	}

	function fakeClassList(node) {
	    if (!('classList' in node)) {
	        node.classList = {
	            node: node
	        }
	        for (var k in fakeClassListMethods) {
	            node.classList[k.slice(1)] = fakeClassListMethods[k]
	        }
	    }
	    return node.classList
	}


	'add,remove'.replace(avalon.rword, function (method) {
	    avalon.fn[method + 'Class'] = function (cls) {
	        var el = this[0] || {}
	        //https://developer.mozilla.org/zh-CN/docs/Mozilla/Firefox/Releases/26
	        if (cls && typeof cls === 'string' && el.nodeType === 1) {
	            cls.replace(rnowhite, function (c) {
	                fakeClassList(el)[method](c)
	            })
	        }
	        return this
	    }
	})

	avalon.fn.mix({
	    hasClass: function (cls) {
	        var el = this[0] || {}
	        return el.nodeType === 1 && fakeClassList(el).contains(cls)
	    },
	    toggleClass: function (value, stateVal) {
	        var isBool = typeof stateVal === 'boolean'
	        var me = this
	        String(value).replace(rnowhite, function (c) {
	            var state = isBool ? stateVal : !me.hasClass(c)
	            me[state ? 'addClass' : 'removeClass'](c)
	        })
	        return this
	    }
	})



/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	
	var propMap = __webpack_require__(30)
	var isVML = __webpack_require__(31)
	var rsvg =/^\[object SVG\w*Element\]$/
	var ramp = /&amp;/g

	function attrUpdate(node, vnode) {
	    var attrs = vnode.changeAttr
	    if (!node || node.nodeType !== 1 ) {
	        return
	    }
	    if (attrs) {
	        for (var attrName in attrs) {
	            var val = attrs[attrName]
	            // 处理路径属性
	            if (attrName === 'href' || attrName === 'src') {
	                if (!node.hasAttribute) {
	                    val = String(val).replace(ramp, '&') //处理IE67自动转义的问题
	                }
	                node[attrName] = val
	                if (window.chrome && node.tagName === 'EMBED') {
	                    var parent = node.parentNode //#525  chrome1-37下embed标签动态设置src不能发生请求
	                    var comment = document.createComment('ms-src')
	                    parent.replaceChild(comment, node)
	                    parent.replaceChild(node, comment)
	                }
	                //处理HTML5 data-*属性
	            } else if (attrName.indexOf('data-') === 0) {
	                node.setAttribute(attrName, val)

	            } else {
	                var propName = propMap[attrName] || attrName
	                if (typeof node[propName] === 'boolean') {
	                    node[propName] = !!val
	                  
	                    //布尔属性必须使用el.xxx = true|false方式设值
	                    //如果为false, IE全系列下相当于setAttribute(xxx,''),
	                    //会影响到样式,需要进一步处理
	                }

	                if (val === false ) {//移除属性
	                    node.removeAttribute(propName)
	                    continue
	                }
	                //SVG只能使用setAttribute(xxx, yyy), VML只能使用node.xxx = yyy ,
	                //HTML的固有属性必须node.xxx = yyy
	             
	                var isInnate = rsvg.test(node) ? false :
	                        (!avalon.modern && isVML(node)) ? true :
	                        attrName in node.cloneNode(false)
	                if (isInnate) {
	                    node[propName] = val + ''
	                } else {
	                    node.setAttribute(attrName, val)
	                }

	            }

	        }
	        vnode.changeAttr = null
	    }
	}

	var rvalidchars = /^[\],:{}\s]*$/,
	    rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	    rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	    rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g

	avalon.parseJSON = avalon.window.JSON ? JSON.parse : function (data) {
	    if (typeof data === 'string') {
	        data = data.trim()
	        if (data) {
	            if (rvalidchars.test(data.replace(rvalidescape, '@')
	                    .replace(rvalidtokens, ']')
	                    .replace(rvalidbraces, ''))) {
	                return (new Function('return ' + data))() // jshint ignore:line
	            }
	        }
	        avalon.error('Invalid JSON: ' + data)
	    }
	    return data
	}


	avalon.fn.attr = function (name, value) {
	    if (arguments.length === 2) {
	        this[0].setAttribute(name, value)
	        return this
	    } else {
	        return this[0].getAttribute(name)
	    }
	}

	module.exports = attrUpdate

/***/ },
/* 30 */
/***/ function(module, exports) {

	var propMap = {//不规则的属性名映射
	    'accept-charset': 'acceptCharset',
	    'char': 'ch',
	    charoff: 'chOff',
	    'class': 'className',
	    'for': 'htmlFor',
	    'http-equiv': 'httpEquiv'
	}
	/*
	contenteditable不是布尔属性
	http://www.zhangxinxu.com/wordpress/2016/01/contenteditable-plaintext-only/
	contenteditable=''
	contenteditable='events'
	contenteditable='caret'
	contenteditable='plaintext-only'
	contenteditable='true'
	contenteditable='false'
	 */
	var bools = ['autofocus,autoplay,async,allowTransparency,checked,controls',
	    'declare,disabled,defer,defaultChecked,defaultSelected,',
	    'isMap,loop,multiple,noHref,noResize,noShade',
	    'open,readOnly,selected'
	].join(',')

	bools.replace(/\w+/g, function (name) {
	    propMap[name.toLowerCase()] = name
	})

	var anomaly = ['accessKey,bgColor,cellPadding,cellSpacing,codeBase,codeType,colSpan',
	    'dateTime,defaultValue,contentEditable,frameBorder,longDesc,maxLength,'+
	    'marginWidth,marginHeight,rowSpan,tabIndex,useMap,vSpace,valueType,vAlign'
	].join(',')

	anomaly.replace(/\w+/g, function (name) {
	    propMap[name.toLowerCase()] = name
	})

	module.exports = propMap


/***/ },
/* 31 */
/***/ function(module, exports) {

	function isVML(src) {
	    var nodeName = src.nodeName
	    return nodeName.toLowerCase() === nodeName && src.scopeName && src.outerText === ''
	}

	module.exports = isVML

/***/ },
/* 32 */
/***/ function(module, exports) {

	var root = avalon.root
	var window = avalon.window
	var camelize = avalon.camelize
	var cssHooks = avalon.cssHooks

	var prefixes = ['', '-webkit-', '-o-', '-moz-', '-ms-']
	var cssMap = {
	    'float': window.Range ? 'cssFloat' : 'styleFloat'
	}
	avalon.cssNumber = avalon.oneObject('animationIterationCount,columnCount,order,flex,flexGrow,flexShrink,fillOpacity,fontWeight,lineHeight,opacity,orphans,widows,zIndex,zoom')

	avalon.cssName = function (name, host, camelCase) {
	    if (cssMap[name]) {
	        return cssMap[name]
	    }
	    host = host || root.style || {}
	    for (var i = 0, n = prefixes.length; i < n; i++) {
	        camelCase = camelize(prefixes[i] + name)
	        if (camelCase in host) {
	            return (cssMap[name] = camelCase)
	        }
	    }
	    return null
	}


	avalon.fn.css = function (name, value) {
	    if (avalon.isPlainObject(name)) {
	        for (var i in name) {
	            avalon.css(this, i, name[i])
	        }
	    } else {
	        var ret = avalon.css(this, name, value)
	    }
	    return ret !== void 0 ? ret : this
	}

	avalon.fn.position = function () {
	    var offsetParent, offset,
	            elem = this[0],
	            parentOffset = {
	                top: 0,
	                left: 0
	            }
	    if (!elem) {
	        return parentOffset
	    }
	    if (this.css('position') === 'fixed') {
	        offset = elem.getBoundingClientRect()
	    } else {
	        offsetParent = this.offsetParent() //得到真正的offsetParent
	        offset = this.offset() // 得到正确的offsetParent
	        if (offsetParent[0].tagName !== 'HTML') {
	            parentOffset = offsetParent.offset()
	        }
	        parentOffset.top += avalon.css(offsetParent[0], 'borderTopWidth', true)
	        parentOffset.left += avalon.css(offsetParent[0], 'borderLeftWidth', true)

	        // Subtract offsetParent scroll positions
	        parentOffset.top -= offsetParent.scrollTop()
	        parentOffset.left -= offsetParent.scrollLeft()
	    }
	    return {
	        top: offset.top - parentOffset.top - avalon.css(elem, 'marginTop', true),
	        left: offset.left - parentOffset.left - avalon.css(elem, 'marginLeft', true)
	    }
	}
	avalon.fn.offsetParent = function () {
	    var offsetParent = this[0].offsetParent
	    while (offsetParent && avalon.css(offsetParent, 'position') === 'static') {
	        offsetParent = offsetParent.offsetParent
	    }
	    return avalon(offsetParent || root)
	}

	cssHooks['@:set'] = function (node, name, value) {
	    try {
	        //node.style.width = NaN;node.style.width = 'xxxxxxx';
	        //node.style.width = undefine 在旧式IE下会抛异常
	        node.style[name] = value
	    } catch (e) {
	    }
	}

	if (window.getComputedStyle) {
	    cssHooks['@:get'] = function (node, name) {
	        if (!node || !node.style) {
	            throw new Error('getComputedStyle要求传入一个节点 ' + node)
	        }
	        var ret, styles = getComputedStyle(node, null)
	        if (styles) {
	            ret = name === 'filter' ? styles.getPropertyValue(name) : styles[name]
	            if (ret === '') {
	                ret = node.style[name] //其他浏览器需要我们手动取内联样式
	            }
	        }
	        return ret
	    }
	    cssHooks['opacity:get'] = function (node) {
	        var ret = cssHooks['@:get'](node, 'opacity')
	        return ret === '' ? '1' : ret
	    }
	} else {
	    var rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i
	    var rposition = /^(top|right|bottom|left)$/
	    var ralpha = /alpha\([^)]*\)/i
	    var ie8 = !!window.XDomainRequest
	    var salpha = 'DXImageTransform.Microsoft.Alpha'
	    var border = {
	        thin: ie8 ? '1px' : '2px',
	        medium: ie8 ? '3px' : '4px',
	        thick: ie8 ? '5px' : '6px'
	    }
	    cssHooks['@:get'] = function (node, name) {
	        //取得精确值，不过它有可能是带em,pc,mm,pt,%等单位
	        var currentStyle = node.currentStyle
	        var ret = currentStyle[name]
	        if ((rnumnonpx.test(ret) && !rposition.test(ret))) {
	            //①，保存原有的style.left, runtimeStyle.left,
	            var style = node.style,
	                    left = style.left,
	                    rsLeft = node.runtimeStyle.left
	            //②由于③处的style.left = xxx会影响到currentStyle.left，
	            //因此把它currentStyle.left放到runtimeStyle.left，
	            //runtimeStyle.left拥有最高优先级，不会style.left影响
	            node.runtimeStyle.left = currentStyle.left
	            //③将精确值赋给到style.left，然后通过IE的另一个私有属性 style.pixelLeft
	            //得到单位为px的结果；fontSize的分支见http://bugs.jquery.com/ticket/760
	            style.left = name === 'fontSize' ? '1em' : (ret || 0)
	            ret = style.pixelLeft + 'px'
	            //④还原 style.left，runtimeStyle.left
	            style.left = left
	            node.runtimeStyle.left = rsLeft
	        }
	        if (ret === 'medium') {
	            name = name.replace('Width', 'Style')
	            //border width 默认值为medium，即使其为0'
	            if (currentStyle[name] === 'none') {
	                ret = '0px'
	            }
	        }
	        return ret === '' ? 'auto' : border[ret] || ret
	    }
	    cssHooks['opacity:set'] = function (node, name, value) {
	        var style = node.style
	        var opacity = isFinite(value) && value <= 1 ? 'alpha(opacity=' + value * 100 + ')' : ''
	        var filter = style.filter || ''
	        style.zoom = 1
	        //不能使用以下方式设置透明度
	        //node.filters.alpha.opacity = value * 100
	        style.filter = (ralpha.test(filter) ?
	                filter.replace(ralpha, opacity) :
	                filter + ' ' + opacity).trim()
	        if (!style.filter) {
	            style.removeAttribute('filter')
	        }
	    }
	    cssHooks['opacity:get'] = function (node) {
	        //这是最快的获取IE透明值的方式，不需要动用正则了！
	        var alpha = node.filters.alpha || node.filters[salpha],
	                op = alpha && alpha.enabled ? alpha.opacity : 100
	        return (op / 100) + '' //确保返回的是字符串
	    }
	}

	'top,left'.replace(avalon.rword, function (name) {
	    cssHooks[name + ':get'] = function (node) {
	        var computed = cssHooks['@:get'](node, name)
	        return /px$/.test(computed) ? computed :
	                avalon(node).position()[name] + 'px'
	    }
	})

	var cssShow = {
	    position: 'absolute',
	    visibility: 'hidden',
	    display: 'block'
	}

	var rdisplayswap = /^(none|table(?!-c[ea]).+)/

	function showHidden(node, array) {
	    //http://www.cnblogs.com/rubylouvre/archive/2012/10/27/2742529.html
	    if (node.offsetWidth <= 0) { //opera.offsetWidth可能小于0
	        if (rdisplayswap.test(cssHooks['@:get'](node, 'display'))) {
	            var obj = {
	                node: node
	            }
	            for (var name in cssShow) {
	                obj[name] = node.style[name]
	                node.style[name] = cssShow[name]
	            }
	            array.push(obj)
	        }
	        var parent = node.parentNode
	        if (parent && parent.nodeType === 1) {
	            showHidden(parent, array)
	        }
	    }
	}
	avalon.each({
	    Width: 'width',
	    Height: 'height'
	}, function (name, method) {
	    var clientProp = 'client' + name,
	            scrollProp = 'scroll' + name,
	            offsetProp = 'offset' + name
	    cssHooks[method + ':get'] = function (node, which, override) {
	        var boxSizing = -4
	        if (typeof override === 'number') {
	            boxSizing = override
	        }
	        which = name === 'Width' ? ['Left', 'Right'] : ['Top', 'Bottom']
	        var ret = node[offsetProp] // border-box 0
	        if (boxSizing === 2) { // margin-box 2
	            return ret + avalon.css(node, 'margin' + which[0], true) + avalon.css(node, 'margin' + which[1], true)
	        }
	        if (boxSizing < 0) { // padding-box  -2
	            ret = ret - avalon.css(node, 'border' + which[0] + 'Width', true) - avalon.css(node, 'border' + which[1] + 'Width', true)
	        }
	        if (boxSizing === -4) { // content-box -4
	            ret = ret - avalon.css(node, 'padding' + which[0], true) - avalon.css(node, 'padding' + which[1], true)
	        }
	        return ret
	    }
	    cssHooks[method + '&get'] = function (node) {
	        var hidden = []
	        showHidden(node, hidden)
	        var val = cssHooks[method + ':get'](node)
	        for (var i = 0, obj; obj = hidden[i++]; ) {
	            node = obj.node
	            for (var n in obj) {
	                if (typeof obj[n] === 'string') {
	                    node.style[n] = obj[n]
	                }
	            }
	        }
	        return val
	    }
	    avalon.fn[method] = function (value) { //会忽视其display
	        var node = this[0]
	        if (arguments.length === 0) {
	            if (node.setTimeout) { //取得窗口尺寸
	                return node['inner' + name] ||
	                        node.document.documentElement[clientProp] ||
	                        node.document.body[clientProp] //IE6下前两个分别为undefined,0
	            }
	            if (node.nodeType === 9) { //取得页面尺寸
	                var doc = node.documentElement
	                //FF chrome    html.scrollHeight< body.scrollHeight
	                //IE 标准模式 : html.scrollHeight> body.scrollHeight
	                //IE 怪异模式 : html.scrollHeight 最大等于可视窗口多一点？
	                return Math.max(node.body[scrollProp], doc[scrollProp], node.body[offsetProp], doc[offsetProp], doc[clientProp])
	            }
	            return cssHooks[method + '&get'](node)
	        } else {
	            return this.css(method, value)
	        }
	    }
	    avalon.fn['inner' + name] = function () {
	        return cssHooks[method + ':get'](this[0], void 0, -2)
	    }
	    avalon.fn['outer' + name] = function (includeMargin) {
	        return cssHooks[method + ':get'](this[0], void 0, includeMargin === true ? 2 : 0)
	    }
	})

	avalon.fn.offset = function () { //取得距离页面左右角的坐标
	    var node = this[0],
	            box = {
	                left: 0,
	                top: 0
	            }
	    if (!node || !node.tagName || !node.ownerDocument) {
	        return box
	    }
	    var doc = node.ownerDocument,
	            body = doc.body,
	            root = doc.documentElement,
	            win = doc.defaultView || doc.parentWindow
	    if (!avalon.contains(root, node)) {
	        return box
	    }
	    //http://hkom.blog1.fc2.com/?mode=m&no=750 body的偏移量是不包含margin的
	    //我们可以通过getBoundingClientRect来获得元素相对于client的rect.
	    //http://msdn.microsoft.com/en-us/library/ms536433.aspx
	    if (node.getBoundingClientRect) {
	        box = node.getBoundingClientRect() // BlackBerry 5, iOS 3 (original iPhone)
	    }
	    //chrome/IE6: body.scrollTop, firefox/other: root.scrollTop
	    var clientTop = root.clientTop || body.clientTop,
	            clientLeft = root.clientLeft || body.clientLeft,
	            scrollTop = Math.max(win.pageYOffset || 0, root.scrollTop, body.scrollTop),
	            scrollLeft = Math.max(win.pageXOffset || 0, root.scrollLeft, body.scrollLeft)
	    // 把滚动距离加到left,top中去。
	    // IE一些版本中会自动为HTML元素加上2px的border，我们需要去掉它
	    // http://msdn.microsoft.com/en-us/library/ms533564(VS.85).aspx
	    return {
	        top: box.top + scrollTop - clientTop,
	        left: box.left + scrollLeft - clientLeft
	    }
	}

	//生成avalon.fn.scrollLeft, avalon.fn.scrollTop方法
	avalon.each({
	    scrollLeft: 'pageXOffset',
	    scrollTop: 'pageYOffset'
	}, function (method, prop) {
	    avalon.fn[method] = function (val) {
	        var node = this[0] || {},
	                win = getWindow(node),
	                top = method === 'scrollTop'
	        if (!arguments.length) {
	            return win ? (prop in win) ? win[prop] : root[method] : node[method]
	        } else {
	            if (win) {
	                win.scrollTo(!top ? val : avalon(win).scrollLeft(), top ? val : avalon(win).scrollTop())
	            } else {
	                node[method] = val
	            }
	        }
	    }
	})

	function getWindow(node) {
	    return node.window || node.defaultView || node.parentWindow || false
	}

/***/ },
/* 33 */
/***/ function(module, exports) {

	function getValType(elem) {
	    var ret = elem.tagName.toLowerCase()
	    return ret === 'input' && /checkbox|radio/.test(elem.type) ? 'checked' : ret
	}
	var roption = /^<option(?:\s+\w+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s+value[\s=]/i
	var valHooks = {
	    'option:get': avalon.msie ? function (node) {
	        //在IE11及W3C，如果没有指定value，那么node.value默认为node.text（存在trim作），但IE9-10则是取innerHTML(没trim操作)
	        //specified并不可靠，因此通过分析outerHTML判定用户有没有显示定义value
	        return roption.test(node.outerHTML) ? node.value : node.text.trim()
	    } : function (node) {
	        return node.value
	    },
	    'select:get': function (node, value) {
	        var option, options = node.options,
	                index = node.selectedIndex,
	                getter = valHooks['option:get'],
	                one = node.type === 'select-one' || index < 0,
	                values = one ? null : [],
	                max = one ? index + 1 : options.length,
	                i = index < 0 ? max : one ? index : 0
	        for (; i < max; i++) {
	            option = options[i]
	            //IE6-9在reset后不会改变selected，需要改用i === index判定
	            //我们过滤所有disabled的option元素，但在safari5下，
	            //如果设置optgroup为disable，那么其所有孩子都disable
	            //因此当一个元素为disable，需要检测其是否显式设置了disable及其父节点的disable情况
	            if ((option.selected || i === index) && !option.disabled &&
	                    (!option.parentNode.disabled || option.parentNode.tagName !== 'OPTGROUP')
	                    ) {
	                value = getter(option)
	                if (one) {
	                    return value
	                }
	                //收集所有selected值组成数组返回
	                values.push(value)
	            }
	        }
	        return values
	    },
	    'select:set': function (node, values, optionSet) {
	        values = [].concat(values) //强制转换为数组
	        var getter = valHooks['option:get']
	        for (var i = 0, el; el = node.options[i++]; ) {
	            if ((el.selected = values.indexOf(getter(el)) > -1)) {
	                optionSet = true
	            }
	        }
	        if (!optionSet) {
	            node.selectedIndex = -1
	        }
	    }
	}

	avalon.fn.val = function (value) {
	    var node = this[0]
	    if (node && node.nodeType === 1) {
	        var get = arguments.length === 0
	        var access = get ? ':get' : ':set'
	        var fn = valHooks[getValType(node) + access]
	        if (fn) {
	            var val = fn(node, value)
	        } else if (get) {
	            return (node.value || '').replace(/\r/g, '')
	        } else {
	            node.value = value
	        }
	    }
	    return get ? val : this
	}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var Cache = __webpack_require__(35)

	var fixCloneNode = __webpack_require__(36)

	var rhtml = /<|&#?\w+;/
	var htmlCache = new Cache(128)
	var rxhtml = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig

	avalon.parseHTML = function (html) {
	    var fragment = avalon.avalonFragment.cloneNode(false)
	    //处理非字符串
	    if (typeof html !== 'string') {
	        return fragment
	    }
	    //处理非HTML字符串
	    if (!rhtml.test(html)) {
	        return document.createTextNode(html)
	    }

	    html = html.replace(rxhtml, '<$1></$2>').trim()
	    var hasCache = htmlCache.get(html)
	    if (hasCache) {
	        return fixCloneNode(hasCache)
	    }
	    var vnodes = avalon.lexer(html)
	    for (var i = 0, el; el = vnodes[i++]; ) {
	        fragment.appendChild(avalon.vdomAdaptor(el, 'toDOM'))
	    }
	    if (html.length < 1024) {
	        htmlCache.put(html, fixCloneNode(fragment))
	    }
	    return fragment
	}

	avalon.innerHTML = function (node, html) {
	    if (!avalon.modern && (!rcreate.test(html) && !rnest.test(html))) {
	        try {
	            node.innerHTML = html
	            return
	        } catch (e) {
	        }
	    }
	    var parsed = this.parseHTML(html)
	    this.clearHTML(node).appendChild(parsed)
	}

	var reunescapeHTML = /&(?:amp|lt|gt|quot|#39|#96);/g
	var htmlUnescapes = {
	    '&amp;': '&',
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&#39;': "'",
	    '&#96;': '`'
	}
	avalon.unescapeHTML = function (string) {
	    var str = '' + string
	    return str.replace(reunescapeHTML, function (c) {
	        return htmlUnescapes[c]
	    })
	}

	var rescapeHTML = /["'&<>]/
	//https://github.com/nthtran/vdom-to-html
	//将字符串经过 str 转义得到适合在页面中显示的内容, 例如替换 < 为 &lt 
	avalon.escapeHTML = function (string) {
	    var str = '' + string
	    var match = rescapeHTML.exec(str)

	    if (!match) {
	        return str
	    }

	    var escape
	    var html = ''
	    var index = 0
	    var lastIndex = 0

	    for (index = match.index; index < str.length; index++) {
	        switch (str.charCodeAt(index)) {
	            case 34: // "
	                escape = '&quot;'
	                break
	            case 38: // &
	                escape = '&amp;'
	                break
	            case 39: // '
	                escape = '&#39;'
	                break
	            case 60: // <
	                escape = '&lt;'
	                break
	            case 62: // >
	                escape = '&gt;'
	                break
	            default:
	                continue
	        }

	        if (lastIndex !== index) {
	            html += str.substring(lastIndex, index)
	        }

	        lastIndex = index + 1
	        html += escape
	    }

	    return lastIndex !== index
	            ? html + str.substring(lastIndex, index)
	            : html
	}

	avalon.clearHTML = function (node) {
	    node.textContent = ''
	    while (node.lastChild) {
	        node.removeChild(node.lastChild)
	    }
	    return node
	}


/***/ },
/* 35 */
/***/ function(module, exports) {

	// https://github.com/rsms/js-lru
	function LRU(maxLength) {
	    this.size = 0
	    this.limit = maxLength
	    this.head = this.tail = void 0
	    this._keymap = {}
	}

	var p = LRU.prototype

	p.put = function (key, value) {
	    var entry = {
	        key: key,
	        value: value
	    }
	    this._keymap[key] = entry
	    if (this.tail) {
	        this.tail.newer = entry
	        entry.older = this.tail
	    } else {
	        this.head = entry
	    }
	    this.tail = entry
	    if (this.size === this.limit) {
	        this.shift()
	    } else {
	        this.size++
	    }
	    return value
	}

	p.shift = function () {
	    var entry = this.head
	    if (entry) {
	        this.head = this.head.newer
	        this.head.older =
	                entry.newer =
	                entry.older =
	                this._keymap[entry.key] = void 0
	        delete this._keymap[entry.key] //#1029
	    }
	}
	p.get = function (key) {
	    var entry = this._keymap[key]
	    if (entry === void 0)
	        return
	    if (entry === this.tail) {
	        return  entry.value
	    }
	    // HEAD--------------TAIL
	    //   <.older   .newer>
	    //  <--- add direction --
	    //   A  B  C  <D>  E
	    if (entry.newer) {
	        if (entry === this.head) {
	            this.head = entry.newer
	        }
	        entry.newer.older = entry.older // C <-- E.
	    }
	    if (entry.older) {
	        entry.older.newer = entry.newer // C. --> E
	    }
	    entry.newer = void 0 // D --x
	    entry.older = this.tail // D. --> E
	    if (this.tail) {
	        this.tail.newer = entry // E. <-- D
	    }
	    this.tail = entry
	    return entry.value
	}

	module.exports = LRU


/***/ },
/* 36 */
/***/ function(module, exports) {

	var rcheckedType = /radio|checkbox/

	function fix(dest, src) {
	    if (dest.nodeType !== 1) {
	        return
	    }
	    var nodeName = dest.nodeName.toLowerCase()
	    if (nodeName === 'object') {
	        if (dest.parentNode) {
	            dest.outerHTML = src.outerHTML
	        }

	    } else if (nodeName === 'input' && rcheckedType.test(src.type)) {

	        dest.defaultChecked = dest.checked = src.checked

	        if (dest.value !== src.value) {
	            dest.value = src.value
	        }

	    } else if (nodeName === 'option') {
	        dest.defaultSelected = dest.selected = src.defaultSelected
	    } else if (nodeName === 'input' || nodeName === 'textarea') {
	        dest.defaultValue = src.defaultValue
	    }
	}


	function getAll(context) {
	    return typeof context.getElementsByTagName !== "undefined" ?
	            context.getElementsByTagName("*") :
	            typeof context.querySelectorAll !== "undefined" ?
	            context.querySelectorAll("*") : []
	}

	function fixCloneNode(src) {
	    var target = src.cloneNode(true)
	    if (avalon.modern)
	        return target
	    var t = getAll(target)
	    var s = getAll(src)
	    avalon.each(s, function (i) {
	        fix(t[i], s[i])
	    })
	    return target
	}

	module.exports = fixCloneNode

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var document = avalon.document
	var window = avalon.window
	var root = avalon.root
	var W3C = avalon.modern

	var getShortID = __webpack_require__(13).getShortID
	//http://www.feiesoft.com/html/events.html
	//http://segmentfault.com/q/1010000000687977/a-1020000000688757
	var canBubbleUp = __webpack_require__(38)

	if (!W3C) {
	    delete canBubbleUp.change
	    delete canBubbleUp.select
	}

	var eventHooks = avalon.eventHooks
	/*绑定事件*/
	avalon.bind = function (elem, type, fn) {
	    if (elem.nodeType === 1) {
	        var value = elem.getAttribute('avalon-events') || ''
	        //如果是使用ms-on-*绑定的回调,其uuid格式为e12122324,
	        //如果是使用bind方法绑定的回调,其uuid格式为_12
	        var uuid = getShortID(fn)
	        var hook = eventHooks[type]
	        if(hook){
	            type = hook.type || type
	            if (hook.fix) {
	                fn = hook.fix(elem, fn)
	                fn.uuid = uuid
	            }
	        }
	        var key = type + ':' + uuid
	        avalon.eventListeners[fn.uuid] = fn
	        if (value.indexOf(type + ':') === -1) {//同一种事件只绑定一次
	            if (canBubbleUp[type] || (avalon.modern && focusBlur[type])) {
	                delegateEvent(type)
	            } else {
	                nativeBind(elem, type, dispatch)
	            }
	        }
	        var keys = value.split(',')
	        if (keys[0] === '') {
	            keys.shift()
	        }
	        if (keys.indexOf(key) === -1) {
	            keys.push(key)
	            elem.setAttribute('avalon-events', keys.join(','))
	            //将令牌放进avalon-events属性中
	        }

	    } else {
	        nativeBind(elem, type, fn)
	    }
	    return fn //兼容之前的版本
	}

	avalon.unbind = function (elem, type, fn) {
	    if (elem.nodeType === 1) {
	        var value = elem.getAttribute('avalon-events') || ''
	        switch (arguments.length) {
	            case 1:
	                nativeUnBind(elem, type, dispatch)
	                elem.removeAttribute('avalon-events')
	                break
	            case 2:
	                value = value.split(',').filter(function (str) {
	                    return str.indexOf(type + ':') === -1
	                }).join(',')
	                elem.setAttribute('avalon-events', value)
	                break
	            default:
	                var search = type + ':' + fn.uuid
	                value = value.split(',').filter(function (str) {
	                    return str !== search
	                }).join(',')
	                elem.setAttribute('avalon-events', value)
	                delete avalon.eventListeners[fn.uuid]
	                break
	        }
	    } else {
	        nativeUnBind(elem, type, fn)
	    }
	}

	var typeRegExp = {}
	function collectHandlers(elem, type, handlers) {
	    var value = elem.getAttribute('avalon-events')
	    if (value && (elem.disabled !== true || type !== 'click')) {
	        var uuids = []
	        var reg = typeRegExp[type] || (typeRegExp[type] = new RegExp("\\b"+type + '\\:([^,\\s]+)', 'g'))
	        value.replace(reg, function (a, b) {
	            uuids.push(b)
	            return a
	        })
	        if (uuids.length) {
	            handlers.push({
	                elem: elem,
	                uuids: uuids
	            })
	        }
	    }
	    elem = elem.parentNode
	    var g = avalon.gestureEvents || {}
	    if (elem && elem.getAttribute && (canBubbleUp[type] || g[type])) {
	        collectHandlers(elem, type, handlers)
	    }

	}
	var rhandleHasVm = /^e/
	function dispatch(event) {
	    event = new avEvent(event)
	    var type = event.type
	    var elem = event.target
	    var handlers = []
	    collectHandlers(elem, type, handlers)
	    var i = 0, j, uuid, handler
	    while ((handler = handlers[i++]) && !event.cancelBubble) {
	        var host = event.currentTarget = handler.elem
	        j = 0
	        while ((uuid = handler.uuids[ j++ ]) &&
	                !event.isImmediatePropagationStopped) {
	            
	            var fn = avalon.eventListeners[uuid]
	            if (fn) {
	                var vm = rhandleHasVm.test(uuid) ? handler.elem._ms_context_ : 0
	                if (vm && vm.$hashcode === false) {
	                    return avalon.unbind(elem, type, fn)
	                }
	   
	                var ret = fn.call(vm || elem, event, host._ms_local)
	                
	                if(ret === false){
	                    event.preventDefault()
	                    event.stopPropagation()
	                }
	            }
	        }
	    }
	}

	var focusBlur = {
	    focus: true,
	    blur: true
	}
	var nativeBind = W3C ? function (el, type, fn, capture) {
	    el.addEventListener(type, fn, capture)
	} : function (el, type, fn) {
	    el.attachEvent('on' + type, fn)
	}
	var nativeUnBind = W3C ? function (el, type, fn) {
	    el.removeEventListener(type, fn)
	} : function (el, type, fn) {
	    el.detachEvent('on' + type, fn)
	}

	function delegateEvent(type) {
	    var value = root.getAttribute('delegate-events') || ''
	    if (value.indexOf(type) === -1) {
	        var arr = value.match(avalon.rword) || []
	        arr.push(type)
	        root.setAttribute('delegate-events', arr.join(','))
	        nativeBind(root, type, dispatch, !!focusBlur[type])
	    }
	}

	avalon.fireDom = function (elem, type, opts) {
	    if (document.createEvent) {
	        var hackEvent = document.createEvent('Events')
	        hackEvent.initEvent(type, true, true, opts)
	        avalon.shadowCopy(hackEvent, opts)

	        elem.dispatchEvent(hackEvent)
	    } else if (root.contains(elem)) {//IE6-8触发事件必须保证在DOM树中,否则报'SCRIPT16389: 未指明的错误'
	        hackEvent = document.createEventObject()
	        avalon.shadowCopy(hackEvent, opts)
	        elem.fireEvent('on' + type, hackEvent)
	    }
	}

	var rmouseEvent = /^(?:mouse|contextmenu|drag)|click/
	var rconstant = /^[A-Z_]+$/
	function avEvent(event) {
	    if (event.originalEvent) {
	        return this
	    }
	    for (var i in event) {
	        if (!rconstant.test(i) && typeof event[i] !== 'function') {
	            this[i] = event[i]
	        }
	    }
	    if (!this.target) {
	        this.target = event.srcElement
	    }
	    var target = this.target
	    if (this.which == null && event.type.indexOf('key') === 0) {
	        this.which = event.charCode != null ? event.charCode : event.keyCode
	    } else if (rmouseEvent.test(event.type) && !('pageX' in this)) {
	        var doc = target.ownerDocument || document
	        var box = doc.compatMode === 'BackCompat' ? doc.body : doc.documentElement
	        this.pageX = event.clientX + (box.scrollLeft >> 0) - (box.clientLeft >> 0)
	        this.pageY = event.clientY + (box.scrollTop >> 0) - (box.clientTop >> 0)
	        this.wheelDeltaY = this.wheelDelta
	        this.wheelDeltaX = 0
	    }
	    this.timeStamp = new Date() - 0
	    this.originalEvent = event
	}
	avEvent.prototype = {
	    preventDefault: function () {
	        var e = this.originalEvent
	        this.returnValue = false
	        if (e) {
	            e.returnValue = false
	            if (e.preventDefault) {
	                e.preventDefault()
	            }
	        }
	    },
	    stopPropagation: function () {
	        var e = this.originalEvent
	        this.cancelBubble = true
	        if (e) {
	            e.cancelBubble = true
	            if (e.stopPropagation) {
	                e.stopPropagation()
	            }
	        }
	    },
	    stopImmediatePropagation: function () {
	        var e = this.originalEvent
	        this.isImmediatePropagationStopped = true
	        if (e.stopImmediatePropagation) {
	            e.stopImmediatePropagation()
	        }
	        this.stopPropagation()
	    }
	}

	//针对firefox, chrome修正mouseenter, mouseleave
	if (!('onmouseenter' in root)) {
	    avalon.each({
	        mouseenter: 'mouseover',
	        mouseleave: 'mouseout'
	    }, function (origType, fixType) {
	        eventHooks[origType] = {
	            type: fixType,
	            fix: function (elem, fn) {
	                return function (e) {
	                    var t = e.relatedTarget
	                    if (!t || (t !== elem && !(elem.compareDocumentPosition(t) & 16))) {
	                        delete e.type
	                        e.type = origType
	                        return fn.apply(this, arguments)
	                    }
	                }
	            }
	        }
	    })
	}
	//针对IE9+, w3c修正animationend
	avalon.each({
	    AnimationEvent: 'animationend',
	    WebKitAnimationEvent: 'webkitAnimationEnd'
	}, function (construct, fixType) {
	    if (window[construct] && !eventHooks.animationend) {
	        eventHooks.animationend = {
	            type: fixType
	        }
	    }
	})
	//针对IE6-8修正input
	if (!('oninput' in document.createElement('input'))) {
	    eventHooks.input = {
	        type: 'propertychange',
	        fix: function (elem, fn) {
	            return function (e) {
	                if (e.propertyName === 'value') {
	                    e.type = 'input'
	                    return fn.apply(this, arguments)
	                }
	            }
	        }
	    }
	}
	if (document.onmousewheel === void 0) {
	    /* IE6-11 chrome mousewheel wheelDetla 下 -120 上 120
	     firefox DOMMouseScroll detail 下3 上-3
	     firefox wheel detlaY 下3 上-3
	     IE9-11 wheel deltaY 下40 上-40
	     chrome wheel deltaY 下100 上-100 */
	    var fixWheelType = document.onwheel !== void 0 ? 'wheel' : 'DOMMouseScroll'
	    var fixWheelDelta = fixWheelType === 'wheel' ? 'deltaY' : 'detail'
	    eventHooks.mousewheel = {
	        type: fixWheelType,
	        fix: function (elem, fn) {
	            return function (e) {
	                var delta = e[fixWheelDelta] > 0 ? -120 : 120
	                e.wheelDelta = ~~elem._ms_wheel_ + delta
	                elem._ms_wheel_ = e.wheelDeltaY = e.wheelDelta

	                e.wheelDeltaX = 0
	                if (Object.defineProperty) {
	                    Object.defineProperty(e, 'type', {
	                        value: 'mousewheel'
	                    })
	                }
	                return fn.apply(this, arguments)
	            }
	        }
	    }
	}

	avalon.fn.bind = function (type, fn, phase) {
	    if (this[0]) { //此方法不会链
	        return avalon.bind(this[0], type, fn, phase)
	    }
	}

	avalon.fn.unbind = function (type, fn, phase) {
	    if (this[0]) {
	        avalon.unbind(this[0], type, fn, phase)
	    }
	    return this
	}


/***/ },
/* 38 */
/***/ function(module, exports) {

	//http://www.feiesoft.com/html/events.html
	//http://segmentfault.com/q/1010000000687977/a-1020000000688757
	module.exports = {
	    click: true,
	    dblclick: true,
	    keydown: true,
	    keypress: true,
	    keyup: true,
	    mousedown: true,
	    mousemove: true,
	    mouseup: true,
	    mouseover: true,
	    mouseout: true,
	    wheel: true,
	    mousewheel: true,
	    input: true,
	    change: true,
	    beforeinput: true,
	    compositionstart: true,
	    compositionupdate: true,
	    compositionend: true,
	    select: true,
	    //http://blog.csdn.net/lee_magnum/article/details/17761441
	    cut: true,
	    copy: true,
	    paste: true,
	    beforecut: true,
	    beforecopy: true,
	    beforepaste: true,
	    focusin: true,
	    focusout: true,
	    DOMFocusIn: true,
	    DOMFocusOut: true,
	    DOMActivate: true,
	    dragend: true,
	    datasetchanged: true
	}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var scan = __webpack_require__(40)
	scan.htmlfy = __webpack_require__(41)
	var document = avalon.document
	var window = avalon.window
	var root = avalon.root

	var readyList = [], isReady
	var fireReady = function (fn) {
	    isReady = true

	    while (fn = readyList.shift()) {
	        fn(avalon)
	    }
	}

	function doScrollCheck() {
	    try { //IE下通过doScrollCheck检测DOM树是否建完
	        root.doScroll('left')
	        fireReady()
	    } catch (e) {
	        setTimeout(doScrollCheck)
	    }
	}

	if (document.readyState === 'complete') {
	    setTimeout(fireReady) //如果在domReady之外加载
	} else if (document.addEventListener) {
	    document.addEventListener('DOMContentLoaded', fireReady)
	} else if (document.attachEvent) {
	    document.attachEvent('onreadystatechange', function () {
	        if (document.readyState === 'complete') {
	            fireReady()
	        }
	    })
	    try {
	        var isTop = window.frameElement === null
	    } catch (e) {
	    }
	    if (root.doScroll && isTop && window.external) {//fix IE iframe BUG
	        doScrollCheck()
	    }
	}
	if (window.document) {
	    avalon.bind(window, 'load', fireReady)
	}
	avalon.ready = function (fn) {
	    if (!isReady) {
	        readyList.push(fn)
	    } else {
	        fn(avalon)
	    }
	}

	avalon.ready(function(){
	    scan(document.body)
	})



/***/ },
/* 40 */
/***/ function(module, exports) {

	var onceWarn = true //只警告一次
	function scan(nodes) {
	    var getHTML = avalon.scan.htmlfy
	    for (var i = 0, elem; elem = nodes[i++]; ) {
	        if (elem.nodeType === 1) {
	            var $id = getController(elem)

	            var vm = avalon.vmodels[$id]
	            if (vm && !vm.$element) {
	                avalon(elem).removeClass('ms-controller')
	                vm.$element = elem
	             
	                //IE6-8下元素的outerHTML前面会有空白
	                var text = getHTML(elem)//elem.outerHTML
	  
	                var now = new Date()
	                elem.vtree = avalon.lexer(text)
	                avalon.speedUp(elem.vtree)   
	                var now2 = new Date()
	                onceWarn && avalon.log('构建虚拟DOM耗时', now2 - now, 'ms')
	                vm.$render = avalon.render(elem.vtree)
	                avalon.scopes[vm.$id] = {
	                    vmodel: vm,
	                    local: {},
	                    isTemp: true
	                }
	                var now3 = new Date()
	                onceWarn && avalon.log('构建当前vm的$render方法耗时 ', now3 - now2, 'ms\n',
	                        '如果此时间太长,达100ms以上\n',
	                        '建议将当前ms-controller拆分成多个ms-controller,减少每个vm管辖的区域')
	                avalon.rerenderStart = now3
	                onceWarn = false
	                avalon.batch($id)

	            } else if (!$id) {
	                scan(elem.childNodes)
	            }
	        }
	    }
	}

	module.exports = avalon.scan = function (a) {
	    if (!a || !a.nodeType) {
	        avalon.warn('[avalon.scan] first argument must be element , documentFragment, or document')
	        return
	    }
	    scan([a])
	}

	function getController(a) {
	    return a.getAttribute('ms-controller') || 
	            a.getAttribute(':controller') 
	}

/***/ },
/* 41 */
/***/ function(module, exports) {

	var noChild = avalon.oneObject("area,base,basefont,br,col,command,embed,hr,img,input,link,meta,param,source,track,wbr")

	function getHTML(el) {
	    switch (el.nodeType) {
	        case 1:
	            var type = el.nodeName.toLowerCase()
	            return '<' + type + getAttributes(el.attributes) +
	                    (noChild[type] ? '/>' : ('>' + getChild(el) + '</' + type + '>'))
	        case 3:
	            return avalon.escapeHTML(el.nodeValue)//#1592
	        case 8:
	            return '<!--' + el.nodeValue + '-->'
	    }
	}


	function getAttributes(array) {
	    var ret = []
	    for (var i = 0, attr; attr = array[i++]; ) {
	        if (attr.specified) {
	            ret.push(attr.name.toLowerCase() + '="' + avalon.escapeHTML(attr.value) + '"')
	        }
	    }
	    var str = ret.join(' ')
	    return str ? ' ' + str : ''
	}

	function getChild(el) {
	    var ret = ''
	    for (var i = 0, node; node = el.childNodes[i++]; ) {
	        ret += getHTML(node)
	    }
	    return ret
	}

	module.exports = function(el){
	    if(avalon.msie > 8 || !avalon.msie){
	        return el.outerHTML
	    }
	    return getHTML(el)
	}


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(43)
	__webpack_require__(45)
	//处理属性样式
	__webpack_require__(47)

	__webpack_require__(48)
	__webpack_require__(49)
	////处理内容
	__webpack_require__(50)
	__webpack_require__(51)
	__webpack_require__(52)
	////需要用到事件的
	__webpack_require__(53)
	__webpack_require__(54)
	__webpack_require__(55)
	__webpack_require__(64)
	__webpack_require__(65)
	//
	////处理逻辑
	__webpack_require__(66)
	__webpack_require__(67)
	//
	__webpack_require__(68)
	__webpack_require__(71)
	//优先级 ms-important, ms-controller, ms-for, ms-widget, ms-effect, ms-if
	//.......
	//ms-duplex


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	// 抽离出来公用
	var update = __webpack_require__(44)

	avalon.directive('important', {
	    priority: 1,
	    parse: function (copy, src, binding) {
	        var quoted = avalon.quote(binding.expr)
	        copy[binding.name] = quoted
	        copy.local = '{}'
	        copy.vmodel = '(function(){ return __vmodel__ = avalon.vmodels[' + quoted + ']})()'
	        src.$prepend = ['(function(__vmodel__){',
	            'var important = avalon.scopes[' + quoted + ']',
	            'if(important){avalon.log("不进入"+' + quoted + ');return }',
	        ].join('\n') + '\n'
	        src.$append = '\n})();'
	    },
	    diff: function (copy, src, name) {
	        if (src.vmodel !== copy.vmodel) {
	            src['ms-controller'] = copy[name]
	            src.local = copy.local
	            src.vmodel = copy.vmodel
	            update(src, this.update)
	        }
	    },
	    update: function (dom, vdom, parent) {
	        avalon.directives.controller.update(dom, vdom, parent, 'important')
	    }
	})


/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = function (vdom, update, hookName) {
	    if (hookName) {
	        vdom.afterChange = vdom.afterChange || []
	        avalon.Array.ensure(vdom.afterChange, update)
	    } else {
	        var dom = vdom.dom
	        update(vdom.dom, vdom, dom && dom.parentNode)
	    }
	}


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// 抽离出来公用
	var update = __webpack_require__(44)
	var reconcile = __webpack_require__(46)

	var cache = {}
	avalon.mediatorFactoryCache = function (__vmodel__, __present__) {
	    var a = __vmodel__.$hashcode
	    var b = __present__.$hashcode
	    var id = a + b
	    if (cache[id]) {
	        return cache[id]
	    }
	    var c = avalon.mediatorFactory(__vmodel__, __present__)
	    return  cache[id] = c
	}
	avalon.directive('controller', {
	    priority: 2,
	    parse: function (copy, src, binding) {
	        var quoted = avalon.quote(binding.expr)
	        copy[binding.name] = quoted
	        copy.local = '__local__'
	        copy.vmodel = [
	            '(function(){',
	            'var vm = avalon.vmodels[' + quoted + ']',
	            'if(vm && __vmodel__&& vm !== __vmodel__){',
	            'return __vmodel__ = avalon.mediatorFactoryCache(__vmodel__, vm)',
	            '}else if(vm){',
	            'return __vmodel__ = vm',
	            '}',
	            '})()'
	        ].join('\n')

	        src.$prepend = '(function(__vmodel__){'
	        src.$append = '\n})(__vmodel__);'
	    },
	    diff: function (copy, src, name) {
	        if (src[name] !== copy[name]) {
	            src[name] = copy[name]
	            src.local = copy.local
	            src.vmodel = copy.vmodel
	            update(src, this.update)

	        }
	    },
	    update: function (dom, vdom, parent, important) {
	        var vmodel = vdom.vmodel
	        var local = vdom.local
	        var id = vdom['ms-controller']
	        var scope = avalon.scopes[id]
	        if (scope) {
	            return
	        }
	        delete vdom.vmodel
	        delete vdom.local
	        var top = avalon.vmodels[id]
	        if(vmodel.$element && vmodel.$element.vtree[0] === vdom){
	            var render = vmodel.$render
	        }else{
	            render = avalon.render([vdom], local)
	        }
	        vmodel.$render = render
	        vmodel.$element = dom
	        reconcile([dom], vdom, parent)
	        dom.vtree = [vdom]
	        if (top !== vmodel) {
	            top.$render = top.$render || render
	            top.$element = top.$element || dom
	        }
	        var needFire = important ? vmodel : top
	        var scope = avalon.scopes[id] = {
	            vmodel: vmodel,
	            local: local
	        }
	        update(vdom, function () {
	            var events = needFire.$events["onReady"]
	            if (events) {
	                needFire.$fire('onReady')
	                delete needFire.$events.onReady
	            }
	            scope.isMount = true
	        }, 'afterChange')

	    }
	})


/***/ },
/* 46 */
/***/ function(module, exports) {

	/*
	 * 
	 节点对齐算法
	 元素节点是1＋其类型
	 文本节点是3＋其是否能移除
	 注释节点是8＋其内容
	 发现不一样，就对真实DOM树添加或删除
	 添加的是 ms-for,ms-for-end占位的注释节点
	 删除的是多余的空白文本节点,与IE6-8私下添加的奇怪节点
	 */
	var rforHolder = /^ms\-for/
	var rwhiteRetain = /[\S\xA0]/
	var plainTag = avalon.oneObject('script,style,xmp,template,noscript,textarea')

	function reconcile(nodes, vnodes, parent) {
	    //遍平化虚拟DOM树
	    vnodes = flatten(vnodes)
	    var map = {}
	    var vn = vnodes.length
	    if (vn === 0)
	        return

	    vnodes.forEach(function (el, index) {
	        map[index] = getType(el)
	    })
	    var newNodes = [], change = false, el, i = 0
	    var breakLoop = 0
	    while (true) {
	        el = nodes[i++]
	        if (breakLoop++ > 5000) {
	            break
	        }
	        var vtype = el && getType(el)
	        var v = newNodes.length
	        if (map[v] === vtype) {
	            newNodes.push(el)
	            var vnode = vnodes[v]

	            if (vnode.dynamic) {
	                vnode.dom = el
	            }

	            if (el.nodeType === 1 && !vnode.isVoidTag && !plainTag[vnode.type]) {
	                if (el.type === 'select-one') {
	                    //在chrome与firefox下删掉select中的空白节点，会影响到selectedIndex
	                    var fixIndex = el.selectedIndex
	                }
	                reconcile(el.childNodes, vnode.children, el)
	                if (el.type === 'select-one') {
	                    el.selectedIndex = fixIndex
	                }
	            }
	        } else {
	            change = true
	            if (map[v] === '8true') {
	                var vv = vnodes[v]
	                var nn = document.createComment(vv.nodeValue)
	                vv.dom = nn
	                newNodes.push(nn)
	                i = Math.max(0, --i)
	            }
	        }
	        if (newNodes.length === vn) {
	            break
	        }
	    }
	    if (change) {
	        var f = document.createDocumentFragment(), i = 0
	        while (el = newNodes[i++]) {
	            f.appendChild(el)
	        }
	        while (parent.firstChild) {
	            parent.removeChild(parent.firstChild)
	        }
	        parent.appendChild(f)
	    }
	}

	module.exports = reconcile


	function getType(node) {
	    switch (node.nodeType) {
	        case 3:
	            return '3' + rwhiteRetain.test(node.nodeValue) 
	        case 1:
	            return '1' + (node.nodeName || node.type).toLowerCase()
	        case 8:
	            return '8' + rforHolder.test(node.nodeValue)
	    }
	}

	function flatten(nodes) {
	    var arr = []
	    for (var i = 0, el; el = nodes[i]; i++) {
	        if (Array.isArray(el)) {
	            arr = arr.concat(flatten(el))
	        } else {
	            arr.push(el)
	        }
	    }
	    return arr
	}



/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	
	var attrUpdate = __webpack_require__(29)
	var update = __webpack_require__(44)

	avalon.directive('attr', {
	    diff: function (copy, src, name) {
	        var a = copy[name]
	        var p = src[name]
	        if (a && typeof a === 'object') {
	            a = a.$model || a //安全的遍历VBscript
	            if (Array.isArray(a)) {//转换成对象
	                a = avalon.mix.apply({}, a)
	            }
	            if (typeof p !== 'object') {//如果一开始为空
	                src.changeAttr = src[name] = a
	            } else {
	                var patch = {}
	                var hasChange = false
	                for (var i in a) {//diff差异点
	                    if (a[i] !== p[i]) {
	                        hasChange = true
	                        patch[i] = a[i]
	                    }
	                }
	                if (hasChange) {
	                    src[name] = a
	                    src.changeAttr = patch
	                }
	            }
	            if (src.changeAttr) {
	                update(src, this.update )
	            }
	        }
	        delete copy[name]//释放内存
	    },
	    //dom, vnode
	    update: attrUpdate
	})


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	
	var update = __webpack_require__(44)

	avalon.directive('css', {
	    diff: function (copy, src, name) {
	        var a = copy[name]
	        var p = src[name]
	        if (Object(a) === a) {
	            
	            a = a.$model || a//安全的遍历VBscript
	            if (Array.isArray(a)) {//转换成对象
	                a = avalon.mix.apply({}, a)
	            }
	            if (typeof p !== 'object') {//如果一开始为空
	                src.changeStyle = src[name] = a
	            } else {
	                var patch = {}
	                var hasChange = false
	                for (var i in a) {//diff差异点
	                    if (a[i] !== p[i]) {
	                        hasChange = true
	                        patch[i] = a[i]
	                    }
	                }
	                if (hasChange) {
	                    src[name] = a
	                    src.changeStyle = patch
	                }
	            }
	            if (src.changeStyle) {
	                update(src, this.update)
	            }
	        }
	        delete copy[name]//释放内存
	    },
	    update: function (dom, vdom) {
	        var change = vdom.changeStyle
	        var wrap = avalon(dom)
	        for (var name in change) {
	            wrap.css(name, change[name])
	        }
	        delete vdom.changeStyle
	    }
	})


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(44)

	var none = 'none'
	function parseDisplay(elem, val) {
	    //用于取得此类标签的默认display值
	    var doc = elem.ownerDocument
	    var nodeName = elem.nodeName
	    var key = '_' + nodeName
	    if (!parseDisplay[key]) {
	        var temp = doc.body.appendChild(doc.createElement(nodeName))
	        if (avalon.modern) {
	            val = getComputedStyle(temp, null).display
	        } else {
	            val = temp.currentStyle.display
	        }
	        doc.body.removeChild(temp)
	        if (val === none) {
	            val = 'block'
	        }
	        parseDisplay[key] = val
	    }
	    return parseDisplay[key]
	}

	avalon.parseDisplay = parseDisplay

	avalon.directive('visible', {
	    diff: function (copy, src, name) {
	        var c = !!copy[name]
	        if (c !== src[name]) {
	            src[name] = c
	            update(src, this.update )
	        }
	    },
	    update: function (dom, vdom) { 
	        if(!dom || dom.nodeType !== 1){
	            return
	        }
	        var show = vdom['ms-visible']
	        var display = dom.style.display
	        var value
	        if (show) {
	            if (display === none) {
	                value = vdom.displayValue
	                if (!value) {
	                    dom.style.display = ''
	                }
	            }
	            if (dom.style.display === '' && avalon(dom).css('display') === none &&
	                    // fix firefox BUG,必须挂到页面上
	                    avalon.contains(dom.ownerDocument, dom)) {

	                value = parseDisplay(dom)
	            }
	        } else {
	            if (display !== none) {
	                value = none
	                vdom.displayValue = display
	            }
	        }
	        function cb(){
	           if (value !== void 0) {
	              dom.style.display = value
	           }
	        }
	        avalon.applyEffect(dom, vdom, {
	            hook: show ? 'onEnterDone': 'onLeaveDone',
	            cb: cb
	        })
	    }
	})



/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(44)

	avalon.directive('expr', {
	    parse: avalon.noop,
	    diff: function (copy, src) {
	        var copyValue = copy.nodeValue + ''
	        if (copyValue !== src.nodeValue) {
	            src.nodeValue = copyValue
	            update(src, this.update)
	        }
	    },
	    update: function (dom, vdom) {
	        if (dom) {
	            dom.nodeValue = vdom.nodeValue
	        } else {
	            avalon.warn('[', vdom.nodeValue, ']找不到对应的文本节点赋值')
	        }
	    }
	})




/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	//此指令实际上不会操作DOM,交由expr指令处理
	var update = __webpack_require__(44)

	avalon.directive('text', {
	    parse: function (copy, src, binding) {
	        copy[binding.name] = 1
	        src.children = []
	        copy.children = '[{\nnodeType:3,\ntype:"#text",\ndynamic:true,' +
	                '\nnodeValue:avalon.parsers.string(' +
	                avalon.parseExpr(binding) + ')}]'
	    },
	    diff: function (copy, src) {
	        if(!src.children.length){
	           update(src, this.update)
	        }
	    },
	    update: function(dom, vdom){
	        if (dom && !vdom.isVoidTag ) {
	            var parent = dom
	            while (parent.firstChild) {
	                parent.removeChild(parent.firstChild)
	            }
	            var dom = document.createTextNode('x')
	            parent.appendChild(dom)
	            var a = {nodeType: 3, type:'#text', dom: dom}
	            vdom.children.push(a)
	        }
	    }
	})

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(44)
	var reconcile = __webpack_require__(46)

	avalon.directive('html', {
	    parse: function (copy, src, binding) {
	        if (!src.isVoidTag) {
	            //将渲染函数的某一部分存起来,渲在c方法中转换为函数
	            copy[binding.name] = avalon.parseExpr(binding)
	            copy.vmodel = '__vmodel__'
	            copy.local = '__local__'
	        } else {
	            copy.children = '[]'
	        }
	    },
	    diff: function (copy, src, name) {
	        var copyValue = copy[name] + ''
	        if (copyValue !== src[name]) {
	            src[name] = copyValue
	            var oldTree = avalon.lexer(copyValue)
	            avalon.speedUp(oldTree)
	            src.children = oldTree
	            var render = avalon.render(oldTree,copy.local)
	            src.render = render
	            var newTree = render(copy.vmodel, copy.local)
	            copy.children = newTree
	            update(src, this.update)
	        } else {
	            var newTree = src.render(copy.vmodel, copy.local)
	            copy.children = newTree
	        }
	    },

	    update: function (dom, vdom, parent) {
	        avalon.clearHTML(dom)
	        var f = avalon.vdomAdaptor(vdom.children)
	        reconcile(f.childNodes, vdom.children, f)
	        dom.appendChild(f)
	    }
	})


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	//根据VM的属性值或表达式的值切换类名，ms-class='xxx yyy zzz:flag'
	//http://www.cnblogs.com/rubylouvre/archive/2012/12/17/2818540.html
	var markID = __webpack_require__(13).getLongID
	var update = __webpack_require__(44)

	function classNames() {
	    var classes = []
	    for (var i = 0; i < arguments.length; i++) {
	        var arg = arguments[i]
	        var argType = typeof arg
	        if (argType === 'string' || argType === 'number' || arg === true) {
	            classes.push(arg)
	        } else if (Array.isArray(arg)) {
	            classes.push(classNames.apply(null, arg))
	        } else if (argType === 'object') {
	            for (var key in arg) {
	                if (arg.hasOwnProperty(key) && arg[key]) {
	                    classes.push(key)
	                }
	            }
	        }
	    }

	    return classes.join(' ')
	}

	var directives = avalon.directives
	avalon.directive('class', {
	    diff: function (copy, src, name) {
	        var type = name.slice(3)
	        var copyValue = copy[name]
	        var srcValue = src[name] || ''
	        var classEvent = src.classEvent || {}
	        if (type === 'hover') {//在移出移入时切换类名
	            classEvent.mouseenter = activateClass
	            classEvent.mouseleave = abandonClass
	        } else if (type === 'active') {//在获得焦点时切换类名
	            src.props.tabindex = copy.props.tabindex || -1
	            classEvent.tabIndex = src.props.tabindex
	            classEvent.mousedown = activateClass
	            classEvent.mouseup = abandonClass
	            classEvent.mouseleave = abandonClass
	        }
	        src.classEvent = classEvent


	        var className = classNames(copyValue)
	        var uniq = {}, arr = []
	        className.replace(/\S+/g, function (el) {
	            if (!uniq[el]) {
	                uniq[el] = 1
	                arr.push(el)
	            }
	        })

	        className = arr.join(' ')

	        if (srcValue !== className) {
	            src[name] = className
	            src['change-' + type] = className
	            update(src, this.update, type)
	        }
	    },
	    update: function (dom, vdom) {
	        if (!dom || dom.nodeType !== 1)
	            return
	        var classEvent = vdom.classEvent
	        if (classEvent) {
	            for (var i in classEvent) {
	                if (i === 'tabIndex') {
	                    dom[i] = classEvent[i]
	                } else {
	                    avalon.bind(dom, i, classEvent[i])
	                }
	            }
	            vdom.classEvent = {}
	        }
	        var names = ['class', 'hover', 'active']
	        names.forEach(function (type) {
	            var name = 'change-' + type
	            var value = vdom[name]
	            if (value === void 0)
	                return
	            if (type === 'class') {
	                dom && setClass(dom, vdom)
	            } else {
	                var oldType = dom.getAttribute('change-' + type)
	                if (oldType) {
	                    avalon(dom).removeClass(oldType)
	                }
	                dom.setAttribute(name, value)
	            }
	        })
	    }
	})

	directives.active = directives.hover = directives['class']


	var classMap = {
	    mouseenter: 'change-hover',
	    mouseleave: 'change-hover',
	    mousedown: 'change-active',
	    mouseup: 'change-active'
	}

	function activateClass(e) {
	    var elem = e.target
	    avalon(elem).addClass(elem.getAttribute(classMap[e.type]) || '')
	}

	function abandonClass(e) {
	    var elem = e.target
	    var name = classMap[e.type]
	    avalon(elem).removeClass(elem.getAttribute(name) || '')
	    if (name !== 'change-active') {
	        avalon(elem).removeClass(elem.getAttribute('change-active') || '')
	    }
	}

	function setClass(dom, vdom) {
	    var old = dom.getAttribute('old-change-class')
	    var neo = vdom['ms-class']
	    if (old !== neo) {
	        avalon(dom).removeClass(old).addClass(neo)
	        dom.setAttribute('old-change-class', neo)
	    }

	}

	markID(activateClass)
	markID(abandonClass)




/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	var Cache = __webpack_require__(35)
	var eventCache = new Cache(128)
	var update = __webpack_require__(44)
	var markID = __webpack_require__(13).getLongID

	var rfilters = /\|.+/g
	//Ref: http://developers.whatwg.org/webappapis.html#event-handler-idl-attributes
	// The assumption is that future DOM event attribute names will begin with
	// 'on' and be composed of only English letters.
	var rfilters = /\|.+/g
	var rvar = /((?:\@|\$|\#\#)?\w+)/g
	var rstring = /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/g

	//基于事件代理的高性能事件绑定
	avalon.directive('on', {
	    priority: 3000,
	    parse: function (copy, src, binding) {
	        var underline = binding.name.replace('ms-on-', 'e').replace('-', '_')
	        var uuid = underline + '_' + binding.expr.
	                replace(/\s/g, '').
	                replace(/[^$a-z]/ig, function (e) {
	                    return e.charCodeAt(0)
	                })

	        var quoted = avalon.quote(uuid)
	        var fn = '(function(){\n' +
	                'var fn610 = ' +
	                avalon.parseExpr(binding, 'on') +
	                '\nfn610.uuid =' + quoted + ';\nreturn fn610})()'
	        copy.vmodel = '__vmodel__'
	        copy.local = '__local__'
	        copy[binding.name] = fn

	    },
	    diff: function (copy, src, name) {
	        var fn = copy[name]
	        var uuid = fn.uuid
	        var type = uuid.split('_').shift()
	        var search = type.slice(1) + ':' + uuid
	        var srcFn = src[name]
	        var hasChange = false
	        if (!srcFn || srcFn.uuid !== uuid) {
	            src[name] = fn
	            src.addEvents = src.addEvents || {}
	            src.addEvents[search] = fn
	            avalon.eventListeners.uuid = fn
	            hasChange = true
	        }
	        if (diffObj(src.local|| {}, copy.local)) {
	            hasChange = true
	        }
	        if (hasChange) {
	            src.local = copy.local
	            src.vmodel = copy.vmodel
	            update(src, this.update)
	        }
	    },
	    update: function (dom, vdom) {
	        if (!dom || dom.nodeType > 1) //在循环绑定中，这里为null
	            return
	        var key, type, listener
	        dom._ms_context_ = vdom.vmodel
	        dom._ms_local = vdom.local
	        for (key in vdom.addEvents) {
	            type = key.split(':').shift()
	            listener = vdom.addEvents[key]
	            avalon.bind(dom, type, listener)
	        }
	        delete vdom.addEvents
	    }
	})

	function diffObj(a, b) {
	    for (var i in a) {//diff差异点
	        if (a[i] !== b[i]) {
	            return true
	        }
	    }
	    return false
	}

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	
	var update = __webpack_require__(44)
	var evaluatorPool = __webpack_require__(56)
	var stringify = __webpack_require__(57)

	var rchangeFilter = /\|\s*change\b/
	var rcheckedType = /^(?:checkbox|radio)$/
	var rdebounceFilter = /\|\s*debounce(?:\(([^)]+)\))?/
	var updateModelByEvent = __webpack_require__(58)
	var updateModelByValue = __webpack_require__(61)
	var updateModel = __webpack_require__(59)
	var updateView = __webpack_require__(62)
	var addValidateField = __webpack_require__(63)


	avalon.directive('duplex', {
	    priority: 2000,
	    parse: function (copy, src, binding) {
	        var expr = binding.expr
	        var etype = src.props.type
	        //处理数据转换器
	        var parser = binding.param, dtype
	        var isChecked = false
	        parser = parser ? parser.split('-').map(function (a) {
	            if (a === 'checked') {
	                isChecked = true
	            }
	            return a
	        }) : []

	        if (rcheckedType.test(etype) && isChecked) {
	            //如果是radio, checkbox,判定用户使用了checked格式函数没有
	            parser = []
	            dtype = 'radio'
	        }

	        if (!/input|textarea|select/.test(src.type)) {
	            if ('contenteditable' in src.props) {
	                dtype = 'contenteditable'
	            }
	        } else if (!dtype) {
	            dtype = src.type === 'select' ? 'select' :
	                    etype === 'checkbox' ? 'checkbox' :
	                    etype === 'radio' ? 'radio' :
	                    'input'
	        }
	        var isChanged = false, debounceTime = 0
	        //判定是否使用了 change debounce 过滤器
	        if (dtype === 'input' || dtype === 'contenteditable') {
	            var isString = true
	            if (rchangeFilter.test(expr)) {
	                isChanged = true
	            }
	            if (!isChanged) {
	                var match = expr.match(rdebounceFilter)
	                if (match) {
	                    debounceTime = parseInt(match[1], 10) || 300
	                }
	            }
	        }


	        var changed = copy.props['data-duplex-changed']
	        copy.parser = avalon.quote(parser + "")
	        copy.modelValue = '(' + avalon.parseExpr(binding, 'duplex') + ')(__vmodel__)'// 输出原始数据
	        var format = evaluatorPool.get('duplex:format:' + expr)

	        copy.duplexData = stringify({
	            type: dtype, //这个决定绑定什么事件
	            vmodel: '__vmodel__',
	            isChecked: isChecked,
	            isString: !!isString,
	            isChanged: isChanged, //这个决定同步的频数
	            debounceTime: debounceTime, //这个决定同步的频数
	            format: format || 'function(vm, a){return a}',
	            set: evaluatorPool.get('duplex:set:' + expr),
	            callback: changed ? avalon.parseExpr(changed, 'on') : 'avalon.noop'
	        })

	    },
	    diff: function (copy, src) {

	        if (!src.duplexData) {
	            //第一次为原始虚拟DOM添加duplexData
	            var data = src.duplexData = copy.duplexData
	            data.parser = copy.parser ? copy.parser.split(',') : []
	            data.parse = parseValue
	            var curValue = copy.modelValue
	        } else {
	            data = src.duplexData
	            var curValue = copy.modelValue
	            var preValue = data.modelValue
	            //#1502
	            if (!Array.isArray(curValue) &&
	                    curValue === preValue) {
	                return
	            }
	        }
	        copy.duplexData = 0
	        if (data.isString) {//输出到页面时要格式化
	            var value = data.parse(curValue)
	            if (value !== curValue) {
	                data.set(data.vmodel, value)
	                return
	            }
	            curValue = value
	        }
	        data.modelValue = curValue
	        if (data.isString) {//输出到页面时要格式化
	            value = data.format(data.vmodel, curValue + '')
	            if (value !== curValue + '') {
	                data.set(data.vmodel, value)
	                return
	            }
	            curValue = value
	        }
	        data.viewValue = curValue
	        update(src, this.update, 'afterChange')
	    },
	    update: function (dom, vdom) {
	        if (dom && dom.nodeType === 1) {
	            if (!dom.__ms_duplex__) {
	                dom.__ms_duplex__ = vdom.duplexData
	                updateModelByEvent(dom, vdom)
	            }
	            var data = dom.__ms_duplex__

	            data.dom = dom
	            addValidateField(dom, vdom)
	            if (data.isString
	                    && !avalon.msie
	                    && updateModelByValue === false
	                    && !dom.valueHijack) {
	                //chrome 42及以下版本需要这个hack

	                dom.valueHijack = updateModel
	                var intervalID = setInterval(function () {
	                    if (!avalon.contains(avalon.root, dom)) {
	                        clearInterval(intervalID)
	                    } else {
	                        dom.valueHijack()
	                    }
	                }, 30)
	            }

	            updateView[data.type].call(data)


	        }

	    }
	})

	function parseValue(val) {
	    for (var i = 0, k; k = this.parser[i++]; ) {
	        var fn = avalon.parsers[k]
	        if (fn) {
	            val = fn.call(this, val)
	        }
	    }
	    return val
	}

	/*
	 vm[ms-duplex]  →  原始modelValue →  格式化后比较   →   输出页面
	 ↑                                                ↓
	 比较modelValue  ←  parsed后得到modelValue  ← 格式化后比较 ←  原始viewValue
	 */

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	
	var Cache = __webpack_require__(35)
	//缓存求值函数，以便多次利用
	module.exports = new Cache(512)


/***/ },
/* 57 */
/***/ function(module, exports) {

	var keyMap = avalon.oneObject("break,case,catch,continue,debugger,default,delete,do,else,false," +
	        "finally,for,function,if,in,instanceof,new,null,return,switch,this," +
	        "throw,true,try,typeof,var,void,while,with," + /* 关键字*/
	        "abstract,boolean,byte,char,class,const,double,enum,export,extends," +
	        "final,float,goto,implements,import,int,interface,long,native," +
	        "package,private,protected,public,short,static,super,synchronized," +
	        "throws,transient,volatile")
	avalon.keyMap = keyMap
	  var quoted = {
	      type: 1,
	      template: 1,
	      order: 1,
	      nodeValue: 1,
	      dynamic: 1,
	      signature: 1,
	      wid: 1,
	      cid: 1
	  }

	var rneedQuote = /[W-]/
	var quote = avalon.quote
	function fixKey(k) {
	    return (rneedQuote.test(k) || keyMap[k]) ? quote(k) : k
	}

	function stringify(obj) {
	    var arr1 = []
	//字符不用东西包起来就变成变量
	    for (var i in obj) {
	        if (i === 'props') {
	            var arr2 = []
	            for (var k in obj.props) {
	                var kv = obj.props[k]
	                if (typeof kv === 'string') {
	                    kv = quote(kv)
	                }
	                arr2.push(fixKey(k) + ': ' + kv)
	            }
	            arr1.push('props: {' + arr2.join(',\n') + '}')
	        } else if(obj.hasOwnProperty(i) && i !== 'dom') {
	           
	            var v = obj[i]
	            if (typeof v === 'string') {
	                v = quoted[i] ? quote(v) : v
	            }
	            arr1.push(fixKey(i) + ':' + v)
	        }
	    }
	    return '{\n' + arr1.join(',\n') + '}'
	}

	module.exports = stringify


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/* 
	 * 通过绑定事件同步vmodel
	 * 总共有三种方式同步视图
	 * 1. 各种事件 input, change, click, propertychange, keydown...
	 * 2. value属性重写
	 * 3. 定时器轮询
	 */
	var updateModel = __webpack_require__(59)
	var markID = __webpack_require__(13).getShortID
	var msie = avalon.msie
	var window = avalon.window
	var document = avalon.document
	function updateModelByEvent(node, vnode) {
	    var events = {}
	    var data = vnode.duplexData
	    data.update = updateModel
	    //添加需要监听的事件
	    switch (data.type) {
	        case 'radio':
	        case 'checkbox':
	            events.click = updateModel
	            break
	        case 'select':
	            events.change = updateModel
	            break
	        case 'contenteditable':
	            if (data.isChanged) {
	                events.blur = updateModel
	            } else {
	                if (avalon.modern) {
	                    if (window.webkitURL) {
	                        // http://code.metager.de/source/xref/WebKit/LayoutTests/fast/events/
	                        // https://bugs.webkit.org/show_bug.cgi?id=110742
	                        events.webkitEditableContentChanged = updateModel
	                    } else if (window.MutationEvent) {
	                        events.DOMCharacterDataModified = updateModel
	                    }
	                    events.input = updateModel
	                } else {
	                    events.keydown = updateModelKeyDown
	                    events.paste = updateModelDelay
	                    events.cut = updateModelDelay
	                    events.focus = closeComposition
	                    events.blur = openComposition
	                }

	            }
	            break
	        case 'input':
	            if (data.isChanged) {
	                events.change = updateModel
	            } else {
	                //http://www.cnblogs.com/rubylouvre/archive/2013/02/17/2914604.html
	                //http://www.matts411.com/post/internet-explorer-9-oninput/
	                if (msie) {//处理输入法问题
	                    events.keyup = updateModelKeyDown
	                }

	                if (msie < 9) {
	                    events.propertychange = updateModelHack
	                    events.paste = updateModelDelay
	                    events.cut = updateModelDelay
	                } else {
	                    events.input = updateModel
	                }
	                //IE6-8的propertychange有BUG,第一次用JS修改值时不会触发,而且你是全部清空value也不会触发
	                //IE9的propertychange不支持自动完成,退格,删除,复制,贴粘,剪切或点击右边的小X的清空操作
	                //IE11微软拼音好像才会触发compositionstart 不会触发compositionend
	                //https://github.com/RubyLouvre/avalon/issues/1368#issuecomment-220503284
	                if(!msie || msie > 9){
	                    events.compositionstart = openComposition
	                    events.compositionend = closeComposition
	                }
	                if (!msie) {

	                    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray
	                    //如果当前浏览器支持Int8Array,那么我们就不需要以下这些事件来打补丁了
	                    if (!/\[native code\]/.test(window.Int8Array)) {
	                        events.keydown = updateModelKeyDown //safari < 5 opera < 11
	                        events.paste = updateModelDelay//safari < 5
	                        events.cut = updateModelDelay//safari < 5 
	                        if (window.netscape) {
	                            // Firefox <= 3.6 doesn't fire the 'input' event when text is filled in through autocomplete
	                            events.DOMAutoComplete = updateModel
	                        }
	                    }
	                }
	            }
	            break
	    }

	    if (/password|text/.test(vnode.props.type)) {
	        events.focus = openCaret //判定是否使用光标修正功能 
	        events.blur = closeCaret
	        data.getCaret = getCaret
	        data.setCaret = setCaret
	    }

	    for (var name in events) {
	        avalon.bind(node, name, events[name])
	    }
	}


	function updateModelHack(e) {
	    if (e.propertyName === 'value') {
	        updateModel.call(this, e)
	    }
	}

	function updateModelDelay(e) {
	    var elem = this
	    setTimeout(function () {
	        updateModel.call(elem, e)
	    }, 0)
	}


	function openCaret() {
	    this.caret = true
	}

	function closeCaret() {
	    this.caret = false
	}
	function openComposition() {
	    this.composing = true
	}

	function closeComposition(e) {
	    this.composing = false
	    updateModelDelay.call(this, e)
	}

	function updateModelKeyDown(e) {
	    var key = e.keyCode
	    // ignore
	    //    command            modifiers                   arrows
	    if (key === 91 || (15 < key && key < 19) || (37 <= key && key <= 40))
	        return
	    updateModel.call(this, e)
	}

	markID(openCaret)
	markID(closeCaret)
	markID(openComposition)
	markID(closeComposition)
	markID(updateModel)
	markID(updateModelHack)
	markID(updateModelDelay)
	markID(updateModelKeyDown)

	//IE6-8要处理光标时需要异步
	var mayBeAsync = function (fn) {
	    setTimeout(fn, 0)
	}
	var setCaret = function (target, cursorPosition) {
	    var range
	    if (target.createTextRange) {
	        mayBeAsync(function () {
	            target.focus()
	            range = target.createTextRange()
	            range.collapse(true)
	            range.moveEnd('character', cursorPosition)
	            range.moveStart('character', cursorPosition)
	            range.select()
	        })
	    } else {
	        target.focus()
	        if (target.selectionStart !== undefined) {
	            target.setSelectionRange(cursorPosition, cursorPosition)
	        }
	    }
	}

	var getCaret = function (target) {
	    var start = 0
	    var normalizedValue
	    var range
	    var textInputRange
	    var len
	    var endRange

	    if (typeof target.selectionStart == "number" && typeof target.selectionEnd == "number") {
	        start = target.selectionStart
	    } else {
	        range = document.selection.createRange()

	        if (range && range.parentElement() == target) {
	            len = target.value.length
	            normalizedValue = target.value.replace(/\r\n/g, "\n")

	            textInputRange = target.createTextRange()
	            textInputRange.moveToBookmark(range.getBookmark())

	            endRange = target.createTextRange()
	            endRange.collapse(false)

	            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
	                start = len
	            } else {
	                start = -textInputRange.moveStart("character", -len)
	                start += normalizedValue.slice(0, start).split("\n").length - 1
	            }
	        }
	    }

	    return start
	}

	module.exports = updateModelByEvent

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	var updateModelMethods = __webpack_require__(60)

	function updateModelHandle(e) {
	    var elem = this
	    var field = this.__ms_duplex__
	    if (elem.composing || field.parse(elem.value) === field.lastViewValue){
	        //防止onpropertychange引发爆栈
	        return
	    }
	   if (elem.caret) {
	        try {
	            var pos = field.getCaret(elem)
	            field.pos = pos
	        } catch (e) {
	            avalon.warn('fixCaret error', e)
	        }
	    }
	    if (field.debounceTime > 4) {
	        var timestamp = new Date()
	        var left = timestamp - field.time || 0
	        field.time = timestamp
	        if (left >= field.debounceTime) {
	            updateModelMethods[field.type].call(field)
	        } else {
	            clearTimeout(field.debounceID)
	            field.debounceID = setTimeout(function () {
	                updateModelMethods[field.type].call(field)
	            }, left)
	        }
	    } else {
	        updateModelMethods[field.type].call(field)
	    }
	}

	module.exports = updateModelHandle

/***/ },
/* 60 */
/***/ function(module, exports) {

	var updateModelMethods = {
	    input: function (prop) {//处理单个value值处理
	        var data = this
	        prop = prop || 'value'
	        var dom = data.dom
	        var rawValue = dom[prop]
	        var parsedValue = data.parse(rawValue)
	        var formatedValue = data.format(data.vmodel, parsedValue)
	        data.lastViewValue = formatedValue
	        //有时候parse后一致,vm不会改变,但input里面的值
	        if (parsedValue !== data.modelValue) {
	            data.set(data.vmodel, parsedValue)
	            callback(data)
	        }
	       
	        dom[prop] = formatedValue
	      
	        var pos = data.pos
	        if (dom.caret ) {
	            data.setCaret(dom, pos)
	         }
	        //vm.aaa = '1234567890'
	        //处理 <input ms-duplex='@aaa|limitBy(8)'/>{{@aaa}} 这种格式化同步不一致的情况 

	    },
	    radio: function () {
	        var data = this
	        if (data.isChecked) {
	            var val = !data.modelValue
	            data.set(data.vmodel, val)
	            callback(data)
	        } else {
	            updateModelMethods.input.call(data)
	            data.lastViewValue = NaN
	        }
	    },
	    checkbox: function () {
	        var data = this
	        var array = data.modelValue
	        if (!Array.isArray(array)) {
	            avalon.warn('ms-duplex应用于checkbox上要对应一个数组')
	            array = [array]
	        }
	        var method = data.dom.checked ? 'ensure' : 'remove'
	        
	        if (array[method]) {
	            var val = data.parse(data.dom.value)
	            array[method](val)
	            callback(data)
	        }

	    },
	    select: function () {
	        var data = this
	        var val = avalon(data.dom).val() //字符串或字符串数组
	        if (val + '' !== this.modelValue + '') {
	            if (Array.isArray(val)) { //转换布尔数组或其他
	                val = val.map(function (v) {
	                    return data.parse(v)
	                })
	            } else {
	                val = data.parse(val)
	            }
	            data.set(data.vmodel, val)
	            callback(data)
	        }
	    },
	    contenteditable: function () {
	        updateModelMethods.input.call(this, 'innerHTML')
	    }
	}

	function callback(data) {
	    if (data.callback) {
	        data.callback.call(data.vmodel, {
	            type: 'changed',
	            target: data.dom
	        })
	    }
	}



	module.exports = updateModelMethods


/***/ },
/* 61 */
/***/ function(module, exports) {

	var valueHijack = false
	try { //#272 IE9-IE11, firefox
	    var setters = {}
	    var aproto = HTMLInputElement.prototype
	    var bproto = HTMLTextAreaElement.prototype
	    function newSetter(value) { // jshint ignore:line
	        setters[this.tagName].call(this, value)
	        if (!this.caret && this.__ms_duplex__) {
	            this.__ms_duplex__.update.call(this)
	        }
	    }
	    var inputProto = HTMLInputElement.prototype
	    Object.getOwnPropertyNames(inputProto) //故意引发IE6-8等浏览器报错
	    setters['INPUT'] = Object.getOwnPropertyDescriptor(aproto, 'value').set

	    Object.defineProperty(aproto, 'value', {
	        set: newSetter
	    })
	    setters['TEXTAREA'] = Object.getOwnPropertyDescriptor(bproto, 'value').set
	    Object.defineProperty(bproto, 'value', {
	        set: newSetter
	    })
	    valueHijack = true
	} catch (e) {
	    //在chrome 43中 ms-duplex终于不需要使用定时器实现双向绑定了
	    // http://updates.html5rocks.com/2015/04/DOM-attributes-now-on-the-prototype
	    // https://docs.google.com/document/d/1jwA8mtClwxI-QJuHT7872Z0pxpZz8PBkf2bGAbsUtqs/edit?pli=1
	}
	module.exports = valueHijack

/***/ },
/* 62 */
/***/ function(module, exports) {

	
	var updateView = {
	    input: function () {//处理单个value值处理
	        this.dom.value = this.viewValue
	    },
	    radio: function () {//处理单个checked属性
	        var checked
	        if (this.isChecked) {
	            checked = !!this.modelValue
	        } else {
	            checked = this.viewValue + '' === this.dom.value
	        }
	        var dom = this.dom
	        if (avalon.msie === 6) {
	            setTimeout(function () {
	                //IE8 checkbox, radio是使用defaultChecked控制选中状态，
	                //并且要先设置defaultChecked后设置checked
	                //并且必须设置延迟
	                dom.defaultChecked = checked
	                dom.checked = checked
	            }, 31)
	        } else {
	            dom.checked = checked
	        }
	    },
	    checkbox: function () {//处理多个checked属性
	        var checked = false
	        var dom = this.dom
	        var value = dom.value
	        for (var i = 0; i < this.modelValue.length; i++) {
	            var el = this.modelValue[i]
	            if (el + '' === value) {
	                checked = true
	            }
	        }
	        dom.checked = checked
	    },
	    select: function () {//处理子级的selected属性
	        var a = Array.isArray(this.viewValue) ?
	                this.viewValue.map(String) : this.viewValue + ''
	        avalon(this.dom).val(a)
	    },
	    contenteditable: function () {//处理单个innerHTML
	        this.dom.innerHTML = this.viewValue
	        this.update.call(this.dom)
	    }
	}

	module.exports = updateView


/***/ },
/* 63 */
/***/ function(module, exports) {

	
	module.exports = function addField(node, vnode) {
	    var field = node.__ms_duplex__
	    var rules = vnode['ms-rules']
	    if (rules && !field.validator) {
	        while (node && node.nodeType === 1) {
	            var validator = node._ms_validator_
	            if (validator) {
	                field.rules = rules
	                field.validator = validator
	                if(avalon.Array.ensure(validator.fields, field)){
	                    validator.addField(field)
	                }
	                break
	            }
	            node = node.parentNode
	        }
	    }
	}


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(44)

	var dir = avalon.directive('validate', {
	//验证单个表单元素
	    diff: function (copy, src, name) {
	        var validator = copy[name]
	        var p = src[name]
	        if (p && p.onError && p.addField) {
	            return
	        } else if (Object(validator) === validator) {
	            src.vmValidator = validator
	            if (validator.$id) {//转换为普通对象
	                validator = validator.$model
	            }
	           
	            src[name] = validator
	            for (var name in dir.defaults) {
	                if (!validator.hasOwnProperty(name)) {
	                    validator[name] = dir.defaults[name]
	                }
	            }
	            validator.fields = validator.fields || []
	            update(src, this.update)

	        }
	    },
	    update: function (dom, vdom) {
	        var validator = vdom['ms-validate']
	        dom._ms_validator_ = validator
	        validator.dom = dom
	        var v = vdom.vmValidator 
	        try{
	           v.onManual = onManual
	        }catch(e){}
	        delete vdom.vmValidator 
	        dom.setAttribute("novalidate", "novalidate")
	        function onManual() {
	            dir.validateAll.call(validator, validator.onValidateAll)
	        }
	        if (validator.validateAllInSubmit) {
	            avalon.bind(dom, "submit", function (e) {
	                e.preventDefault()
	                onManual()
	            })
	        }
	       
	        if (typeof validator.onInit === "function") { //vmodels是不包括vmodel的
	            validator.onInit.call(dom, {
	                type: 'init',
	                target: dom,
	                validator: validator
	            })
	        }
	    },
	    validateAll: function (callback) {
	        var validator = this
	        var fn = typeof callback === "function" ? callback : validator.onValidateAll
	        var promise = validator.fields.filter(function (field) {
	            var el = field.dom
	            return el && !el.disabled && validator.dom.contains(el)
	        }).map(function (field) {
	            return dir.validate(field, true)
	        })
	        var reasons = []
	        Promise.all(promise).then(function (array) {
	            for (var i = 0, el; el = array[i++]; ) {
	                reasons = reasons.concat(el)
	            }
	            if (validator.deduplicateInValidateAll) {
	                var uniq = {}
	                reasons = reasons.filter(function (field) {
	                    var el = field.dom
	                    var uuid = el.uniqueID || (el.uniqueID = setTimeout("1"))
	                    if (uniq[uuid]) {
	                        return false
	                    } else {
	                        uniq[uuid] = true
	                        return true
	                    }
	                })
	            }
	            fn.call(validator.dom, reasons) //这里只放置未通过验证的组件
	        })
	    },
	    addField: function (field) {
	        var validator = this
	        var node = field.dom
	        if (validator.validateInKeyup && (!field.isChanged && !field.debounceTime)) {
	            avalon.bind(node, 'keyup', function (e) {
	                dir.validate(field, 0, e)
	            })
	        }
	        if (validator.validateInBlur) {
	            avalon.bind(node, 'blur', function (e) {
	                dir.validate(field, 0, e)
	            })
	        }
	        if (validator.resetInFocus) {
	            avalon.bind(node, 'focus', function (e) {
	                validator.onReset.call(node, e, field)
	            })
	        }
	    },
	    validate: function (field, isValidateAll, event) {
	        var promises = []
	        var value = field.modelValue
	        var elem = field.dom
	        var validator = field.validator
	        if (elem.disabled)
	            return
	        for (var ruleName in field.rules) {
	            var ruleValue = field.rules[ruleName]
	            if (ruleValue === false)
	                continue
	            var hook = avalon.validators[ruleName]
	            var resolve, reject
	            promises.push(new Promise(function (a, b) {
	                resolve = a
	                reject = b
	            }))
	            var next = function (a) {
	                if (field.norequired && value === "") {
	                    a = true
	                }
	                if (a) {
	                    resolve(true)
	                } else {
	                    var reason = {
	                        element: elem,
	                        data: field.data,
	                        message: elem.getAttribute("data-" + ruleName + "-message") || elem.getAttribute("data-message") || hook.message,
	                        validateRule: ruleName,
	                        getMessage: getMessage
	                    }
	                    resolve(reason)
	                }
	            }
	            field.data = {}
	            field.data[ruleName] = ruleValue
	            hook.get(value, field, next)
	        }
	        var reasons = []
	        //如果promises不为空，说明经过验证拦截器
	        var lastPromise = Promise.all(promises).then(function (array) {
	            for (var i = 0, el; el = array[i++]; ) {
	                if (typeof el === "object") {
	                    reasons.push(el)
	                }
	            }
	            if (!isValidateAll) {
	                if (reasons.length) {
	                    validator.onError.call(elem, reasons, event)
	                } else {
	                    validator.onSuccess.call(elem, reasons, event)
	                }
	                validator.onComplete.call(elem, reasons, event)
	            }
	            return reasons
	        })
	        return lastPromise
	    }
	})

	var rformat = /\\?{{([^{}]+)\}}/gm

	function getMessage() {
	    var data = this.data || {}
	    return this.message.replace(rformat, function (_, name) {
	        return data[name] == null ? "" : data[name]
	    })
	}
	dir.defaults = {
	    addField: dir.addField,//供内部使用,收集此元素底下的所有ms-duplex的域对象
	    onError: avalon.noop,
	    onSuccess: avalon.noop,
	    onComplete: avalon.noop,
	    onManual: avalon.noop,
	    onReset: avalon.noop,
	    onValidateAll: avalon.noop,
	    validateInBlur: true, //@config {Boolean} true，在blur事件中进行验证,触发onSuccess, onError, onComplete回调
	    validateInKeyup: true, //@config {Boolean} true，在keyup事件中进行验证,触发onSuccess, onError, onComplete回调
	    validateAllInSubmit: true, //@config {Boolean} true，在submit事件中执行onValidateAll回调
	    resetInFocus: true, //@config {Boolean} true，在focus事件中执行onReset回调,
	    deduplicateInValidateAll: false //@config {Boolean} false，在validateAll回调中对reason数组根据元素节点进行去重
	}

/***/ },
/* 65 */
/***/ function(module, exports) {

	avalon.directive('rules', {
	    parse: function (copy, src, binding) {
	        var rules = binding.expr
	        if (/{.+}/.test(rules)) {
	            copy[binding.name] = avalon.parseExpr(binding)
	        }
	    },
	    diff: function (copy, src, name) {
	        src[name] = copy[name]
	        var field = src.dom && src.dom.__ms_duplex__
	        if (field) {
	            field.rules = copy[name]
	        }
	    }
	})
	function isRegExp(value) {
	    return avalon.type(value) === 'regexp'
	}
	var rmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i
	var rurl = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
	function isCorrectDate(value) {
	    if (typeof value === "string" && value) { //是字符串但不能是空字符
	        var arr = value.split("-") //可以被-切成3份，并且第1个是4个字符
	        if (arr.length === 3 && arr[0].length === 4) {
	            var year = ~~arr[0] //全部转换为非负整数
	            var month = ~~arr[1] - 1
	            var date = ~~arr[2]
	            var d = new Date(year, month, date)
	            return d.getFullYear() === year && d.getMonth() === month && d.getDate() === date
	        }
	    }
	    return false
	}
	avalon.shadowCopy(avalon.validators, {
	    pattern: {
	        message: '必须匹配{{pattern}}这样的格式',
	        get: function (value, field, next) {
	            var elem = field.element
	            var data = field.data
	            if (!isRegExp(data.pattern)) {
	                var h5pattern = elem.getAttribute("pattern")
	                data.pattern = new RegExp('^(?:' + h5pattern + ')$')
	            }
	            next(data.pattern.test(value))
	            return value
	        }
	    },
	    digits: {
	        message: '必须整数',
	        get: function (value, field, next) {//整数
	            next(/^\-?\d+$/.test(value))
	            return value
	        }
	    },
	    number: {
	        message: '必须数字',
	        get: function (value, field, next) {//数值
	            next(isFinite(value))
	            return value
	        }
	    },
	    required: {
	        message: '必须填写',
	        get: function (value, field, next) {
	            next(value !== "")
	            return value
	        }
	    },
	    equalto: {
	        message: '密码输入不一致',
	        get: function (value, field, next) {
	            var id = String(field.data.equalto)
	            var other = avalon(document.getElementById(id)).val() || ""
	            next(value === other)
	            return value
	        }
	    },
	    date: {
	        message: '日期格式不正确',
	        get: function (value, field, next) {
	            var data = field.data
	            if (avalon.type(data.date) === 'regexp') {
	                next(data.date.test(value))
	            } else {
	                next(isCorrectDate(value))
	            }
	            return value
	        }
	    },
	    url: {
	        message: 'URL格式不正确',
	        get: function (value, field, next) {
	            next(rurl.test(value))
	            return value
	        }
	    },
	    email: {
	        message: 'email格式不正确',
	        get: function (value, field, next) {
	            next(rmail.test(value))
	            return value
	        }
	    },
	    minlength: {
	        message: '最少输入{{minlength}}个字',
	        get: function (value, field, next) {
	            var num = parseInt(field.data.minlength, 10)
	            next(value.length >= num)
	            return value
	        }
	    },
	    maxlength: {
	        message: '最多输入{{maxlength}}个字',
	        get: function (value, field, next) {
	            var num = parseInt(field.data.maxlength, 10)
	            next(value.length <= num)
	            return value
	        }
	    },
	    min: {
	        message: '输入值不能小于{{min}}',
	        get: function (value, field, next) {
	            var num = parseInt(field.data.min, 10)
	            next(parseFloat(value) >= num)
	            return value
	        }
	    },
	    max: {
	        message: '输入值不能大于{{max}}',
	        get: function (value, field, next) {
	            var num = parseInt(field.data.max, 10)
	            next(parseFloat(value) <= num)
	            return value
	        }
	    },
	    chs: {
	        message: '必须是中文字符',
	        get: function (value, field, next) {
	            next(/^[\u4e00-\u9fa5]+$/.test(value))
	            return value
	        }
	    }
	})

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(44)
	//ms-imporant ms-controller ms-for ms-widget ms-effect ms-if   ...
	avalon.directive('if', {
	    priority: 6,
	    diff: function (copy, src, name) {
	        var c = !!copy[name]
	        if (!c) {
	            copy.nodeType = 8
	            copy.order = ''
	            //不再执行子孙节点的操作
	        }
	        if (c !== src[name]) {
	            src[name] = c
	            if (c && src.nodeType === 1) {
	                return
	            }
	            update(src, this.update)
	        }
	    },
	    update: function (dom, vdom, parent) {
	        var show = vdom['ms-if']
	        if (show) {
	            //要移除元素节点,在对应位置上插入注释节点
	            vdom.nodeType = 1
	            vdom.nodeValue = null
	            var comment = vdom.comment
	            parent = comment.parentNode
	            parent.replaceChild(dom, comment)
	            avalon.applyEffect(dom, vdom, {
	                hook: 'onEnterDone'
	            })
	        } else {

	            avalon.applyEffect(dom, vdom, {
	                hook: 'onLeaveDone',
	                cb: function () {
	                    var comment = document.createComment('ms-if')
	                    //去掉注释节点临时添加的ms-effect
	                    //https://github.com/RubyLouvre/avalon/issues/1577
	                    //这里必须设置nodeValue为ms-if,否则会在节点对齐算法中出现乱删节点的BUG
	                    vdom.nodeValue = 'ms-if'
	                    parent.replaceChild(comment, dom)
	                    vdom.nodeType = 8
	                    vdom.comment = comment
	                }
	            })
	        }
	    }
	})



/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(44)

	var rforPrefix = /ms-for\:\s*/
	var rforLeft = /^\s*\(\s*/
	var rforRight = /\s*\)\s*$/
	var rforSplit = /\s*,\s*/
	var rforAs = /\s+as\s+([$\w]+)/
	var rident = /^[$a-zA-Z_][$a-zA-Z0-9_]*$/
	var rinvalid = /^(null|undefined|NaN|window|this|\$index|\$id)$/
	var reconcile = __webpack_require__(46)
	var stringify = __webpack_require__(57)

	var Cache = __webpack_require__(35)
	var cache = new Cache(312)

	function enterAction(src, key) {
	    var tmpl = src.template
	    var t = cache.get(tmpl)
	    if (!t) {
	        var vdomTemplate = avalon.lexer(tmpl)
	        avalon.speedUp(vdomTemplate)
	        t = cache.put(tmpl, copyVTree(vdomTemplate))
	    }
	    var c = t()
	    c.push({
	        nodeType: 8,
	        type: '#comment',
	        nodeValue: src.signature
	    })
	    return {
	        action: 'enter',
	        children: c,
	        key: key
	    }
	}
	function getTraceKey(item) {
	    var type = typeof item
	    return item && type === 'object' ? item.$hashcode : type + ':' + item
	}
	//IE6-8,function后面没有空格
	var rfunction = /^\s*function\s*\(([^\)]+)\)/
	avalon._each = function (obj, fn, local, vnodes) {
	    var repeat = []
	    vnodes.push(repeat)
	    var str = (fn + "").match(rfunction)
	    var args = str[1]
	    var arr = args.match(avalon.rword)
	    if (Array.isArray(obj)) {
	        for (var i = 0; i < obj.length; i++) {
	            iterator(i, obj[i], local, fn, arr[0], arr[1], repeat, true)
	        }
	    } else {
	        for (var i in obj) {
	            if (obj.hasOwnProperty(i)) {
	                iterator(i, obj[i], local, fn, arr[0], arr[1], repeat)
	            }
	        }
	    }
	}

	function iterator(index, item, vars, fn, k1, k2, repeat, isArray) {
	    var key = isArray ? getTraceKey(item) : index
	    var local = {}
	    local[k1] = index
	    local[k2] = item
	    for (var k in vars) {
	        if (!(k in local)) {
	            local[k] = vars[k]
	        }
	    }
	    fn(index, item, key, local, repeat)
	}


	avalon.directive('for', {
	    priority: 3,
	    parse: function (copy, src, binding) {
	        var str = src.nodeValue, aliasAs
	        str = str.replace(rforAs, function (a, b) {
	            if (!rident.test(b) || rinvalid.test(b)) {
	                avalon.error('alias ' + b + ' is invalid --- must be a valid JS identifier which is not a reserved name.')
	            } else {
	                aliasAs = b
	            }
	            return ''
	        })

	        var arr = str.replace(rforPrefix, '').split(' in ')
	        var assign = 'var loop = ' + avalon.parseExpr(arr[1]) + ' \n'
	        var alias = aliasAs ? 'var ' + aliasAs + ' = loop\n' : ''
	        var kv = arr[0].replace(rforLeft, '').replace(rforRight, '').split(rforSplit)

	        if (kv.length === 1) {//确保avalon._each的回调有三个参数
	            kv.unshift('$key')
	        }
	        kv.push('traceKey')
	        kv.push('__local__')
	        kv.push('vnodes')
	        src.$append = assign + alias + 'avalon._each(loop,function('
	                + kv.join(', ') + '){\n'
	                + (aliasAs ? '__local__[' + avalon.quote(aliasAs) + ']=loop\n' : '')

	    },
	    diff: function (copy, src, curRepeat, preRepeat, end) {
	        //将curRepeat转换成一个个可以比较的component,并求得compareText
	        preRepeat = preRepeat || []
	        //preRepeat不为空时
	        src.preRepeat = preRepeat
	        var curItems = prepareCompare(curRepeat, copy)
	        if (src.compareText === copy.compareText) {
	            //如果个数与key一致,那么说明此数组没有发生排序,立即返回
	            return
	        }
	        if (!src.preItems) {
	            src.preItems = prepareCompare(preRepeat, src)
	        }
	        src.compareText = copy.compareText
	        //for指令只做添加删除操作
	        var cache = src.cache
	        var i, c, p

	        if (!cache || isEmptyObject(cache)) {
	            /* eslint-disable no-cond-assign */
	            var cache = src.cache = {}
	            src.preItems.length = 0
	            for (i = 0; c = curItems[i]; i++) {
	                var p = enterAction(src, c.key)
	                src.preItems.push(p)
	                p.action = 'enter'
	                p.index = i
	                saveInCache(cache, p)
	            }
	            src.removes = []
	            /* eslint-enable no-cond-assign */
	        } else {
	            var newCache = {}
	            /* eslint-disable no-cond-assign */
	            var fuzzy = []
	            for (i = 0; c = curItems[i++]; ) {
	                var p = isInCache(cache, c.key)
	                if (p) {
	                    p.action = 'move'
	                    p.oldIndex = p.index
	                    p.index = c.index
	                    saveInCache(newCache, p)
	                } else {
	                    //如果找不到就进行模糊搜索
	                    fuzzy.push(c)
	                }

	            }
	            for (var i = 0, c; c = fuzzy[i++]; ) {
	                p = fuzzyMatchCache(cache, c.key)
	                if (p) {
	                    p.action = 'move'
	                    // clearData(p.children)
	                    p.oldIndex = p.index

	                    p.index = c.index
	                } else {
	                    p = enterAction(src, c.key)
	                    p.index = c.index
	                    src.preItems.push(p)
	                }
	                saveInCache(newCache, p)
	            }
	            src.preItems.sort(function (a, b) {
	                return a.index - b.index
	            })

	            /* eslint-enable no-cond-assign */
	            src.cache = newCache
	            var removes = []

	            for (var i in cache) {
	                p = cache[i]
	                p.action = 'leave'
	                removes.push(p)
	                if (p.arr) {
	                    p.arr.forEach(function (m) {
	                        m.action = 'leave'
	                        removes.push(m)
	                    })
	                    delete p.arr
	                }
	            }
	            src.removes = removes
	        }

	        var cb = avalon.caches[src.cid]
	        var vm = copy.vmodel
	        if (end && cb) {
	            end.afterChange = [function (dom) {
	                    cb.call(vm, {
	                        type: 'rendered',
	                        target: dom,
	                        signature: src.signature
	                    })
	                }]
	        }

	        update(src, this.update)
	        return true

	    },
	    update: function (dom, vdom, parent) {
	        var key = vdom.signature
	        var range = getEndRepeat(dom)
	        var doms = range.slice(1, -1)
	        var endRepeat = range.pop()
	        var DOMs = splitDOMs(doms, key)
	        var check = doms[doms.length - 1]
	        var first = []
	        if (check && check.nodeValue !== key) {
	            var prev = endRepeat.previousSibling
	            do {//去掉最初位于循环节点中的内容
	                if (prev === dom || prev.nodeValue === key) {
	                    break
	                }
	                first.unshift(prev)
	            } while ((prev = prev.previousSibling));
	        }
	        for (var i = 0, el; el = vdom.removes[i++]; ) {
	            var removeNodes = DOMs[el.index]
	            if (removeNodes) {
	                removeNodes.forEach(function (n, k) {
	                    if (n.parentNode) {
	                        avalon.applyEffect(n, el.children[k], {
	                            hook: 'onLeaveDone',
	                            cb: function () {
	                                n.parentNode.removeChild(n)
	                            },
	                            staggerKey: key + 'leave'
	                        })
	                    }
	                })
	                el.children.length = 0
	            }
	        }
	        vdom.removes = []
	        var insertPoint = dom
	        var fragment = avalon.avalonFragment
	        var domTemplate
	        var keep = []
	        for (var i = 0; i < vdom.preItems.length; i++) {
	            var com = vdom.preItems[i]
	            var children = com.children
	            if (com.action === 'leave') {
	                continue
	            }
	            keep.push(com)
	            if (com.action === 'enter') {
	                if (first.length) {
	                    var a = first[first.length - 1]
	                    var insertPoint = document.createComment(key)
	                    parent.insertBefore(insertPoint, a.nextSibling)
	                    reconcile(first.concat(insertPoint), children, parent)
	                    first.length = 0
	                    continue
	                }
	                if (!domTemplate) {
	                    //创建用于拷贝的数据,包括虚拟DOM与真实DOM 
	                    domTemplate = avalon.vdomAdaptor(children, 'toDOM')
	                }
	                var newFragment = domTemplate.cloneNode(true)
	                var cnodes = avalon.slice(newFragment.childNodes)
	                reconcile(cnodes, children, parent)//关联新的虚拟DOM与真实DOM
	                parent.insertBefore(newFragment, insertPoint.nextSibling)
	                applyEffects(cnodes, children, {
	                    hook: 'onEnterDone',
	                    staggerKey: key + 'enter'
	                })
	            } else if (com.action === 'move') {

	                var cnodes = DOMs[com.oldIndex] || []
	                if (com.index !== com.oldIndex) {
	                    var moveFragment = fragment.cloneNode(false)
	                    for (var k = 0, cc; cc = cnodes[k++]; ) {
	                        moveFragment.appendChild(cc)
	                    }
	                    parent.insertBefore(moveFragment, insertPoint.nextSibling)
	                    // reconcile(cnodes, children, parent)
	                    applyEffects(cnodes, children, {
	                        hook: 'onMoveDone',
	                        staggerKey: key + 'move'
	                    })
	                }
	            }

	            insertPoint = cnodes[cnodes.length - 1]

	            if (!insertPoint) {
	                break
	            }
	        }
	        if(first.length){
	            first.forEach(function(el){
	                parent.removeChild(el)
	            })
	        }
	        vdom.preRepeat.length = 0
	        vdom.preItems.length = 0
	        keep.forEach(function (el) {
	            vdom.preItems.push(el)

	            range.push.apply(vdom.preRepeat, el.children)
	        })

	    }

	})

	function isEmptyObject(a) {
	    for (var i in a) {
	        return false
	    }
	    return true
	}
	function splitDOMs(nodes, signature) {
	    var items = []
	    var item = []
	    for (var i = 0, el; el = nodes[i++]; ) {
	        if (el.nodeType === 8 && el.nodeValue === signature) {
	            item.push(el)
	            items.push(item)
	            item = []
	        } else {
	            item.push(el)
	        }
	    }
	    return items
	}

	//将要循环的节点根据锚点元素再分成一个个更大的单元,用于diff
	function prepareCompare(nodes, cur) {
	    var splitText = cur.signature
	    var items = []
	    var keys = []
	    var com = {
	        children: []
	    }

	    for (var i = 0, el; el = nodes[i]; i++) {
	        if (el.nodeType === 8 && el.nodeValue === splitText) {
	            com.children.push(el)
	            com.key = el.key
	            keys.push(el.key)
	            com.index = items.length
	            items.push(com)
	            com = {
	                children: []
	            }
	        } else {
	            com.children.push(el)
	        }
	    }

	    cur.compareText = keys.length + '|' + keys.join(';;')
	    return items
	}


	function getEndRepeat(node) {
	    var isBreak = 0, ret = []
	    while (node) {
	        if (node.nodeType === 8) {
	            if (node.nodeValue.indexOf('ms-for:') === 0) {
	                ++isBreak
	            } else if (node.nodeValue.indexOf('ms-for-end:') === 0) {
	                --isBreak
	            }
	        }
	        ret.push(node)
	        node = node.nextSibling
	        if (isBreak === 0) {
	            break
	        }
	    }
	    return ret
	}


	var rfuzzy = /^(string|number|boolean)/
	var rkfuzzy = /^_*(string|number|boolean)/
	function fuzzyMatchCache(cache, id) {
	    var m = id.match(rfuzzy)
	    if (m) {
	        var fid = m[1]
	        for (var i in cache) {
	            var n = i.match(rkfuzzy)
	            if (n && n[1] === fid) {
	                return isInCache(cache, i)
	            }
	        }
	    }
	}

	// 新位置: 旧位置
	function isInCache(cache, id) {
	    var c = cache[id]
	    if (c) {
	        var arr = c.arr
	        if (arr) {
	            var r = arr.pop()
	            if (!arr.length) {
	                c.arr = 0
	            }
	            return r
	        }
	        delete cache[id]
	        return c
	    }
	}
	//[1,1,1] number1 number1_ number1__
	function saveInCache(cache, component) {
	    var trackId = component.key
	    if (!cache[trackId]) {
	        cache[trackId] = component
	    } else {
	        var c = cache[trackId]
	        var arr = c.arr || (c.arr = [])
	        arr.push(component)
	    }
	}
	var applyEffects = function (nodes, vnodes, opts) {
	    vnodes.forEach(function (el, i) {
	        avalon.applyEffect(nodes[i], vnodes[i], opts)
	    })
	}

	var skip = {
	    dom: 1,
	    local: 1,
	    vmodel: 1,
	    children: 1
	}
	function copyNode(vdom) {
	    switch (vdom.nodeType) {
	        case 3:
	            if (avalon.config.rexpr.test(vdom.nodeValue)) {
	                return stringify(avalon.mix({dynamic: true}, vdom))
	            }
	            return stringify(vdom)
	        case 8:
	            return stringify(vdom)
	        case 1:
	            var copy = {
	            }
	            for (var i in vdom) {
	                if (!skip[i]) {
	                    copy[i] = vdom[i]
	                }
	            }
	            if (!vdom.isVoidTag) {
	                copy.children = '[' + vdom.children.map(function (e) {
	                    return copyNode(e)
	                }).join(', ') + ']'
	            }
	            return stringify(copy)
	        default:
	            return copyList(vdom)
	    }
	}


	function copyList(vtree) {
	    var arr = []
	    for (var i = 0, el; el = vtree[i++]; ) {
	        arr.push(copyNode(el))
	    }
	    return '[' + arr.join(', ') + ']'
	}
	function copyVTree(vtree) {
	    return new Function('return ' + copyList(vtree))
	}


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var update = __webpack_require__(44)
	var reconcile = __webpack_require__(46)
	var tryInitComponent = __webpack_require__(69)

	avalon.component = function (name, definition) {
	    //这是定义组件的分支,并将列队中的同类型对象移除
	    if (!avalon.components[name]) {
	        avalon.components[name] = definition
	    }//这里没有返回值
	}
	avalon.directive('widget', {
	    parse: function (copy, src, binding) {
	        src.wid = src.wid || avalon.makeHashCode('w')
	        //将渲染函数的某一部分存起来,渲在c方法中转换为函数
	        copy[binding.name] = avalon.parseExpr(binding)
	        copy.vmodel = '__vmodel__'
	        copy.local = '__local__'
	    },
	    define: function () {
	        return avalon.mediatorFactory.apply(this, arguments)
	    },
	    diff: function (copy, src, name) {
	        var a = copy[name]
	        src.vmodel = copy.vmodel
	        src.local = copy.local
	        src.copy = copy
	        if (Object(a) === a) {
	            a = a.$model || a//安全的遍历VBscript
	            if (Array.isArray(a)) {//转换成对象
	                a.unshift({})// 防止污染旧数据
	                avalon.mix.apply(0, a)
	                a = a.shift()
	            }
	            var is = a.is || src.props.is
	            //如果组件没有初始化,那么先初始化(生成对应的vm,$render)
	            if (!src[is + "-vm"]) {
	                if (!tryInitComponent(src, copy, is)) {
	                    //替换成注释节点
	                    update(src, this.mountComment)
	                    return
	                }
	            }
	            //如果已经存在于avalon.scopes
	            var renderComponent = src[is + '-vm'].$render
	            var newTree = renderComponent(src[is + '-vm'], src.local)
	            var componentRoot = newTree[0]
	            if (componentRoot && isComponentReady(componentRoot)) {
	                if (src[is + '-mount']) {
	                    updateCopy(copy, componentRoot)
	                    update(src, this.updateComponent)
	                } else {//第一次插入到DOM树
	                    src.copy = copy
	                    src.newCopy = componentRoot
	                    update(src, this.mountComponent)
	                }
	            } else {
	                update(src, this.mountComment)
	            }

	        }
	    },
	    mountComment: function (dom, vdom, parent) {
	        var copy = vdom.copy
	        copy.nodeType = vdom.nodeType = 8
	        copy.nodeValue = vdom.nodeType = 'unresolved component placeholder'
	        copy.children = []
	        var comment = document.createComment(copy.nodeValue)
	        vdom.dom = comment
	        parent.replaceChild(comment, dom)
	    },
	    updateComponent: function (dom, vdom) {
	        var vm = vdom[vdom.is + '-vm']
	        var viewChangeObservers = vm.$events.onViewChange
	        if (viewChangeObservers && viewChangeObservers.length) {
	            update(vdom, viewChangeHandle, 'afterChange')
	        }
	    },
	    mountComponent: function (dom, vdom, parent) {
	        var is = vdom.is
	        var vm = vdom[is + '-vm']
	        var copy = vdom.copy
	        var newCopy = vdom.newCopy
	        delete vdom.newCopy

	        var scope = avalon.scopes[vm.$id]
	        if (scope && scope.vmodel) {
	            var com = scope.vmodel.$element
	            newCopy = com.vtree[0]
	            updateCopy(vdom, newCopy)
	            parent.replaceChild(com, dom)
	            com.vtree = [vdom]
	            vdom[is + '-vm'] = scope.vmodel
	            vdom[is + '-mount'] = true
	            return
	        }

	        //更新原始虚拟DOM树
	        updateCopy(copy, newCopy)
	        var vtree = vdom[is + '-vtree']
	        //更新另一个刷数据用的虚拟DOM树
	        updateCopy(vdom, vtree[0])

	        if (vdom.comment && !avalon.contains(avalon.root, vdom.dom)) {
	            com = vdom.dom
	            dom = vdom.comment
	            parent = dom.parentNode
	        } else {
	            var com = avalon.vdomAdaptor(vdom, 'toDOM')
	            com.setAttribute('is', is)
	            vm.$fire('onInit', {
	                type: 'init',
	                vmodel: vm,
	                is: is
	            })
	        }
	        reconcile([com], [vdom])

	        parent.replaceChild(com, dom)
	        vdom.dom = com
	        avalon.onComponentDispose(com)

	        vdom[is + '-mount'] = true
	        //--------------
	        vm.$element = com
	        com.vtree = [vdom]
	        avalon.scopes[vm.$id] = {
	            vmodel: vm,
	            isMount: 2,
	            llocal: vdom.local
	        }
	        //--------------
	        update(vdom, function () {
	            vm.$fire('onReady', {
	                type: 'ready',
	                target: com,
	                vmodel: vm,
	                is: is
	            })
	        }, 'afterChange')

	        update(vdom, function () {
	            vdom[is + '-html'] = avalon.vdomAdaptor(vdom, 'toHTML')
	        }, 'afterChange')

	    }
	})

	function updateCopy(copy, newCopy) {
	    copy.children = []
	    avalon.mix(copy, newCopy)
	    copy.local = copy.isVoidTag = copy.skipContent = 0
	}

	function viewChangeHandle(dom, vdom) {
	    var is = vdom.is
	    var vm = vdom[is + '-vm']
	    var preHTML = vdom[is + '-html']
	    var curHTML = avalon.vdomAdaptor(vdom, 'toHTML')
	    if (preHTML !== curHTML) {
	        vdom[is + '-html'] = curHTML
	        vm.$fire('onViewChange', {
	            type: 'viewchange',
	            target: dom,
	            vmodel: vm,
	            is: is
	        })
	    }
	}



	function isComponentReady(vnode) {
	    var isReady = true
	    try {
	        hasUnresolvedComponent(vnode)
	    } catch (e) {
	        isReady = false
	    }
	    return isReady
	}

	function hasUnresolvedComponent(vnode) {
	    vnode.children.forEach(function (el) {
	        if (el.nodeType === 8) {
	            if (el.nodeValue === 'unresolved component placeholder') {
	                throw 'unresolved'
	            }
	        } else if (el.children) {
	            hasUnresolvedComponent(el)
	        }
	    })
	}

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var skipArray = __webpack_require__(70)

	var legalTags = {wbr: 1, xmp: 1, template: 1}
	var events = 'onInit,onReady,onViewChange,onDispose'
	var componentEvents = avalon.oneObject(events)
	var immunity = events.split(',').concat('is', 'define')
	var onceWarn = true
	function initComponent(src, copy, is) {
	    var tag = src.type
	    //判定用户传入的标签名是否符合规格
	    if (!legalTags[tag] && !isCustomTag(tag)) {
	        avalon.warn(tag + '不合适做组件的标签')
	        return
	    }
	    //开始初始化组件
	    var hooks = {}
	    //用户只能操作顶层VM
	    //只有$id,is的对象就是emptyOption
	    var rawOption = copy['ms-widget']
	    var isEmpty = false
	    if (!rawOption) {
	        isEmpty = true
	        options = []
	    } else {
	        var options = [].concat(rawOption)
	        options.forEach(function (a) {
	            if (a && typeof a === 'object') {
	                mixinHooks(hooks, (a.$model || a), true)
	            }
	        })
	        isEmpty = isEmptyOption(hooks)
	    }
	    var definition = avalon.components[is]
	    //初始化组件失败,因为连组件的定义都没有加载
	    if (!definition) {
	        return
	    }
	    var skipProps = immunity.concat()
	    //得到组件在顶层vm的配置对象名
	    var configName = is.replace(/-/g, '_')

	    var topVm = copy.vmodel
	    try {//如果用户在ms-widget没定义东西那么从vm中取默认东西
	        var vmOption = topVm[configName]
	        if (isEmpty && vmOption && typeof vmOption === 'object') {
	            hooks = {}
	            options = [vmOption]
	            mixinHooks(hooks, vmOption.$model || vmOption, true)
	            skipProps.push(configName)
	        }
	    } catch (e) {
	    }


	    //将用户声明组件用的自定义标签(或xmp.template)的template转换成虚拟DOM
	    if (legalTags[tag] && src.children[0]) {
	        src.children = avalon.lexer(src.children[0].nodeValue)
	    }
	    src.isVoidTag = src.skipContent = 0
	    var slots = collectSlots(src, definition.soleSlot)
	    //开始构建组件的vm的配置对象

	    var define = hooks.define
	    define = define || avalon.directives.widget.define
	    if (!hooks.$id && onceWarn) {
	        avalon.warn('warning!', is, '组件最好在ms-widget配置对象中指定全局不重复的$id以提高性能!\n',
	                '若在ms-for循环中可以利用 ($index,el) in @array 中的$index拼写你的$id\n',
	                '如 ms-widget="{is:\'ms-button\',$id:\'btn\'+$index}"'
	                )
	        onceWarn = false
	    }
	    var $id = hooks.$id || src.wid

	    var defaults = avalon.mix(true, {}, definition.defaults)

	    for (var i in slots) {
	        if (i !== '__sole__') {
	            var html = toHTML(slots[i])
	            if (/\S/.test(html)) {//如果soleSlot为空,那么就不用赋值了
	                defaults[i] = html
	            }
	        }
	    }

	    mixinHooks(hooks, defaults, false)

	    var vmodel = define.apply(function (a, b) {
	        skipProps.forEach(function (k) {
	            delete a[k]
	            delete b[k]
	        })
	    }, [topVm, defaults].concat(options))

	    if (!avalon.modern) {//增强对IE的兼容
	        for (var i in vmodel) {
	            if (!skipArray[i] && typeof vmodel[i] === 'function') {
	                vmodel[i] = vmodel[i].bind(vmodel)
	            }
	        }
	    }

	    vmodel.$id = $id

	    //开始构建组件的虚拟DOM
	    var finalTemplate = definition.template.trim()
	    if (typeof definition.getTemplate === 'function') {
	        finalTemplate = definition.getTemplate(vmodel, finalTemplate)
	    }

	    var vtree = avalon.lexer(finalTemplate)
	    if (vtree.length > 1) {
	        avalon.error('组件必须用一个元素包起来')
	    }

	    var componentRoot = vtree[0]

	    avalon.vmodels[$id] = vmodel

	    //将用户标签中的属性合并到组件标签的属性里
	    avalon.mix(componentRoot.props, src.props)
	    delete componentRoot.props['ms-widget']
	    componentRoot.props.wid = $id
	    //抽取用户标签里带slot属性的元素,替换组件的虚拟DOM树中的slot元素

	    if (!src.isVoidTag) {
	        mergeSlots(vtree, slots)
	    }
	    avalon.speedUp(vtree)
	    for (var e in componentEvents) {
	        if (hooks[e]) {
	            hooks[e].forEach(function (fn) {
	                vmodel.$watch(e, fn)
	            })
	        }
	    }
	    var render = avalon.render(vtree, src.local)
	    vmodel.$render = render
	    src[is + '-vm'] = vmodel
	    src[is + '-vtree'] = vtree
	    return src.is = is

	}
	module.exports = initComponent


	function isEmptyOption(opt) {
	    for (var k in opt) {
	        if (k === 'is' || k === '$id')
	            continue
	        return false
	    }
	    return true
	}
	function toHTML(a) {
	    if (Array.isArray(a)) {
	        return a.map(function (e) {
	            return avalon.vdomAdaptor(e, 'toHTML')
	        })
	    }
	    if (typeof a === 'string') {
	        return a
	    }
	    return avalon.vdomAdaptor(a, 'toHTML')
	}


	function collectSlots(node, soleSlot) {
	    var slots = {}
	    if (soleSlot) {
	        slots[soleSlot] = toHTML(node.children).join('')
	        slots.__sole__ = soleSlot
	    } else {
	        node.children.forEach(function (el) {
	            if (el.nodeType === 1) {
	                var name = el.props.slot
	                if (name) {
	                    delete el.props.slot
	                    if (Array.isArray(slots[name])) {
	                        slots[name].push(el)
	                    } else if (slots[name]) {
	                        slots[name] = [slots[name], el]
	                    } else {
	                        slots[name] = el
	                    }
	                }
	            }
	        })
	    }
	    return slots
	}

	function mergeSlots(vtree, slots, parent) {
	    for (var i = 0, node; node = vtree[i++]; ) {
	        if (node.nodeType === 1) {
	            if (node.type === 'slot') {
	                var name = node.props.name || slots.__sole__
	                if (!(name in slots)) {
	                    avalon.error('slot name="', name, '"is undefined')
	                }
	                if (name === slots.__sole__) {
	                    parent.children = []
	                    parent.props['ms-html'] = '##' + slots.__sole__
	                    break
	                } else {
	                    var s = slots[name]
	                    vtree.splice.apply(vtree, [i - 1, 1].concat(s))
	                }
	            } else {
	                mergeSlots(node.children, slots, node)
	            }
	        }
	    }

	    return vtree
	}

	//必须以字母开头,结尾以字母或数字结束,中间至少出现一次"-",
	//并且不能大写字母,特殊符号,"_","$",汉字
	var rcustomTag = /^[a-z]([a-z\d]+\-)+[a-z\d]+$/

	function isCustomTag(type) {
	    return rcustomTag.test(type)
	}

	function mixinHooks(target, option, overwrite) {
	    for (var k in option) {
	        var v = option[k]
	        //如果是生命周期钩子,总是不断收集
	        if (componentEvents[k]) {
	            if (k in target) {
	                target[k].push(v)
	            } else {
	                target[k] = [option[k]]
	            }
	        } else {
	            if (overwrite) {
	                target[k] = v
	            }
	        }
	    }
	}

/***/ },
/* 70 */
/***/ function(module, exports) {

	/**
	 * 
	$$skipArray:是系统级通用的不可监听属性
	$skipArray: 是当前对象特有的不可监听属性

	 不同点是
	 $$skipArray被hasOwnProperty后返回false
	 $skipArray被hasOwnProperty后返回true
	 */

	module.exports = avalon.oneObject('$id,$render,$track,$element,$watch,$fire,$events,$model,$skipArray,$accessors,$hashcode,$run,$wait,__proxy__,__data__,__const__')

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var support = __webpack_require__(72)
	var Cache = __webpack_require__(35)
	var update = __webpack_require__(44)

	avalon.directive('effect', {
	    priority: 5,
	    diff: function (copy, src, name) {
	        var copyObj = copy[name]
	        copyObj = copy.$model || copyObj
	        if(typeof copyObj === 'string'){
	            var is = copyObj
	            copyObj = {
	                is: is
	            }
	           
	        }else if (Array.isArray(copyObj)) {
	            copyObj = avalon.mix.apply({}, copyObj)
	        }
	    
	        copyObj.action = copyObj.action || 'enter'
	       
	        if (Object(copyObj) === copyObj) {
	            var srcObj = src[name]
	            if ( Object(srcObj) !== srcObj || diffObj(copyObj, srcObj ))  {
	                src[name] = copyObj
	                update(src, this.update, 'afterChange')
	            }
	        }
	        delete copy[name]
	    },
	    update: function (dom, vnode, parent, option) {
	        if(dom.animating ){
	            return
	        }
	        dom.animating = true
	        var localeOption = vnode['ms-effect']
	        var type = localeOption.is
	        option = option || {}
	        if(!type){//如果没有指定类型
	            return avalon.warn('need is option')
	        }
	      
	        var effects = avalon.effects
	        if(support.css && !effects[type]){
	            avalon.effect(type, {})
	        }
	        var globalOption = effects[type]
	        if(!globalOption){//如果没有定义特效
	            return avalon.warn(type+' effect is undefined')
	        }
	        var action = option.action || localeOption.action
	        var Effect = avalon.Effect
	        if (typeof Effect.prototype[action] !== 'function'){
	            return avalon.warn(action+' action is undefined')
	        }   
	        var effect = new Effect(dom)
	        var finalOption = avalon.mix(option, globalOption, localeOption)
	        if (finalOption.queue) {
	            animationQueue.push(function () {
	                effect[action](finalOption)
	            })
	            callNextAnimation()
	        } else {
	            setTimeout(function(){
	               effect[action](finalOption)
	            },4)
	        }
	    }
	})
	function diffObj(a, b){
	    for(var i in a){
	        if(a[i] !== b[i])
	            return true
	    }
	    return false
	}

	var animationQueue = []
	function callNextAnimation() {
	    if (animationQueue.lock)
	        return
	    var fn = animationQueue[0]
	    if (fn) {
	       callNextAnimation.lock = true
	       fn()
	    }
	}

	avalon.effects = {}
	//这里定义CSS动画


	avalon.effect = function (name, definition) {
	    avalon.effects[name] = definition || {}
	    if (support.css) {
	        if (!definition.enterClass) {
	            definition.enterClass = name + '-enter'
	        }
	        if (!definition.enterActiveClass) {
	            definition.enterActiveClass = definition.enterClass + '-active'
	        }
	        if (!definition.leaveClass) {
	            definition.leaveClass = name + '-leave'
	        }
	        if (!definition.leaveActiveClass) {
	            definition.leaveActiveClass = definition.leaveClass + '-active'
	        }
	    }
	    if (!definition.action) {
	        definition.action = 'enter'
	    }
	}


	var Effect = function (el) {
	    this.el = el
	}
	avalon.Effect = Effect
	Effect.prototype = {
	    enter: createAction('Enter'),
	    leave: createAction('Leave'),
	    move: createAction('Move')
	}

	var rsecond = /\d+s$/
	function toMillisecond(str){
	   var ratio = rsecond.test(str) ? 1000 : 1
	   return parseFloat(str) * ratio
	}

	function execHooks(options, name, el) {
	    var list = options[name]
	    list = Array.isArray(list) ? list : typeof list === 'function' ? [list] : []
	    list.forEach(function (fn) {
	       fn && fn(el)
	    })
	}
	 var staggerCache = new Cache(128)

	function createAction(action) {
	    var lower = action.toLowerCase()
	    return function (option) {
	        var elem = this.el
	        var $el = avalon(elem)
	        var enterAnimateDone
	        var staggerTime = isFinite(option.stagger) ? option.stagger * 1000 : 0
	        if(staggerTime){
	            if(option.staggerKey){
	                var stagger = staggerCache.get(option.staggerKey) || 
	                        staggerCache.put(option.staggerKey, {
	                    count:0,
	                    items:0
	                })
	                stagger.count++
	                stagger.items++
	            }
	        }
	        var staggerIndex = stagger && stagger.count || 0
	        var animationDone = function(e) {
	            var isOk = e !== false
	            elem.animating = void 0
	            enterAnimateDone = true
	            var dirWord = isOk ? 'Done' : 'Abort'
	            execHooks(option, 'on' + action + dirWord, elem)
	            avalon.unbind(elem,support.transitionEndEvent)
	            avalon.unbind(elem,support.animationEndEvent)
	            if(stagger){
	                if(--stagger.items === 0){
	                    stagger.count = 0
	                }
	            }
	            if(option.queue){
	                animationQueue.lock = false
	                animationQueue.shift()
	                callNextAnimation()
	            }
	        }
	        execHooks(option, 'onBefore' + action, elem)

	        if (option[lower]) {
	            option[lower](elem, function (ok) {
	                animationDone(ok !== false)
	            })
	        } else if (support.css) {
	            
	            $el.addClass(option[lower + 'Class'])
	            if(lower === 'leave'){
	                $el.removeClass(option.enterClass+' '+option.enterActiveClass)
	            }else if(lower === 'enter'){
	                $el.removeClass(option.leaveClass+' '+option.leaveActiveClass)
	            }

	            $el.bind(support.transitionEndEvent, animationDone)
	            $el.bind(support.animationEndEvent, animationDone)
	            setTimeout(function () {
	                enterAnimateDone = avalon.root.offsetWidth === NaN
	                $el.addClass(option[lower + 'ActiveClass'])
	                var computedStyles = window.getComputedStyle(elem)
	                var tranDuration = computedStyles[support.transitionDuration]
	                var animDuration = computedStyles[support.animationDuration]
	                var time = toMillisecond(tranDuration) || toMillisecond(animDuration)
	                if (!time === 0) {
	                    animationDone(false)
	                }else if(!staggerTime ){
	                    setTimeout(function(){
	                        if(!enterAnimateDone){
	                            animationDone(false)
	                        }
	                    },time + 130 )
	                }
	            }, 17+ staggerTime * staggerIndex)// = 1000/60
	        }
	    }
	}

	avalon.applyEffect = function(node, vnode, opts){
	    var cb = opts.cb
	    var hook = opts.hook
	    var curEffect = vnode['ms-effect']
	    if(curEffect && !avalon.document.hidden ){
	        var old = curEffect[hook]
	        if(cb){
	            if(Array.isArray(old)){
	                old.push(cb)
	            }else if(old){
	                curEffect[hook] = [old, cb]
	            }else{
	                curEffect[hook] = [cb]
	            }
	        }
	        getAction(opts)
	        node.animate = true
	        avalon.directives.effect.update(node,vnode, 0, avalon.shadowCopy({},opts) ) 

	    }else if(cb){
	        cb()
	    }
	}

	function getAction(opts){
	    if(!opts.acton){
	        opts.action = opts.hook.replace(/^on/,'').replace(/Done$/,'').toLowerCase()
	    }
	}



/***/ },
/* 72 */
/***/ function(module, exports) {

	/**
	 * ------------------------------------------------------------
	 * 检测浏览器对CSS动画的支持与API名
	 * ------------------------------------------------------------
	 */
	var supportTransition = false
	var supportAnimation = false
	var supportCSS = false
	var transitionEndEvent
	var animationEndEvent
	var transitionDuration = avalon.cssName('transition-duration')
	var animationDuration = avalon.cssName('animation-duration')

	var checker = {
	    TransitionEvent: 'transitionend',
	    WebKitTransitionEvent: 'webkitTransitionEnd',
	    OTransitionEvent: 'oTransitionEnd',
	    otransitionEvent: 'otransitionEnd'
	}
	var window = avalon.window
	var tran
	//有的浏览器同时支持私有实现与标准写法，比如webkit支持前两种，Opera支持1、3、4
	for (var name in checker) {
	    if (window[name]) {
	        tran = checker[name]
	        break
	    }
	    try {
	        var a = document.createEvent(name)
	        tran = checker[name]
	        break
	    } catch (e) {
	    }
	}
	if (typeof tran === 'string') {
	    supportTransition = true
	    supportCSS = true
	    transitionEndEvent = tran
	}

	//animationend有两个可用形态
	//IE10+, Firefox 16+ & Opera 12.1+: animationend
	//Chrome/Safari: webkitAnimationEnd
	//http://blogs.msdn.com/b/davrous/archive/2011/12/06/introduction-to-css3-animat ions.aspx
	//IE10也可以使用MSAnimationEnd监听，但是回调里的事件 type依然为animationend
	//  el.addEventListener('MSAnimationEnd', function(e) {
	//     alert(e.type)// animationend！！！
	// })
	checker = {
	    'AnimationEvent': 'animationend',
	    'WebKitAnimationEvent': 'webkitAnimationEnd'
	}
	var ani
	for (name in checker) {
	    if (window[name]) {
	        ani = checker[name]
	        break
	    }
	}
	if (typeof ani === 'string') {
	    supportAnimation = true
	    supportCSS = true
	    animationEndEvent = ani
	}

	module.exports = {
	    transition: supportTransition,
	    animation: supportAnimation,
	    css: supportCSS,
	    transitionEndEvent: transitionEndEvent,
	    animationEndEvent: animationEndEvent,
	    transitionDuration: transitionDuration,
	    animationDuration: animationDuration
	}

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	
	avalon.lexer = __webpack_require__(74)
	avalon.diff = __webpack_require__(75)
	avalon.batch = __webpack_require__(76)
	// dispatch与patch 为内置模块
	var parseView = __webpack_require__(77)

	function render(vtree, local) {
	    var _body = Array.isArray(vtree) ? parseView(vtree) : vtree
	    var _local = []
	    if (local) {
	        for (var i in local) {
	            _local.push('var ' + i + ' = __local__['+avalon.quote(i)+']')
	        }
	    }
	    var body = '__local__ = __local__ || {};\n' +
	            _local.join(';\n')+'\n' + _body
	    var fn = Function('__vmodel__', '__local__', body)
	    return fn
	}
	avalon.render = render

	module.exports = avalon


/***/ },
/* 74 */
/***/ function(module, exports) {

	/**
	 * ------------------------------------------------------------
	 * avalon2.1.1的新式lexer
	 * 将字符串变成一个虚拟DOM树,方便以后进一步变成模板函数
	 * 此阶段只会生成VElement,VText,VComment
	 * ------------------------------------------------------------
	 */
	var ropenTag = /^<([-A-Za-z0-9_]+)\s*([^>]*?)(\/?)>/
	var rendTag = /^<\/([^>]+)>/
	var rmsForStart = /^\s*ms\-for\:/
	var rmsForEnd = /^\s*ms\-for\-end/
	//https://github.com/rviscomi/trunk8/blob/master/trunk8.js
	//判定里面有没有内容
	var rcontent = /\S/
	var voidTag = avalon.oneObject('area,base,basefont,bgsound,br,col,command,embed,' +
	        'frame,hr,img,input,keygen,link,meta,param,source,track,wbr')
	var plainTag = avalon.oneObject('script,style,textarea,xmp,noscript,option,template')
	var stringPool = {}


	function lexer(str) {
	    stringPool = {}
	    str = clearString(str)
	    var stack = []
	    stack.last = function () {
	        return  stack[stack.length - 1]
	    }
	    var ret = []

	    var breakIndex = 100000
	    do {
	        var node = false
	        if (str.charAt(0) !== '<') {
	            var i = str.indexOf('<')
	            i = i === -1 ? str.length : i
	            var nodeValue = str.slice(0, i).replace(rfill, fill)
	            str = str.slice(i)//处理文本节点
	            node = {type: "#text", nodeType: 3, nodeValue: nodeValue}
	            if (rcontent.test(nodeValue)) {
	                collectNodes(node, stack, ret)//不收集空白节点
	            }
	        }
	        if (!node) {
	            var i = str.indexOf('<!--')
	            if (i === 0) {
	                var l = str.indexOf('-->')
	                if (l === -1) {
	                    avalon.error("注释节点没有闭合" + str)
	                }
	                var nodeValue = str.slice(4, l).replace(rfill, fill)
	                str = str.slice(l + 3)
	                node = {type: "#comment", nodeType: 8, nodeValue: nodeValue}
	                collectNodes(node, stack, ret)
	                if (rmsForEnd.test(nodeValue)) {
	                    var p = stack.last()
	                    var nodes = p ? p.children : ret
	                    markeRepeatRange(nodes, nodes.pop())
	                }
	            }

	        }
	        if (!node) {
	            var match = str.match(ropenTag)
	            if (match) {
	                var type = match[1].toLowerCase()
	                var isVoidTag = voidTag[type] || match[3] === '\/'
	                node = {type: type, nodeType: 1, props: {}, children: [], isVoidTag: isVoidTag}
	                var attrs = match[2]
	                if (attrs) {
	                    collectProps(attrs, node.props)
	                }
	                collectNodes(node, stack, ret)
	                str = str.slice(match[0].length)
	                if (isVoidTag) {
	                    node.fire = node.isVoidTag = true
	                } else {
	                    stack.push(node)
	                    if (plainTag[type]) {
	                        var index = str.indexOf("</" + type + '>')
	                        var innerHTML = str.slice(0, index).trim()
	                        str = str.slice(index)
	                        if (innerHTML) {
	                            switch (type) {
	                                case 'style':
	                                case 'script':
	                                case 'noscript':
	                                case 'template':
	                                case 'xmp':
	                                    node.skipContent = true
	                                    if (innerHTML) {
	                                        node.children.push({
	                                            nodeType: 3,
	                                            type: '#text',
	                                            nodeValue: nomalString(innerHTML)
	                                        })
	                                    }
	                                    break
	                                case 'textarea':
	                                    node.skipContent = true
	                                    node.props.type = 'textarea'
	                                    node.props.value = nomalString(innerHTML)
	                                    break
	                                case 'option':
	                                    node.children.push({
	                                        nodeType: 3,
	                                        type: '#text',
	                                        nodeValue: nomalString(trimHTML(innerHTML))
	                                    })
	                                    break
	                            }
	                        }
	                    }
	                }
	            }
	        }
	        if (!node) {
	            var match = str.match(rendTag)
	            if (match) {
	                var type = match[1].toLowerCase()
	                var last = stack.last()
	                if (!last) {
	                    avalon.error(match[0] + '前面缺少<' + type + '>')
	                } else if (last.type !== type) {
	                    avalon.error(last.type + '没有闭合')
	                }
	                node = stack.pop()
	                node.fire = true
	                str = str.slice(match[0].length)
	            }
	        }

	        if (!node || --breakIndex === 0) {
	            break
	        }
	        if (node.fire) {
	            fireEnd(node, stack, ret)
	            delete node.fire
	        }

	    } while (str.length);

	    return ret

	}

	module.exports = lexer

	function fireEnd(node, stack, ret) {
	    var type = node.type
	    var props = node.props
	    switch (type) {
	        case 'input':
	            if (!props.type) {
	                props.type = 'text'
	            }
	            break
	        case 'select':
	            props.type = type + '-' + props.hasOwnProperty('multiple') ? 'multiple' : 'one'
	            break
	        case 'table':
	            addTbody(node.children)
	            break
	        default:
	            if (type.indexOf('ms-') === 0) {
	                props.is = type
	                if (!props['ms-widget']) {
	                    props['ms-widget'] = '{is:' + avalon.quote(type) + '}'
	                }
	            }
	            break
	    }
	    var forExpr = props['ms-for']
	    if (forExpr) {
	        delete props['ms-for']
	        var p = stack.last()
	        var arr = p ? p.children : ret
	        arr.splice(arr.length - 1, 0, {
	            nodeType: 8,
	            type: '#comment',
	            nodeValue: 'ms-for:' + forExpr
	        })

	        var cb = props['data-for-rendered']
	        var cid = cb + ':cb'

	        if (cb && !avalon.caches[cid]) {
	            avalon.caches[cid] = Function('return ' + avalon.parseExpr(cb, 'on'))()
	        }

	        markeRepeatRange(arr, {
	            nodeType: 8,
	            type: '#comment',
	            nodeValue: 'ms-for-end:'
	        })
	    }
	}

	function markeRepeatRange(nodes, end) {
	    end.dynamic = true
	    end.signature = avalon.makeHashCode('for')
	    var array = [], start, deep = 1
	    while (start = nodes.pop()) {
	        if (start.nodeType === 8) {
	            if (rmsForEnd.test(start.nodeValue)) {
	                ++deep
	            } else if (rmsForStart.test(start.nodeValue)) {
	                --deep
	                if (deep === 0) {
	                    start.nodeValue = start.nodeValue.replace(rfill, fill)        //nomalString(start.nodeValue)
	                    start.signature = end.signature
	                    start.dynamic = 'for'
	                    start.template = array.map(function (a) {
	                        return avalon.vdomAdaptor(a, 'toHTML')
	                    }).join('')
	                    nodes.push(start, array, end)
	                    break
	                }
	            }
	        }
	        array.unshift(start)
	    }

	}


	function collectNodes(node, stack, ret) {
	    var p = stack.last()
	    if (p) {
	        p.children.push(node)
	    } else {
	        ret.push(node)
	    }
	}

	function collectProps(attrs, props) {
	    attrs.replace(rnowhite, function (prop) {
	        var arr = prop.split('=')
	        var name = arr[0]
	        var value = arr[1] || ''
	        if (name.charAt(0) === ':') {
	            name = 'ms-' + name.slice(1)
	        }
	        if (value) {
	            if (value.indexOf('??') === 0) {
	                value = nomalString(value).
	                        replace(rlineSp, '').
	                        slice(1, -1)
	            }
	        }
	        if (!(name in props)) {
	            props[name] = value
	        }
	    })

	}
	function nomalString(str) {
	    return avalon.unescapeHTML(str.replace(rfill, fill))
	}

	function clearString(str) {
	    var array = readString(str)
	    for (var i = 0, n = array.length; i < n; i++) {
	        str = str.replace(array[i], dig)
	    }
	    return str
	}
	function readString(str) {
	    var end, s = 0
	    var ret = []
	    for (var i = 0, n = str.length; i < n; i++) {
	        var c = str.charAt(i)
	        if (!end) {
	            if (c === "'") {
	                end = "'"
	                s = i
	            } else if (c === '"') {
	                end = '"'
	                s = i
	            }
	        } else {
	            if (c === '\\') {
	                i += 1
	                continue
	            }
	            if (c === end) {
	                ret.push(str.slice(s, i + 1))
	                end = false
	            }
	        }
	    }
	    return ret
	}

	var rfill = /\?\?\d+/g
	var rlineSp = /\n\s*/g
	var rnowhite = /\S+/g
	var number = 1
	function dig(a) {
	    var key = '??' + number++
	    stringPool[key] = a
	    return key
	}
	function fill(a) {
	    var val = stringPool[a]
	    return val
	}
	//专门用于处理option标签里面的标签
	var rtrimHTML = /<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi
	function trimHTML(v) {
	    return String(v).replace(rtrimHTML, '').trim()
	}

	//如果直接将tr元素写table下面,那么浏览器将将它们(相邻的那几个),放到一个动态创建的tbody底下
	function addTbody(nodes) {
	    var tbody, needAddTbody = false, count = 0, start = 0, n = nodes.length
	    for (var i = 0; i < n; i++) {
	        var node = nodes[i]
	        if (!tbody) {
	            if (node.type === 'tr') {
	                tbody = {
	                    nodeType: 1,
	                    type: 'tbody',
	                    children: [],
	                    props: {}
	                }
	                tbody.children.push(node)
	                needAddTbody = true
	                if (start === 0)
	                    start = i
	                nodes[i] = tbody
	            }
	        } else {
	            if (node.type !== 'tr' && node.nodeType === 1) {
	                tbody = false
	            } else {
	                tbody.children.push(node)
	                count++
	                nodes[i] = 0
	            }
	        }
	    }

	    if (needAddTbody) {
	        for (i = start; i < n; i++) {
	            if (nodes[i] === 0) {
	                nodes.splice(i, 1)
	                i--
	                count--
	                if (count === 0) {
	                    break
	                }
	            }
	        }
	    }
	}

	avalon.speedUp = function (arr) {
	    for (var i = 0; i < arr.length; i++) {
	        hasDirective(arr[i])
	    }
	}

	function hasDirective(a) {
	    switch (a.nodeType) {
	        case 3:
	            if (avalon.config.rbind.test(a.nodeValue)) {
	                a.dynamic = 'expr'
	                return true
	            } else {
	                a.skipContent = true
	                return false
	            }
	        case 8:
	            if (a.dynamic) {
	                return true
	            } else {
	                a.skipContent = true
	                return false
	            }
	        case 1:
	            if (a.props['ms-skip']) {
	                a.skipAttrs = true
	                a.skipContent = true
	                return false
	            }
	            if (/^ms\-/.test(a.type) || hasDirectiveAttrs(a.props)) {
	                a.dynamic = true
	            } else {
	                a.skipAttrs = true
	            }
	            if (a.isVoidTag && !a.dynamic) {
	                a.skipContent = true
	                return false
	            }
	            var hasDirective = childrenHasDirective(a.children)
	            if (!hasDirective && !a.dynamic) {
	                a.skipContent = true
	                return false
	            }
	            return true
	        default:
	            if (Array.isArray(a)) {
	                return childrenHasDirective(a)
	            }
	    }
	}

	function childrenHasDirective(arr) {
	    var ret = false
	    for (var i = 0, el; el = arr[i++]; ) {
	        if (hasDirective(el)) {
	            ret = true
	        }
	    }
	    return ret
	}

	function hasDirectiveAttrs(props) {
	    if ('ms-skip' in props)
	        return false
	    for (var i in props) {
	        if (i.indexOf('ms-') === 0) {
	            return true
	        }
	    }
	    return false
	}

/***/ },
/* 75 */
/***/ function(module, exports) {

	/**
	 * ------------------------------------------------------------
	 * diff 对比新旧两个虚拟DOM树,根据directive中的diff方法为新虚拟DOM树
	 * 添加change, afterChange更新钩子
	 * ------------------------------------------------------------
	 */
	var emptyArr = []
	// 防止被引用
	var emptyObj = function () {
	    return {
	        children: [], props: {}
	    }
	}
	var directives = avalon.directives
	var rbinding = /^ms-(\w+)-?(.*)/

	function diff(copys, sources) {
	    for (var i = 0; i < copys.length; i++) {
	        var copy = copys[i]
	        var src = sources[i] || emptyObj()
	    
	        switch (copy.nodeType) {
	            case 3:
	                if (copy.dynamic) {
	                    directives.expr.diff(copy, src)
	                }
	                break
	            case 8:
	                if (copy.dynamic === 'for') {
	                    directives['for'].diff(copy, src,
	                    copys[i+1],sources[i+1],sources[i+2]) 
	                }else if(src.afterChange){
	                    execHooks(src, src.afterChange)
	                }
	                break
	            case 1:
	                if (copy.order) {
	                    diffProps(copy, src)
	                }
	                if (copy.nodeType === 1 && !copy.skipContent && !copy.isVoidTag ) {
	                    diff(copy.children, src.children || emptyArr, copy)
	                }
	                if(src.afterChange){
	                    execHooks(src, src.afterChange)
	                }
	                break
	            default: 
	                if(Array.isArray(copy)){
	                   diff(copy, src)
	                }
	                break
	        }
	    }
	}

	function execHooks(el, hooks) {
	    if (hooks.length) {
	        for (var hook, i = 0; hook = hooks[i++];) {
	           hook(el.dom, el)
	        }
	    }
	    delete el.afterChange
	}

	function diffProps(copys, sources) {
	    var order = copys.order
	    if (order) {
	        var directiveType
	        try {
	           order.replace(avalon.rword, function (name) {
	                var match = name.match(rbinding)
	                var type = match && match[1]
	                directiveType = type
	                if (directives[type]) {
	                    directives[type].diff(copys, sources || emptyObj(), name)
	                }
	                if(copys.order !== order){
	                    throw 'break'
	                }
	            })
	            
	        } catch (e) {
	            if(e !== 'break'){
	                avalon.warn(directiveType, e, e.stack || e.message, 'diffProps error')
	            }else{
	                diffProps(copys, sources)
	            }
	        }
	    }


	}
	avalon.diffProps = diffProps
	module.exports = diff


/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * ------------------------------------------------------------
	 * batch 同时对N个视图进行全量更新
	 * ------------------------------------------------------------
	 */

	var reconcile = __webpack_require__(46)

	//如果正在更新一个子树,那么将它放到
	var needRenderIds = []
	var renderingID = false
	avalon.suspendUpdate = 0


	function batchUpdate(id) {
	    if (renderingID) {
	        return avalon.Array.ensure(needRenderIds, id)
	    } else {
	        renderingID = id
	    }
	    var scope = avalon.scopes[id]
	    if (!scope || !document.nodeName || avalon.suspendUpdate) {
	        return renderingID = null
	    }
	    var vm = scope.vmodel
	    var dom = vm.$element
	    var source = dom.vtree || []
	    var renderFn = vm.$render
	    var copy = renderFn(scope.vmodel, scope.local)
	    if (scope.isTemp) {
	        //在最开始时,替换作用域的所有节点,确保虚拟DOM与真实DOM是对齐的
	        reconcile([dom], source, dom.parentNode)
	        delete avalon.scopes[id]
	    }
	    avalon.diff(copy, source)


	    var index = needRenderIds.indexOf(renderingID)
	    renderingID = 0
	    if (index > -1) {
	        var removed = needRenderIds.splice(index, 1)
	        return batchUpdate(removed[0])
	    }

	    var more = needRenderIds.shift()
	    if (more) {
	        batchUpdate(more)
	    }
	}



	module.exports = avalon.batch = batchUpdate


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * 本模块是用于将虚拟DOM变成一个函数
	 */

	var extractBindings = __webpack_require__(78)
	var stringify = __webpack_require__(57)
	var parseExpr = __webpack_require__(79)
	var decode = __webpack_require__(23)
	var config = avalon.config
	var quote = avalon.quote
	var rident =  /^[$a-zA-Z_][$a-zA-Z0-9_]*$/
	var rstatement = /^\s*var\s+([$\w]+)\s*\=\s*\S+/
	var skips = {__local__: 1,vmode:1, dom: 1}


	function parseNodes(source, inner) {
	    //ms-important， ms-controller ， ms-for 不可复制，省得死循环
	    //ms-important --> ms-controller --> ms-for --> ms-widget --> ms-effect --> ms-if
	    var buffer = inner ? [] : ['\nvar vnodes = [];']

	    for (var i = 0, el; el = source[i++]; ) {
	        var vnode = parseNode(el)
	        if (el.$prepend) {
	            buffer.push(el.$prepend)
	        }
	        var append = el.$append
	        delete el.$append
	        delete el.$prepend
	        if (vnode) {
	            buffer.push(vnode + '\n')
	        }
	        if (append) {
	            buffer.push(append)
	        }
	    }
	    if (!inner) {
	        buffer.push('return vnodes\n')
	    }
	    return buffer.join('\n')
	}



	function parseNode(vdom) {
	    switch (vdom.nodeType) {
	        case 3:
	            if (config.rexpr.test(vdom.nodeValue)) {
	                return add(parseText(vdom))
	            } else {
	                return addTag(vdom)
	            }
	        case 1:
	            var copy = {
	                props: {},
	                type: vdom.type,
	                nodeType: 1
	            }
	            var bindings = extractBindings(copy, vdom.props)
	            var order = bindings.map(function (b) {
	                //将ms-*的值变成函数,并赋给copy.props[ms-*]
	                //如果涉及到修改结构,则在source添加$append,$prepend
	                avalon.directives[b.type].parse(copy, vdom, b)
	                return b.name
	            }).join(',')
	            if (order) {
	                copy.order = order
	            }
	            if (vdom.isVoidTag) {
	                copy.isVoidTag = true
	            } else {
	                if (!('children' in copy)) {
	                    var c = vdom.children
	                    if (c.length) {
	                        copy.children = '(function(){' + parseNodes(c) + '})()'
	                    } else {
	                        copy.children = '[]'
	                    }
	                }
	            }
	            if (vdom.skipContent)
	                copy.skipContent = true
	            if (vdom.skipAttrs)
	                copy.skipAttrs = true

	            return addTag(copy)
	        case 8:
	            var nodeValue = vdom.nodeValue
	            if (vdom.dynamic === 'for') {// 处理ms-for指令
	                if (nodeValue.indexOf('ms-for:') !== 0) {
	                    avalon.error('ms-for指令前不能有空格')
	                }
	                var copy = {
	                    dynamic: 'for',
	                    vmodel: '__vmodel__'
	                }
	                for (var i in vdom) {
	                    if (vdom.hasOwnProperty(i) && !skips[i]) {
	                        copy[i] = vdom[i]
	                    }
	                }

	                avalon.directives['for'].parse(copy, vdom, vdom)
	                return addTag(copy)
	            } else if (vdom.dynamic) {
	                if (nodeValue.indexOf('ms-for-end:') !== 0) {
	                    avalon.error('ms-for-end指令前不能有空格')
	                }
	                vdom.$append = addTag({
	                    nodeType: 8,
	                    type: '#comment',
	                    nodeValue: vdom.signature,
	                    key: 'traceKey'
	                }) + '\n},__local__,vnodes)\n' +
	                        addTag({
	                            nodeType: 8,
	                            type: "#comment",
	                            signature: vdom.signature,
	                            nodeValue: "ms-for-end:"
	                        }) + '\n'
	                return ''

	            } else if (nodeValue.indexOf('ms-js:') === 0) {//插入JS声明语句
	                var statement = parseExpr(nodeValue.replace('ms-js:', ''), 'js') + '\n'
	                var ret = addTag(vdom)
	                var match = statement.match(rstatement)
	                if (match && match[1]) {
	                    vdom.$append = (vdom.$append || '') + statement +
	                            "\n__local__." + match[1] + ' = ' + match[1] + '\n'
	                } else {
	                    avalon.warn(nodeValue + ' parse fail!')
	                }
	                return ret
	            } else {
	                return addTag(vdom)
	            }
	        default:
	            if (Array.isArray(vdom)) {
	                vdom.$append = parseNodes(vdom, true)
	            }
	    }

	}

	module.exports = parseNodes

	function wrapDelimiter(expr) {
	    return rident.test(expr) ? expr : parseExpr(expr, 'text')
	}

	function add(a) {
	    return 'vnodes.push(' + a + ');'
	}
	function addTag(obj) {
	    return add(stringify(obj))
	}

	function parseText(el) {
	    var array = extractExpr(el.nodeValue)//返回一个数组
	    var nodeValue = ''
	    if (array.length === 1) {
	        nodeValue = wrapDelimiter(array[0].expr)
	    } else {
	        var token = array.map(function (el) {
	            return el.type ? wrapDelimiter(el.expr) : quote(el.expr)
	        }).join(' + ')
	        nodeValue = 'String(' + token + ')'
	    }
	    return '{\ntype: "#text",\nnodeType:3,\ndynamic:true,\nnodeValue: ' + nodeValue + '\n}'
	}

	var rlineSp = /\n\s*/g

	function extractExpr(str) {
	    var ret = []
	    do {//aaa{{@bbb}}ccc
	        var index = str.indexOf(config.openTag)
	        index = index === -1 ? str.length : index
	        var value = str.slice(0, index)
	        if (/\S/.test(value)) {
	            ret.push({expr: decode(value)})
	        }
	        str = str.slice(index + config.openTag.length)
	        if (str) {
	            index = str.indexOf(config.closeTag)
	            var value = str.slice(0, index)
	            ret.push({
	                expr: avalon.unescapeHTML( value.replace(rlineSp, '') ),
	                type: '{{}}'
	            })
	            str = str.slice(index + config.closeTag.length)
	        }
	    } while (str.length)
	   return ret
	}


/***/ },
/* 78 */
/***/ function(module, exports) {

	var directives = avalon.directives
	var rbinding = /^ms-(\w+)-?(.*)/
	var eventMap = avalon.oneObject('animationend,blur,change,input,click,dblclick,focus,keydown,keypress,keyup,mousedown,mouseenter,mouseleave,mousemove,mouseout,mouseover,mouseup,scan,scroll,submit')

	function extractBindings(cur, props) {
	    var bindings = []
	    var skip = 'ms-skip' in props
	    var uniq = {}
	    for (var i in props) {
	        var value = props[i], match

	        if (!skip && (match = i.match(rbinding))) {
	            var type = match[1]
	            var param = match[2] || ''
	            var name = i
	            if (eventMap[type]) {
	                var order = parseFloat(param) || 0
	                param = type
	                type = 'on'
	            }
	            name = 'ms-' + type + (param ? '-' + param : '')
	            if (i !== name) {
	                delete props[i]
	                props[name] = value
	            }
	            if (directives[type]) {

	                var binding = {
	                    type: type,
	                    param: param,
	                    name: name,
	                    expr: value,
	                    priority: directives[type].priority || type.charCodeAt(0) * 100
	                }
	                if (type === 'on') {
	                    order = order || 0
	                    binding.name += '-' + order
	                    binding.priority = param.charCodeAt(0) * 100 + order
	                }
	                if (!uniq[binding.name]) {
	                    uniq[binding.name] = 1
	                    bindings.push(binding)
	                }
	            }
	        } else {
	            cur.props[i] = props[i]
	        }
	    }
	    bindings.sort(byPriority)

	    return bindings
	}

	function byPriority(a, b) {
	    return a.priority - b.priority
	}

	module.exports = extractBindings


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	

	//缓存求值函数，以便多次利用
	var evaluatorPool = __webpack_require__(56)

	var rregexp = /(^|[^/])\/(?!\/)(\[.+?]|\\.|[^/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/g
	var rstring = /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/g
	var rfill = /\?\?\d+/g
	var brackets = /\(([^)]*)\)/

	var rshortCircuit = /\|\|/g
	var rpipeline = /\|(?=\w)/
	var ruselessSp = /\s*(\.|\|)\s*/g

	var rAt = /(^|[^\w\u00c0-\uFFFF_])(@|##)(?=[$\w])/g
	var rhandleName = /^(?:\@|##)[$\w\.]+$/i

	var rfilters = /\|.+/g
	var rvar = /((?:\@|\$|\#\#)?\w+)/g

	function collectLocal(str, ret) {
	    var arr = str.replace(rfilters, '').match(rvar)
	    if (arr) {
	        arr.filter(function (el) {
	            if (!/^[@\d\-]/.test(el) &&
	                    el.slice(0, 2) !== '##' &&
	                    el !== '$event' && !avalon.keyMap[el]) {
	                ret[el] = 1
	            }
	        })
	    }
	}

	function extLocal(ret) {
	    var arr = []
	    for (var i in ret) {
	        arr.push('var ' + i + ' = __local__[' + avalon.quote(i) + ']')
	    }
	    return arr
	}

	function parseExpr(str, category) {
	    var binding = {}
	    category = category || 'other'
	    if (typeof str === 'object') {
	        category = str.type
	        binding = str
	        str = binding.expr
	    }
	    if (typeof str !== 'string')
	        return ''
	    var cacheID = str
	    var cacheStr = evaluatorPool.get(category + ':' + cacheID)

	    if (cacheStr) {
	        return cacheStr
	    }

	    var number = 1
	//相同的表达式生成相同的函数
	    var maps = {}
	    function dig(a) {
	        var key = '??' + number++
	        maps[key] = a
	        return key
	    }

	    function fill(a) {
	        return maps[a]
	    }

	    var input = str.replace(rregexp, dig).//移除所有正则
	            replace(rstring, dig).//移除所有字符串
	            
	   // input = avalon.unescapeHTML(input).
	            replace(rshortCircuit, dig).//移除所有短路或
	            replace(ruselessSp, '$1').//移除. |两端空白
	            split(rpipeline) //使用管道符分离所有过滤器及表达式的正体
	    //还原body
	    var _body = input.shift()
	    var local = {}
	    var body = _body.replace(rfill, fill).trim()
	    if (category === 'on' && rhandleName.test(body)) {
	        body = body + '($event)'
	    }

	    body = body.replace(rAt, '$1__vmodel__.')
	    if (category === 'js') {
	        return evaluatorPool.put(category + ':' + cacheID, body)
	    } else if (category === 'on') {
	        collectLocal(_body, local)
	    }

	//处理表达式的过滤器部分

	    var filters = input.map(function (str) {
	        collectLocal(str.replace(/^\w+/g, ""), local)
	        str = str.replace(rfill, fill).replace(rAt, '$1__vmodel__.') //还原
	        var hasBracket = false
	        str = str.replace(brackets, function (a, b) {
	            hasBracket = true
	            return /\S/.test(b) ?
	                    '(__value__,' + b + ');' :
	                    '(__value__);'
	        })
	        if (!hasBracket) {
	            str += '(__value__);'
	        }
	        str = str.replace(/(\w+)/, 'avalon.__format__("$1")')
	        return '__value__ = ' + str
	    })
	    var ret = []
	    if (category === 'on') {
	        filters = filters.map(function (el) {
	            return el.replace(/__value__/g, '$event')
	        })
	        if (filters.length) {
	            filters.push('if($event.$return){\n\treturn;\n}')
	        }
	        if (!avalon.modern) {
	            body = body.replace(/__vmodel__\.([^(]+)\(([^)]*)\)/, function (a, b, c) {
	                return '__vmodel__.' + b + ".call(__vmodel__" + (/\S/.test(c) ? ',' + c : "") + ")"
	            })
	        }

	        ret = ['function ms_on($event, __local__){',
	            'try{',
	            extLocal(local).join('\n'),
	            '\tvar __vmodel__ = this;',
	            '\t' + body,
	            '}catch(e){',
	            quoteError(str, category),
	            '}',
	            '}']
	        filters.unshift(2, 0)
	    } else if (category === 'duplex') {

	//从vm中得到当前属性的值
	        var getterBody = [
	            'function (__vmodel__){',
	            'try{',
	            'return ' + body + '\n',
	            '}catch(e){',
	            quoteError(str, category).replace('parse', 'get'),
	            '}',
	            '}']
	        evaluatorPool.put('duplex:' + cacheID, getterBody.join('\n'))
	        //给vm同步某个属性
	        var setterBody = [
	            'function (__vmodel__,__value__){',
	            'try{',
	            '\t' + body + ' = __value__',
	            '}catch(e){',
	            quoteError(str, category).replace('parse', 'set'),
	            '}',
	            '}']
	        evaluatorPool.put('duplex:set:' + cacheID, setterBody.join('\n'))
	        //对某个值进行格式化
	        if (input.length) {
	            var formatBody = [
	                'function (__vmodel__, __value__){',
	                'try{',
	                filters.join('\n'),
	                'return __value__\n',
	                '}catch(e){',
	                quoteError(str, category).replace('parse', 'format'),
	                '}',
	                '}']
	            evaluatorPool.put('duplex:format:' + cacheID, formatBody.join('\n'))
	        }
	        return  evaluatorPool.get('duplex:' + cacheID)
	    } else {
	        ret = [
	            '(function(){',
	            'try{',
	            'var __value__ = ' + body,
	            (category === 'text' ?
	                    'return avalon.parsers.string(__value__)' :
	                    'return __value__'),
	            '}catch(e){',
	            quoteError(str, category),
	            '\treturn ""',
	            '}',
	            '})()'
	        ]
	        filters.unshift(3, 0)
	    }
	    ret.splice.apply(ret, filters)
	    cacheStr = ret.join('\n')
	    evaluatorPool.put(category + ':' + cacheID, cacheStr)
	    return cacheStr

	}

	function quoteError(str, type) {
	    return '\tavalon.warn(e, ' +
	            avalon.quote('parse ' + type + ' binding【 ' + str + ' 】fail')
	            + ')'
	}

	module.exports = avalon.parseExpr = parseExpr




/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	var ret = __webpack_require__(81)
	var fireDisposeHook = ret.fireDisposeHook
	var fireDisposeHooks = ret.fireDisposeHooks
	var fireDisposeHookDelay = ret.fireDisposeHookDelay


	//http://stackoverflow.com/questions/11425209/are-dom-mutation-observers-slower-than-dom-mutation-events
	//http://stackoverflow.com/questions/31798816/simple-mutationobserver-version-of-domnoderemovedfromdocument
	function byMutationEvent(dom) {
	    dom.addEventListener("DOMNodeRemovedFromDocument", function () {
	        fireDisposeHookDelay(dom)
	    })
	}
	//用于IE8+, firefox
	function byRewritePrototype() {
	    if (byRewritePrototype.execute) {
	        return
	    }
	//https://www.web-tinker.com/article/20618.html?utm_source=tuicool&utm_medium=referral
	//IE6-8虽然暴露了Element.prototype,但无法重写已有的DOM API
	    byRewritePrototype.execute = true
	    var p = Node.prototype
	    function rewite(name, fn) {
	        var cb = p[name]
	        p[name] = function (a, b) {
	            return  fn.call(this, cb, a, b)
	        }
	    }
	    rewite('removeChild', function (fn, a, b) {
	        fn.call(this, a, b)
	        if (a.nodeType === 1) {
	            fireDisposeHookDelay(a)
	        }
	        return a
	    })

	    rewite('replaceChild', function (fn, a, b) {
	        fn.call(this, a, b)
	        if (a.nodeType === 1) {
	            fireDisposeHookDelay(a)
	        }
	        return a
	    })
	    //访问器属性需要用getOwnPropertyDescriptor处理
	    var ep = Element.prototype, oldSetter
	    function newSetter(html) {
	        var all = avalon.slice(this.getElementsByTagName('*'))
	        oldSetter.call(this, html)
	        fireDisposeHooks(all)
	    }
	    if (!Object.getOwnPropertyDescriptor) {
	        oldSetter = ep.__lookupSetter__('innerHTML')
	        ep.__defineSetter__('innerHTML', newSetter)
	    } else {
	        var obj = Object.getOwnPropertyDescriptor(ep, 'innerHTML');
	        if(obj){
	            oldSetter = obj.set
	            obj.set = newSetter
	            Object.defineProperty(ep, 'innerHTML', obj)
	        }
	    }

	    rewite('appendChild', function (fn, a) {
	        fn.call(this, a)
	        if (a.nodeType === 1 && this.nodeType === 11) {
	            fireDisposeHookDelay(a)
	        }
	        return a
	    })

	    rewite('insertBefore', function (fn, a, b) {
	        fn.call(this, a, b)
	        if (a.nodeType === 1 && this.nodeType === 11) {
	            fireDisposeHookDelay(a)
	        }
	        return a
	    })
	}

	//用于IE6~8
	var checkDisposeNodes = []
	var checkID = 0
	function byPolling(dom) {
	    avalon.Array.ensure(checkDisposeNodes, dom)
	    if (!checkID) {
	        checkID = setInterval(function () {
	            for (var i = 0, el; el = checkDisposeNodes[i]; ) {
	                if (false === fireDisposeHook(el)) {
	                    avalon.Array.removeAt(checkDisposeNodes, i)
	                } else {
	                    i++
	                }
	            }
	            if (checkDisposeNodes.length == 0) {
	                clearInterval(checkID)
	                checkID = 0
	            }
	        }, 700)
	    }
	}


	module.exports = function onComponentDispose(dom) {
	    if (window.chrome && window.MutationEvent) {
	        byMutationEvent(dom)
	    } else if (avalon.modern && typeof window.Node === 'function') {
	        byRewritePrototype(dom)
	    } else {
	        byPolling(dom)
	    }
	}



/***/ },
/* 81 */
/***/ function(module, exports) {

	function inDomTree(el) {
	    while (el) {
	        if (el.nodeType === 9) {
	            return true
	        }
	        el = el.parentNode
	    }
	    return false
	}

	function fireDisposeHook(el) {
	    if (el.nodeType === 1 && el.getAttribute('wid') && !inDomTree(el)) {
	        var wid = el.getAttribute('wid')
	        var docker = avalon.scopes[ wid ]
	        if (!docker)
	            return
	        var vm = docker.vmodel
	        docker.vmodel.$fire("onDispose", {
	            type: 'dispose',
	            target: el,
	            vmodel: vm
	        })
	        if (docker && !el.getAttribute('cached')) {
	            delete docker.vmodel
	            delete avalon.scopes[ wid ]
	            var is = el.getAttribute('is')
	            var v = el.vtree
	            detachEvents(v)
	            if (v) {
	                v[0][is + '-mount'] = false
	            }
	        }
	        return false
	    }
	}
	function detachEvents(arr) {
	    for (var i in arr) {
	        var el = arr[i]
	        if (el.nodeType === 1) {
	            for (var i in el) {
	                if (i.indexOf('ms-on') === 0) {
	                    delete el[i]
	                }
	            }
	            if (el.children) {
	                detachEvents(el.children)
	            }
	        }
	    }
	}
	function fireDisposeHookDelay(a) {
	    setTimeout(function () {
	        fireDisposeHook(a)
	    }, 4)
	}
	function fireDisposeHooks(nodes) {
	    for (var i = 0, el; el = nodes[i++]; ) {
	        fireDisposeHook(el)
	    }
	}
	module.exports = {
	    fireDisposeHookDelay: fireDisposeHookDelay,
	    fireDisposeHooks: fireDisposeHooks,
	    fireDisposeHook:fireDisposeHook
	}

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * ------------------------------------------------------------
	 * avalon基于纯净的Object.defineProperties的vm工厂 
	 * masterFactory,slaveFactory,mediatorFactory, ArrayFactory
	 * ------------------------------------------------------------
	 */

	var share = __webpack_require__(83)
	var createViewModel = __webpack_require__(87)

	var isSkip = share.isSkip
	var toJson = share.toJson
	var $$midway = share.$$midway
	var $$skipArray = share.$$skipArray

	var makeAccessor = share.makeAccessor
	var initViewModel = share.initViewModel
	var modelAccessor = share.modelAccessor
	var modelAdaptor = share.modelAdaptor
	var makeHashCode = avalon.makeHashCode


	//一个vm总是为Observer的实例
	function Observer() {
	}

	function masterFactory(definition, heirloom, options) {

	    var $skipArray = {}
	    if (definition.$skipArray) {//收集所有不可监听属性
	        $skipArray = avalon.oneObject(definition.$skipArray)
	        delete definition.$skipArray
	    }

	    var keys = {}
	    options = options || {}
	    heirloom = heirloom || {}
	    var accessors = {}
	    var hashcode = makeHashCode('$')
	    var pathname = options.pathname || ''
	    options.id = options.id || hashcode
	    options.hashcode = options.hashcode || hashcode
	    var key, sid, spath
	    for (key in definition) {
	        if ($$skipArray[key])
	            continue
	        var val = keys[key] = definition[key]
	        if (!isSkip(key, val, $skipArray)) {
	            sid = options.id + '.' + key
	            spath = pathname ? pathname + '.' + key : key
	            accessors[key] = makeAccessor(sid, spath, heirloom)
	        }
	    }

	    accessors.$model = modelAccessor
	    var $vmodel = new Observer()
	    $vmodel = createViewModel($vmodel, accessors, definition)

	    for (key in keys) {
	        //对普通监控属性或访问器属性进行赋值
	        $vmodel[key] = keys[key]

	        //删除系统属性
	        if (key in $skipArray) {
	            delete keys[key]
	        } else {
	            keys[key] = true
	        }
	    }
	    initViewModel($vmodel, heirloom, keys, accessors, options)

	    return $vmodel
	}

	$$midway.masterFactory = masterFactory
	var empty = {}
	function slaveFactory(before, after, heirloom, options) {
	    var keys = {}
	    var skips = {}
	    var accessors = {}
	    heirloom = heirloom || {}
	    var pathname = options.pathname
	    var resue = before.$accessors || {}
	    var key, sid, spath
	    for (key in after) {
	        if ($$skipArray[key])
	            continue
	        keys[key] = true//包括可监控与不可监控的
	        if (!isSkip(key, after[key], empty)) {
	            if (resue[key]) {
	                accessors[key] = resue[key]
	            } else {
	                sid = options.id + '.' + key
	                spath = pathname ? pathname + '.' + key : key
	                accessors[key] = makeAccessor(sid, spath, heirloom)
	            }
	        } else {
	            skips[key] = after[key]
	            delete after[key]
	        }
	    }

	    options.hashcode = before.$hashcode || makeHashCode('$')
	    accessors.$model = modelAccessor
	    var $vmodel = new Observer()
	    $vmodel = createViewModel($vmodel, accessors, skips)

	    for (key in skips) {
	        $vmodel[key] = skips[key]
	    }

	    initViewModel($vmodel, heirloom, keys, accessors, options)

	    return $vmodel
	}

	$$midway.slaveFactory = slaveFactory

	function mediatorFactory(before, after) {
	    var keys = {}, key
	    var accessors = {}
	    var unresolve = {}
	    var heirloom = {}
	    var arr = avalon.slice(arguments)
	    var $skipArray = {}
	    for (var i = 0; i < arr.length; i++) {
	        var obj = arr[i]
	        //收集所有键值对及访问器属性
	        var config
	        var configName
	        for (var key in obj) {
	            if(!obj.hasOwnProperty(key)){
	                continue
	            }
	            if(key === '$skipArray' && Array.isArray(obj.$skipArray)){
	                obj.$skipArray.forEach(function(el){
	                    $skipArray[el] = 1
	                })
	            }
	            keys[key] = obj[key]
	            var $accessors = obj.$accessors
	            if ($accessors && $accessors[key]) {
	                if (arr.indexOf(obj[key]) === -1) {
	                    accessors[key] = $accessors[key]
	                } else { //去掉vm那个配置对象
	                    config = keys[key]
	                    configName = key
	                    delete keys[key]
	                }
	            } else if (typeof keys[key] !== 'function') {
	                unresolve[key] = 1
	            }
	        }
	    }
	    if (typeof this === 'function') {
	        this(keys, unresolve)
	    }
	    for (key in unresolve) {
	        //系统属性跳过,已经有访问器的属性跳过
	        if ($$skipArray[key] || accessors[key])
	            continue
	        if (!isSkip(key, keys[key], $skipArray)) {
	            accessors[key] = makeAccessor(before.$id, key, heirloom)
	            accessors[key].set(keys[key])
	        }
	    }

	    var $vmodel = new Observer()
	    $vmodel = createViewModel($vmodel, accessors, keys)

	    for (key in keys) {
	        if (!accessors[key]) {//添加不可监控的属性
	            $vmodel[key] = keys[key]
	        }
	        //用于通过配置对象触发组件的$watch回调
	        if (configName && accessors[key] && config.hasOwnProperty(key)) {
	            var $$ = accessors[key]
	            if (!$$.get.$decompose) {
	                $$.get.$decompose = {}
	            }
	            $$.get.$decompose[configName+'.'+key] = $vmodel
	        }

	        if (key in $$skipArray) {
	            delete keys[key]
	        } else {
	            keys[key] = true
	        }

	    }

	    initViewModel($vmodel, heirloom, keys, accessors, {
	        id: before.$id,
	        hashcode: makeHashCode('$'),
	        master: true
	    })

	    return $vmodel
	}


	$$midway.mediatorFactory = avalon.mediatorFactory = mediatorFactory

	var __array__ = share.__array__


	var ap = Array.prototype
	var _splice = ap.splice
	function notifySize(array, size) {
	    if (array.length !== size) {
	        array.notify('length', array.length, size, true)
	    }
	}

	__array__.removeAll = function (all) { //移除N个元素
	    var size = this.length
	    if (Array.isArray(all)) {
	        for (var i = this.length - 1; i >= 0; i--) {
	            if (all.indexOf(this[i]) !== -1) {
	                _splice.call(this, i, 1)
	            }
	        }
	    } else if (typeof all === 'function') {
	        for (i = this.length - 1; i >= 0; i--) {
	            var el = this[i]
	            if (all(el, i)) {
	                _splice.call(this, i, 1)
	            }
	        }
	    } else {
	        _splice.call(this, 0, this.length)

	    }
	    if (!avalon.modern) {
	        this.$model = toJson(this)
	    }
	    notifySize(this, size)
	    this.notify()
	}


	var __method__ = ['push', 'pop', 'shift', 'unshift', 'splice']

	__method__.forEach(function (method) {
	    var original = ap[method]
	    __array__[method] = function (a, b) {
	        // 继续尝试劫持数组元素的属性
	        var args = [], size = this.length

	        if (method === 'splice' && Object(this[0]) === this[0]) {
	            var old = this.slice(a, b)
	            var neo = ap.slice.call(arguments, 2)
	            var args = [a, b]
	            for (var j = 0, jn = neo.length; j < jn; j++) {
	                var item = old[j]

	                args[j + 2] = modelAdaptor(neo[j], item, (item && item.$events || {}), {
	                    id: this.$id + '.*',
	                    master: true
	                })
	            }

	        } else {
	            for (var i = 0, n = arguments.length; i < n; i++) {
	                args[i] = modelAdaptor(arguments[i], 0, {}, {
	                    id: this.$id + '.*',
	                    master: true
	                })
	            }
	        }
	        var result = original.apply(this, args)
	        if (!avalon.modern) {
	            this.$model = toJson(this)
	        }
	        notifySize(this, size)
	        this.notify()
	        return result
	    }
	})

	'sort,reverse'.replace(avalon.rword, function (method) {
	    __array__[method] = function () {
	        ap[method].apply(this, arguments)
	        if (!avalon.modern) {
	            this.$model = toJson(this)
	        }
	        this.notify()
	        return this
	    }
	})


	module.exports = avalon
	//使用这个来扁平化数据  https://github.com/gaearon/normalizr
	//使用Promise  https://github.com/stefanpenner/es6-promise
	//使用这个AJAX库 https://github.com/matthew-andrews/isomorphic-fetch

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var share = __webpack_require__(84)
	var canHideProperty = __webpack_require__(86)
	var initEvents = share.initEvents

	/*
	 * toJson
	 * hideProperty
	 * initViewModel
	 */

	function toJson(val) {
	    var xtype = avalon.type(val)
	    if (xtype === 'array') {
	        var array = []
	        for (var i = 0; i < val.length; i++) {
	            array[i] = toJson(val[i])
	        }
	        return array
	    } else if (xtype === 'object') {
	        var obj = {}
	        for (i in val) {
	            if (i === '__proxy__' || i === '__data__' || i === '__const__')
	                continue
	            if (val.hasOwnProperty(i)) {
	                var value = val[i]
	                obj[i] = value && value.nodeType ? value : toJson(value)
	            }
	        }
	        return obj
	    }
	    return val
	}

	function hideProperty(host, name, value) {
	    if (canHideProperty) {
	        Object.defineProperty(host, name, {
	            value: value,
	            writable: true,
	            enumerable: false,
	            configurable: true
	        })
	    } else {
	        host[name] = value
	    }
	}

	var modelAccessor = {
	    get: function () {
	        return toJson(this)
	    },
	    set: avalon.noop,
	    enumerable: false,
	    configurable: true
	}

	function initViewModel($vmodel, heirloom, keys, accessors, options) {

	    if (options.array) {
	        if (avalon.modern) {
	            Object.defineProperty($vmodel, '$model', modelAccessor)
	        } else {
	            $vmodel.$model = toJson($vmodel)
	        }
	    } else {
	        function hasOwnKey(key) {
	            return keys[key] === true
	        }
	        hideProperty($vmodel, '$accessors', accessors)
	        hideProperty($vmodel, 'hasOwnProperty', hasOwnKey)
	        hideProperty($vmodel, '$track', Object.keys(keys).sort().join(';;'))
	    }
	    hideProperty($vmodel, '$id', options.id)
	    hideProperty($vmodel, '$hashcode', options.hashcode)
	    if (options.master === true) {
	        hideProperty($vmodel, '$run', function () {
	            run.call($vmodel)
	        })
	        hideProperty($vmodel, '$wait', function () {
	            wait.call($vmodel)
	        })
	        hideProperty($vmodel, '$element', null)
	        hideProperty($vmodel, '$render', 0)
	        initEvents($vmodel, heirloom)
	    }
	}

	function wait() {
	    this.$events.$$wait$$ = true
	}

	function run() {
	    var host = this.$events
	    delete host.$$wait$$
	    if (host.$$dirty$$) {
	        delete host.$$dirty$$
	        avalon.rerenderStart = new Date
	        var id = this.$id
	        var dotIndex = id.indexOf('.')
	        if (dotIndex > 0) {
	            avalon.batch(id.slice(0, dotIndex))
	        } else {
	            avalon.batch(id)
	        }
	    }
	}

	share.$$midway.initViewModel = initViewModel

	share.$$midway.hideProperty = hideProperty

	var mixin = {
	    toJson: toJson,
	    initViewModel: initViewModel,
	    modelAccessor: modelAccessor
	}
	for (var i in share) {
	    mixin[i] = share[i]
	}

	module.exports = mixin


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	
	var $$midway = {}
	var $$skipArray = __webpack_require__(70)
	var dispatch = __webpack_require__(85)
	var $emit = dispatch.$emit
	var $watch = dispatch.$watch
	/*
	 * initEvents
	 * isSkip
	 * modelAdaptor
	 * makeAccessor
	 */

	function initEvents($vmodel, heirloom) {
	    heirloom.__vmodel__ = $vmodel
	    var hide = $$midway.hideProperty

	    hide($vmodel, '$events', heirloom)
	    hide($vmodel, '$watch', function () {
	        if (arguments.length === 2) {
	            return $watch.apply($vmodel, arguments)
	        } else {
	            throw '$watch方法参数不对'
	        }
	    })
	    hide($vmodel, '$fire', function (expr, a, b) {
	        var list = $vmodel.$events[expr]
	        $emit(list, $vmodel, expr, a, b)
	    })
	}

	var rskip = /function|window|date|regexp|element/i

	function isSkip(key, value, skipArray) {
	    // 判定此属性能否转换访问器
	    return key.charAt(0) === '$' ||
	            skipArray[key] ||
	            (rskip.test(avalon.type(value))) ||
	            (value && value.nodeName && value.nodeType > 0)
	}

	function modelAdaptor(definition, old, heirloom, options) {
	    //如果数组转换为监控数组
	    if (Array.isArray(definition)) {
	        return $$midway.arrayFactory(definition, old, heirloom, options)
	    } else if (Object(definition) === definition && typeof definition !== 'function') {
	        //如果此属性原来就是一个VM,拆分里面的访问器属性
	        if (old && old.$id) {
	            ++avalon.suspendUpdate
	            //1.5带来的优化方案
	            if (old.$track !== Object.keys(definition).sort().join(';;')) {
	                var vm = $$midway.slaveFactory(old, definition, heirloom, options)
	            } else {
	                vm = old
	            }
	            for (var i in definition) {
	                if ($$skipArray[i])
	                    continue
	                vm[i] = definition[i]
	            }
	            --avalon.suspendUpdate
	            return vm
	        } else {
	            vm = $$midway.masterFactory(definition, heirloom, options)
	            return vm
	        }
	    } else {
	        return definition
	    }
	}
	$$midway.modelAdaptor = modelAdaptor


	function makeAccessor(sid, spath, heirloom) {
	    var old = NaN
	    function get() {
	        return old
	    }
	    get.heirloom = heirloom
	    return {
	        get: get,
	        set: function (val) {
	            if (old === val) {
	                return
	            }
	            var vm = heirloom.__vmodel__
	            if (val && typeof val === 'object') {
	                val = $$midway.modelAdaptor(val, old, heirloom, {
	                    pathname: spath,
	                    id: sid
	                })
	            }
	            var older = old
	            old = val
	            if (this.$hashcode && vm ) {
	                vm.$events.$$dirty$$ = true
	                if(vm.$events.$$wait$$)
	                    return
	                //★★确保切换到新的events中(这个events可能是来自oldProxy)               
	                if (heirloom !== vm.$events) {
	                    get.heirloom = vm.$events
	                }
	                //如果这个属性是组件配置对象中的属性,那么它需要触发组件的回调
	                emitWidget(get.$decompose, spath, val, older)
	                //触发普通属性的回调
	                if (spath.indexOf('*') === -1) {
	                    $emit(get.heirloom[spath], vm, spath, val, older)
	                }
	                //如果这个属性是数组元素上的属性
	                emitArray(sid, vm, spath, val, older)
	                //如果这个属性存在通配符
	                emitWildcard(get.heirloom, vm, spath, val, older)
	                vm.$events.$$dirty$$ = false
	                batchUpdateView(vm.$id)
	            }
	        },
	        enumerable: true,
	        configurable: true
	    }
	}

	function batchUpdateView(id) {
	    avalon.rerenderStart = new Date
	    var dotIndex = id.indexOf('.')
	    if (dotIndex > 0) {
	        avalon.batch(id.slice(0, dotIndex))
	    } else {
	        avalon.batch(id)
	    }
	}

	var rtopsub = /([^.]+)\.(.+)/
	function emitArray(sid, vm, spath, val, older) {
	    if (sid.indexOf('.*.') > 0) {
	        var arr = sid.match(rtopsub)
	        var top = avalon.vmodels[ arr[1] ]
	        if (top) {
	            var path = arr[2]
	            $emit(top.$events[ path ], vm, spath, val, older)
	        }
	    }
	}

	function emitWidget(whole, spath, val, older) {
	    if (whole && whole[spath]) {
	        var wvm = whole[spath]
	        if (!wvm.$hashcode) {
	            delete whole[spath]
	        } else {
	            var wpath = spath.replace(/^[^.]+\./, '')
	            if (wpath !== spath) {
	                $emit(wvm.$events[wpath], wvm, wpath, val, older)
	            }
	        }
	    }
	}

	function emitWildcard(obj, vm, spath, val, older) {
	    if (obj.__fuzzy__) {
	        obj.__fuzzy__.replace(avalon.rword, function (expr) {
	            var list = obj[expr]
	            var reg = list.reg
	            if (reg && reg.test(spath)) {
	                $emit(list, vm, spath, val, older)
	            }
	            return expr
	        })
	    }
	}


	function define(definition) {
	    var $id = definition.$id
	    if (!$id && avalon.config.debug) {
	        avalon.warn('vm.$id must be specified')
	    }
	    if (avalon.vmodels[$id]) {
	        throw Error('error:[' + $id + '] had defined!')
	    }
	    var vm = $$midway.masterFactory(definition, {}, {
	        pathname: '',
	        id: $id,
	        master: true
	    })

	    return avalon.vmodels[$id] = vm

	}

	function arrayFactory(array, old, heirloom, options) {
	    if (old && old.splice) {
	        var args = [0, old.length].concat(array)
	        ++avalon.suspendUpdate
	        old.splice.apply(old, args)
	        --avalon.suspendUpdate
	        return old
	    } else {
	        for (var i in __array__) {
	            array[i] = __array__[i]
	        }

	        array.notify = function (a, b, c, d) {
	            var vm = heirloom.__vmodel__
	            if (vm) {
	                var path = a === null || a === void 0 ?
	                        options.pathname :
	                        options.pathname + '.' + a
	                vm.$fire(path, b, c)
	                if (!d && !heirloom.$$wait$$ && !avalon.suspendUpdate ) {
	                    batchUpdateView(vm.$id)
	                }
	            }
	        }

	        var hashcode = avalon.makeHashCode('$')
	        options.array = true
	        options.hashcode = hashcode
	        options.id = options.id || hashcode
	        $$midway.initViewModel(array, heirloom, {}, {}, options)

	        for (var j = 0, n = array.length; j < n; j++) {
	            array[j] = modelAdaptor(array[j], 0, {}, {
	                id: array.$id + '.*',
	                master: true
	            })
	        }
	        return array
	    }
	}
	$$midway.arrayFactory = arrayFactory

	var __array__ = {
	    set: function (index, val) {
	        if (((index >>> 0) === index) && this[index] !== val) {
	            if (index > this.length) {
	                throw Error(index + 'set方法的第一个参数不能大于原数组长度')
	            }
	            this.splice(index, 1, val)
	        }
	    },
	    contains: function (el) { //判定是否包含
	        return this.indexOf(el) !== -1
	    },
	    ensure: function (el) {
	        if (!this.contains(el)) { //只有不存在才push
	            this.push(el)
	        }
	        return this
	    },
	    pushArray: function (arr) {
	        return this.push.apply(this, arr)
	    },
	    remove: function (el) { //移除第一个等于给定值的元素
	        return this.removeAt(this.indexOf(el))
	    },
	    removeAt: function (index) { //移除指定索引上的元素
	        if ((index >>> 0) === index) {
	            return this.splice(index, 1)
	        }
	        return []
	    },
	    clear: function () {
	        this.removeAll()
	        return this
	    }
	}
	avalon.define = define

	module.exports = {
	    $$midway: $$midway,
	    $$skipArray: $$skipArray,
	    isSkip: isSkip,
	    __array__: __array__,
	    initEvents: initEvents,
	    makeAccessor: makeAccessor,
	    modelAdaptor: modelAdaptor
	}

/***/ },
/* 85 */
/***/ function(module, exports) {

	
	/**
	 * ------------------------------------------------------------
	 * 属性监听系统 
	 * ------------------------------------------------------------
	 */

	function adjustVm(vm, expr) {
	    var toppath = expr.split(".")[0], other
	    try {
	        if (vm.hasOwnProperty(toppath)) {
	            if (vm.$accessors) {
	                other = vm.$accessors[toppath].get.heirloom.__vmodel__
	            } else {
	                other = Object.getOwnPropertyDescriptor(vm, toppath).get.heirloom.__vmodel__
	            }

	        }
	    } catch (e) {
	    }
	    return other || vm
	}

	function toRegExp(expr) {
	    var arr = expr.split('.')
	    return new RegExp("^" + arr.map(function (el) {
	        return el === '*' ? '(?:[^.]+)' : el
	    }).join('\\.') + '$', 'i')
	}
	function addFuzzy(add, obj, expr) {
	    if (add) {
	        if (obj.__fuzzy__) {
	            if (obj.__fuzzy__.indexOf(',' + expr) === -1) {
	                obj.__fuzzy__ += ',' + expr
	            }
	        } else {
	            obj.__fuzzy__ = expr
	        }
	    }
	}

	function $watch(expr, callback) {
	    var fuzzy = expr.indexOf('.*') > 0 || expr === '*'
	    var vm = fuzzy ? this : $watch.adjust(this, expr)
	    var hive = vm.$events
	    var list = hive[expr] || (hive[expr] = [])
	    if (fuzzy) {
	        list.reg = list.reg || toRegExp(expr)
	    }
	    addFuzzy(fuzzy, hive, expr)
	    if (vm !== this) {
	        addFuzzy(fuzzy, this.$events, expr)
	        this.$events[expr] = list
	    }

	    avalon.Array.ensure(list, callback)

	    return function () {
	        avalon.Array.remove(list, callback)
	    }
	}

	$watch.adjust = adjustVm
	/**
	 * $fire 方法的内部实现
	 * 
	 * @param {Array} list 订阅者数组
	 * @param {Component} vm
	 * @param {String} path 监听属性名或路径
	 * @param {Any} a 当前值 
	 * @param {Any} b 过去值
	 * @param {Number} i 如果抛错,让下一个继续执行
	 * @returns {undefined}
	 */
	function $emit(list, vm, path, a, b, i) {
	    if (list && list.length) {
	        try {
	            for (i = i || list.length - 1; i >= 0; i--) {
	                var callback = list[i]
	                callback.call(vm, a, b, path)
	            }
	        } catch (e) {
	            if (i - 1 > 0)
	                $emit(list, vm, path, a, b, i - 1)
	            avalon.log(e, path)
	        }

	    }
	}


	module.exports = {
	    $emit: $emit,
	    $watch: $watch,
	    adjustVm: adjustVm
	}


/***/ },
/* 86 */
/***/ function(module, exports) {

	//如果浏览器不支持ecma262v5的Object.defineProperties或者存在BUG，比如IE8
	//标准浏览器使用__defineGetter__, __defineSetter__实现
	var flag = true
	try {
	    Object.defineProperty({}, '_', {
	        value: 'x'
	    })
	} catch (e) {
	    flag = false
	}

	module.exports = flag

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	
	var canHideProperty = __webpack_require__(86)
	var $$skipArray = __webpack_require__(70)


	var defineProperties = Object.defineProperties
	var defineProperty

	var expose = new Date() - 0

	if (!canHideProperty) {
	    if ('__defineGetter__' in avalon) {
	        defineProperty = function (obj, prop, desc) {
	            if ('value' in desc) {
	                obj[prop] = desc.value
	            }
	            if ('get' in desc) {
	                obj.__defineGetter__(prop, desc.get)
	            }
	            if ('set' in desc) {
	                obj.__defineSetter__(prop, desc.set)
	            }
	            return obj
	        }
	        defineProperties = function (obj, descs) {
	            for (var prop in descs) {
	                if (descs.hasOwnProperty(prop)) {
	                    defineProperty(obj, prop, descs[prop])
	                }
	            }
	            return obj
	        }
	    }
	    if (avalon.msie) {
	        var VBClassPool = {}
	        window.execScript([// jshint ignore:line
	            'Function parseVB(code)',
	            '\tExecuteGlobal(code)',
	            'End Function' //转换一段文本为VB代码
	        ].join('\n'), 'VBScript');
	        
	        function VBMediator(instance, accessors, name, value) {// jshint ignore:line
	            var accessor = accessors[name]
	            if (arguments.length === 4) {
	                accessor.set.call(instance, value)
	            } else {
	                return accessor.get.call(instance)
	            }
	        }
	        defineProperties = function (name, accessors, properties) {
	            // jshint ignore:line
	            var buffer = []
	            buffer.push(
	                    '\r\n\tPrivate [__data__], [__proxy__]',
	                    '\tPublic Default Function [__const__](d' + expose + ', p' + expose + ')',
	                    '\t\tSet [__data__] = d' + expose + ': set [__proxy__] = p' + expose,
	                    '\t\tSet [__const__] = Me', //链式调用
	                    '\tEnd Function')
	            //添加普通属性,因为VBScript对象不能像JS那样随意增删属性，必须在这里预先定义好
	            var uniq = {
	               __proxy__: true,
	               __data__: true,
	               __const__: true
	            }

	            //添加访问器属性 
	            for (name in accessors) {
	                uniq[name] = true
	                buffer.push(
	                        //由于不知对方会传入什么,因此set, let都用上
	                        '\tPublic Property Let [' + name + '](val' + expose + ')', //setter
	                        '\t\tCall [__proxy__](Me,[__data__], "' + name + '", val' + expose + ')',
	                        '\tEnd Property',
	                        '\tPublic Property Set [' + name + '](val' + expose + ')', //setter
	                        '\t\tCall [__proxy__](Me,[__data__], "' + name + '", val' + expose + ')',
	                        '\tEnd Property',
	                        '\tPublic Property Get [' + name + ']', //getter
	                        '\tOn Error Resume Next', //必须优先使用set语句,否则它会误将数组当字符串返回
	                        '\t\tSet[' + name + '] = [__proxy__](Me,[__data__],"' + name + '")',
	                        '\tIf Err.Number <> 0 Then',
	                        '\t\t[' + name + '] = [__proxy__](Me,[__data__],"' + name + '")',
	                        '\tEnd If',
	                        '\tOn Error Goto 0',
	                        '\tEnd Property')

	            }
	            for (name in properties) {
	                if (uniq[name] !== true) {
	                    uniq[name] = true
	                    buffer.push('\tPublic [' + name + ']')
	                }
	            }
	            for (name in $$skipArray) {
	                if (uniq[name] !== true) {
	                    uniq[name] = true
	                    buffer.push('\tPublic [' + name + ']')
	                }
	            }
	            buffer.push('\tPublic [' + 'hasOwnProperty' + ']')
	            buffer.push('End Class')
	            var body = buffer.join('\r\n')
	            var className = VBClassPool[body]
	            if (!className) {
	                className = avalon.makeHashCode('VBClass')
	                
	                window.parseVB('Class ' + className + body)
	                window.parseVB([
	                    'Function ' + className + 'Factory(a, b)', //创建实例并传入两个关键的参数
	                    '\tDim o',
	                    '\tSet o = (New ' + className + ')(a, b)',
	                    '\tSet ' + className + 'Factory = o',
	                    'End Function'
	                ].join('\r\n'))
	                VBClassPool[body] = className
	            }
	            var ret = window[className + 'Factory'](accessors, VBMediator) //得到其产品
	            return ret //得到其产品
	        }
	    }
	}

	module.exports = defineProperties


/***/ },
/* 88 */
/***/ function(module, exports) {

	//define(["avalon"], function (avalon) {
	//chrome36的原生Promise还多了一个defer()静态方法，允许不通过传参就能生成Promise实例，
	//另还多了一个chain(onSuccess, onFail)原型方法，意义不明
	//目前，firefox24, opera19也支持原生Promise(chrome32就支持了，但需要打开开关，自36起直接可用)
	//本模块提供的Promise完整实现ECMA262v6 的Promise规范
	//2015.3.12 支持async属性
	    function ok(val) {
	        return val
	    }
	    function ng(e) {
	        throw e
	    }

	    function done(onSuccess) {//添加成功回调
	        return this.then(onSuccess, ng)
	    }
	    function fail(onFail) {//添加出错回调
	        return this.then(ok, onFail)
	    }
	    function defer() {
	        var ret = {};
	        ret.promise = new this(function (resolve, reject) {
	            ret.resolve = resolve
	            ret.reject = reject
	        });
	        return ret
	    }
	    var msPromise = function (executor) {
	        this._callbacks = []
	        var me = this
	        if (typeof this !== "object")
	            throw new TypeError("Promises must be constructed via new")
	        if (typeof executor !== "function")
	            throw new TypeError("not a function")

	        executor(function (value) {
	            _resolve(me, value)
	        }, function (reason) {
	            _reject(me, reason)
	        })
	    }
	    function fireCallbacks(promise, fn) {
	        if (typeof promise.async === "boolean") {
	            var isAsync = promise.async
	        } else {
	            isAsync = promise.async = true
	        }
	        if (isAsync) {
	            window.setTimeout(fn, 0)
	        } else {
	            fn()
	        }
	    }
	//返回一个已经处于`resolved`状态的Promise对象
	    msPromise.resolve = function (value) {
	        return new msPromise(function (resolve) {
	            resolve(value)
	        })
	    }
	//返回一个已经处于`rejected`状态的Promise对象
	    msPromise.reject = function (reason) {
	        return new msPromise(function (resolve, reject) {
	            reject(reason)
	        })
	    }

	    msPromise.prototype = {
	//一个Promise对象一共有3个状态：
	//- `pending`：还处在等待状态，并没有明确最终结果
	//- `resolved`：任务已经完成，处在成功状态
	//- `rejected`：任务已经完成，处在失败状态
	        constructor: msPromise,
	        _state: "pending",
	        _fired: false, //判定是否已经被触发
	        _fire: function (onSuccess, onFail) {
	            if (this._state === "rejected") {
	                if (typeof onFail === "function") {
	                    onFail(this._value)
	                } else {
	                    throw this._value
	                }
	            } else {
	                if (typeof onSuccess === "function") {
	                    onSuccess(this._value)
	                }
	            }
	        },
	        _then: function (onSuccess, onFail) {
	            if (this._fired) {//在已有Promise上添加回调
	                var me = this
	                fireCallbacks(me, function () {
	                    me._fire(onSuccess, onFail)
	                });
	            } else {
	                this._callbacks.push({onSuccess: onSuccess, onFail: onFail})
	            }
	        },
	        then: function (onSuccess, onFail) {
	            onSuccess = typeof onSuccess === "function" ? onSuccess : ok
	            onFail = typeof onFail === "function" ? onFail : ng
	            var me = this//在新的Promise上添加回调
	            var nextPromise = new msPromise(function (resolve, reject) {
	                me._then(function (value) {
	                    try {
	                        value = onSuccess(value)
	                    } catch (e) {
	                        // https://promisesaplus.com/#point-55
	                        reject(e)
	                        return
	                    }
	                    resolve(value)
	                }, function (value) {
	                    try {
	                        value = onFail(value)
	                    } catch (e) {
	                        reject(e)
	                        return
	                    }
	                    resolve(value)
	                })
	            })
	            for (var i in me) {
	                if (!personal[i]) {
	                    nextPromise[i] = me[i]
	                }
	            }
	            return nextPromise
	        },
	        "done": done,
	        "catch": fail,
	        "fail": fail
	    }
	    var personal = {
	        _state: 1,
	        _fired: 1,
	        _value: 1,
	        _callbacks: 1
	    }
	    function _resolve(promise, value) {//触发成功回调
	        if (promise._state !== "pending")
	            return;
	        if (value && typeof value.then === "function") {
	//thenable对象使用then，Promise实例使用_then
	            var method = value instanceof msPromise ? "_then" : "then"
	            value[method](function (val) {
	                _transmit(promise, val, true)
	            }, function (reason) {
	                _transmit(promise, reason, false)
	            });
	        } else {
	            _transmit(promise, value, true);
	        }
	    }
	    function _reject(promise, value) {//触发失败回调
	        if (promise._state !== "pending")
	            return
	        _transmit(promise, value, false)
	    }
	//改变Promise的_fired值，并保持用户传参，触发所有回调
	    function _transmit(promise, value, isResolved) {
	        promise._fired = true;
	        promise._value = value;
	        promise._state = isResolved ? "fulfilled" : "rejected"
	        fireCallbacks(promise, function () {
	            promise._callbacks.forEach(function (data) {
	                promise._fire(data.onSuccess, data.onFail);
	            })
	        })
	    }
	    function _some(any, iterable) {
	        iterable = Array.isArray(iterable) ? iterable : []
	        var n = 0, result = [], end
	        return new msPromise(function (resolve, reject) {
	            // 空数组直接resolve
	            if (!iterable.length)
	                resolve()
	            function loop(a, index) {
	                a.then(function (ret) {
	                    if (!end) {
	                        result[index] = ret//保证回调的顺序
	                        n++
	                        if (any || n >= iterable.length) {
	                            resolve(any ? ret : result)
	                            end = true
	                        }
	                    }
	                }, function (e) {
	                    end = true
	                    reject(e)
	                })
	            }
	            for (var i = 0, l = iterable.length; i < l; i++) {
	                loop(iterable[i], i)
	            }
	        })
	    }

	    msPromise.all = function (iterable) {
	        return _some(false, iterable)
	    }
	    msPromise.race = function (iterable) {
	        return _some(true, iterable)
	    }
	    msPromise.defer = defer



	    avalon.Promise = msPromise
	    var nativePromise = window.Promise
	    if (/native code/.test(nativePromise)) {
	        nativePromise.prototype.done = done
	        nativePromise.prototype.fail = fail
	        if (!nativePromise.defer) { //chrome实现的私有方法
	            nativePromise.defer = defer
	        }
	    }
	    //return window.Promise = nativePromise || msPromise

	//})
	//https://github.com/ecomfe/er/blob/master/src/Deferred.js
	//http://jser.info/post/77696682011/es6-promises


/***/ },
/* 89 */
/***/ function(module, exports) {

	/*
	 * 
	 * version 0.9
	 * built in 2015.11.19
	 */

	/*define(["avalon"], function (avalon) {*/

	    var History = avalon.History = function () {
	        this.location = window.location
	        this.history = window.history
	    }

	    History.started = false
	//取得当前IE的真实运行环境
	    History.IEVersion = (function () {
	        var mode = document.documentMode
	        return mode ? mode : window.XMLHttpRequest ? 7 : 6
	    })()

	    History.defaults = {
	        root: "/",
	        html5Mode: false,
	        hashPrefix: "!",
	        iframeID: null, //IE6-7，如果有在页面写死了一个iframe，这样似乎刷新的时候不会丢掉之前的历史
	        interval: 50, //IE6-7,使用轮询，这是其时间时隔
	        fireAnchor: true, //决定是否将滚动条定位于与hash同ID的元素上
	        routeElementJudger: avalon.noop // 判断a元素是否是触发router切换的链接
	    }
	    var oldIE = window.VBArray && History.IEVersion <= 7
	    var supportPushState = !!(window.history.pushState)
	    var supportHashChange = !!("onhashchange" in window && (!window.VBArray || !oldIE))


	    History.started = false;

	    History.prototype = {
	        constructor: History,
	        atRoot: function () {
	            //判定当前地址栏不存在hash与search
	            var path = this.location.pathname.replace(/[^\/]$/, '$&/')
	            return path === this.root && !this.getSearch()
	        },
	        // 判定pathname是否匹配我们的root参数
	        matchRoot: function () {
	            var path = this.decodeFragment(this.location.pathname)
	            var root = path.slice(0, this.root.length - 1) + '/'
	            return root === this.root;
	        },
	        // 变经过编辑的东西变回我们可识别的文字
	        decodeFragment: function (fragment) {
	            return decodeURI(fragment.replace(/%25/g, '%2525'))
	        },
	        // 取得查询字符串, 注意IE6下search可能包含hash
	        getSearch: function () {
	            var match = this.location.href.replace(/#.*/, '').match(/\?.+/)
	            return match ? match[0] : '';
	        },
	        // 从location.href中抽取hash,不能直接使用location.hash,因为firefox会对它进行decoded
	        getHash: function (window) {
	            // IE6直接用location.hash取hash，可能会取少一部分内容
	            // 比如 http://www.cnblogs.com/rubylouvre#stream/xxxxx?lang=zh_c
	            // ie6 => location.hash = #stream/xxxxx
	            // 其他浏览器 => location.hash = #stream/xxxxx?lang=zh_c
	            // firefox 会自作多情对hash进行decodeURIComponent
	            // 又比如 http://www.cnblogs.com/rubylouvre/#!/home/q={%22thedate%22:%2220121010~20121010%22}
	            // firefox 15 => #!/home/q={"thedate":"20121010~20121010"}
	            // 其他浏览器 => #!/home/q={%22thedate%22:%2220121010~20121010%22}
	            var path = (window || this).location.href
	            return this._getHash(path.slice(path.indexOf("#")))
	        },
	        _getHash: function (path) {
	            if (path.indexOf("#/") === 0) {
	                return decodeURI(path.slice(2))
	            }
	            if (path.indexOf("#!/") === 0) {
	                return decodeURI(path.slice(3))
	            }
	            return ""
	        },
	        // Get the pathname and search params, without the root.
	        getPath: function () {
	            var path = this.decodeFragment(
	                    this.location.pathname + this.getSearch()
	                    ).slice(this.root.length - 1);
	            return path.charAt(0) === '/' ? path.slice(1) : path
	        },
	        // 根据浏览器对路由器事件的支持情况截取hash或path
	        getFragment: function (fragment) {
	            if (fragment == null) {
	                if (this.monitorMode === "popstate") {
	                    fragment = this.getPath()
	                } else {
	                    fragment = this.getHash()
	                }
	            }
	            return  fragment.replace(/^[#\/]|\s+$/g, "")
	        },
	        /*
	         * @interface avalon.history.start 开始监听历史变化
	         * @param options 配置参数
	         * @param options.hashPrefix hash以什么字符串开头，默认是 "!"，对应实际效果就是"#!"
	         * @param options.routeElementJudger 判断a元素是否是触发router切换的链接的函数，return true则触发切换，默认为avalon.noop，history内部有一个判定逻辑，是先判定a元素的href属性是否以hashPrefix开头，如果是则当做router切换元素，因此综合判定规则是 href.indexOf(hashPrefix) == 0 || routeElementJudger(ele, ele.href)，如果routeElementJudger返回true则跳转至href，如果返回的是字符串，则跳转至返回的字符串，如果返回false则返回浏览器默认行为
	         * @param options.html5Mode 是否采用html5模式，即不使用hash来记录历史，默认false
	         * @param options.fireAnchor 决定是否将滚动条定位于与hash同ID的元素上，默认为true
	         * @param options.basepath 根目录，默认为"/"
	         * @param options.silent 不触发回调，默认false
	         */
	        start: function (options) {
	            if (History.started)
	                throw new Error('avalon.history has already been started')
	            options = options || {}
	            if (options.basepath) {
	                options.root = options.basepath
	                delete options.basepath
	            }


	            History.started = true
	            this.options = avalon.mix({root: '/'}, History.defaults, options)

	            //IE6不支持maxHeight, IE7支持XMLHttpRequest, IE8支持window.Element，querySelector, 
	            //IE9支持window.Node, window.HTMLElement, IE10不支持条件注释
	            //确保html5Mode属性存在,并且是一个布尔
	            this.html5Mode = !!this.options.html5Mode
	            //监听模式
	            this.monitorMode = this.html5Mode ? "popstate" : "hashchange"
	            if (!supportPushState) {
	                if (this.html5Mode) {
	                    avalon.log("如果浏览器不支持HTML5 pushState，强制使用hash hack!")
	                    this.html5Mode = false
	                }
	                this.monitorMode = "hashchange"
	            }
	            if (!supportHashChange) {
	                this.monitorMode = "iframepoll"
	            }


	            
	            this.prefix = "#" + this.options.hashPrefix + "/"
	            // 将前后出现的//变成/
	            this.root = ('/' + this.options.root + '/').replace(/^\/+|\/+$/g, '/')
	            this.fragment = this.getFragment()
	            
	            var hasHash = this.atRoot()
	            if (this.monitorMode === "popstate" && supportPushState && hasHash) {
	                this.navigate(this.getHash(), {replace: true})
	            }


	            var that = this
	            function checkUrlChange() {
	                if (!History.started) {
	                    return false
	                }
	                var current = that.getFragment()// 取得主窗口的hash
	                // 如果用户按下后退按钮,那么iframe中的hash会发生改变,那么我们将使用
	                // 它来更新主窗口的hash
	                if (current === that.fragment && that.iframe) {
	                    current = that.getHash(that.iframe.contentWindow)// 取得iframe的hash
	                }
	                if (current === that.fragment) {
	                    return false
	                }
	                if (that.iframe) {
	                    that.navigate(current)
	                }
	                that.fireUrlChange()
	            }

	            // 支持popstate 就监听popstate
	            // 支持hashchange 就监听hashchange(IE8,IE9,FF3)
	            // 否则的话只能每隔一段时间进行检测了(IE6, IE7)
	            switch (this.monitorMode) {
	                case "popstate" :
	                    this._checkUrlChange = avalon.bind(window, 'popstate', checkUrlChange)
	                    break
	                case "hashchange":
	                    this._checkUrlChange = avalon.bind(window, 'hashchange', checkUrlChange)
	                    break
	                case "iframepoll":
	                    this._intervalID = setInterval(checkUrlChange, this.interval)
	                    avalon.ready(function () {
	                        var iframe = that.iframe = document.createElement('iframe')
	                        iframe.src = 'javascript:0'
	                        iframe.style.display = 'none'
	                        iframe.tabIndex = -1
	                        var body = document.body
	                        var iWindow = body.insertBefore(iframe, body.firstChild).contentWindow
	                        iWindow.document.open()
	                        iWindow.document.close()
	                        iWindow.location.hash = that.prefix + that.fragment
	                    })
	                    break
	            }
	            if (!this.options.silent) {
	                return this.fireUrlChange()
	            }
	        },
	        // 中断URL的监听
	        stop: function () {
	            switch (this.monitorMode) {
	                case "popstate" :
	                    avalon.unbind(window, 'popstate', this._checkUrlChange)
	                    break
	                case "hashchange":
	                    avalon.unbind(window, 'hashchange', this._checkUrlChange)
	                    break
	                case "iframepoll":
	                    if (this.iframe) {
	                        document.body.removeChild(this.iframe)
	                        this.iframe = null
	                    }
	                    clearInterval(this._intervalID)
	                    break
	            }
	            History.started = false
	        },
	        // 触发预先绑定的回调
	        fireUrlChange: function (fragment) {
	//            if (!this.matchRoot()) {
	//                return false
	//            }
	            fragment = this.fragment = this.getFragment(fragment)

	            if (avalon.router) {
	                avalon.router.setLastPath(fragment)//保存到本地储存或cookie
	                avalon.router.navigate(fragment)
	            }
	            if (this.options.fireAnchor) {
	                scrollToAnchorId(fragment.replace(/\?.*/g, ""))
	            }
	        },
	        // 用动触发回调并更新地址栏, options里面 replace, trigger

	        navigate: function (fragment, options) {
	            if (!History.started)
	                return false
	            if (!options || options === true) {
	                options = {trigger: options}
	            }
	            // Normalize the fragment.
	            fragment = this.getFragment(fragment || '')

	            // Don't include a trailing slash on the root.
	            var root = this.root;
	            if (fragment === '' || fragment.charAt(0) === '?') {
	                root = root.slice(0, -1) || '/';
	            }
	            var url = root + fragment

	            // Strip the hash and decode for matching.
	            fragment = this.decodeFragment(fragment.replace(/#.*$/, ''));
	            if (this.fragment === fragment)
	                return
	            this.fragment = fragment

	            if (this.monitorMode === "popstate") {
	                this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);
	            } else if (!this.options.html5Mode) {
	                this._updateHash(this.location, fragment, options.replace);
	                if (this.iframe && (fragment !== this.getHash(this.iframe.contentWindow))) {
	                    var iWindow = this.iframe.contentWindow
	                    // IE67需要通过iframe创建一个历史记录
	                    if (!options.replace) {
	                        iWindow.document.open();
	                        iWindow.document.close();
	                    }
	                    this._updateHash(iWindow.location, fragment, options.replace)
	                }
	            } else {
	                return this.location.assign(url)
	            }
	            if (options.trigger) {
	                return this.fireUrlChange(fragment)
	            }
	        },
	        // 更新hash或地址的某一部分
	        _updateHash: function (location, fragment, replace) {
	            if (replace) {
	                var href = location.href.replace(/(javascript:|#).*$/, '');
	                location.replace(href + this.prefix + fragment);
	            } else {
	                location.hash = this.prefix + fragment
	            }
	        }

	    }
	    avalon.history = new History

	//https://github.com/asual/jquery-address/blob/master/src/jquery.address.js

	//劫持页面上所有点击事件，如果事件源来自链接或其内部，
	//并且它不会跳出本页，并且以"#/"或"#!/"开头，那么触发updateLocation方法
	    avalon.bind(document, "click", function (event) {
	        var defaultPrevented = "defaultPrevented" in event ? event['defaultPrevented'] : event.returnValue === false

	        if (!History.started || defaultPrevented || event.ctrlKey
	                || event.metaKey || event.which === 2)
	            return
	        var target = event.target
	        while (target.nodeName !== "A") {
	            target = target.parentNode
	            if (!target || target.tagName === "BODY") {
	                return
	            }
	        }

	        if (targetIsThisWindow(target.target)) {
	            var href = target.getAttribute("href", 2) || target.getAttribute("xlink:href")

	            var prefix = avalon.history.prefix
	            if (href === null) { // href is null if the attribute is not present
	                return
	            }
	            var hash = href.replace(prefix, "").trim()
	            if (!(href.indexOf(prefix) === 0 && hash !== "")) {
	                var routeElementJudger = avalon.history.options.routeElementJudger
	                hash = routeElementJudger(target, href)
	                if (hash === true)
	                    hash = href
	            }
	            if (hash) {
	                event.preventDefault()
	                avalon.history.navigate(hash, true)
	            }
	        }
	    })

	//判定A标签的target属性是否指向自身
	//thanks https://github.com/quirkey/sammy/blob/master/lib/sammy.js#L219
	    function targetIsThisWindow(targetWindow) {
	        if (!targetWindow || targetWindow === window.name || targetWindow === '_self' || (targetWindow === 'top' && window == window.top)) {
	            return true
	        }
	        return false
	    }
	//得到页面第一个符合条件的A标签
	    function getFirstAnchor(list) {
	        for (var i = 0, el; el = list[i++]; ) {
	            if (el.nodeName === "A") {
	                return el
	            }
	        }
	    }

	    function scrollToAnchorId(hash, el) {
	        if ((el = document.getElementById(hash))) {
	            el.scrollIntoView()
	        } else if ((el = getFirstAnchor(document.getElementsByName(hash)))) {
	            el.scrollIntoView()
	        } else {
	            window.scrollTo(0, 0)
	        }
	    }
	/*    return avalon
	})*/


/***/ },
/* 90 */
/***/ function(module, exports) {

	//=========================================
	//  数据交互模块 by 司徒正美
	//  版本: 1.0.0
	//  最近更新: 2015/4/30
	//==========================================
	//define("mmRequest", ["./avalon", "./mmPromise"], function(avalon) {
	//var avalon=require('./avalon');

	    var global = window
	    var DOC = global.document
	    var encode = encodeURIComponent
	    var decode = decodeURIComponent

	    var rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
	    var rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg
	    var rnoContent = /^(?:GET|HEAD)$/
	    var rprotocol = /^\/\//
	    var rhash = /#.*$/
	    var rquery = /\?/
	    var rjsonp = /(=)\?(?=&|$)|\?\?/
	    var r20 = /%20/g
	    var radd = /\+/g
	    var r5b5d = /%5B(.*?)%5D$/;

	    var originAnchor = document.createElement("a")
	    originAnchor.href = location.href
	    //告诉WEB服务器自己接受什么介质类型，*/* 表示任何类型，type/* 表示该类型下的所有子类型，type/sub-type。
	    var accepts = {
	        xml: "application/xml, text/xml",
	        html: "text/html",
	        text: "text/plain",
	        json: "application/json, text/javascript",
	        script: "text/javascript, application/javascript",
	        "*": ["*/"] + ["*"] //避免被压缩掉
	    }

	    function IE() {
	        if (window.VBArray) {
	            var mode = document.documentMode
	            return mode ? mode : window.XMLHttpRequest ? 7 : 6
	        } else {
	            return 0
	        }
	    }
	    var useOnload = IE() === 0 || IE() > 8

	    function parseJS(code) {
	        var indirect = eval
	        code = code.trim()
	        if (code) {
	            if (code.indexOf("use strict") === 1) {
	                var script = document.createElement("script")
	                script.text = code;
	                head.appendChild(script).parentNode.removeChild(script)
	            } else {
	                indirect(code)
	            }
	        }
	    }

	    if (!String.prototype.startsWith) {
	        String.prototype.startsWith = function(searchString, position) {
	            position = position || 0;
	            return this.lastIndexOf(searchString, position) === position;
	        }
	    }

	    var head = DOC.getElementsByTagName("head")[0] //HEAD元素
	    var isLocal = false
	    try {
	        //在IE下如果重置了document.domain，直接访问window.location会抛错，但用document.URL就ok了
	        //http://www.cnblogs.com/WuQiang/archive/2012/09/21/2697474.html
	        isLocal = rlocalProtocol.test(location.protocol)
	    } catch (e) {
	    }

	    new function() {
	        //http://www.cnblogs.com/rubylouvre/archive/2010/04/20/1716486.html
	        var s = ["XMLHttpRequest",
	            "ActiveXObject('MSXML2.XMLHTTP.6.0')",
	            "ActiveXObject('MSXML2.XMLHTTP.3.0')",
	            "ActiveXObject('MSXML2.XMLHTTP')",
	            "ActiveXObject('Microsoft.XMLHTTP')"
	        ]
	        s[0] = IE() < 8 && IE() !== 0 && isLocal ? "!" : s[0] //IE下只能使用ActiveXObject
	        for (var i = 0, axo; axo = s[i++];) {
	            try {
	                if (eval("new " + axo)) {
	                    avalon.xhr = new Function("return new " + axo)
	                    break;
	                }
	            } catch (e) {
	            }
	        }}
	    var supportCors = "withCredentials" in avalon.xhr()




	    function parseXML(data, xml, tmp) {
	        try {
	            var mode = document.documentMode
	            if (window.DOMParser && (!mode || mode > 8)) { // Standard
	                tmp = new DOMParser()
	                xml = tmp.parseFromString(data, "text/xml")
	            } else { // IE
	                xml = new ActiveXObject("Microsoft.XMLDOM") //"Microsoft.XMLDOM"
	                xml.async = "false";
	                xml.loadXML(data)
	            }
	        } catch (e) {
	        xml = void  0
	        }
	        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
	            avalon.error("Invalid XML: " + data)
	        }
	        return xml
	    }

	    //ajaxExtend是一个非常重要的内部方法，负责将用法参数进行规整化
	    //1. data转换为字符串
	    //2. type转换为大写
	    //3. url正常化，加querystring, 加时间戮
	    //4. 判定有没有跨域
	    //5. 添加hasContent参数
	    var defaults = {
	        type: "GET",
	        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	        async: true,
	        jsonp: "callback"
	    }
	    function ajaxExtend(opts) {
	        opts = avalon.mix({}, defaults, opts)
	        opts.type = opts.type.toUpperCase()
	        var querystring = typeof opts.data === "string" ? opts.data : avalon.param(opts.data)
	        opts.querystring = querystring || ""
	        opts.url = opts.url.replace(rhash, "").replace(rprotocol, location.protocol + "//")

	        if (typeof opts.crossDomain !== "boolean") { //判定是否跨域
	            var urlAnchor = document.createElement("a");
	            // Support: IE6-11+
	            // IE throws exception if url is malformed, e.g. http://example.com:80x/
	            try {
	                urlAnchor.href = opts.url;
	                // in IE7-, get the absolute path
	                var absUrl = !"1"[0] ? urlAnchor.getAttribute("href", 4) : urlAnchor.href;
	                urlAnchor.href = absUrl
	                opts.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
	            } catch (e) {
	            opts.crossDomain = true;
	            }
	        }
	        opts.hasContent = !rnoContent.test(opts.type) //是否为post请求
	        if (!opts.hasContent) {
	            if (querystring) { //如果为GET请求,则参数依附于url上
	                opts.url += (rquery.test(opts.url) ? "&" : "?") + querystring;
	            }
	            if (opts.cache === false) { //添加时间截
	                opts.url += (rquery.test(opts.url) ? "&" : "?") + "_time=" + (new Date() - 0)
	            }
	        }
	        return opts;
	    }
	    /**
	     * 伪XMLHttpRequest类,用于屏蔽浏览器差异性
	     * var ajax = new(self.XMLHttpRequest||ActiveXObject)("Microsoft.XMLHTTP")
	     * ajax.onreadystatechange = function(){
	     *   if (ajax.readyState==4 && ajax.status==200){
	     *        alert(ajax.responseText)
	     *   }
	     * }
	     * ajax.open("POST", url, true) 
	     * ajax.send("key=val&key1=val2") 
	     */
	    var XHRMethods = {
	        setRequestHeader: function(name, value) {
	            this.requestHeaders[name] = value;
	            return this;
	        },
	        getAllResponseHeaders: function() {
	            return this.readyState === 4 ? this.responseHeadersString : null;
	        },
	        getResponseHeader: function(name, match) {
	            if (this.readyState === 4) {
	                while ((match = rheaders.exec(this.responseHeadersString))) {
	                    this.responseHeaders[match[1]] = match[2];
	                }
	                match = this.responseHeaders[name];
	            }
	            return match === undefined ? null : match;
	        },
	        overrideMimeType: function(type) {
	            this.mimeType = type;
	            return this;
	        },
	        // 中止请求
	        abort: function(statusText) {
	            statusText = statusText || "abort";
	            if (this.transport) {
	                this.respond(0, statusText)
	            }
	            return this;
	        },
	        /**
	         * 用于派发success,error,complete等回调
	         * http://www.cnblogs.com/rubylouvre/archive/2011/05/18/2049989.html
	         * @param {Number} status 状态码
	         * @param {String} statusText 对应的扼要描述
	         */
	        dispatch: function(status, nativeStatusText) {
	            var statusText = nativeStatusText
	            // 只能执行一次，防止重复执行
	            if (!this.transport) { //2:已执行回调
	                return
	            }
	            this.readyState = 4
	            var isSuccess = status >= 200 && status < 300 || status === 304
	            if (isSuccess) {
	                if (status === 204) {
	                    statusText = "nocontent"
	                } else if (status === 304) {
	                    statusText = "notmodified"
	                } else {
	                    //如果浏览器能直接返回转换好的数据就最好不过,否则需要手动转换
	                    if (typeof this.response === "undefined") {
	                        var dataType = this.options.dataType || this.options.mimeType
	                        if (!dataType && this.responseText || this.responseXML) { //如果没有指定dataType，则根据mimeType或Content-Type进行揣测
	                            dataType = this.getResponseHeader("Content-Type") || ""
	                            dataType = dataType.match(/json|xml|script|html/i) || ["json"]
	                            dataType = dataType[0].toLowerCase()
	                        }
	                        var responseText = this.responseText || '',
	                            responseXML = this.responseXML || ''
	                        try {
	                            this.response = avalon.ajaxConverters[dataType].call(this, responseText, responseXML)
	                        } catch (e) {
	                        isSuccess = false
	                        this.error = e
	                        statusText = "parsererror"
	                        }
	                    }
	                }
	            }
	            this.status = status;
	            this.statusText = statusText + ""
	            if (this.timeoutID) {
	                clearTimeout(this.timeoutID)
	                delete this.timeoutID
	            }
	            this._transport = this.transport

	            /**
	             * global event handler
	             */
	            var that = this

	            // 到这要么成功，调用success, 要么失败，调用 error, 最终都会调用 complete
	            if (isSuccess) {
	                this._resolve([this.response, statusText, this])
	                /**
	                 * global event handler
	                 */
	                window.setTimeout(function() {
	                    avalon.ajaxGlobalEvents.success(that, that.options, that.response)
	                }, 0)
	            } else {
	                this._reject([this, statusText, this.error])
	                /**
	                 * global event handler
	                 */
	                window.setTimeout(function() {
	                    avalon.ajaxGlobalEvents.error(that, that.options, statusText)
	                }, 0)
	            }
	            delete this.transport

	            /**
	             * global event handler
	             */
	            ajaxActive--

	            window.setTimeout(function() {
	                avalon.ajaxGlobalEvents.complete(that, that.options)
	            }, 0)

	            if (ajaxActive === 0) {
	                // 最后一个
	                window.setTimeout(function() {
	                    avalon.ajaxGlobalEvents.stop()
	                }, 0)
	            }

	        }
	    }
	    /**
	     * global event handler
	     */
	    // 记录当前活跃的 ajax 数
	    var ajaxActive = 0

	    //ajax主函数
	    avalon.ajax = function(opts, promise) {
	        if (!opts || !opts.url) {
	            avalon.error("参数必须为Object并且拥有url属性")
	        }
	        opts = ajaxExtend(opts) //处理用户参数，比如生成querystring, type大写化
	        //创建一个伪XMLHttpRequest,能处理complete,success,error等多投事件
	        var XHRProperties = {
	            responseHeadersString: "",
	            responseHeaders: {},
	            requestHeaders: {},
	            querystring: opts.querystring,
	            readyState: 0,
	            uniqueID: ("" + Math.random()).replace(/0\./, ""),
	            status: 0
	        }
	        var _reject, _resolve
	        var promise = new avalon.Promise(function(resolve, reject) {
	            _resolve = resolve
	            _reject = reject
	        })

	        promise.options = opts
	        promise._reject = _reject
	        promise._resolve = _resolve

	        var doneList = [],
	            failList = []

	        Array("done", "fail", "always").forEach(function(method) {
	            promise[method] = function(fn) {
	                if (typeof fn === "function") {
	                    if (method !== "fail")
	                        doneList.push(fn)
	                    if (method !== "done")
	                        failList.push(fn)
	                }
	                return this
	            }
	        })

	        var isSync = opts.async === false
	        if (isSync) {
	            avalon.log("warnning:与jquery1.8一样,async:false这配置已经被废弃")
	            promise.async = false
	        }


	        avalon.mix(promise, XHRProperties, XHRMethods)

	        promise.then(function(value) {
	            value = Array.isArray(value) ? value : value === void 0 ? [] : [value]
	            for (var i = 0, fn; fn = doneList[i++];) {
	                fn.apply(promise, value)
	            }
	            return value
	        }, function(value) {
	            value = Array.isArray(value) ? value : value === void 0 ? [] : [value]
	            for (var i = 0, fn; fn = failList[i++];) {
	                fn.apply(promise, value)
	            }
	            return value
	        })


	        promise.done(opts.success).fail(opts.error).always(opts.complete)

	        var dataType = opts.dataType //目标返回数据类型
	        var transports = avalon.ajaxTransports

	        if ((opts.crossDomain && !supportCors || rjsonp.test(opts.url)) && dataType === "json" && opts.type === "GET") {
	            dataType = opts.dataType = "jsonp"
	        }
	        var name = opts.form ? "upload" : dataType
	        var transport = transports[name] || transports.xhr
	        avalon.mix(promise, transport) //取得传送器的request, respond, preproccess
	        if (promise.preproccess) { //这用于jsonp upload传送器
	            dataType = promise.preproccess() || dataType
	        }
	        //设置首部 1、Content-Type首部
	        if (opts.contentType) {
	            promise.setRequestHeader("Content-Type", opts.contentType)
	        }
	        //2.处理Accept首部
	        promise.setRequestHeader("Accept", accepts[dataType] ? accepts[dataType] + ", */*; q=0.01" : accepts["*"])
	        for (var i in opts.headers) { //3. 处理headers里面的首部
	            promise.setRequestHeader(i, opts.headers[i])
	        }
	        // 4.处理超时
	        if (opts.async && opts.timeout > 0) {
	            promise.timeoutID = setTimeout(function() {
	                promise.abort("timeout")
	                promise.dispatch(0, "timeout")
	            }, opts.timeout)
	        }

	        /**
	         * global event handler
	         */
	        if (ajaxActive === 0) {
	            // 第一个
	            avalon.ajaxGlobalEvents.start()
	        }
	        avalon.ajaxGlobalEvents.send(promise, opts)
	        ajaxActive++



	        promise.request()
	        return promise
	    };
	    "get,post".replace(avalon.rword, function(method) {
	        avalon[method] = function(url, data, callback, type) {
	            if (typeof data === "function") {
	                type = type || callback
	                callback = data
	                data = void 0
	            }
	            return avalon.ajax({
	                type: method,
	                url: url,
	                data: data,
	                success: callback,
	                dataType: type
	            })
	        };
	    })
	    function ok(val) {
	        return val
	    }
	    function ng(e) {
	        throw e
	    }
	    avalon.getScript = function(url, callback) {
	        return avalon.get(url, null, callback, "script")
	    }
	    avalon.getJSON = function(url, data, callback) {
	        return avalon.get(url, data, callback, "json")
	    }
	    avalon.upload = function(url, form, data, callback, dataType) {
	        if (typeof data === "function") {
	            dataType = callback;
	            callback = data;
	            data = void 0;
	        }
	        return avalon.ajax({
	            url: url,
	            type: "post",
	            dataType: dataType,
	            form: form,
	            data: data,
	            success: callback
	        });
	    }


	    /**
	     * global event handler
	     */
	    avalon.ajaxGlobalEvents = {};

	    ["start", "stop", "complete", "error", "success", "send"].forEach(function(method) {
	        avalon.ajaxGlobalEvents[method] = avalon.noop
	    })

	    avalon.ajaxConverters = { //转换器，返回用户想要做的数据
	        text: function(text) {
	            // return text || "";
	            return text;
	        },
	        xml: function(text, xml) {
	            return xml !== void 0 ? xml : parseXML(text)
	        },
	        html: function(text) {
	            return avalon.parseHTML(text) //一个文档碎片,方便直接插入DOM树
	        },
	        json: function(text) {
	            if (!avalon.parseJSON) {
	                avalon.log("avalon.parseJSON不存在,请升级到最新版")
	            }
	            return avalon.parseJSON(text)
	        },
	        script: function(text) {
	            parseJS(text)
	            return text;
	        },
	        jsonp: function() {
	            var json, callbackName;
	            if (this.jsonpCallback.startsWith('avalon.')) {
	                callbackName = this.jsonpCallback.replace(/avalon\./, '')
	                json = avalon[callbackName]
	                delete avalon[callbackName]
	            } else {
	                json = window[this.jsonpCallback]
	            }
	            return json;
	        }
	    }

	    var rbracket = /\[\]$/
	    avalon.param = function(obj) {
	        var prefix,
	            s = [],
	            add = function(key, value) {
	                // If value is a function, invoke it and return its value
	                value = typeof value === "function" ? value() : (value == null ? "" : value);
	                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
	        }
	        // 处理数组与类数组的jquery对象
	        if (Array.isArray(obj)) {
	            // Serialize the form elements
	            avalon.each(obj, add)

	        } else {
	            for (prefix in obj) {
	                paramInner(prefix, obj[prefix], add);
	            }
	        }

	        // Return the resulting serialization
	        return s.join("&").replace(r20, "+");
	    }

	    function paramInner(prefix, obj, add) {
	        var name;
	        if (Array.isArray(obj)) {
	            // Serialize array item.
	            avalon.each(obj, function(i, v) {
	                if (rbracket.test(prefix)) {
	                    // Treat each array item as a scalar.
	                    add(prefix, v);
	                } else {
	                    // Item is non-scalar (array or object), encode its numeric index.
	                    paramInner(
	                        prefix + "[" + (typeof v === "object" ? i : "") + "]",
	                        v,
	                        add);
	                }
	            });
	        } else if (avalon.isPlainObject(obj)) {
	            // Serialize object item.
	            for (name in obj) {
	                paramInner(prefix + "[" + name + "]", obj[name], add);
	            }

	        } else {
	            // Serialize scalar item.
	            add(prefix, obj);
	        }
	    }
	    //将一个字符串转换为对象
	    function tryDecodeURIComponent(value) {
	        try {
	            return decodeURIComponent(value);
	        } catch (e) {
	        return value
	        }
	    }


	    //a%5B0%5D%5Bvalue%5D a%5B1%5D%5B%5D
	    function addSubObject(host, text, value) {
	        var match = text.match(r5b5d)
	        if (!match) {
	            return true
	        }

	        var steps = []
	        var first = true
	        var step, index, key
	        while (index = text.lastIndexOf("%5B")) {
	            if (index === -1) {
	                break
	            }
	            key = text.slice(index).slice(3, -3)
	            text = text.slice(0, index)
	            if (key === "") {
	                steps.unshift({
	                    action: "pushArrayElement"
	                })
	            } else if ((key >>> 0) + "" === key) {
	                steps.unshift({
	                    action: "setSubArray",
	                    value: key
	                })
	            } else {
	                if (first) {
	                    steps.unshift({
	                        action: "setObjectProperty",
	                        value: tryDecodeURIComponent(key)
	                    })
	                } else {
	                    steps.unshift({
	                        action: "setSubObjet",
	                        value: tryDecodeURIComponent(key)
	                    })
	                }
	            }
	            first = false
	        }
	        first = true
	        while (step = steps.shift()) {
	            var isObject = /Object/.test(step.action)
	            if (first) {
	                if (!(text in host)) {
	                    host[text] = isObject ? {} : []
	                }
	                first = false
	                host = host[text]
	            }
	            switch (step.action) {
	                case "pushArrayElement":
	                    host.push(value)
	                    break
	                case "setObjectProperty":
	                    host[step.value] = value
	                    break
	                case "setSubObjet":
	                    if (!(step.value in host)) {
	                        host[step.value] = {}
	                    }
	                    host = host[step.value]
	                    break
	                case "setSubArray":
	                    if (!(step.value in host)) {
	                        host[step.value] = []
	                    }
	                    host = host[step.value]
	                    break
	            }
	        }
	    }
	    //  function add
	    avalon.unparam = function(qs, sep, eq) {
	        sep = sep || '&';
	        eq = eq || '=';
	        var obj = {};
	        if ((typeof qs !== "string") || qs.length === 0) {
	            return obj;
	        }
	        if (qs.indexOf("?") !== -1) {
	            qs = qs.split("?").pop()
	        }
	        var array = qs.split(sep);
	        for (var i = 0, el; el = array[i++];) {
	            var arr = el.split("=")
	            if (arr.length === 1) { //处理只有键名没键值的情况
	                obj[arr[0]] = ""
	            } else {
	                var key = arr[0].replace(radd, '%20')
	                var v = tryDecodeURIComponent(arr.slice(1).join("=").replace(radd, ' '));
	                if (addSubObject(obj, key, v)) { //处理存在中括号的情况
	                    var k = tryDecodeURIComponent(key) //处理不存在中括号的简单的情况
	                    if (!Object.prototype.hasOwnProperty.call(obj, k)) {
	                        obj[k] = v;
	                    } else if (Array.isArray(obj[k])) {
	                        obj[k].push(v);
	                    } else {
	                        obj[k] = [obj[k], v];
	                    }
	                }
	            }
	        }

	        return obj
	    }
	    var rinput = /select|input|button|textarea/i
	    var rcheckbox = /radio|checkbox/
	    var rline = /\r?\n/g
	    function trimLine(val) {
	        return val.replace(rline, "\r\n")
	    }
	    //表单元素变字符串, form为一个元素节点
	    avalon.serialize = function(form) {
	        var json = {};
	        // 不直接转换form.elements，防止以下情况：   <form > <input name="elements"/><input name="test"/></form>
	        Array.prototype.filter.call(form.getElementsByTagName("*"), function(el) {
	            if (rinput.test(el.nodeName) && el.name && !el.disabled) {
	                return rcheckbox.test(el.type) ? el.checked : true //只处理拥有name并且没有disabled的表单元素
	            }
	        }).forEach(function(el) {
	            var val = avalon(el).val()
	            val = Array.isArray(val) ? val.map(trimLine) : trimLine(val)
	            var name = el.name
	            if (name in json) {
	                if (Array.isArray(val)) {
	                    json[name].push(val)
	                } else {
	                    json[name] = [json[name], val]
	                }
	            } else {
	                json[name] = val
	            }
	        })
	        return avalon.param(json, false) // 名值键值对序列化,数组元素名字前不加 []
	    }

	    var transports = avalon.ajaxTransports = {
	        xhr: {
	            //发送请求
	            request: function() {
	                var self = this;
	                var opts = this.options;
	                var transport = this.transport = new avalon.xhr;
	                transport.open(opts.type, opts.url, opts.async, opts.username, opts.password)
	                if (this.mimeType && transport.overrideMimeType) {
	                    transport.overrideMimeType(this.mimeType)
	                }
	                //IE6下，如果transport中没有withCredentials，直接设置会报错
	                if (opts.crossDomain && "withCredentials" in transport) {
	                    transport.withCredentials = true
	                }

	                /*
	                 * header 中设置 X-Requested-With 用来给后端做标示：
	                 * 这是一个 ajax 请求。
	                 *
	                 * 在 Chrome、Firefox 3.5+ 和 Safari 4+ 下，
	                 * 在进行跨域请求时设置自定义 header，会触发 preflighted requests，
	                 * 会预先发送 method 为 OPTIONS 的请求。
	                 *
	                 * 于是，如果跨域，禁用此功能。
	                 */
	                if (!opts.crossDomain) {
	                    this.requestHeaders["X-Requested-With"] = "XMLHttpRequest"
	                }

	                for (var i in this.requestHeaders) {
	                    transport.setRequestHeader(i, this.requestHeaders[i] + "")
	                }

	                /*
	                 * progress
	                 */
	                if (opts.progressCallback) {
	                    // 判断是否 ie6-9
	                    var isOldIE = document.all && !window.atob;
	                    if (!isOldIE) {
	                        transport.upload.onprogress = opts.progressCallback
	                    }
	                }

	                var dataType = opts.dataType
	                if ("responseType" in transport && /^(blob|arraybuffer|text)$/.test(dataType)) {
	                    transport.responseType = dataType
	                    this.useResponseType = true
	                }
	                //必须要支持 FormData 和 file.fileList 的浏览器 才能用 xhr 发送
	                //标准规定的 multipart/form-data 发送必须用 utf-8 格式， 记得 ie 会受到 document.charset 的影响
	                transport.send(opts.hasContent && (this.formdata || this.querystring) || null)
	                //在同步模式中,IE6,7可能会直接从缓存中读取数据而不会发出请求,因此我们需要手动发出请求

	                if (!opts.async || transport.readyState === 4) {
	                    this.respond()
	                } else {
	                    if (useOnload) { //如果支持onerror, onload新API
	                        transport.onload = transport.onerror = function(e) {
	                            this.readyState = 4 //IE9+
	                            this.status = e.type === "load" ? 200 : 500
	                            self.respond()
	                        }
	                    } else {
	                        transport.onreadystatechange = function() {
	                            self.respond()
	                        }
	                    }
	                }
	            },
	            //用于获取原始的responseXMLresponseText 修正status statusText
	            //第二个参数为1时中止清求
	            respond: function(event, forceAbort) {
	                var transport = this.transport
	                if (!transport) {
	                    return
	                }
	                // by zilong：避免abort后还继续派发onerror等事件
	                if (forceAbort && this.timeoutID) {
	                    clearTimeout(this.timeoutID);
	                    delete this.timeoutID
	                }
	                try {
	                    var completed = transport.readyState === 4
	                    if (forceAbort || completed) {
	                        transport.onreadystatechange = avalon.noop
	                        if (useOnload) { //IE6下对XHR对象设置onerror属性可能报错
	                            transport.onerror = transport.onload = null
	                        }
	                        if (forceAbort) {
	                            if (!completed && typeof transport.abort === "function") { // 完成以后 abort 不要调用
	                                transport.abort()
	                            }
	                        } else {
	                            var status = transport.status
	                            //设置responseText
	                            var text = transport.responseText

	                            this.responseText = typeof text === "string" ? text : void 0
	                            //设置responseXML
	                            try {
	                                //当responseXML为[Exception: DOMException]时，
	                                //访问它会抛“An attempt was made to use an object that is not, or is no longer, usable”异常
	                                var xml = transport.responseXML
	                                this.responseXML = xml.documentElement
	                            } catch (e) {
	                            }
	                            //设置response
	                            if (this.useResponseType) {
	                                this.response = transport.response
	                            }
	                            //设置responseHeadersString
	                            this.responseHeadersString = transport.getAllResponseHeaders()

	                            try { //火狐在跨城请求时访问statusText值会抛出异常
	                                var statusText = transport.statusText
	                            } catch (e) {
	                            this.error = e
	                            statusText = "firefoxAccessError"
	                            }
	                            //用于处理特殊情况,如果是一个本地请求,只要我们能获取数据就假当它是成功的
	                            if (!status && isLocal && !this.options.crossDomain) {
	                                status = this.responseText ? 200 : 404
	                            //IE有时会把204当作为1223
	                            } else if (status === 1223) {
	                                status = 204
	                            }
	                            this.dispatch(status, statusText)
	                        }
	                    }
	                } catch (err) {
	                // 如果网络问题时访问XHR的属性，在FF会抛异常
	                // http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
	                if (!forceAbort) {
	                this.dispatch(500, err)
	                }
	                }
	            }
	        },
	        jsonp: {
	            preproccess: function() {
	                var opts = this.options;
	                var name = this.jsonpCallback = opts.jsonpCallback || "avalon.jsonp" + setTimeout("1")
	                if (rjsonp.test(opts.url)) {
	                    opts.url = opts.url.replace(rjsonp, "$1" + name)
	                } else {
	                    opts.url = opts.url + (rquery.test(opts.url) ? "&" : "?") + opts.jsonp + "=" + name
	                }
	                //将后台返回的json保存在惰性函数中
	                if (name.startsWith('avalon.')) {
	                    name = name.replace(/avalon\./, '')
	                    avalon[name] = function(json) {
	                        avalon[name] = json
	                    }
	                } else {
	                    window[name] = function(json) {
	                        window[name] = json
	                    }
	                }
	                return "script"
	            }
	        },
	        script: {
	            request: function() {
	                var opts = this.options;
	                var node = this.transport = DOC.createElement("script")
	                if (opts.charset) {
	                    node.charset = opts.charset
	                }
	                var self = this;
	                node.onerror = node[useOnload ? "onload" : "onreadystatechange"] = function() {
	                    self.respond()
	                };
	                node.src = opts.url
	                head.insertBefore(node, head.firstChild)
	            },
	            respond: function(event, forceAbort) {
	                var node = this.transport
	                if (!node) {
	                    return
	                }
	                // by zilong：避免abort后还继续派发onerror等事件
	                if (forceAbort && this.timeoutID) {
	                    clearTimeout(this.timeoutID);
	                    delete this.timeoutID
	                }
	                var execute = /loaded|complete|undefined/i.test(node.readyState)
	                if (forceAbort || execute) {
	                    node.onerror = node.onload = node.onreadystatechange = null
	                    var parent = node.parentNode;
	                    if (parent) {
	                        parent.removeChild(node)
	                    }
	                    if (!forceAbort) {
	                        var args;
	                        if (this.jsonpCallback) {
	                            var jsonpCallback = this.jsonpCallback.startsWith('avalon.') ? avalon[this.jsonpCallback.replace(/avalon\./, '')] : window[this.jsonpCallback]
	                            args = typeof jsonpCallback === "function" ? [500, "error"] : [200, "success"]
	                        } else {
	                            args = [200, "success"]
	                        }

	                        this.dispatch.apply(this, args)
	                    }
	                }
	            }
	        },
	        upload: {
	            preproccess: function() {
	                var opts = this.options, formdata
	                if (typeof opts.form.append === "function") { //简单判断opts.form是否为FormData
	                    formdata = opts.form;
	                    opts.contentType = '';
	                } else {
	                    formdata = new FormData(opts.form) //将二进制什么一下子打包到formdata
	                }
	                avalon.each(opts.data, function(key, val) {
	                    formdata.append(key, val) //添加客外数据
	                })
	                this.formdata = formdata
	            }
	        }
	    }


	    avalon.mix(transports.jsonp, transports.script)
	    avalon.mix(transports.upload, transports.xhr)

	    if (!window.FormData) {
	        var str = 'Function BinaryToArray(binary)\r\n\
	                 Dim oDic\r\n\
	                 Set oDic = CreateObject("scripting.dictionary")\r\n\
	                 length = LenB(binary) - 1\r\n\
	                 For i = 1 To length\r\n\
	                     oDic.add i, AscB(MidB(binary, i, 1))\r\n\
	                 Next\r\n\
	                 BinaryToArray = oDic.Items\r\n\
	              End Function'
	        execScript(str, "VBScript");
	        avalon.fixAjax = function() {
	            avalon.ajaxConverters.arraybuffer = function() {
	                var body = this.tranport && this.tranport.responseBody
	                if (body) {
	                    return new VBArray(BinaryToArray(body)).toArray();
	                }
	            };
	            function createIframe(ID) {
	                var iframe = avalon.parseHTML("<iframe " + " id='" + ID + "'" +
	                    " name='" + ID + "'" + " style='position:absolute;left:-9999px;top:-9999px;'/>").firstChild;
	                return (DOC.body || DOC.documentElement).insertBefore(iframe, null);
	            }
	            function addDataToForm(form, data) {
	                var ret = [],
	                    d, isArray, vs, i, e;
	                for (d in data) {
	                    isArray = Array.isArray(data[d]);
	                    vs = isArray ? data[d] : [data[d]];
	                    // 数组和原生一样对待，创建多个同名输入域
	                    for (i = 0; i < vs.length; i++) {
	                        e = DOC.createElement("input");
	                        e.type = 'hidden';
	                        e.name = d;
	                        e.value = vs[i];
	                        form.appendChild(e);
	                        ret.push(e);
	                    }
	                }
	                return ret;
	            }
	            //https://github.com/codenothing/Pure-Javascript-Upload/blob/master/src/upload.js
	            avalon.ajaxTransports.upload = {
	                request: function() {
	                    var self = this;
	                    var opts = this.options;
	                    var ID = "iframe-upload-" + this.uniqueID;
	                    var form = opts.form;
	                    var iframe = this.transport = createIframe(ID);
	                    //form.enctype的值
	                    //1:application/x-www-form-urlencoded   在发送前编码所有字符（默认）
	                    //2:multipart/form-data 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。
	                    //3:text/plain  空格转换为 "+" 加号，但不对特殊字符编码。
	                    var backups = {
	                        target: form.target || "",
	                        action: form.action || "",
	                        enctype: form.enctype,
	                        method: form.method
	                    };
	                    var fields = opts.data ? addDataToForm(form, opts.data) : [];
	                    //必须指定method与enctype，要不在FF报错
	                    //表单包含文件域时，如果缺少 method=POST 以及 enctype=multipart/form-data，
	                    // 设置target到隐藏iframe，避免整页刷新
	                    form.target = ID;
	                    form.action = opts.url;
	                    form.method = "POST";
	                    form.enctype = "multipart/form-data";
	                    this.uploadcallback = avalon.bind(iframe, "load", function(event) {
	                        self.respond(event);
	                    });
	                    form.submit();
	                    //还原form的属性
	                    for (var i in backups) {
	                        form[i] = backups[i];
	                    }
	                    //移除之前动态添加的节点
	                    fields.forEach(function(input) {
	                        form.removeChild(input);
	                    });
	                },
	                respond: function(event) {
	                    var node = this.transport, child
	                    // 防止重复调用,成功后 abort
	                    if (!node) {
	                        return;
	                    }
	                    if (event && event.type === "load") {
	                        var doc = node.contentWindow.document;
	                        this.responseXML = doc;
	                        if (doc.body) { //如果存在body属性,说明不是返回XML
	                            this.responseText = doc.body.innerHTML;
	                            //当MIME为'application/javascript' 'text/javascript",浏览器会把内容放到一个PRE标签中
	                            if ((child = doc.body.firstChild) && child.nodeName.toUpperCase() === 'PRE' && child.firstChild) {
	                                this.responseText = child.firstChild.nodeValue;
	                            }
	                        }
	                        this.dispatch(200, "success");
	                    }
	                    this.uploadcallback = avalon.unbind(node, "load", this.uploadcallback);
	                    delete this.uploadcallback;
	                    setTimeout(function() { // Fix busy state in FF3
	                        node.parentNode.removeChild(node);
	                    });
	                }
	            };
	            delete avalon.fixAjax;
	        };
	        avalon.fixAjax()
	    }
	   // return avalon
	//})
	/**
	 2011.8.31
	 将会传送器的abort方法上传到avalon.XHR.abort去处理
	 修复serializeArray的bug
	 对XMLHttpRequest.abort进行try...catch
	 2012.3.31 v2 大重构,支持XMLHttpRequest Level2
	 2013.4.8 v3 大重构 支持二进制上传与下载
	 http://www.cnblogs.com/heyuquan/archive/2013/05/13/3076465.html
	 2014.12.25  v4 大重构 
	 2015.3.2   去掉mmPromise
	 2014.3.13  使用加强版mmPromise
	 2014.3.17  增加 xhr 的 onprogress 回调
	 */


/***/ },
/* 91 */
/***/ function(module, exports) {

	// mmAnimate 2.0 2014.11.25
	/**
	 * @cnName 动画引擎
	 * @enName mmAnimate
	 * @introduce
	 * <p>基于单时间轴的动画引擎</p>
	 * <h3>使用方法</h3>
	 * ```javascript
	 avalon(elem).animate( properties [, duration] [, easing] [, complete] )
	 avalon(elem).animate( properties, options )
	 * ```
	 */
	/*define(["avalon"], function() {*/
	    /*********************************************************************
	     *                      主函数                                   *
	     **********************************************************************/
	    var effect = avalon.fn.animate = function(properties, options) {
	        var frame = new Frame(this[0])
	        if (typeof properties === "number") { //如果第一个为数字
	            frame.duration = properties
	            if (arguments.length === 1) {
	                frame.playState = false
	            }
	        } else if (typeof properties === "object") {
	            for (var name in properties) {//处理第一个参数
	                var p = avalon.cssName(name) || name
	                if (name !== p) {
	                    properties[p] = properties[name] //转换为驼峰风格borderTopWidth, styleFloat
	                    delete properties[name] //去掉连字符风格 border-top-width, float
	                }
	            }
	            frame.props = properties
	        }
	        addOptions.apply(frame, arguments)//处理第二,第三...参数
	        //将关键帧插入到时间轴中或插到已有的某一帧的子列队,等此帧完毕,让它再进入时间轴
	        insertFrame(frame)
	        return this
	    }

	    //分解用户的传参
	    function addOptions(properties) {
	        //如果第二参数是对象
	        for (var i = 1; i < arguments.length; i++) {
	            addOption(this, arguments[i])
	        }
	        this.queue = !!(this.queue == null || this.queue) //是否插入子列队
	        this.easing = avalon.easing[this.easing] ? this.easing : "ease"//缓动公式的名字
	        this.count = (this.count === Infinity || isIndex(this.count)) ? this.count : 1
	        this.gotoEnd = false//是否立即跑到最后一帧
	        var duration = this.duration
	        this.duration = typeof duration === "number" ? duration : /^\d+ms$/.test(duration) ?
	                parseFloat(duration) : /^\d+s$/.test(duration) ? parseFloat(duration) * 1000 : 400 //动画时长
	    }
	    function isIndex(s) {//判定是非负整数，可以作为索引的
	        return +s === s >>> 0;
	    }
	    function addOption(frame, p, name) {
	        if (!name) {
	            switch (avalon.type(p)) {
	                case "object":
	                    for (var i in p) {
	                        addOption(frame, p[i], i)
	                    }
	                    break
	                case "number":
	                    frame.duration = p
	                    break
	                case "string":
	                    if (p === "slow") {
	                        frame.duration = 600
	                    } else if (p === "fast") {
	                        frame.duration = 200
	                    } else {
	                        frame.easing = p
	                    }
	                    break
	                case "function"://绑定各种回调
	                    frame.bind("complete", p)
	                    break
	            }
	        } else {
	            if (typeof p === "function") {
	                frame.bind(name, p)
	            } else {
	                frame[name] = p
	            }
	        }
	    }
	    /*********************************************************************
	     *                          缓动公式                              *
	     **********************************************************************/
	    avalon.mix(effect, {
	        fps: 30
	    })
	    var bezier = {
	        "linear": [0.250, 0.250, 0.750, 0.750],
	        "ease": [0.250, 0.100, 0.250, 1.000],
	        "swing": [0.250, 0.100, 0.250, 1.000],
	        "easeIn": [0.420, 0.000, 1.000, 1.000],
	        "easeOut": [0.000, 0.000, 0.580, 1.000],
	        "easeInOut": [0.420, 0.000, 0.580, 1.000],
	        "easeInQuad": [0.550, 0.085, 0.680, 0.530],
	        "easeInCubic": [0.550, 0.055, 0.675, 0.190],
	        "easeInQuart": [0.895, 0.030, 0.685, 0.220],
	        "easeInQuint": [0.755, 0.050, 0.855, 0.060],
	        "easeInSine": [0.470, 0.000, 0.745, 0.715],
	        "easeInExpo": [0.950, 0.050, 0.795, 0.035],
	        "easeInCirc": [0.600, 0.040, 0.980, 0.335],
	        "easeInBack": [0.600, -0.280, 0.735, 0.045],
	        "easeOutQuad": [0.250, 0.460, 0.450, 0.940],
	        "easeOutCubic": [0.215, 0.610, 0.355, 1.000],
	        "easeOutQuart": [0.165, 0.840, 0.440, 1.000],
	        "easeOutQuint": [0.230, 1.000, 0.320, 1.000],
	        "easeOutSine": [0.390, 0.575, 0.565, 1.000],
	        "easeOutExpo": [0.190, 1.000, 0.220, 1.000],
	        "easeOutCirc": [0.075, 0.820, 0.165, 1.000],
	        "easeOutBack": [0.175, 0.885, 0.320, 1.275],
	        "easeInOutQuad": [0.455, 0.030, 0.515, 0.955],
	        "easeInOutCubic": [0.645, 0.045, 0.355, 1.000],
	        "easeInOutQuart": [0.770, 0.000, 0.175, 1.000],
	        "easeInOutQuint": [0.860, 0.000, 0.070, 1.000],
	        "easeInOutSine": [0.445, 0.050, 0.550, 0.950],
	        "easeInOutExpo": [1.000, 0.000, 0.000, 1.000],
	        "easeInOutCirc": [0.785, 0.135, 0.150, 0.860],
	        "easeInOutBack": [0.680, -0.550, 0.265, 1.550],
	        "custom": [0.000, 0.350, 0.500, 1.300],
	        "random": [Math.random().toFixed(3),
	            Math.random().toFixed(3),
	            Math.random().toFixed(3),
	            Math.random().toFixed(3)]
	    }
	    avalon.easing = {//缓动公式
	    }
	    //https://github.com/rdallasgray/bez
	    //http://st-on-it.blogspot.com/2011/05/calculating-cubic-bezier-function.html
	    //https://github.com/rightjs/rightjs-core/blob/master/src/fx/fx.js
	    avalon.each(bezier, function(key, value) {
	        avalon.easing[key] = bezierToEasing([value[0], value[1]], [value[2], value[3]])
	    })

	    function bezierToEasing(p1, p2) {
	        var A = [null, null], B = [null, null], C = [null, null],
	                derivative = function(t, ax) {
	                    C[ax] = 3 * p1[ax], B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax], A[ax] = 1 - C[ax] - B[ax];
	                    return t * (C[ax] + t * (B[ax] + t * A[ax]));
	                },
	                bezierXY = function(t) {
	                    return C[0] + t * (2 * B[0] + 3 * A[0] * t);
	                },
	                parametric = function(t) {
	                    var x = t, i = 0, z;
	                    while (++i < 14) {
	                        z = derivative(x, 0) - t;
	                        if (Math.abs(z) < 1e-3)
	                            break;
	                        x -= z / bezierXY(x);
	                    }
	                    return x;
	                };
	        return function(t) {
	            return derivative(parametric(t), 1);
	        }
	    }
	    /*********************************************************************
	     *                      定时器                                  *
	     **********************************************************************/
	    function AnimationTimer() {
	        //不存在msRequestAnimationFrame，IE10与Chrome24直接用:requestAnimationFrame
	        if (window.requestAnimationFrame) {
	            return {
	                start: requestAnimationFrame.bind(window),
	                stop: cancelAnimationFrame.bind(window)
	            }
	            //Firefox11-没有实现cancelRequestAnimationFrame
	            //并且mozRequestAnimationFrame与标准出入过大
	        } else if (window.mozCancelRequestAnimationFrame && window.mozCancelAnimationFrame) {
	            return {
	                start: mozRequestAnimationFrame.bind(window),
	                stop: mozCancelAnimationFrame.bind(window)
	            }
	        } else if (window.webkitRequestAnimationFrame && webkitRequestAnimationFrame(String)) {
	            return {//修正某个特异的webKit版本下没有time参数
	                start: webkitRequestAnimationFrame.bind(window),
	                stop: (window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame).bind(window)
	            }
	        } else {
	            var timeLast = 0
	            // http://jsperf.com/date-now-vs-date-gettime/11
	            var now = Date.now || function() {
	                return (new Date).getTime()
	            }
	            return {
	                start: function(callback) {//主要用于IE，必须千方百计要提高性能
	                    var timeCurrent = now()
	                    // http://jsperf.com/math-max-vs-comparison/3
	                    var timeDelta = 16 - (timeCurrent - timeLast)
	                    if (timeDelta < 0)
	                        timeDelta = 0
	                    timeLast = timeCurrent + timeDelta
	                    return setTimeout(callback, timeDelta)
	                },
	                stop: function(id) {
	                    clearTimeout(id)
	                }
	            };
	        }
	    }
	    var Timer = new AnimationTimer()
	    var TimerID = null
	    /*********************************************************************
	     *                      时间轴                                    *
	     **********************************************************************/
	    /**
	     * @other
	     * <p>一个时间轴<code>avalon.timeline</code>中包含许多帧, 一帧里面有各种渐变动画, 渐变的轨迹是由缓动公式所规定</p>
	     */
	    var timeline = avalon.timeline = []
	    function insertFrame(frame) { //插入关键帧
	        if (frame.queue) { //如果插入到已有的某一帧的子列队
	            var gotoQueue = 1
	            for (var i = timeline.length, el; el = timeline[--i]; ) {
	                if (el.elem === frame.elem) { //★★★第一步
	                    el.troops.push(frame) //子列队
	                    gotoQueue = 0
	                    break
	                }
	            }
	            if (gotoQueue) { //★★★第二步
	                timeline.unshift(frame)
	            }
	        } else {//插入时间轴
	            timeline.push(frame)
	        }
	        if (!TimerID) { //时间轴只要存在帧就会执行定时器
	            TimerID = Timer.start(function raf() {
	                if (TimerID) {
	                    deleteFrame()
	                    Timer.start(raf)
	                }
	            })
	        }
	    }

	    function deleteFrame() {
	        var i = timeline.length
	        while (--i >= 0) {
	            if (!timeline[i].paused) { //如果没有被暂停
	                //如果返回false或元素不存在,就从时间轴中删掉此关键帧
	                if (!(timeline[i].elem && enterFrame(timeline[i], i))) {
	                    timeline.splice(i, 1)
	                }
	            }
	        }
	        if (timeline.length === 0) {
	            //如果时间轴里面没有关键帧,那么停止定时器,节约性能
	            Timer.stop(TimerID)
	            TimerID = null
	        }
	    }

	    function enterFrame(frame, index) {
	        //驱动主列队的动画实例进行补间动画(update)，
	        //并在动画结束后，从子列队选取下一个动画实例取替自身
	        var now = +new Date
	        if (!frame.startTime) { //第一帧
	            if (frame.playState) {
	                frame.fire("before")//动画开始前做些预操作
	                //此方法是用于获取元素最初的显隐状态,让元素处于可动画状态(display不能为none)
	                //处理overflow,绑定after回调
	                frame.build()
	            }
	            frame.startTime = now
	        } else { //中间自动生成的补间
	            var per = (now - frame.startTime) / frame.duration
	            var end = frame.gotoEnd || per >= 1 //gotoEnd可以被外面的stop方法操控,强制中止
	            if (frame.playState) {
	                for (var i = 0, tween; tween = frame.tweens[i++]; ) {
	                    tween.run(per, end)
	                }
	                frame.fire("step") //每执行一帧调用的回调
	            }
	            if (end || frame.count == 0) { //最后一帧
	                frame.count--
	                frame.fire("after") //动画结束后执行的一些收尾工作
	                if (frame.count <= 0) {
	                    frame.fire("complete") //执行用户回调
	                    var neo = frame.troops.shift()
	                    if (!neo) {
	                        return false
	                    } //如果存在排队的动画,让它继续
	                    timeline[index] = neo
	                    neo.troops = frame.troops
	                } else {
	                    frame.startTime = frame.gotoEnd = false
	                    frame.frameName = ("fx" + Math.random()).replace(/0\./, "")
	                    if (frame.revert) {
	                        frame.revertTweens()
	                    } else {
	                        frame.createTweens(avalon.isHidden(frame.elem))
	                    }  //如果设置了倒带

	                }
	            }
	        }
	        return true
	    }
	    /*********************************************************************
	     *                                  逐帧动画                            *
	     **********************************************************************/
	    /**
	     * @other
	     * <p>avalon.fn.delay, avalon.fn.slideDown, avalon.fn.slideUp,
	     * avalon.fn.slideToggle, avalon.fn.fadeIn, avalon.fn.fadeOut,avalon.fn.fadeToggle
	     * avalon.fn.show, avalon.fn.hide, avalon.fn.toggle这些方法其实都是avalon.fn.animate的
	     * 二次包装，包括<code>avalon.fn.animate</code>在内，他们的功能都是往时间轴添加一个帧对象(Frame)</p>
	     *<p>帧对象能在时间轴内存在一段时间，持续修改某一元素的N个样式或属性。</p>
	     *<p><strong>Frame</strong>对象拥有以下方法与属性</p>
	     <table class="table-doc" border="1">
	     <colgroup>
	     <col width="180"/> <col width="80"/> <col width="120"/>
	     </colgroup>
	     <tr>
	     <th>名字</th><th>类型</th><th>默认值</th><th>说明</th>
	     </tr>
	     <tr>
	     <td>elem</td><td>Element</td><td></td><td>处于动画状态的元素节点</td>
	     </tr>
	     <tr>
	     <td>$events</td><td>Object</td><td>{}</td><td>放置各种回调</td>
	     </tr>
	     <tr>
	     <td>troops</td><td>Array</td><td>[]</td><td>当queue为true，同一个元素产生的帧对象会放在这里</td>
	     </tr>
	     <tr>
	     <td>tweens</td><td>Array</td><td>[]</td><td>放置各种补间动画Tween</td>
	     </tr>
	     <tr>
	     <td>orig</td><td>Object</td><td>{}</td><td>保存动画之前的样式，用于在隐藏后还原</td>
	     </tr>
	     <tr>
	     <td>playState</td><td>Boolean</td><td>true</td><td>是否能进行动画，比如暂停了此值就为false</td>
	     </tr>
	     <tr>
	     <td>frameName</td><td>String</td><td>("fx" + Math.random()).replace(/0\./,"")</td><td>当前动画的名字</td>
	     </tr>
	     <tr>
	     <td>count</td><td>Number</td><td>1</td><td>能重复多少次</td>
	     </tr>
	     <tr>
	     <td>bind(type, fn, unshift)</td><td></td><td></td><td>
	     <table border="1">
	     <tbody><tr>
	     <th style="width:100px">参数名/返回值</th><th style="width:70px">类型</th> <th>说明</th> </tr>
	     <tr>
	     <td>type</td>
	     <td>String</td>
	     <td>事件名</td>
	     </tr>
	     <tr>
	     <td>fn</td>
	     <td>Function</td>
	     <td>回调，this为元素节点</td>
	     </tr>
	     <tr>
	     <td>unshift</td>
	     <td>Undefined|String</td>
	     <td>判定是插在最前还是最后</td>
	     </tr>
	     </tbody></table>
	     </td>
	     </tr>
	     <tr>
	     <td>fire(type, [otherArgs..])</td><td></td><td></td><td>触发回调，可以传N多参数</td></tr>           
	     </table>
	     */
	    function Frame(elem) {
	        this.$events = {}
	        this.elem = elem
	        this.troops = []
	        this.tweens = []
	        this.orig = {}
	        this.props = {}
	        this.count = 1
	        this.frameName = ("fx" + Math.random()).replace(/0\./, "")
	        this.playState = true //是否能更新
	    }
	    var root = document.documentElement

	    avalon.isHidden = function(node) {
	        return  node.sourceIndex === 0 || avalon.css(node, "display") === "none" || !avalon.contains(root, node)
	    }

	    Frame.prototype = {
	        constructor: Frame,
	        bind: function(type, fn, unshift) {
	            var fns = this.$events[type] || (this.$events[type] = []);
	            var method = unshift ? "unshift" : "push"
	            fns[method](fn)
	        },
	        fire: function(type) {
	            var args = Array.prototype.slice.call(arguments, 1)
	            var fns = this.$events[type] || []
	            for (var i = 0, fn; fn = fns[i++]; ) {
	                fn.call(this.elem, args)
	            }
	        },
	        build: function() {
	            var frame = this
	            var elem = frame.elem
	            var props = frame.props
	            var style = elem.style
	            var inlineBlockNeedsLayout = !window.getComputedStyle
	            //show 开始时计算其width1 height1 保存原来的width height display改为inline-block或block overflow处理 赋值（width1，height1）
	            //hide 保存原来的width height 赋值为(0,0) overflow处理 结束时display改为none;
	            //toggle 开始时判定其是否隐藏，使用再决定使用何种策略
	            //如果是动画则必须将它显示出来
	            var hidden = avalon.isHidden(elem)
	            if ("height" in props || "width" in props) {
	                frame.overflow = [style.overflow, style.overflowX, style.overflowY]
	            }
	            var display = style.display || avalon.css(elem, "display")
	            var oldDisplay = elem.getAttribute("olddisplay")
	            if (!oldDisplay) {
	                if (display === "none") {
	                    style.display = ""//尝试清空行内的display
	                    display = avalon.css(elem, "display")
	                    if (display === "none") {
	                        display = avalon.parseDisplay(elem.nodeName)
	                    }
	                }
	                elem.setAttribute("olddisplay", display)
	            } else {
	                if (display !== "none") {
	                    elem.setAttribute("olddisplay", display)
	                } else {
	                    display = oldDisplay
	                }
	            }
	            style.display = display
	            //修正内联元素的display为inline-block，以让其可以进行width/height的动画渐变
	            if (display === "inline" && avalon.css(elem, "float") === "none") {
	                if (!inlineBlockNeedsLayout || avalon.parseDisplay(elem.nodeName) === "inline") {
	                    style.display = "inline-block"
	                } else {
	                    style.zoom = 1
	                }
	            }
	            this.createTweens(hidden)

	            if (frame.overflow) {
	                style.overflow = "hidden"
	                frame.bind("after", function() {
	                    style.overflow = frame.overflow[ 0 ]
	                    style.overflowX = frame.overflow[ 1 ]
	                    style.overflowY = frame.overflow[ 2 ]
	                })
	            }

	            frame.bind("after", function() {
	                if (frame.showState === "hide") {
	                    this.style.display = "none"
	                    this.dataShow = {}
	                    for (var i in frame.orig) { //还原为初始状态
	                        this.dataShow[i] = frame.orig[i]
	                        avalon.css(this, i, frame.orig[i])
	                    }
	                }
	            })
	            this.build = avalon.noop //让其无效化
	        },
	        createTweens: function(hidden) {
	            this.tweens = []
	            for (var i in this.props) {
	                createTweenImpl(this, i, this.props[i], hidden)
	            }
	        },
	        revertTweens: function() {
	            for (var i = 0, tween; tween = this.tweens[i++]; ) {
	                var start = tween.start
	                var end = tween.end
	                tween.start = end
	                tween.end = start
	                this.props[tween.name] = Array.isArray(tween.start) ?
	                        "rgb(" + tween.start + ")" :
	                        (tween.unit ? tween.start + tween.unit : tween.start)
	            }
	        }
	    }

	    var rfxnum = new RegExp("^(?:([+-])=|)(" + (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source + ")([a-z%]*)$", "i")

	    function createTweenImpl(frame, name, value, hidden) {
	        var elem = frame.elem
	        var dataShow = elem.dataShow || {}
	        var tween = new Tween(name, frame)
	        var from = dataShow[name] || tween.cur() //取得起始值
	        var to
	        if (/color$/i.test(name)) {
	            //用于分解属性包中的样式或属性,变成可以计算的因子
	            parts = [color2array(from), color2array(value)]
	        } else {
	            parts = rfxnum.exec(from)
	            var unit = parts && parts[ 3 ] || (avalon.cssNumber[ name ] ? "" : "px")
	            //处理 toggle, show, hide
	            if (value === "toggle") {
	                value = hidden ? "show" : "hide"
	            }
	            if (value === "show") {
	                frame.showState = "show"
	                avalon.css(elem, name, 0);
	                parts = [0, parseFloat(from)]
	            } else if (value === "hide") {
	                frame.showState = "hide"
	                frame.orig[name] = from
	                parts = [parseFloat(from), 0]
	                value = 0;
	            } else {// "18em"  "+=18em"
	                parts = rfxnum.exec(value)//["+=18em", "+=", "18", "em"]
	                if (parts) {
	                    parts[2] = parseFloat(parts[2]) //18
	                    if (parts[3] && parts[ 3 ] !== unit) {//如果存在单位，并且与之前的不一样，需要转换
	                        var clone = elem.cloneNode(true)
	                        clone.style.visibility = "hidden"
	                        clone.style.position = "absolute"
	                        elem.parentNode.appendChild(clone)
	                        avalon.css(clone, name, parts[2] + (parts[3] ? parts[3] : 0))
	                        parts[ 2 ] = parseFloat(avalon.css(clone, name))
	                        elem.parentNode.removeChild(clone)
	                    }
	                    to = parts[2]
	                    from = parseFloat(from)
	                    if (parts[ 1 ]) {
	                        to = from + (parts[ 1 ] + 1) * parts[ 2 ]
	                    }
	                    parts = [from, to]
	                }
	            }
	        }
	        from = parts[0]
	        to = parts[1]
	        if (from + "" !== to + "") { //不处理起止值都一样的样式与属性
	            tween.start = from
	            tween.end = to
	            tween.unit = unit || ""
	            frame.tweens.push(tween)
	        } else {
	            delete frame.props[name]
	        }
	    }
	    /*********************************************************************
	     *                                 渐变动画                            *
	     **********************************************************************/
	    /**
	     * @other
	     * <p>渐变动画<code>Tween</code>是我们实现各种特效的最小单位，它用于修改某一个属性值或样式值</p>
	     *<p><strong>Tween</strong>对象拥有以下方法与属性</p>
	     <table class="table-doc" border="1">
	     <colgroup>
	     <col width="180"/> <col width="80"/> <col width="120"/>
	     </colgroup>
	     <tr>
	     <th>名字</th><th>类型</th><th>默认值</th><th>说明</th>
	     </tr>
	     <tr>
	     <td>elem</td><td>Element</td><td></td><td>元素节点</td>
	     </tr>
	     <tr>
	     <td>name</td><td>String</td><td>""</td><td>属性名或样式名，以驼峰风格存在</td>
	     </tr>
	     <tr>
	     <td>start</td><td>Number</td><td>0</td><td>渐变的开始值</td>
	     </tr>
	     <tr>
	     <td>end</td><td>Number</td><td>0</td><td>渐变的结束值</td>
	     </tr>
	     <tr>
	     <td>now</td><td>Number</td><td>0</td><td>当前值</td>
	     </tr>
	     <tr>
	     <td>run(per, end)</td><td></td><td></td><td>更新元素的某一样式或属性，内部调用</td>
	     </tr>
	     <tr>
	     <td>cur()</td><td></td><td></td><td>取得当前值</td>
	     </tr>
	     </table>
	     */
	    function Tween(prop, options) {
	        this.elem = options.elem
	        this.name = prop
	        this.easing = avalon.easing[options.easing]
	        if (/color$/i.test(prop)) {
	            this.update = this.updateColor
	        }
	    }

	    Tween.prototype = {
	        constructor: Tween,
	        cur: function() {//取得当前值
	            var hook = Tween.propHooks[ this.name ]
	            return hook && hook.get ?
	                    hook.get(this) :
	                    Tween.propHooks._default.get(this)
	        },
	        run: function(per, end) {//更新元素的某一样式或属性
	            this.update(per, end)
	            var hook = Tween.propHooks[ this.name ]
	            if (hook && hook.set) {
	                hook.set(this)
	            } else {
	                Tween.propHooks._default.set(this)
	            }
	        },
	        updateColor: function(per, end) {
	            if (end) {
	                var rgb = this.end
	            } else {
	                var pos = this.easing(per)
	                rgb = this.start.map(function(from, i) {
	                    return Math.max(Math.min(parseInt(from + (this.end[i] - from) * pos, 10), 255), 0)
	                }, this)
	            }
	            this.now = "rgb(" + rgb + ")"
	        },
	        update: function(per, end) {
	            this.now = (end ? this.end : this.start + this.easing(per) * (this.end - this.start))
	        }
	    }

	    Tween.propHooks = {
	        _default: {
	            get: function(tween) {
	                var result = avalon.css(tween.elem, tween.name)
	                return !result || result === "auto" ? 0 : result
	            },
	            set: function(tween) {
	                avalon.css(tween.elem, tween.name, tween.now + tween.unit)
	            }
	        }
	    }

	    ;
	    ["scrollTop", "scrollLeft"].forEach(function(name) {
	        Tween.propHooks[name] = {
	            get: function(tween) {
	                return tween.elem[tween.name]
	            },
	            set: function(tween) {
	                tween.elem[tween.name] = tween.now
	            }
	        }
	    })
	    /*********************************************************************
	     *                                  原型方法                            *
	     **********************************************************************/

	    avalon.fn.mix({
	        delay: function(ms) {
	            return this.animate(ms)
	        },
	        pause: function() {
	            var cur = this[0]
	            for (var i = 0, frame; frame = timeline[i]; i++) {
	                if (frame.elem === cur) {
	                    frame.paused = new Date - 0
	                }
	            }
	            return this
	        },
	        resume: function() {
	            var now = new Date
	            var elem = this[0]
	            for (var i = 0, frame; frame = timeline[i]; i++) {
	                if (frame.elem === elem) {
	                    frame.startTime += (now - frame.paused)
	                    delete frame.paused
	                }
	            }
	            return this
	        },
	        //如果clearQueue为true，是否清空列队
	        //如果gotoEnd 为true，是否跳到此动画最后一帧
	        stop: function(clearQueue, gotoEnd) {
	            clearQueue = clearQueue ? "1" : ""
	            gotoEnd = gotoEnd ? "1" : "0"
	            var stopCode = parseInt(clearQueue + gotoEnd, 2) //返回0 1 2 3
	            var node = this[0]
	            for (var i = 0, frame; frame = timeline[i]; i++) {
	                if (frame.elem === node) {
	                    frame.gotoEnd = true
	                    frame.count = 0
	                    switch (stopCode) { //如果此时调用了stop方法
	                        case 0:
	                            // false false 中断当前动画，继续下一个动画
	                            frame.playState = frame.revert = false
	                            break
	                        case 1:
	                            // false true立即跳到最后一帧，继续下一个动画
	                            frame.revert = false
	                            break
	                        case 2:
	                            // true false清空该元素的所有动画
	                            delete frame.elem
	                            break
	                        case 3:
	                            // true true 立即完成该元素的所有动画
	                            frame.troops.forEach(function(a) {
	                                a.gotoEnd = true
	                            })
	                            break
	                    }
	                }
	            }
	            return this
	        }
	    })
	    /*********************************************************************
	     *                                 常用特效                            *
	     **********************************************************************/
	    var fxAttrs = [
	        ["height", "marginTop", "marginBottom", "borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
	        ["width", "marginLeft", "marginRight", "borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
	        ["opacity"]
	    ]
	    function genFx(type, num) { //生成属性包
	        var obj = {}
	        fxAttrs.concat.apply([], fxAttrs.slice(0, num)).forEach(function(name) {
	            obj[name] = type
	        })
	        return obj
	    }


	    var effects = {
	        slideDown: genFx("show", 1),
	        slideUp: genFx("hide", 1),
	        slideToggle: genFx("toggle", 1),
	        fadeIn: {
	            opacity: "show"
	        },
	        fadeOut: {
	            opacity: "hide"
	        },
	        fadeToggle: {
	            opacity: "toggle"
	        }
	    }

	    avalon.each(effects, function(method, props) {
	        avalon.fn[method] = function() {
	            var args = [].concat.apply([props, {frameName: method}], arguments)
	            return this.animate.apply(this, args)
	        }
	    })

	    String("toggle,show,hide").replace(avalon.rword, function(name) {
	        avalon.fn[name] = function() {
	            var args = [].concat.apply([genFx(name, 3), {frameName: name}], arguments)
	            return this.animate.apply(this, args)
	        }
	    })
	    /*********************************************************************
	     *                      转换各种颜色值为RGB数组                            *
	     **********************************************************************/
	    var colorMap = {
	        "black": [0, 0, 0],
	        "gray": [128, 128, 128],
	        "white": [255, 255, 255],
	        "orange": [255, 165, 0],
	        "red": [255, 0, 0],
	        "green": [0, 128, 0],
	        "yellow": [255, 255, 0],
	        "blue": [0, 0, 255]
	    }
	    if (window.VBArray) {
	        var parseColor = new function() {
	            var body
	            try {
	                var doc = new ActiveXObject("htmlfile")
	                doc.write("<body>")
	                doc.close()
	                body = doc.body
	            } catch (e) {
	                body = createPopup().document.body
	            }
	            var range = body.createTextRange()
	            return function(color) {
	                body.style.color = String(color).trim()
	                var value = range.queryCommandValue("ForeColor")
	                return [value & 0xff, (value & 0xff00) >> 8, (value & 0xff0000) >> 16]
	            }
	        }
	    }

	    function color2array(val) { //将字符串变成数组
	        var color = val.toLowerCase(),
	                ret = []
	        if (colorMap[color]) {
	            return colorMap[color]
	        }
	        if (color.indexOf("rgb") === 0) {
	            var match = color.match(/(\d+%?)/g),
	                    factor = match[0].indexOf("%") !== -1 ? 2.55 : 1
	            return (colorMap[color] = [parseInt(match[0]) * factor, parseInt(match[1]) * factor, parseInt(match[2]) * factor])
	        } else if (color.charAt(0) === '#') {
	            if (color.length === 4)
	                color = color.replace(/([^#])/g, '$1$1')
	            color.replace(/\w{2}/g, function(a) {
	                ret.push(parseInt(a, 16))
	            })
	            return (colorMap[color] = ret)
	        }
	        if (window.VBArray) {
	            return (colorMap[color] = parseColor(color))
	        }
	        return colorMap.white
	    }
	    avalon.parseColor = color2array
	/*    return avalon
	})*/


/***/ },
/* 92 */
/***/ function(module, exports) {

	function uuid(len, radix) {
	    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	    var uuid = [], i;
	    radix = radix || chars.length;

	    if (len) {
	        // Compact form
	        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
	    } else {
	        // rfc4122, version 4 form
	        var r;

	        // rfc4122 requires these characters
	        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
	        uuid[14] = '4';

	        // Fill in random data.  At i==19 set the high bits of clock sequence as
	        // per rfc4122, sec. 4.1.5
	        for (i = 0; i < 36; i++) {
	            if (!uuid[i]) {
	                r = 0 | Math.random()*16;
	                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
	            }
	        }
	    }

	    return uuid.join('');
	}
	//身份证号码验证
	function isIdCardNo(num) {
	    num = num.toUpperCase();
	    //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
	    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(num))) {
	        //alert('输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。');
	        return false;
	    }
	    //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
	    //下面分别分析出生日期和校验位
	    var len, re;

	    len = num.length;
	    if (len == 15) {
	        re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
	        var arrSplit = num.match(re);
	        //检查生日日期是否正确
	        var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
	        var bGoodDay;
	        bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
	        if (!bGoodDay) {
	            //alert('输入的身份证号里出生日期不对！');
	            return false;
	        }
	        else {
	        //将15位身份证转成18位
	        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
	            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	            var nTemp = 0, i;
	            num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6);
	            for (i = 0; i < 17; i++) {
	                nTemp += num.substr(i, 1) * arrInt[i];
	            }
	            num += arrCh[nTemp % 11];
	            return num;
	        }

	    }
	    if (len == 18) {
	        re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
	        var arrSplit = num.match(re);
	        //检查生日日期是否正确
	        var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
	        var bGoodDay;
	        bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
	        if (!bGoodDay) {
	            //alert(dtmBirth.getYear());
	            //alert(arrSplit[2]);
	            //alert('输入的身份证号里出生日期不对！');
	            return false;
	        }
	     else {
	            //检验18位身份证的校验码是否正确。
	            //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
	            var valnum;
	            var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
	            var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
	            var nTemp = 0, i;
	            for (i = 0; i < 17; i++) {
	                nTemp += num.substr(i, 1) * arrInt[i];
	            }
	            valnum = arrCh[nTemp % 11];
	            if (valnum != num.substr(17, 1)) {
	                //alert('18位身份证的校验码不正确！应该为：' + valnum);
	                return false;
	            }
	            return num;
	        }
	    }
	    return false;
	}

	/*添加验证规则*/
	avalon.shadowCopy(avalon.validators, {
	    checked : {
	        message: '必须扣上',
	        get: function (value, field, next) {
	            next(value)
	            return value
	        }
	    },
	    isIdCardNo:{
	        message: '输入的身份证号长度不对，或者号码不符合规定！\n15位号码应全为数字，18位号码末位可以为数字或X。',
	        get: function (value, field, next) {
	            next(isIdCardNo(value))
	            return value
	        }
	    }
	})
	config= {
	    uuid:uuid
	}

	module.exports=config;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/6/12.
	 */
	__webpack_require__(94);
	var config=__webpack_require__(92)
	var tmpl = __webpack_require__(96)
	avalon.component('ms-header', {
	    template: tmpl,
	    defaults: {
	        userName:avalon.store.get('userInfor')['userName'],
	        selectNav:'index',
	        outlogin:function(){
	            //退出操作
	            avalon.ajax({
	                url:'/ssoService/loginOut?userID='+avalon.store.get('userInfor')['userID'],
	                type: 'post',
	                cache: true,
	                contentType: "application/json"
	            }).done(function(ret) {
	                if (ret.data == 1 || ret.data == 2) {
	                    avalon.store.clear();
	                    location.href='login.html';
	                }else if(ret.data == 0){

	                }
	            }).fail(function() {

	            })
	        },
	        //进入我的金中国
	        adminlink:function(){
	            location.href='index.html';
	        },
	        link:function(type){
	            var url='houtaishouye.html'
	            switch (type){
	                case 'index':
	                    url='houtaishouye.html'
	                    break;
	                case 'index':
	                    break;
	                case 'index':
	                    break;
	                case 'zhgl':
	                    url='jibenxinxi.html';
	                    break;
	                case 'index':
	                    break;
	                case 'index':
	                    break;
	            }
	            //this.selectType=type
	            location.href=url;
	        }
	    }
	})

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @cnName 本地储存组件
	 * @enName store
	 * @introduce
	 *    <p>   IE8+及高级浏览器使用localStorage，旧式IE使用userData。这些方法放于avalon.store对象上。</p>
	 *  @updatetime 2011-11-21
	 */
	/*define(["avalon", "../json/avalon.json"], function(avalon) {*/
	__webpack_require__(95);
	    var store = {
	        //一些接口(空实现)
	        disabled: false,
	        /*
	         *  @interface 添加或设置某一数据
	         *  @param name {String} 
	         *  @param value {String} 
	         */
	        set: function(key, value) {
	        },
	        /*
	         *  @interface 获取某一数据
	         *  @param name {String} 
	         *  @return {String}
	         */
	        get: function(key) {
	        },
	        /*
	         *  @interface 移除某一数据
	         *  @param key {String} 
	         */
	        remove: function(key) {
	        },
	        /*
	         *  @interface 清空一数据
	         */
	        clear: function() {
	        },
	        /*
	         *  @interface 遍历所有数据
	         *  @param callback {Function} 里面会依次传入key与value
	         */
	        forEach: function(callback) {
	        },
	        /*
	         *  @interface 得到所有数据，以对象形式返回
	         *  @returns {Object}
	         */
	        getAll: function() {
	            var ret = {}
	            store.forEach(function(key, val) {
	                ret[key] = val
	            })
	            return ret
	        },
	        serialize: function(value) {
	            return JSON.stringify(value)
	        },
	        parse: function(value) {
	            if (typeof value !== 'string') {
	                return void 0
	            }
	            try {
	                return JSON.parse(value)
	            }
	            catch (e) {
	                return value || undefined
	            }
	        }
	    }
	    //http://wojodesign.com/full-browser-support-for-localstorage-without-cookies/
	    //http://mathiasbynens.be/notes/localstorage-pattern
	    var name = "test" + (new Date - 0), localStorageName = "localStorage", storage
	    var supportLocalStorage = false;
	    try {
	        localStorage.setItem(name, "mass");
	        localStorage.removeItem(name);
	        supportLocalStorage = true;
	    } catch (e) {
	    }

	    if (supportLocalStorage) {
	        storage = localStorage;
	        avalon.mix(store, {//重写
	            set: function(key, val) {
	                if (val === void 0) {
	                    return store.remove(key)
	                }
	                storage.setItem(key, store.serialize(val))
	                return val
	            },
	            get: function(key) {
	                return store.parse(storage.getItem(key))
	            },
	            remove: function(key) {
	                storage.removeItem(key)
	            },
	            clear: function() {
	                storage.clear()
	            },
	            forEach: function(callback) {
	                for (var i = 0; i < storage.length; i++) {
	                    var key = storage.key(i)
	                    callback(key, store.get(key))
	                }
	            }
	        })


	    } else if (document.documentElement.addBehavior) {
	        var storageOwner,
	                storageContainer
	        //由于＃userData的存储仅适用于特定的路径，
	        //我们需要以某种方式关联我们的数据到一个特定的路径。我们选择/favicon.ico作为一个非常安全的目标，
	        //因为所有的浏览器都发出这个URL请求，而且这个请求即使是404也不会有危险。
	        //我们可以通过一个ActiveXObject(htmlfle)对象的文档来干这事。
	        //(参见:http://msdn.microsoft.com/en-us/library/aa752574(v = VS.85). aspx)
	        //因为iframe的访问规则允许直接访问和操纵文档中的元素，即使是404。
	        //这文档可以用来代替当前文档（这被限制在当前路径）执行＃userData的存储。
	        try {
	            var scriptTag = 'script'
	            storageContainer = new ActiveXObject('htmlfile')
	            storageContainer.open()
	            storageContainer.write('<' + scriptTag + '>document.w=window</' + scriptTag + '><iframe src="/favicon.ico"></iframe>')
	            storageContainer.close()
	            storageOwner = storageContainer.w.frames[0].document
	            storage = storageOwner.createElement('div')
	        } catch (e) {
	            storage = document.createElement('div')
	            storageOwner = document.body
	        }
	        function withIEStorage(storeFunction) {
	            return function() {
	                var args = Array.prototype.slice.call(arguments, 0)
	                args.unshift(storage)
	                //  http://msdn.microsoft.com/en-us/library/ms531081(v=VS.85).aspx
	                //  http://msdn.microsoft.com/en-us/library/ms531424(v=VS.85).aspx
	                storageOwner.appendChild(storage)
	                storage.addBehavior('#default#userData')
	                storage.load(localStorageName)
	                var result = storeFunction.apply(store, args)
	                try {
	                    storageOwner.removeChild(storage)
	                } catch (e) {
	                }
	                return result
	            }
	        }
	        // In IE7, keys may not contain special chars. See all of https://github.com/marcuswestin/store.js/issues/40
	        var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g")
	        function ieKeyFix(key) {
	            return key.replace(/^d/, '___$&').replace(forbiddenCharsRegex, '___')
	        }
	        avalon.mix(store, {//重写
	            set: withIEStorage(function(storage, key, val) {
	                key = ieKeyFix(key)
	                if (val === void 0) {
	                    return store.remove(key)
	                }
	                storage.setAttribute(key, store.serialize(val))
	                storage.save(localStorageName)
	                return val
	            }),
	            get: withIEStorage(function(storage, key) {
	                key = ieKeyFix(key)
	                return store.parse(storage.getAttribute(key))
	            }),
	            remove: withIEStorage(function(storage, key) {
	                key = ieKeyFix(key)
	                storage.removeAttribute(key)
	                storage.save(localStorageName)
	            }),
	            clear: function() {
	                store.forEach(function(name) {
	                    store.remove(name)
	                })
	            },
	            forEach: withIEStorage(function(storage, callback) {
	                var attributes = storage.XMLDocument.documentElement.attributes
	                for (var i = 0, attr; attr = attributes[i]; ++i) {
	                    callback(attr.name, store.parse(storage.getAttribute(attr.name)))
	                }
	            })
	        })
	    }
	    try {
	        store.set(localStorageName, localStorageName)
	        if (store.get(localStorageName) != localStorageName) {
	            store.disabled = true
	        }
	        store.remove(localStorageName);
	    } catch (e) {
	        store.disabled = true
	    }
	    avalon.store = store
	/*    return avalon;
	})*/
	/*
	 * @other
	 * 这里提供了一个用cookie实现本地储存的方案 https://developer.mozilla.org/en/DOM/Storage
	 其他有用的资料
	 <ul>
	 <li><a href="http://www.cnblogs.com/NNUF/archive/2012/06/01/2531436.html">http://www.cnblogs.com/NNUF/archive/2012/06/01/2531436.html</a></li>
	 <li><a href="http://www.cnblogs.com/zjcn/archive/2012/07/03/2575026.html">http://www.cnblogs.com/zjcn/archive/2012/07/03/2575026.html</a></li>
	 <li><a href="http://dev-test.nemikor.com/web-storage/support-test/">http://dev-test.nemikor.com/web-storage/support-test/</a></li>
	 <li><a href="http://arty.name/localstorage.html">http://arty.name/localstorage.html</a></li>
	 </ul>
	 firefox中对file://协议的不支持.
	 
	 当你在firefox中打开一个本地的html文件的时候,也就是使用file://协议运行一个页面的时候,localStorage是不起作用的.无法设置和获取localStorage.
	 其实,本地调试这种方式已经很落后了,至少应该再127.0.0.1的环境中调试吧,这样调试的时候localStorage是工作的,有的人说这是一个firefox的bug.
	 但是看到一个解释,我觉得还是挺靠谱的,在file协议中,本来就没有domain的概念,而localStorage是根据domain来生效的.所以从道理上来讲就不应该在file://协议上生效.
	 */

	/**
	 @links
	 [例子1](avalon.store.ex1.html)
	 */

/***/ },
/* 95 */
/***/ function(module, exports) {

	/*define(["avalon"], function(avalon) {*/
	    if (Object.prototype.toString.call(window.JSON) === "[object JSON]") {
	        //return window.JSON
	        module.exports=window.JSON;
	    } else {
	        var JSON = window.JSON = {fake: true}
	        function f(n) {//补零
	            return n < 10 ? '0' + n : n
	        }
	        function toJSON(obj, type) {//序列化字符串,数字,布尔与日期
	            return type === "date" ? '(new Date(' + obj.valueOf() + '))' : type === "string" ? quote(obj) : obj + "";
	        }
	        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	                escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
	                gap,
	                indent,
	                meta = {// table of character substitutions
	                    '\b': '\\b',
	                    '\t': '\\t',
	                    '\n': '\\n',
	                    '\f': '\\f',
	                    '\r': '\\r',
	                    '"': '\\"',
	                    '\\': '\\\\'
	                },
	        rep;
	        function quote(string) {//为字符串两边加双引号
	            escapable.lastIndex = 0;
	            return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
	                var c = meta[a];
	                return typeof c === 'string'
	                        ? c
	                        : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	            }) + '"' : '"' + string + '"'
	        }
	        //开始序列化各种数据类型
	        function str(key, holder) {
	            var i, // The loop counter.
	                    k, // The member key.
	                    v, // The member value.
	                    length,
	                    mind = gap,
	                    partial,
	                    value = holder[key];
	            if (value) {
	                var type = avalon.type(value);
	                if (/date|string|number|boolean/i.test(type)) {
	                    return toJSON(value, type);
	                }
	            }
	            if (typeof rep === 'function') {
	                value = rep.call(holder, key, value)
	            }
	            switch (typeof value) {
	                case 'string':
	                    return quote(value)
	                case 'number':
	                    return isFinite(value) ? String(value) : 'NaN'
	                case 'boolean':
	                case 'null':
	                    return String(value)
	                case 'object':
	                    if (!value) {
	                        return 'null'
	                    }
	                    gap += indent
	                    partial = []
	                    if (Array.isArray(value)) {
	                        length = value.length
	                        for (i = 0; i < length; i += 1) {
	                            partial[i] = str(i, value) || 'null'
	                        }
	                        v = partial.length === 0
	                                ? '[]'
	                                : gap
	                                ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']'
	                                : '[' + partial.join(',') + ']'
	                        gap = mind
	                        return v
	                    }
	                    if (rep && typeof rep === 'object') {
	                        length = rep.length
	                        for (i = 0; i < length; i += 1) {
	                            if (typeof rep[i] === 'string') {
	                                k = rep[i]
	                                v = str(k, value)
	                                if (v) {
	                                    partial.push(quote(k) + (gap ? ': ' : ':') + v)
	                                }
	                            }
	                        }
	                    } else {
	                        for (k in value) {
	                            if (Object.prototype.hasOwnProperty.call(value, k)) {
	                                v = str(k, value);
	                                if (v) {
	                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
	                                }
	                            }
	                        }
	                    }
	                    v = partial.length === 0
	                            ? '{}'
	                            : gap
	                            ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}'
	                            : '{' + partial.join(',') + '}';
	                    gap = mind;
	                    return v;
	            }
	        }
	        JSON.stringify = function(value, replacer, space) {
	            var i;
	            gap = '';
	            indent = '';
	            if (typeof space === 'number') {
	                for (i = 0; i < space; i += 1) {
	                    indent += ' ';
	                }

	            } else if (typeof space === 'string') {
	                indent = space;
	            }
	            rep = replacer;
	            if (replacer && typeof replacer !== 'function' &&
	                    (typeof replacer !== 'object' ||
	                            typeof replacer.length !== 'number')) {
	                throw new Error('JSON.stringify');
	            }
	            return str('', {'': value});
	        };
	        JSON.parse = function(text, reviver) {
	            var j;

	            function walk(holder, key) {
	                var k, v, value = holder[key];
	                if (value && typeof value === 'object') {
	                    for (k in value) {
	                        if (Object.prototype.hasOwnProperty.call(value, k)) {
	                            v = walk(value, k);
	                            if (v !== undefined) {
	                                value[k] = v;
	                            } else {
	                                delete value[k];
	                            }
	                        }
	                    }
	                }
	                return reviver.call(holder, key, value);
	            }
	            text = String(text);
	            cx.lastIndex = 0;
	            if (cx.test(text)) {
	                text = text.replace(cx, function(a) {
	                    return '\\u' +
	                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	                });
	            }
	            if (/^[\],:{}\s]*$/
	                    .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
	                            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
	                            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

	                j = eval('(' + text + ')');
	                return typeof reviver === 'function'
	                        ? walk({'': j}, '')
	                        : j;
	            }

	            throw new SyntaxError('JSON.parse')
	        };
	        module.exports=window.JSON;
	       // return window.JSON
	    }/*
	})*/


/***/ },
/* 96 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui-header\">\r\n    <div class=\"content fn-c\">\r\n        <a href=\"index.html?nav=index\"><h1 class=\"icon logo\">淘猪宝</h1></a>\r\n        <ul class=\"nav-header\" id=\"nav-header\">\r\n            <li id =\"shop\"><a data-nav=\"shop\" href=\"shopIndex.html?nav=shop&menu=setup\">店铺</a></li>\r\n            <li><a data-nav=\"commodity\" href=\"selling.html?nav=commodity&menu=selling\">商品</a></li>\r\n            <li><a data-nav=\"dingdan\" href=\"daifukuan-1.2.html?nav=dingdan&menu=dingdan\">订单</a></li>\r\n            <li id=\"wechat\" style=\"display: none\"><a data-nav=\"wechat\" href=\"wechat.account.html?nav=wechat&menu=account\">微信</a></li>\r\n            <li><a data-nav=\"seo\" href=\"seo.index.html?nav=seo\">营销</a></li>\r\n            <li id=\"client\" style=\"display: none\"><a data-nav=\"client\" href=\"client.fans.html?nav=client&menu=fans\">客户</a></li>\r\n            <li><a data-nav=\"data\" href=\"data.index.html?nav=data\">数据</a></li>\r\n            <li id=\"fenxiaoNav\"  style=\"display: none\"><a data-nav=\"fenxiao\" href=\"fx-gaikuang-1.2.html?nav=fenxiao&menu=fx-gaikuang-1.2\">分销</a></li>\r\n        </ul>\r\n        <div class=\"account-header\">\r\n            <div class=\"head-login\" id=\"head-login\">\r\n                <a href=\"account/login.html\" title=\"登录\">登录</a><a href=\"account/register.html\" title=\"注册\">注册</a>\r\n            </div>\r\n            <div class=\"head-user\" id=\"head-user\">\r\n                <p class=\"shop-name\" id=\"head-shop-name\"></p>\r\n                <div class=\"set\">设置<i></i>\r\n                    <div class=\"set-data\">\r\n                        <!--<a href=\"shop.setup.html?nav=shop&menu=setup\" title=\"店铺设置\">店铺设置</a>-->\r\n                        <a href=\"accounts_a.html?nav\" title=\"帐号设置\">帐号设置</a>\r\n                        <a href=\"javascript:;\" title=\"退出\" id=\"head-login-out\">退出</a>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>";

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/6/12.
	 */
	var config=__webpack_require__(92)
	__webpack_require__(94)
	var tmpl = __webpack_require__(98)
	//获取用户状态接口

	var urlleft='/ssoService/companyInfoAuthState/'+avalon.store.get('userInfor')['userID'];
	avalon.component('ms-memLeft', {
	    template: tmpl,
	    defaults: {
	        //认证状态
	        renzhengStatu:'001',
	        onInit: function () {
	            //获取用户状态
	            avalon.ajax({
	                url:urlleft,
	                type: 'get',
	                cache: true
	            }).done(function(ret) {
	                if (ret.isSuccess == 1) {
	                    //暂时没做处理
	                    avalon.log(ret);
	                    avalon.store.set('renzhengStatu',ret.data);
	                    var rsaData = ret.data;
	                }else{
	                    avalon.log( '服务异常，请重试');
	                    return;
	                }
	            }).fail(function() {
	                avalon.log( '服务异常，请重试');
	            });
	        },
	        /*data返回参数说明:
	         认证状态
	         130采购商认证未审核      131采购商认证审核通过       132采购商认证失败
	         140供应商认证未审核    141供应商认证审核通过     142供应商认证失败
	         150品牌商认证未审核         151品牌商认证审核通过      152品牌商认证失败
	         升级认证状态
	         2340采购商升级供应商未审核     2341采购商升级供应商审核通过(理论上升级通过之后只保留最高级认证状态.)       2342采购商升级供应商失败
	         2350采购商升级品牌商未审核      2351采购商升级品牌商审核通过(理论上升级通过之后只保留最高级认证状态.)       2352采购商升级品牌商失败
	         2450供应商升级品牌商未审核      2451供应商升级品牌商审核通过(理论上升级通过之后只保留最高级认证状态.)        2452供应商升级品牌商失败
	         002数据有误           001未认证*/
	        onClickNav:function(e){
	            //i=parseInt(i);
	            var i=parseInt(avalon(e.target).attr('dataNav'));
	           // if(i==this.selectindex) return;
	            var url=[
	                'jibenxinxi.html', //基本信息
	                'new-company.html', //公司信息'companyMessage.html', //公司信息
	                null,//子账号管理
	                'weirenzheng.html',//资质认证   这里需要根据当臆的认证状态来跳转不同的页面
	                'xiugaimima.html',//修改密码<
	                'zhanghaoanquan.html',//账号安全
	                'zhanghaoguanli.html'//账号管理
	            ]
	            url[i]&&(location.href=url[i]);
	        },
	        selectindex:0,
	        onReady: function () {

	        },
	        onViewChange: function () {
	            console.log('onViewChange')
	        },
	        onDispose: function () {
	            console.log('onDispose')
	        },
	    }
	})

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = "<div class=\"guangLi-left d-i lt\">\r\n    <div class=\"guangLi-left-img\">\r\n        <img  alt=\"\"/>\r\n    </div>\r\n    <p class=\"d-i t-c\">水贝万山前隆珠宝园旗舰店</p>\r\n    <div class=\"guanLi-dl\"  ms-on-click=\"@onClickNa\" dataNav=\"6\">\r\n        <span class=\"d-i lt guanLi-dl-s1\">账号管理</span>\r\n        <span class=\"d-i rt guanLi-dl-s2\">&gt;</span>\r\n    </div>\r\n    <ul>\r\n        <li ms-on-click=\"@onClickNav\" dataNav=\"0\" ms-class=\"{'guanLi-active':(@selectindex==0)}\"><b ms-visible=\"@selectindex==0\"></b>基本信息</li>\r\n        <li ms-on-click=\"@onClickNav\" dataNav=\"1\" ms-class=\"{'guanLi-active':(@selectindex==1)}\"><b ms-visible=\"@selectindex==1\"></b>公司信息</li>\r\n        <li ms-on-click=\"@onClickNav\" dataNav=\"2\" ms-class=\"{'guanLi-active':(@selectindex==2)}\"><b ms-visible=\"@selectindex==2\"></b>子账号管理</li>\r\n        <li ms-on-click=\"@onClickNav\" dataNav=\"3\" ms-class=\"{'guanLi-active':(@selectindex==3)}\"><b ms-visible=\"@selectindex==3\"></b>资质认证</li>\r\n        <li ms-on-click=\"@onClickNav\" dataNav=\"4\" ms-class=\"{'guanLi-active':(@selectindex==4)}\"><b ms-visible=\"@selectindex==4\"></b>修改密码</li>\r\n        <li ms-on-click=\"@onClickNav\" dataNav=\"5\" ms-class=\"{'guanLi-active':(@selectindex==5)}\"><b ms-visible=\"@selectindex==5\"></b>账号安全</li>\r\n    </ul>\r\n</div>";

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/6/8.
	 */
	var tmpl = __webpack_require__(100)
	avalon.component('ms-footer', {
	    template: tmpl,
	    defaults: {
	    }
	})

/***/ },
/* 100 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui-footer\">\r\n    <div class=\"link-footer\">\r\n        <a href=\"index.html?menu=index\" title=\"首页\">首页</a>\r\n        <span class=\"line\">|</span>\r\n        <a href=\"#\" title=\"珠宝分销\">珠宝分销</a>\r\n        <span class=\"line\">|</span>\r\n        <a href=\"#\" title=\"门店入驻\">门店入驻</a>\r\n        <span class=\"line\">|</span>\r\n        <a href=\"#\" title=\"创客开店\">创客开店</a>\r\n        <span class=\"line\">|</span>\r\n        <a href=\"#\" title=\"新闻中心\">新闻中心</a>\r\n        <span class=\"line\">|</span>\r\n        <a href=\"#\" title=\"帮助中心\">帮助中心</a>\r\n        <span class=\"line\">|</span>\r\n        <a href=\"#\" title=\"消费保障\">消费保障</a>\r\n    </div>\r\n    <p class=\"copyright\">Copyright © 金中国 All Rights Reserved 版权所有 复制必究 粤ICP备12027965号-2</p>\r\n</div>";

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/6/12.
	 */
	var tmpl = __webpack_require__(102)
	avalon.component('ms-dialog', {
	    template: tmpl,
	    defaults: {
	        title:'验证手机',
	        body:'',
	        maskHeight:'100%',//avalon(document).height()
	        maskWidth:'100%',
	        toggle:false,
	        onInit: function () {
	            console.log('onInit')
	        },
	        onReady: function () {
	            this.maskHeight=avalon(document).height();
	            this.maskWidth=avalon(document).width();
	            console.log('onReady')
	        },
	        onViewChange: function () {
	            console.log('onViewChange')
	        },
	        onDispose: function () {
	            console.log('onDispose')
	        },
	        close:function(){
	            this.toggle=false;
	        },
	        open:function(tlp){
	            this.toggle=true;
	            this.temlp=tlp;
	        }
	    }
	    ,soleSlot: 'body'
	})

/***/ },
/* 102 */
/***/ function(module, exports) {

	module.exports = "<span ms-visible=\"@toggle\">\r\n    <span class=\"system-tip-zzc d-i\" ms-css=\"[{height:@maskHeight}]\"></span>\r\n    <span class=\"system-tip-text d-i\">\r\n        <span class=\"system-tip-text-top d-i t-c\">\r\n            <span ms-text=\"@title\"></span>\r\n            <b class=\"d-i\" ms-click=\"@close\"></b>\r\n        </span>\r\n        <slot name=\"body\"></slot>\r\n    </span>\r\n</span>";

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/6/13.
	 */
	var config=__webpack_require__(92)
	var tmpl = __webpack_require__(104)
	avalon.component('ms-upload', {
	    template: tmpl,
	    defaults: {
	        upId:'',//定义表单ID,必填参数，
	        title:'',//提示标题
	        content:'',
	        upUrl:'/fileService/file',
	        done:avalon.noop,//上传完成回调
	        imgscon:'',
	        imgID:'',
	        //completeImg:'',//上传图片服务端路径
	        fileChange:function(){
	            this.upForm=document.getElementById(this.upId);
	            //this.upinput=document.getElementById(this.upInputId);
	            this.upForm[0].click();
	        },
	        fileName:'',
	        //两个节点
	        upinput:null,
	        upForm:null,
	        newObjID:'',
	        onSelectChange:function(){
	            var vm=this;
	            vm.upForm=document.getElementById(this.upId);
	                var formData=new FormData(vm.upForm.$model);
	            formData.append(vm.upForm[0].name, vm.upForm[0].files[0])
	               // formData.append(vm.upForm[0].name, vm.upForm[0].value);
	                avalon.ajax({
	                    contentType: "multipart/form-data",
	                    form: formData, //这是一个formData 对象,详看这里https://developer.mozilla.org/zh-CN/docs/Web/Guide/Using_FormData_Objects
	                    type: "post", //get也可以
	                    url: vm.upUrl,
	                    //success: callback,
	                    dataType: 'json' //你想返回什么类型的数据给你
	                }).done(function(ret) {
	                    if(ret['fileName']){
	                        document.getElementById(vm.imgID).src='/fileService/file/'+ret['fileName'];
	                    }
	                    vm.done&&vm.done(ret);
	                }).fail(function() {
	                    avalon.log( '服务异常，请重试');
	                })
	        },
	        onInit: function () {
	            this.imgID='img'+config.uuid();
	            this.upId=config.uuid();
	        },
	        onReady: function () {

	        },
	        onViewChange: function () {
	            console.log('onViewChange')
	        },
	        onDispose: function () {
	            console.log('onDispose')
	        },
	    }
	})

/***/ },
/* 104 */
/***/ function(module, exports) {

	module.exports = "<div class=\"companyMessage-scimg clr\">\r\n   <div class=\"d-i lt companyMessage-scimg-show\">\r\n        <img ms-attr=\"{id:@imgID}\" alt=\"\">\r\n    </div>\r\n    <i class=\"d-i lt newADD-i1\" ms-text=\"@title\" ms-visible=\"@title!=''\">\r\n    </i>\r\n    <i class=\"d-i lt newADD-i2\" ms-html=\"@content\" ms-visible=\"@content!=''\">\r\n    </i>\r\n    <span class=\"d-i lt\" style=\"width: 100%;margin:5px 0 -25px 20px;height: 0;\" ms-text=\"@imgscon\"  ms-visible=\"@imgscon!=''\"></span>\r\n    <span class=\"d-i lt newADD-bu\" style=\"width: 100%;height: 42px;margin-left: 0;\">\r\n        <input type=\"button\" value=\"上传图片\" style=\"width: 20%\" ms-on-click=\"@fileChange()\">\r\n    </span>\r\n    <form style=\"display: none;\" ms-attr=\"{id:@upId,action:@upUrl}\"  method=\"post\" enctype=\"multipart/form-data\">\r\n        <input type=\"file\" name=\"file\" multiple=\"\"  ms-on-change=\"@onSelectChange()\">\r\n    </form>\r\n</div>";

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by Administrator on 2016/7/18.
	 */
	var config=__webpack_require__(92)
	var style = __webpack_require__(106)
	var tmpl = __webpack_require__(112)
	avalon.component('ms-uploader', {
	    template: tmpl,
	    defaults: {
	       /* upId:'',//定义表单ID,必填参数，
	        title:'',//提示标题
	        content:'',
	        upUrl:'/fileService/file', //上传URL
	        done:avalon.noop,//上传完成回调
	        imgscon:'',
	        imgID:'',
	        //completeImg:'',//上传图片服务端路径
	        fileChange:function(){
	            this.upForm=document.getElementById(this.upId);
	            //this.upinput=document.getElementById(this.upInputId);
	            this.upForm[0].click();
	        },
	        fileName:'',
	        //两个节点
	        upinput:null,
	        upForm:null,
	        newObjID:'',
	        onSelectChange:function(){
	            var vm=this;
	            vm.upForm=document.getElementById(this.upId);
	            var formData=new FormData(vm.upForm.$model);
	            formData.append(vm.upForm[0].name, vm.upForm[0].files[0])
	            // formData.append(vm.upForm[0].name, vm.upForm[0].value);
	            avalon.ajax({
	                contentType: "multipart/form-data",
	                form: formData, //这是一个formData 对象,详看这里https://developer.mozilla.org/zh-CN/docs/Web/Guide/Using_FormData_Objects
	                type: "post", //get也可以
	                url: vm.upUrl,
	                //success: callback,
	                dataType: 'json' //你想返回什么类型的数据给你
	            }).done(function(ret) {
	                if(ret['fileName']){
	                    document.getElementById(vm.imgID).src='/fileService/file/'+ret['fileName'];
	                }
	                vm.done&&vm.done(ret);
	            }).fail(function() {
	                avalon.log( '服务异常，请重试');
	            })
	        },*/
	      /*  onInit: function () {
	            this.imgID='img'+config.uuid();
	            this.upId=config.uuid();
	        },
	        onReady: function () {

	        },
	        onViewChange: function () {
	            console.log('onViewChange')
	        },
	        onDispose: function () {
	            console.log('onDispose')
	        }*/
	    }
	})

/***/ },
/* 106 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"images-body-c\">\r\n    <span class=\"images-body-s1\">商品图片：</span>\r\n</div>\r\n<div class=\"images-body-d\">\r\n    <ul>\r\n        <li class=\"images-posi\">\r\n            <span class=\"zt\"></span>\r\n            <img src=\"" + __webpack_require__(113) + "\" alt=\"\"/>\r\n\r\n        </li>\r\n        <li>\r\n            <img src=\"" + __webpack_require__(114) + "\" alt=\"\"/>\r\n            <p class=\"images-opa\">\r\n                <span>设为</span>\r\n                <span>更改</span>\r\n                <span>删除</span>\r\n            </p>\r\n        </li>\r\n        <li>\r\n            <img src=\"" + __webpack_require__(113) + "\" alt=\"\"/>\r\n            <p class=\"images-opa\">\r\n                <span>设为</span>\r\n                <span>更改</span>\r\n                <span>删除</span>\r\n            </p>\r\n        </li>\r\n        <li>\r\n            <img src=\"" + __webpack_require__(114) + "\" alt=\"\"/>\r\n            <p class=\"images-opa\">\r\n                <span>设为</span>\r\n                <span>更改</span>\r\n                <span>删除</span>\r\n            </p>\r\n        </li>\r\n\r\n        <li class=\"images-active\">\r\n            <span class=\"move-sz\"></span>\r\n            <span class=\"move-show\">添加商品图片</span>\r\n            <span class=\"move-action\">（可多选，最多<span>3</span>张）</span>\r\n        </li>\r\n    </ul>\r\n    <p class=\"images-guize\">建议尺寸：<b>900*900</b>像素，仅支持<b>png，jpg</b>和<b>gif</b>格式，文件大小不要超过<b>2M</b>；默认<b>第一张未商品主图</b>，可以<b>拖曳图片调整顺序</b>。</p>\r\n</div>\r\n";

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "./images/8d55dc7dab42ebbc2000d649c325eade.png";

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "./images/74529a8a3bd30aa67a0bfb82e09bd516.png";

/***/ },
/* 115 */
/***/ function(module, exports) {

	/**
	 * add auto hide when mouse moveout
	 * 
	 * @version 1.0.1 
	 * @date 2010-11-23
	 * @author coraldane@gmail.com
	*/

	/**   
	 * Date Picker
	 * @param   inputObj  The input object want to contain date.
	 * @param   dateFormatStyle  Default Date Formatter is "yyyy-MM-dd", you could use your own defined format.
	 * @param   beginDate Default value is 1990-01-01
	 * @param   endDate   Default value is 2020-01-01
	 * @param   lang      0(English)|1(Chinese)  Default Language is 0(English).
	 */
	function setday(inputObj,dateFormatStyle,beginDate,endDate,lang){
		if(null == inputObj){return null;}
		new Calendar(inputObj,dateFormatStyle,beginDate,endDate,lang).show();
	}

	/**   
	 * Month Picker
	 * @param   inputObj  The input object want to contain date.
	 * @param   dateFormatStyle  Default Date Formatter is "yyyy-MM", you could use your own defined format.
	 * @param   beginDate Default value is 1990-01
	 * @param   endDate   Default value is 2020-01
	 * @param   lang      0(English)|1(Chinese)  Default Language is 0(English).
	 */
	function setmonth(inputObj,dateFormatStyle,beginDate,endDate,lang){
		if(null == inputObj){return null;}
		new Calendar(inputObj,dateFormatStyle,beginDate,endDate,lang,"m").show();
	}

	/**
	Calendar Style
	*/
	Calendar.prototype.style = function(){
		var strStyle = "<style type='text/css'>";
		strStyle += ".calendar {font-size:12px; margin:0;padding:0px;border:1px solid #397EAE;background-color:#DBE7F2;}";
		strStyle += ".calendar ul {list-style-type:none; margin:0; padding:0;vertical-align:middle;}";
		strStyle += ".calendar li {float:left;}.calendar b{font-weight:bold;}";
		strStyle += ".calendar .day li {height:20px;}";
		strStyle += ".calendar .day li,.calendar .date li{float:left;width:14.13%;height:20px;line-height:20px;text-align:center;}";
		strStyle += ".calendar .day li{font-weight:bold;} .calendar .date li{background-color:#EDF3F9;}";
		strStyle += ".calendar .month li{float:left;width:24.8%;height:20px;line-height:20px;text-align:center;background-color:#EDF3F9;}";
		strStyle += ".calendar li a{ text-decoration:none; font-family:Tahoma; font-size:11px; color:#333}";
		strStyle += ".calendar li:hover {cursor:pointer;color:#f30; text-decoration:none;background-color:#EDF3F9;}";
		strStyle += ".calendar .date li:hover, .calendar .month li:hover{cursor:pointer;color:#f30; text-decoration:none;background-color:#DBE7F2;}";
		strStyle += ".calendarlihover {color:#f30;text-decoration:none;background-color:#E8F2FE;}";
		strStyle += ".calendar li a.hasArticle {font-weight:bold; color:#f60 !important}";
		strStyle += ".lastMonthDate, .nextMonthDate {color:#bbb;font-size:11px}";
		strStyle += ".selectThisYear, .selectThisMonth{text-decoration:none; margin:0px; color:#000; font-weight:bold}";
		strStyle += ".calendar .LastMonth, .calendar .NextMonth{text-decoration:none; color:#000; font-size:18px; font-weight:bold; line-height:16px;}";
		strStyle += ".calendarTitle{background:#EDF3F9;text-align:center;height:20px;line-height:20px;clear:both;width:100%;}";
		strStyle += ".calendarTitle .mark{text-decoration:none;color:#000;font-family:Tahoma;font-size:18px;font-weight:normal;}";
		strStyle += ".today{ background-color:#ffffaa;border:1px solid #f60;padding:0 1px;}";
		strStyle += ".today a { color:#f30; }";
		strStyle += ".calendarBottom {text-align:center;height:20px;line-height:20px;clear:both;width:100%;border-top:1px solid #ddd;}";
		strStyle += ".calendarBottom li{float:left;height:20px;line-height:20px;font-weight:bold;text-align:center;}";
		strStyle += "</style>";
		return strStyle;
	}

	/**
	//Classic Style
	Calendar.prototype.style = function(){
		var strStyle = "<style type='text/css'>";
		strStyle += ".calendar {font-size:12px; margin:0;padding:0px;border:1px solid #397EAE;}";
		strStyle += ".calendar ul {list-style-type:none; margin:0; padding:0;vertical-align:middle;}";
		strStyle += ".calendar li {float:left;}.calendar b{font-weight:bold;}";
		strStyle += ".calendar .day { background-color:#EDF5FF; height:20px;}";
		strStyle += ".calendar .day li,.calendar .date li{ float:left; width:14.13%; height:20px; line-height:20px; text-align:center}";
		strStyle += ".calendar .month li{ float:left; width:24.8%; height:20px; line-height:20px; text-align:center}";
		strStyle += ".calendar li a{ text-decoration:none; font-family:Tahoma; font-size:11px; color:#333}";
		strStyle += ".calendar li:hover {cursor:pointer;color:#f30; text-decoration:none;background-color:#E8F2FE;}";
		strStyle += ".calendarlihover {color:#f30;text-decoration:none;background-color:#E8F2FE;}";
		strStyle += ".calendar li a.hasArticle {font-weight:bold; color:#f60 !important}";
		strStyle += ".lastMonthDate, .nextMonthDate {color:#bbb;font-size:11px}";
		strStyle += ".selectThisYear, .selectThisMonth{text-decoration:none; margin:0px; color:#000; font-weight:bold}";
		strStyle += ".calendar .LastMonth, .calendar .NextMonth{text-decoration:none; color:#000; font-size:18px; font-weight:bold; line-height:16px;}";
		strStyle += ".calendarTitle {text-align:center;height:20px;line-height:20px;clear:both;width:100%;}";
		strStyle += ".calendarTitle .mark{text-decoration: none;color:#000;font-family:Tahoma;font-size:18px;font-weight:normal;line-height: 16px;}";
		strStyle += ".today{ background-color:#ffffaa;border:1px solid #f60;padding:0 1px;}";
		strStyle += ".today a { color:#f30; }";
		strStyle += ".calendarBottom {text-align:center;height:20px;line-height:20px;clear:both;width:100%;border-top:1px solid #ddd;}";
		strStyle += ".calendarBottom li{float:left;height:20px;line-height:20px;font-weight:bold;text-align:center;}";
		strStyle += "</style>";
		return strStyle;
	}
	*/

	function getFrameDocument(frame){
		if ( frame.contentDocument ) { // DOM
	        var doc = frame.contentDocument;
	    } else if (frame.contentWindow) { // IE win
	        var doc = frame.contentWindow.document;
	    }
	    return doc;
	}

	/**   
	 * Parse Date value from String   
	 * @param format the pattern of date   
	 */   
	String.prototype.toDate = function(format){
		if(null == format) format="yyyy-MM-dd";
		var pattern = format.replace("yyyy", "(\\~1{4})").replace("yy", "(\\~1{2})")
			.replace("MM", "(\\~1{2})").replace("M", "(\\~1{1,2})")
			.replace("dd", "(\\~1{2})").replace("d", "(\\~1{1,2})").replace(/~1/g, "d");
		
		var returnDate;
		if (new RegExp(pattern).test(this)) {
		    var yPos = format.indexOf("yyyy");
		    var mPos = format.indexOf("MM");
		    var dPos = format.indexOf("dd");
		    if (mPos == -1) mPos = format.indexOf("M");
		    if (yPos == -1) yPos = format.indexOf("yy");
		    if (dPos == -1) dPos = format.indexOf("d");
		    var pos = new Array(yPos + "y", mPos + "m", dPos + "d");
		    var data = { y: 0, m: 0, d: 1};
		    var m = this.match(pattern);
		    for (var i = 1; i < m.length; i++) {
		        if (i == 0) return;
		        var flag = pos[i - 1].split('')[1];
		        data[flag] = m[i];
		        //alert(pos[i-1] + ",flag:"+flag + ",i:" + i + "," + data[flag]);
		    };
			
		    if (data.y.toString().length == 2) {
		        data.y = parseInt("20" + data.y);
		    }
		    data.m = data.m - 1;
		    returnDate = new Date(data.y, data.m, data.d);
		}
		if (returnDate == null || isNaN(returnDate)) returnDate = new Date();
		return returnDate;
	 
	};

	/**   
	 * Date Format 
	 * @param style date format like 'yyyyMMdd'
	 */   
	Date.prototype.format = function(style) {
	  var o = {   
	    "M+" : this.getMonth() + 1, //month   
	    "d+" : this.getDate(),      //day   
	    "h+" : this.getHours(),     //hour   
	    "m+" : this.getMinutes(),   //minute   
	    "s+" : this.getSeconds(),   //second   
	    "w+" : "日一二三四五六".charAt(this.getDay()),   //week   
	    "q+" : Math.floor((this.getMonth() + 3) / 3),  //quarter   
	    "S"  : this.getMilliseconds() //millisecond   
	  }   
	  if(/(y+)/.test(style)) {   
		style = style.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));   
	  }
	  for(var k in o){
	    if(new RegExp("("+ k +")").test(style)){   
	      style = style.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));   
	    }
	  } 
	  return style;
	};

	/**
	Date add by interval
	@param interval y  Year,m  Month,d  Day,w  Week
	@param number

	*/
	Date.prototype.dateAdd = function(interval, number) {
		switch (interval) {
		  case "y":
			return new Date(this.getFullYear() + number, this.getMonth(), this.getDate());
			break;
		  case "m":
			return new Date(this.getFullYear(), this.getMonth() + number, checkDate(this.getFullYear(), this.getMonth() + number, this.getDate()));
			break;
		  case "d":
			return new Date(this.getFullYear(), this.getMonth(), this.getDate() + number);
			break;
		  case "w":
			return new Date(this.getFullYear(), this.getMonth(), 7 * number + this.getDate());
			break;
		}
	}

	function checkDate(year, month, date){
		var enddate = ["31", "28", "31", "30", "31", "30", "31", "31", "30", "31", "30", "31"];
		var returnDate = "";
		if (year % 4 == 0) {
			enddate[1] = "29";
		}
		if (date > enddate[month]) {
			returnDate = enddate[month];
		} else {
			returnDate = date;
		}
		return returnDate;
	}

	/**
	Calendar language pack
	default support english and chinese,if you want to add some other language, please extend it.
	*/
	Calendar.language = {
		"title":[["",""],["年","月"]],
		"months":[["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"],
				["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
	        	],
		"weeks":[["S","M","T","W","T","F","S"],
	  			["日","一","二","三","四","五","六"]
				],
		weekday:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
		"clear":[["Clear"], ["清空"]],
		"today":[["Today","Current"], ["今天","当月"]],
		"close":[["Close"], ["关闭"]]  
	};

	/**   
	 * Calendar class 
	 * @param   beginDate 1990-01-01
	 * @param   endDate   2020-01-01
	 * @param   lang      0(English)|1(Chinese)  
	 * @param   dateFormatStyle  "yyyy-MM-dd";
	 * @param   type  d Date Picker/m Month Picker 
	 * @version 2010-08-20
	 * @author  Coral(coraldane@gmail.com) 
	 * @update 
	 */   
	function Calendar(inputObj, dateFormatStyle, beginDate, endDate, lang, type) {   
	  this.beginDate = "1900-01-01".toDate();
	  this.endDate = "2020-01-01".toDate();
	  this.lang = 0; //default language
	  this.type = "d";
	  this.dateFormatStyle = "yyyy-MM-dd";
	  
	  if(null != type){
	  	this.type = type;
	  	if("m" == this.type){
	  		this.dateFormatStyle = "yyyy-MM";
	  	}
	  }
	  
	  if (dateFormatStyle != null){
	    this.dateFormatStyle = dateFormatStyle;
	  }
	  
	  this.currentDate = new Date();
	  
	  var currDate = new Date();
	  if(null != inputObj.value && "" != inputObj.value){
	  	currDate = inputObj.value.toDate(this.dateFormatStyle);
	  }
	  
	  if(null != currDate){
	  	this.date = currDate;
	  }else{
	  	this.date = new Date();
	  }
	  
	  
	  if (null != beginDate){
	    this.beginDate = beginDate;
	  }
	  if(null != endDate){
	  	this.endDate = endDate;
	  }
	  if (lang != null){
	    this.lang = lang;
	  }
	  
	  this.dateControl = inputObj;
	  this.panel = document.getElementById("calendarPanel");
	  this.iframe = document.getElementById("calendarIframe");
	  this.isFocus = false;
	  
	  this.draw();
	}

	Calendar.prototype.draw = function() {   
	  var currDate = this.date.format("yyyy-MM").toDate("yyyy-MM");
	  if(currDate < this.beginDate){
	  	this.date = this.beginDate;
	  }
	  
	  if(currDate > this.endDate){
	  	this.date = this.endDate;
	  }
	  
	  this.year = this.date.getFullYear();
	  this.month = this.date.getMonth();
	  var head  = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
		'<html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />' +
	  this.style() + '</head><body style="padding:0px;margin:0px;">';   
	  var thisMonthFirstDate = this.date.dateAdd("d",1-this.date.getDate());
	  var lastMonthEndDate = thisMonthFirstDate.dateAdd("d",-1);
	  var lastMonthDate =  thisMonthFirstDate.getDay();
	  lastMonthEndDate = lastMonthEndDate.getDate();
	  var thisMonthLastDate = thisMonthFirstDate.dateAdd("m",1).dateAdd("d",-1);
	  var thisMonthEndDate = thisMonthLastDate.getDate();
	  var thisMonthEndDay = thisMonthLastDate.getDay();
	  
	  var lis = "<div id='calendar' class='calendar' style='width:";
	  if("d" == this.type){
	  	lis += "180";
	  }else{
	  	lis += "150";
	  }
	  lis += "px;'>";
	  lis += "<div class='calendarTitle'><ul>";
	  lis += "<li id='PrevYear' class='mark' style='width:12%;' title='Previous Year'>&laquo;</li>";
	  if("d" == this.type){
	  	lis += "<li id='PrevMonth' class='mark' style='width:12%;' title='Previous Month'>&lsaquo;</li>";
	    lis += "<li style='width:30%;'><span id='selectThisYear' class='selectThisYear'>" + this.date.getFullYear() + "</span>" + Calendar.language["title"][this.lang][0] + "</li>";
	  	if(0 == this.lang){
	  		lis += "<li style='width:20%;'><span id='selectThisMonth' class='selectThisMonth'>" + Calendar.language["months"][this.lang][this.date.getMonth()] + "</span></li>";
	  	}else{
	  		lis += "<li style='width:20%;'><span id='selectThisMonth' class='selectThisMonth'>" + (this.date.getMonth() +1) + "</span>" + Calendar.language["title"][this.lang][1] + "</li>";
	  	}
	  	lis += "<li id='NextMonth' class='mark' style='width:12%;' title='Next Month'>&rsaquo;</li>";
	  	lis += "<li id='NextYear' class='mark' style='width:12%;' title='Next Year'>&raquo;</li></ul></div>";
		lis += "<div class='calendarBody'>";
	  	lis += "<ul class='day'>";
	  	for(var i=0;i<Calendar.language.weeks[this.lang].length;i++){
	  		lis += "<li title='" + Calendar.language.weekday[i] + "'>" + Calendar.language.weeks[this.lang][i] + "</li>";
	  	}
	  	lis += "</ul><ul class='date' id='thisMonthDate'>";
	  	var lastMonthLis = "";
	  	for (var i = 0; i < lastMonthDate; i++) { // Last Month's Date
	  		//alert(lastMonthDate + "," + lastMonthEndDate);
			lastMonthLis = "<li class='lastMonthDate'>" + lastMonthEndDate + "</li>" + lastMonthLis;
			lastMonthEndDate--;
		}
		lis += lastMonthLis;
		for (i = 1; i <= thisMonthEndDate; i++) { // Current Month's Date
			var currentDate = thisMonthFirstDate.dateAdd("d",(i-1));
			if(currentDate < this.beginDate || currentDate > this.endDate){
				lis += "<li class='lastMonthDate'>" + i + "</li>";
	  			continue;
			}
			lis += "<li class='thisMonth' title='" + currentDate.format("yyyy-MM-dd") + "'><a href='javascript:void(0);' ";
			if(currentDate.format("yyyy-MM-dd") == (this.date).format("yyyy-MM-dd")){
				lis += "class='today' ";
			}
			lis += ">" + i + "</a></li>";
		}
		var j = 1;
		for (i = thisMonthEndDay; i < 6; i++) { // Next Month's Date
			lis += "<li class='nextMonthDate'>" + j + "</li>";
			j++;
		}
	  	lis += "</ul>"
	  	
	  	lis += "</div>";//close calendarBody
		lis += "<div class='calendarBottom'><ul>";
		lis += "<li id='emptyCalendar' style='width:27%;' title='Clear'>" + Calendar.language.clear[this.lang] +"</li>";
		lis += "<li id='selectCurrent' style='width:45%;' title='Today'>" + Calendar.language.today[this.lang][0] +"</li>";
	  }else{
	  	lis += "<li style='width:74%;'><span id='selectThisYear' class='selectThisYear'>" + this.date.getFullYear() + "</span>" + Calendar.language["title"][this.lang][0] + "</li>";
	  	lis += "<li id='NextYear' class='mark' style='width:12%;' title='Next Year'>&raquo;</li></ul></div>";
	  	lis += "<div class='calendarBody'>";
	  	lis += "</ul><ul class='month' id='thisMonth'>";
	  	for(var i=1; i<=12; i++){
	  		var currentDate = (this.year + "-" + (i>9?i:"0"+i)).toDate("yyyy-MM");
	  		if(currentDate < this.beginDate || currentDate > this.endDate){
	  			lis += "<li class='lastMonthDate'>" + i + "</li>";
	  			continue;
	  		}
	  		lis += "<li class='thisMonth' title='" + this.year + "-" + (i>9?i:"0"+i) + "-01'><a href='javascript:void(0);'";
	  		if((this.year+"-"+(i>9?i:"0"+i)) == (this.date).format("yyyy-MM")){
	  			lis += " class='today' ";
	  		}
	  		lis += ">" + i + "</a></li>";
	  	}
	  	lis += "</ul>"
	  	
	  	lis += "</div>";//close calendarBody
		lis += "<div class='calendarBottom'><ul>";
		lis += "<li id='emptyCalendar' style='width:27%;' title='Clear'>" + Calendar.language.clear[this.lang] +"</li>";
		lis += "<li id='selectCurrent' style='width:45%;' title='Current Month'>" + Calendar.language.today[this.lang][1] +"</li>";
	  }
	  
	  lis += "<li id='closeCalendar' style='width:27%;' title='Close'>" + Calendar.language.close[this.lang] +"</li>";
	  lis += "</ul></div>";//close calendarBottom
	  lis += "</div>";//close calendar
	  lis += "</body></html>";
	  var doc = getFrameDocument(this.iframe);
	  doc.writeln(head);
	  doc.writeln(lis);
	  doc.close();
	  this.document = doc;
	  
	  this.bingEvent();
	}

	/**
	* Bind Click Event into Calendar
	*/
	Calendar.prototype.bingEvent = function(){
	  var calendar = this;
	  
	  this.setAutoHeight();
	    
	  this.panel.onmouseover = function(){calendar.isFocus = true;}
	  this.panel.onmouseout = function(){calendar.isFocus = false;}
	  
	  this.dateControl.onblur = function(){
	  	if(!calendar.isFocus){
	  		calendar.hide();
	  	}
	  }
	  
	  this.getElementById("selectCurrent").onclick = function(){
	  	calendar.date = new Date();
	  	calendar.valueSelected(calendar.date);
	  	calendar.hide();
	  }
	  this.getElementById("emptyCalendar").onclick = function(){calendar.dateControl.value = "";calendar.hide();}
	  this.getElementById("closeCalendar").onclick = function(){calendar.hide();}
	  
	  this.getElementById("PrevYear").onclick = function(){
	  	calendar.date = calendar.date.dateAdd("y",-1);
	  	calendar.draw();
	  }
	  
	  if(this.getElementById("PrevMonth")){
		  this.getElementById("PrevMonth").onclick = function(){
		  	calendar.date = calendar.date.dateAdd("m",-1);
		  	calendar.draw();
		  }
		  this.getElementById("NextMonth").onclick = function(){
		  	calendar.date = calendar.date.dateAdd("m",1);
		  	calendar.draw();
		  }
	  }
	  
	  this.getElementById("NextYear").onclick = function(){
	  	calendar.date = calendar.date.dateAdd("y",1);
	  	calendar.draw();
	  }
	  
	  this.getElementById("selectThisYear").onclick = function(){calendar.selectThisYear();}
	  if("d" == this.type){
	  	this.getElementById("selectThisMonth").onclick = function(){calendar.selectThisMonth();}
	  }
	  
	  var elements = getElementsByClassName(this.document, "li", "thisMonth");
	  for(var i=0; i<elements.length; i++){
		elements[i].onclick = function(){
			calendar.date = this.title.toDate();
		  	calendar.valueSelected(calendar.date);
		  	calendar.hide();
		}
	  }
	}

	Calendar.prototype.selectThisYear = function(){
		var calendar = this;
		var curYear = this.date.getFullYear();
		var beginYear = this.beginDate.getFullYear();
		var endYear = this.endDate.getFullYear();
		var spanObj = this.getElementById("selectThisYear");
		var selectStr = "<select style='font-size:10px;'>";
		for(var i = endYear; i >= beginYear; i--){
			selectStr += "<option value='" + i + "'>" + i + "</option>";
		}
		selectStr += "</select>";
		spanObj.innerHTML = selectStr;
		var selectYearObj = spanObj.childNodes(0);
		selectYearObj.value = curYear;
		selectYearObj.onchange = function(){
			calendar.date.setFullYear(selectYearObj.value);
			calendar.draw();
		}
	}

	Calendar.prototype.selectThisMonth = function(){
		var calendar = this;
		var curMonth = this.date.getMonth() + 1;
		var curYear = this.date.getFullYear();
		var endYear = this.endDate.getFullYear();
		var endMonth = 12;
		if(curYear == endYear){
			endMonth = this.endDate.getMonth + 1;
		}
		var spanObj = this.getElementById("selectThisMonth");
		var selectStr = "<select style='font-size:10px;'>";
		for(var i = 1; i <= endMonth; i++){
			selectStr += "<option value='" + i + "'>" + Calendar.language["months"][this.lang][i-1] + "</option>";
		}
		selectStr += "</select>";
		spanObj.innerHTML = selectStr;
		var selectMonthObj = spanObj.childNodes(0);
		selectMonthObj.value = curMonth;
		selectMonthObj.onchange = function(){
			calendar.date.setMonth(selectMonthObj.value-1);
			calendar.draw();
		}
	}

	Calendar.prototype.valueSelected = function(date){
		this.dateControl.value = date.format(this.dateFormatStyle);
	}

	/**
	* Set Auto Height for Calendar Panel Div
	*/
	Calendar.prototype.setAutoHeight = function(){
		var height = this.document.body.scrollHeight;
		var width = this.getElementById("calendar").style.width;
		width = (parseInt(width.substr(0,width.length-1)) + 2) + "px";
		height = (parseInt(height)+2) + "px";
		this.iframe.style.height = height;

		this.panel.style.height = height;
		this.panel.style.width = width;
	}

	//Extend document.getElementById(id)
	Calendar.prototype.getElementById = function(id){
	  if (typeof(id) != "string" || id == "") return null;
	  if(null == this.document) return null;
	  if (this.document.getElementById) return this.document.getElementById(id);   
	  if (this.document.all) return this.document.all(id);   
	  try {return eval(id);} catch(e){ return null;}   
	}
	  
	//Extend object.getElementsByTagName(tagName)   
	Calendar.prototype.getElementsByTagName = function(tagName){
	  if(null == this.document) return null;
	  if (this.document.getElementsByTagName) return this.document.getElementsByTagName(tagName);   
	  if (this.document.all) return this.document.all.tags(tagName);   
	}   

	/**
	* Find a HTML Object by TagName and className
	* @param oElm  parentNode Object
	* @param strTagName tag name want to find
	* @param strClassName class name
	*/
	function getElementsByClassName(oElm, strTagName, strClassName){  
	    var arrElements = (strTagName == "*" && oElm.all)? oElm.all:oElm.getElementsByTagName(strTagName);  
	    var arrReturnElements = new Array();  
	    strClassName = strClassName.replace(/\-/g, "\\-");  
	    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");  
	    var oElement;  
	    for(var i=0; i < arrElements.length; i++){  
	        oElement = arrElements[i];  
	        if(oRegExp.test(oElement.className)){  
	            arrReturnElements.push(oElement);  
	        }  
	    }  
	    return (arrReturnElements)  
	} 


	//find the absolute position
	Calendar.prototype.getAbsPoint = function (e){   
	  var x = e.offsetLeft;   
	  var y = e.offsetTop;   
	  while(e = e.offsetParent){   
	    x += e.offsetLeft;   
	    y += e.offsetTop;   
	  }   
	  return {"x": x, "y": y};   
	}   
	  
	//显示日历   
	Calendar.prototype.show = function () {
	  var xy = this.getAbsPoint(this.dateControl);
	  this.panel.style.left = xy.x + "px";
	  this.panel.style.top = (xy.y + this.dateControl.offsetHeight) + "px";
	  this.setDisplayStyle("select", "hidden");
	  this.panel.style.visibility = "visible";
	}

	//Hide Calendar   
	Calendar.prototype.hide = function() {
	  this.setDisplayStyle("select", "visible");
	  this.panel.style.visibility = "hidden";
	  this.isFocus = false;
	}
	  
	//Set Calendar Picker visible or invisible
	Calendar.prototype.setDisplayStyle = function(tagName, style) {   
	  var tags = this.getElementsByTagName(tagName)   
	  for(var i = 0; i < tags.length; i++) {   
	    if (tagName.toLowerCase() == "select" && 
	       (tags[i].name == "calendarYear" ||   
	      tags[i].name == "calendarMonth")){   
	      continue;
	    }
	    tags[i].style.visibility = style;   
	  }
	}

	document.write('<div id="calendarPanel" style="position:absolute;visibility:hidden;z-index:9999;background-color:#FFFFFF;font-size:12px;width:20px;">');
	document.write("<iframe id='calendarIframe' scrolling='no' frameborder='0' width='100%' height='100%'></iframe></div>");

	module.exports={
		setday:setday,
		setmonth:setmonth
	}

/***/ }
]);