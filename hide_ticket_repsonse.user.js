// ==UserScript==
// @version		1.0.0.1
// @updateurl		https://github.com/cPJerry/Tweaks/raw/master/hide_ticket_repsonse.user.js
// @name                Hide item
// @include             https://staff.cpanel.net/staff/msg.new.cgi?*
// @include             https://dec.cpanel.net/staff/msg.new.cgi?*
// @include             https://hex.cpanel.net/staff/msg.new.cgi?*
// @include             https://oct.cpanel.net/staff/msg.new.cgi?*
// ==/UserScript==
$('.transactions_container').children('table').children('tbody').children('tr').children('.customer_response_container').parent().parent().children('.stblheader2').click(function() {
	$(this).parent().children('tr').children('.customer_response_container').toggle();
});

$('.transactions_container').children('table').children('tbody').children('tr').children('.employee_response_container').parent().parent().children('.stblheader2').click(function() {
	$(this).parent().children('tr').children('.employee_response_container').toggle();
});
$('.transactions_container').children('table').children('tbody').children('tr').children('.note_container').children('p').click(function() {
    $(this).parent().children('div').toggle();
});
