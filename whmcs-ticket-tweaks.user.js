// ==UserScript==
// @name       WHMCS Ticket Tweaks
// @match      https://staff.whmcs.com/members/admin/supporttickets.php*
// @exclude		https://staff.whmcs.com/members/admin/supporttickets.php?action=view*
// @copyright  2012+, You
// ==/UserScript==

var hacked_ticket_color = "purple";
// You are unable to define what is a hacked ticket. If you really want to, inspect my code

var unassigned_color =  "#3C81B8";
var assigned_color = "#87AF78";
var not_your_level_unassigned_ticket_color = "#925B49";
var not_your_level_assigned_ticket_color = "#A078B6";
var my_ticket_color = "#3C81B8";
$('#tab1').parent().append('<li><span style="background-color:'+unassigned_color+'">Unassigned - You can take</span></li>');
$('#tab1').parent().append('<li><span style="background-color:'+assigned_color+'">Assigned - You can take</span></li>');
$('#tab1').parent().append('<li><span style="background-color:'+not_your_level_unassigned_ticket_color+'">Unassigned - You can not take</span></li>');
$('#tab1').parent().append('<li><span style="background-color:'+not_your_level_assigned_ticket_color+'">Assigned - You can not take</span></li>');
$('#tab1').parent().append('<li><span style="background-color:'+my_ticket_color+'">Assigned - Yours</span></li>');
$('#tab1').parent().append('<li><span style="background-color:'+hacked_ticket_color+'">Possible hack claim</span></li>');

var changeColor = 0;

// Whats your Level
var myLevel = 1;

/******************************************\
|      STOP HERE OR I CANNOT HELP YOU      |
\******************************************/

function isHackedTicket(str) {
    if (str == null) return false;
    if (str.toLowerCase().indexOf("hack") >= 0) {return true;}
    if (str.toLowerCase().indexOf("compromise") >= 0){ return true;}
    if (str.toLowerCase().indexOf("deface") >= 0) {return true;}
    // SQL Injection
    if (str.toLowerCase().indexOf("sql injection") >= 0) {return true;}
    if (str.toLowerCase().indexOf("libkeyutils") >= 0) {return true;}
    return false;
}
var bugReports = 0;
var lice = 1;
var support2 = 0;
var resellersup = 1;
var tickets = 1;
function isATicket(str) {
    if (str == "Bugs") { return bugReports;}
    if (str == "Support") { return tickets;}
    if (str == "Licensing") {return lice;}
    if (str == "Level 2 Support") { return support2;}
    if (str == "Reseller Support") { return resellersup;}
    return false;
}
function getQueue(queue) {
    if (queue == null) return '';
    var queue2 = queue.replace(/(.*) \((.*)\)/,"$1");
    if (queue2 == queue) return queue;
    return queue2;
}
function getHandler(queue) {
    if (queue == null) return '';
    var queue2 = queue.replace(/(.*) \((.*)\)/,"$2");
    if (queue2 == queue) return "Unassigned";
    return queue2;
}
function isMyLevel(queue) {
    if (queue == "Level 2 Support") {
        if (myLevel > 1) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
    return 0;
}
var userList = '';
function makeUserList() {
    $('#sidebar').children('div').each(function() {
        var tmp = $(this).html();
        if (tmp.toLowerCase().indexOf("jerald") >= 0) {
            userList = tmp.toLowerCase();
            return;
        }
    });
}
makeUserList();
function isOnline(user) {
    user = user.replace(/(.*) (.*)/,"$1");
    if (user == "Samuel") user = "scraven";
	user = user.toLowerCase();
    if (userList.indexOf(user.toLowerCase()) >= 0) { return 1;}
    return 0;
}
function setColors(type2,color,canDo,mine) {
    var pri = $('[id="'+type2+'"]');
    pri.addClass( "ticketsLink" );
    for (var i=2;i<$('[id="'+type2+'"] tr').length+1;i++) {
        var item = pri.find('tr:nth-child('+i+')');
        var tid =   pri.find('tr:nth-child('+i+') td:nth-child(1)');
        var lvl =   pri.find('tr:nth-child('+i+') td:nth-child(2)'); // Priority
        var client =   pri.find('tr:nth-child('+i+') td:nth-child(3)');
        lvl.html(getHandler(client.html()));
        client.html(getQueue(client.html()));
        var queue = client.html();
        var subject =   pri.find('tr:nth-child('+i+') td:nth-child(4)');
        var handler =   pri.find('tr:nth-child('+i+') td:nth-child(5)');
        var type =   pri.find('tr:nth-child('+i+') td:nth-child(6)');
        var ver =   pri.find('tr:nth-child('+i+') td:nth-child(7)');
        var updated =   pri.find('tr:nth-child('+i+') td:nth-child(8)');
        var dur =   pri.find('tr:nth-child('+i+') td:nth-child(9)');
        var color2 = tid.css("background-color");
        window.data = tid;
        if (mine == 1) {
            setBG(pri,i,my_ticket_color);
        } else {
            if (isATicket(client.html())) {
                
                if (isMyLevel(lvl.html(),type2) || handler.html() == name_in_handler) { 
                    
                    if (lvl.html() == "Unassigned" || !isOnline(lvl.html())) {
                        if (color != null) {
                            setBG(pri,i,color);
                        } else {
                            setBG(pri,i,unassigned_color);
                        }
                    }
                    
                    else { 
                        if (color != null) {
                            setBG(pri,i,color);
                        } else {
                            setBG(pri,i,assigned_color);
                        }
                    }
                } else {
                    if (lvl.html() == "Unassigned") {
                        if (color != null) {
                            setBG(pri,i,color);
                        } else {
                            setBG(pri,i,not_your_level_unassigned_ticket_color);
                        }
                    }
                    else {
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
                item.hide();
            }
            
        }
    }
    
}
var u = 0;
function setBG(el,i,color) {
        if (changeColor == 0) return;

    el.find('tr:nth-child('+i+') td:nth-child(1)').css('background-color', color); // Don't change this so I can see the queue color
    el.find('tr:nth-child('+i+') td:nth-child(2)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(3)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(4)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(5)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(6)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(7)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(8)').css('background-color', color); // Don't Change the Color of updated so I can see the severity
    el.find('tr:nth-child('+i+') td:nth-child(9)').css('background-color', color); // ^
}
function setBoxBG(el,i,color,box) {
        if (changeColor == 0) return;

    el.find('tr:nth-child('+i+') td:nth-child(1)').css('background-color', color); // Don't change this so I can see the queue color
    el.find('tr:nth-child('+i+') td:nth-child(2)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(3)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(4)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(5)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(6)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(7)').css('background-color', color);
    el.find('tr:nth-child('+i+') td:nth-child(8)').css('background-color', color); // Don't Change the Color of updated so I can see the severity
    el.find('tr:nth-child('+i+') td:nth-child(9)').css('background-color', color); // ^
}
setColors("sortabletbl1",null,1,null);
setColors("sortabletbl2",my_ticket_color,1,1);
setColors("sortabletbl3",null,1,null);


