// ==UserScript==
// @name       Remove FOGBUGZ
// @version		1.0.0.1
// @updateurl		https://github.com/cPJerry/Tweaks/raw/master/fb.user.js
// @include             https://staff.cpanel.net/staff/
// @include             https://staff.cpanel.net/staff/index.cgi*
// @include             https://dec.cpanel.net/staff/
// @include             https://dec.cpanel.net/staff/index.cgi*
// @include             https://hex.cpanel.net/staff/
// @include             https://hex.cpanel.net/staff/index.cgi*
// @include             https://oct.cpanel.net/staff/
// @include             https://oct.cpanel.net/staff/index.cgi*
// ==/UserScript==
$("#fogbugz_block").remove();
$("#fogbugz_link").remove();
