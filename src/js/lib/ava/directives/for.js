var update = require('./_update')

var rforPrefix = /ms-for\:\s*/
var rforLeft = /^\s*\(\s*/
var rforRight = /\s*\)\s*$/
var rforSplit = /\s*,\s*/
var rforAs = /\s+as\s+([$\w]+)/
var rident = /^[$a-zA-Z_][$a-zA-Z0-9_]*$/
var rinvalid = /^(null|undefined|NaN|window|this|\$index|\$id)$/
var reconcile = require('../strategy/reconcile')
var stringify = require('../strategy/parser/stringify')

//var Cache = require('../seed/cache')
//var cache = new Cache(312)


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
    diff: function (copy, src, cpList, spList, index) {
        //将curRepeat转换成一个个可以比较的component,并求得compareText
        var preRepeat = spList[index + 1]
        var curPepeat = cpList[index + 1]
        var end = spList[index + 2]
        //preRepeat不为空时
        src.preRepeat = preRepeat
        var cache = src.cache

        if (cache && src === copy) {
            return
        }
        //将循环区域转换为一个个组件
        var coms = prepareCompare(curPepeat, copy)
        if (cache && src.compareText === copy.compareText) {
            //如果个数与key一致,那么说明此数组没有发生排序,立即返回
            return
        }


        src.compareText = copy.compareText
        //for指令只做添加删除操作

        var i, c, p
        var removes = []
        if (!preRepeat.length) {//一维数组最开始初始化时
            /* eslint-disable no-cond-assign */
            cache = {}
            src.coms = coms
            spList[index + 1] = curPepeat
            for (i = 0; c = coms[i]; i++) {
                c.action = 'enter'
                saveInCache(cache, c)
            }

            src.cache = cache
            /* eslint-enable no-cond-assign */
        } else if (!cache) {//二维数组最开始初始化时
            var cache = {}
            src.coms = coms
            for (i = 0; i < coms.length; i++) {
                saveInCache(cache, coms[i])
            }
            src.cache = cache
            return
        } else {
            var newCache = {}
            /* eslint-disable no-cond-assign */
            var fuzzy = []
            for (i = 0; c = coms[i++]; ) {
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
            if (!src.coms) {
                src.coms = prepareCompare(preRepeat, src)
            }
            for (var i = 0, c; c = fuzzy[i++]; ) {
                p = fuzzyMatchCache(cache, c.key)
                if (p) {
                    p.action = 'move'
                    p.oldIndex = p.index
                    p.index = c.index
                } else {
                    p = c
                    p.action = 'enter'
                    src.coms.push(p)
                }
                saveInCache(newCache, p)
            }
            src.coms.sort(function (a, b) {
                return a.index - b.index
            })

            /* eslint-enable no-cond-assign */
            src.cache = newCache
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

        }
        src.removes = removes
        var cb = avalon.caches[src.wid]
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
        var doms = range.slice(1, -1)//
        range.pop()
        var DOMs = splitDOMs(doms, key)

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
        var domTemplate
        var keep = []

        for (var i = 0; i < vdom.coms.length; i++) {
            var com = vdom.coms[i]
            var children = com.children

            if (com.action === 'leave') {
                continue
            }

            keep.push(com)
            if (com.action === 'enter') {
//                if (!domTemplate) {
//                    //创建用于拷贝的数据,包括虚拟DOM与真实DOM 
//                  domTemplate = avalon.vdomAdaptor(children, 'toDOM')
//                }
//                var newFragment = domTemplate.cloneNode(true)
                var newFragment = avalon.vdomAdaptor(children, 'toDOM')
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
                    var moveFragment = document.createDocumentFragment()
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

        vdom.preRepeat.length = 0
        vdom.coms.length = 0
        keep.forEach(function (el) {
            vdom.coms.push(el)
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

