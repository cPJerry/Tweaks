// ==UserScript==
// @name                Ticket System Tweaks
// @version             3.0.1
// @description         Simple Tweaks for Ticket System
// @include             https://staff.cpanel.net/staff/
// @include             https://staff.cpanel.net/staff/index.cgi*
// @include             https://dec.cpanel.net/staff/
// @include             https://dec.cpanel.net/staff/index.cgi*
// @include             https://hex.cpanel.net/staff/
// @include             https://hex.cpanel.net/staff/index.cgi*
// @include             https://oct.cpanel.net/staff/
// @include             https://oct.cpanel.net/staff/index.cgi*
// ==/UserScript==
// COLORS
var hacked_ticket_color = "purple";
// You are unable to define what is a hacked ticket. If you really want to, inspect my code

var unassigned_color = "#FF0000";
var assigned_color = "#FF6600";
var not_your_level_unassigned_ticket_color = "#66FF99";
var not_your_level_assigned_ticket_color = "#3399FF";
var my_ticket_color = "#FF0000";

// Can Do Vars
var canDoComp = 1;
var canDoStd  =1;
var canDoPri = 1;
var canDoEP = 1;

// Ticket Queues
var bugReports = true;
var tickets = true;
var migrations = false;
var es = false;
var cloudlinux = true;
var accounts = false;
var cpgs = false;
var cs = false;
var sales = false;
var wintkt = false;

// Do you want to change all the colors?
var changeColor = 1;

// Whats your Level
var myLevel = 1;

/******************************************\
|      STOP HERE OR I CANNOT HELP YOU      |
\******************************************/

