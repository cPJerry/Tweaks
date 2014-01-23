// ==UserScript==
// @name                Ticket Classify
// @include             https://staff.cpanel.net/staff/*
// @include             https://dec.cpanel.net/staff/*
// @include             https://hex.cpanel.net/staff/*
// @include             https://oct.cpanel.net/staff/*
// ==/UserScript==
function addClass(type2) {
    var pri = $('[id="'+type2+'"]');
    pri.addClass( "ticketsLink" );
    for (var i=0;i<$('[id="'+type2+'"] tr').length+1;i++) {
        var tid =   pri.find('tr:nth-child('+i+') td:nth-child(1)');
        var handler =   pri.find('tr:nth-child('+i+') td:nth-child(5)');
        var re1='(<[^>]+>)';	// Tag 1
        var re2='(\\d+)';	// Integer Number 1
        var re3='(<[^>]+>)';	// Tag 2
        var p = new RegExp(re1+re2+re3,["i"]);
        var m = p.exec(tid.html());
        if (m != null) {
            var id=m[2];
            var txt = "<a href='javascript:classifyTKT(\""+id+"\");'>Not a defect</a>";
            handler.html(txt);            
        } else {
            continue;
        }
    }
}
addClass("Closed tickets that require your classification");
var script   = document.createElement("script");
script.type  = "text/javascript";
script.text  = 'function classifyTKT(id) {    $.post(         "https://staff.cpanel.net/staff/classify_ticket.cgi",        { class_id: "41", ticket_id: id, csrf_token: csrf_token },        function( data ) {            $(\'[id="\'+id+\'"]\' ).hide();        }    );}';               // use this for inline script
document.body.appendChild(script);
