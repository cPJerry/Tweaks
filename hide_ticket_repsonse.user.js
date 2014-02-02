// ==UserScript==
// @version             1.0.0.2
// @updateurl           https://github.com/cPJerry/Tweaks/raw/master/hide_ticket_repsonse.user.js
// @name                Hide item
// @include             https://staff.cpanel.net/staff/msg.new.cgi?*
// @include             https://dec.cpanel.net/staff/msg.new.cgi?*
// @include             https://hex.cpanel.net/staff/msg.new.cgi?*
// @include             https://oct.cpanel.net/staff/msg.new.cgi?*
// ==/UserScript==
$('body').on("click","tr .stblheader2",function(){
	console.log("TEST");$(this).parent().children('tr').children('.customer_response_container').toggle();
    });
$('body').on("click","tr .stblheader2",function(){
	$(this).parent().children('tr').children('.employee_response_container').toggle();
    });
$('body').on("click","td .note_container > p",function(){
	$(this).parent().children('div .internal_note_container').toggle();
    });