function addQueue(str) {
    var text = '<div class="queue_priority_titles">	<b>'+str+'</b></div><table id="'+str+'" style="display:visible" width="100%" cellspacing="1" cellpadding="2" class="sortable table-bordered table">	<tr width=100%>		<th class="header" width=5%>Id</th>		<th class="header" width=2%>L</th>		<th class="header" width=22%>Client</th>		<th class="header" width=41%>Subject</th>		<th class="header" width=8%>Handler</th>		<th class="header" width=5%>Type</th>		<th class="header" width=5%>Version</th>		<th class="header" width=5%>Updated</th>		<th class="header" width=5%>Duration</th>	</tr></table>';
    var el= "Complimentary";
    $('[id="'+el+'"]').after(text);
}
function isHackedTicket(str) {
    if (str.toLowerCase().indexOf("hack") >= 0) {return true;}
    if (str.toLowerCase().indexOf("compromise") >= 0){ return true;}
    if (str.toLowerCase().indexOf("deface") >= 0) {return true;}
    if (str.toLowerCase().indexOf("libkeyutils") >= 0) {return true;}
    return false;
}
var StDCmp = "rgb(255, 204, 204)";
var EntPri = "rgb(255, 153, 153)";
function initScript() {


    setColors('Enterprise Priority',null,canDoEP,null);
    setColors('My Tickets',my_ticket_color,1,1);
    setColors('Complimentary',null,canDoComp,null);
    setColors('Standard',null,canDoStd,null);
    setColors('Priority',null,canDoPri,null);
    setColors('Bug Reports',null,canDoPri,null);
    setColors('Scheduled Tasks',null,1,null);
}
function isMyLevel(level,queue) {
    
    if (myLevel == "1") {
        if (queue == "Enterprise Priority") {
            return (level == "1" || level == "2");
        } else {
            return(level == "1");
        }
    } else if (myLevel == "2") {
        return(level == "1" || level == "2");
    } else if (myLevel == "3") {
        return(level == "1" || level == "2" || level == "3");
    } else {
        return false;
    }
}
function isATicket(str) {
    if (str == "bugreport") { return bugReports;}
    if (str == "tickets") { return tickets;}
    if (str == "migrations") {return migrations;}
    if (str == "es-tickets") { return es;}
    if (str == "cloudlinux") { return cloudlinux;}
    if (str == "accounts") { return accounts;}
    if (str == "cpgs") { return cpgs;}
    if (str == "cs") { return cs;}
    if (str == "sales") { return sales;}
    if (str == "wintickets") { return wintkt;}
    return false;
}
var data = '';
function setColors(type2,color,canDo,mine) {
    if (changeColor == 0) return;
    var pri = $('[id="'+type2+'"]');
    pri.addClass( "ticketsLink" );
    for (var i=0;i<$('[id="'+type2+'"] tr').length+1;i++) {
        var item = pri.find('tr:nth-child('+i+')');
        var tid =   pri.find('tr:nth-child('+i+') td:nth-child(1)');
        var lvl =   pri.find('tr:nth-child('+i+') td:nth-child(2)');
        var client =   pri.find('tr:nth-child('+i+') td:nth-child(3)');
        var subject =   pri.find('tr:nth-child('+i+') td:nth-child(4)');
        var handler =   pri.find('tr:nth-child('+i+') td:nth-child(5)');
        var type =   pri.find('tr:nth-child('+i+') td:nth-child(6)');
        var ver =   pri.find('tr:nth-child('+i+') td:nth-child(7)');
        var updated =   pri.find('tr:nth-child('+i+') td:nth-child(8)');
        var dur =   pri.find('tr:nth-child('+i+') td:nth-child(9)');
        var color2 = tid.css("background-color");
        window.data = tid;
        if (mine == 1) {
            if (color2 == "rgb(255, 204, 204)") {
                setBG(pri,i,"Olive");
            }
            if (color2 == EntPri) {
                setBG(pri,i,"red");
            }
        } else {
            if (isATicket(type.html())) {
                
                if (isMyLevel(lvl.html(),type2) || handler.html() == 'Jerald.johnson') { // LOL whoops? TODO
                    
                    if (handler.css('background-color') == "rgb(221, 221, 221)") {
                        if (color != null) {
                            setBG(pri,i,color);
                        } else {
                            setBG(pri,i,unassigned_color);
                        }
                    } else { 
                        if (color != null) {
                            setBG(pri,i,color);
                        } else {
                            setBG(pri,i,assigned_color);
                        }
                    }
                } else {
                    if (handler.css('background-color')== 'rgb(221, 221, 221)') {
                        if (color != null) {
                            setBG(pri,i,color);
                        } else {
                            setBG(pri,i,not_your_level_unassigned_ticket_color);
                        }
                    } else {
                        if (color != null) {
                            setBG(pri,i,color);
                        } else {
                            setBG(pri,i,not_your_level_assigned_ticket_color);
                        }
                    }
                }
                if (isHackedTicket(subject.html())) {
                    setBoxBG(pri,i,hacked_ticket_color,1);
                }
            } else {
                setBG(pri,i,"silver");
                var re1='(<[^>]+>)';	// Tag 1
                var re2='(\\d+)';	// Integer Number 1
                var re3='(<[^>]+>)';	// Tag 2
                
                var p = new RegExp(re1+re2+re3,["i"]);
                var m = p.exec(tid.html());
                if (m != null)
                {
                    var tag1=m[1];
                    var int1=m[2];
                    var tag2=m[3];
                    
                    if($("#" + type.html()).length == 0) {
                        addQueue(type.html());
                    }
                    
                    $("[id='"+int1+"']").appendTo("#"+type.html());
                    i--;
                    
                }
            }
        
        }
    }
    
}
var u = 0;
function setBG(el,i,color) {
    var prio = 'rgb(246, 181, 79)';
    var color2 = 'rgb(255, 153, 153)';
    if (window.data.css('background-color') != prio) {
        window.data.css('background-color', color2);
        
    }
    //el.find('tr:nth-child('+i+') td:nth-child(1)').css('background-color', color); # Don't change this so I can see the queue color
    el.find('tr:nth-child('+i+') td:nth-child(2)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(3)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(4)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(6)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(7)').css('background-color', color);
    //el.find('tr:nth-child('+i+') td:nth-child(8)').css('background-color', color); # Don't Change the Color of updated so I can see the severity
    //el.find('tr:nth-child('+i+') td:nth-child(9)').css('background-color', color); # ^
}
function setBoxBG(el,i,color,box) {
    //el.find('tr:nth-child('+i+') td:nth-child(1)').css('background-color', color); # Don't change this so I can see the queue color
    el.find('tr:nth-child('+i+') td:nth-child(2)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(3)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(4)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(6)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(7)').css('background-color', color);
    //el.find('tr:nth-child('+i+') td:nth-child(8)').css('background-color', color); # Don't Change the Color of updated so I can see the severity
    //el.find('tr:nth-child('+i+') td:nth-child(9)').css('background-color', color); # ^
}
initScript();
