// ==UserScript==
// @version		1.0.0.1
// @updateurl		https://github.com/cPJerry/Tweaks/raw/master/smaller_pacha_notes.user.js
// @name                Small Pacha Notes
// @include             https://staff.cpanel.net/staff/msg.new.cgi?*
// @include             https://dec.cpanel.net/staff/msg.new.cgi?*
// @include             https://hex.cpanel.net/staff/msg.new.cgi?*
// @include             https://oct.cpanel.net/staff/msg.new.cgi?*
// ==/UserScript==
$('.pacha_note_container').children('.internal_note_container').children('span').each(function() {
	$(this).attr('style','float: left; width: 100%; word-wrap: break-word; ');
});

