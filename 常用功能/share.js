/* 分享到微信，微博，QQ等*/
/*
 * params options={
 *       url:  [string] -- '要跳转的链接',
 *       title: [string] -- '标题',
 *       desc: [string] -- '内容',
 *       imgUrl: [string] -- '图片地址',
 *       success: [function]  -- '成功回调函数'
 *       error: [function] -- '失败回调函数'
 * }
 * qq浏览器和uc浏览器需要点击按钮才能调起分享，不能注入
 * uc浏览器分享了不了icon
 * */

/*judge QQ platform*/

var isQQ = function () {
    return navigator.userAgent.indexOf('QQ') > -1 && navigator.userAgent.indexOf('MQQBrowser/') == -1;
};

/* judge  WeiXin platform*/

var isWeiXin = function () {
    return navigator.userAgent.indexOf('MicroMessenger') > -1;
};

/*judge uc browser*/

var isUCBrowser = function () {
    return navigator.userAgent.indexOf('UCBrowser/') > -1;
};

/*judge qq browser*/

var isQQBrowser = function () {

    return navigator.userAgent.indexOf('MQQBrowser/') > -1;
};




/* uc browser share */
var UCBrowserShare = function (options) {

    if (typeof(ucweb) != "undefined") {
        // alert('is android');
        options.success && options.success();
        ucweb.startRequest("shell.page_share", [options.title, options.desc, options.url, '', "", "", ""]);

    } else {
        if (typeof(ucbrowser) != "undefined") {
            // alert('is ios');
            options.success && options.success();
            ucbrowser.web_share(options.title, options.desc, options.url, '', "", "", "");
        } else {
            options.error && options.error();
        }
    }

};

/* qq browser share */
var QQBrowserShare = function (options) {

    loadJSSDkAsync("//jsapi.qq.com/get?api=app.share", function () {
        // alert(typeof browser.app);
        // alert(typeof window.qb);
        var params = {
            url: options.url,
            title: options.title,
            description: options.desc,
            img_url: options.imgUrl,
            img_title: '',
            // to_app: 0,//微信好友1,腾讯微博2,QQ空间3,QQ好友4,生成二维码7,微信朋友圈8,啾啾分享9,复制网址10,分享到微博11,创意分享13
        };
        // alert(params.to_app);
        if (typeof(browser) != "undefined") {
            if (typeof(browser.app) != "undefined") {
                options.success && options.success();
                browser.app.share(params);
            } else {
                options.error && options.error();
            }
        }
    });
};

/* QQ share */
var QQShare = function (options) {

    loadJSSDkAsync('//qzonestyle.gtimg.cn/qzone/qzact/common/share/share.js', function () {
        jsonp('//wx.' + window.location.host.split('.')[1] + '.com/port/wechatjsapi.php', function (res) {
            options.success && options.success();
            setShareInfo({
                title: options.title, // 分享标题
                summary: options.desc, // 分享内容
                pic: options.imgUrl, // 分享图片
                url: options.url, // 分享链接

                // 微信权限验证配置信息，若不在微信传播，可忽略
                WXconfig: {
                    swapTitleInWX: true, // 是否标题内容互换（仅朋友圈，因朋友圈内只显示标题）
                    appId: res.appId, // 公众号的唯一标识
                    timestamp: res.timestamp, // 生成签名的时间戳
                    nonceStr: res.nonceStr, // 生成签名的随机串
                    signature: res.signature // 签名
                }
            });
        });
    })
};


/* Wechat share*/

var WeiXinShare = function (options) {
    initWxConfig();
    wx.ready(function doWeiXinShare() {
        var shareData = {
            title: options.title,
            link: options.url,
            desc: options.desc,
            imgUrl: options.imgUrl,
            success: options.success,
            cancel: options.error
        };
        wx.onMenuShareTimeline(shareData);  //share to friends
        wx.onMenuShareAppMessage(shareData);  //share to friend
        wx.onMenuShareQQ(shareData); // share to QQ
        wx.onMenuShareQZone(shareData); // share to QQ zone
    });
};


/* load js-sdk*/
var loadJSSDkAsync = function (url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.defer = true;
    script.sync = true;
    script.src = url;
    script.charset = 'utf-8';
    document.head.appendChild(script);
    script.onload = function () {
        callback && callback();
    };
};

/* cross domain to get data*/
var jsonp = function (url, callback) {
    var name = 'jsonpcallback';
    var script = document.createElement("script");

    window[name] = function () {
        callback.apply(null, arguments);
        window[name] = null;
        document.head.removeChild(script);
    };
    script.src = url + "?_=" + Date.now() + "&callback=" + name;
    document.head.appendChild(script);
};


/* init WeiXin config*/
var initWxConfig = function () {
    jsonp('//wx.' + window.location.host.split('.')[1] + '.com/port/wechatjsapi.php', function (res) {
        res.jsApiList = [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareQZone',
            'onMenuShareWeibo',
            'hideOptionMenu',
            'showOptionMenu'
        ];
        wx.config(res);
    });
};


if(!window.Share){
    window.Share = {
        isQQ: isQQ(),
        isWeiXin: isWeiXin(),
        isUCBrowser: isUCBrowser(),
        isQQBrowser: isQQBrowser(),
        isAPP: isAPP(),
        QQShare: QQShare,
        WeiXinShare:WeiXinShare,
        UCBrowserShare: UCBrowserShare,
        QQBrowserShare: QQBrowserShare,
        appShare:appShare,
        userLogin: userLogin,
    }
}