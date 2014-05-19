// ==UserScript==
// @name                AutoSSH
// @include             https://staff.cpanel.net/staff/msg.new.cgi?*
// @include             https://staff-lb.cpanel.net/staff/msg.new.cgi?*
// @include             https://dec.cpanel.net/staff/msg.new.cgi?*
// @include             https://hex.cpanel.net/staff/msg.new.cgi?*
// @include             https://oct.cpanel.net/staff/msg.new.cgi?*
// ==/UserScript==

function test() { alert(123);}
var func = "\
$('[name=\"whmlogin\"]').each(function() {\
  var divID = $(this).parent().attr('id');\
  if (divID != 'server_{{server_num}}') {\
    var id = divID.replace('server_','');\
    var id2 = 'cpwhm_info_'+id;\
    var tid = null;\
    $('#'+id2).children().each(function() {\
      if ($(this).attr('name') == 'ticket_id') {\
        tid = $(this).attr('value');\
      }\
    });\
    $('#'+id2).find('td span a').each(function() {\
      if ($(this).html() == 'SSH') {\
        $(this).attr('href','telnet://ticket@'+tid+':'+id);\
      };\
    });\
  };\
});";

setTimeout(func,5000);
