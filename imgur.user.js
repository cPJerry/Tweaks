// ==UserScript==
// @name        Imgur vote bar
// @namespace   http://www.jaswin.net
// @description Adds the vote bar back to imgur
// @updateurl 	https://raw.githubusercontent.com/cPJerry/Tweaks/master/imgur.user.js
// @include 	*imgur.com/gallery/*
// @author 	mcswindler
// @author ismywb
// @version     1.3
// @require     http://code.jquery.com/jquery-1.11.0.min.js
// @grant       None
// 
// ==/UserScript==

if (window.top != window.self) {//don't run on frames or iframes
    return;
}

var statBar = '<div class="stat-bar" style="width: 26%;height:6px;position: absolute;bottom: 20px;left: 216px;">\
<div class="up-bar" style="width:50%;background:#85Bf25;height:100%;float:left;border-bottom-left-radius: 4px;-moz-border-bottom-left-radius: 4px;-webkit-border-bottom-left-radius: 4px;  border-top-left-radius: 4px;-moz-border-top-left-radius: 4px;-webkit-border-top-left-radius: 4px;">\
</div>\
<div class="down-bar" style="width:50%;background:#e44;height:100%;float:left;border-bottom-right-radius: 4px;-moz-border-bottom-right-radius: 4px;-webkit-border-bottom-right-radius: 4px;  border-top-right-radius: 4px;-moz-border-top-right-radius: 4px;-webkit-border-top-right-radius: 4px;">\
</div>';
var css = '<style type="text/css">.favorited .icon-fav {color:#85BF25;}.up-bar.total{border-bottom-right-radius: 4px;-moz-border-bottom-right-radius: 4px;-webkit-border-bottom-right-radius: 4px;border-top-right-radius: 4px;-moz-border-top-right-radius: 4px;-webkit-border-top-right-radius: 4px;}.down-bar.total{border-bottom-left-radius: 4px;-moz-border-bottom-left-radius: 4px;-webkit-border-bottom-left-radius: 4px;}</style>';

var updateBar = function(data) {
    if($('.stat-bar').length < 1)
        $('.stats-link .left').parent().after(statBar);
    var total = data.ups + data.downs;
    var upPercent = 50;
    var downPercent = 50;
    if(total != 0) {
        upPercent = data.ups / total * 100;
        downPercent = data.downs / total * 100;
    }
    if(upPercent == 100)
        $('.stat-bar .up-bar').addClass('total');
    else
        $('.stat-bar .up-bar.total').removeClass('total');
    if(downPercent == 100)
        $('.stat-bar .down-bar').addClass('total');
    else
        $('.stat-bar .down-bar.total').removeClass('total');
    $('.stat-bar .up-bar').css({width: upPercent + '%'}).attr('title', data.ups + ' Upvotes');
    $('.stat-bar .down-bar').css({width: downPercent + '%'}).attr('title', data.downs + ' Downvotes');
};

var oldUrl = '';
var checkUrl = function() {
  	var url = unsafeWindow.location.href;
    if(oldUrl != url) 
        getNewImage(url);
    oldUrl = url;
};
var getNewImage = function(url) {
    url += '/comment/best/hit.json';
    $.get(url, function(data) {
        updateBar(data.data.image);
    }, 'json');
};

$(document).ready(function() {
    setInterval(checkUrl, 100);
    $('body').append(css);
	unsafeWindow.Imgur.getInstance()._.socket.on('imagePoints', updateBar);
});
