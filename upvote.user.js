// ==UserScript==
// @name         Upvote Fairy
// @version      0.1
// @author       Jerald Johnson
// @match        http://imgur.com/user/*
// @match		 http://imgur.com/gallery/*
// ==/UserScript==

if ($('#captions').children('div').children('h2').html() == "Gallery comments") {                      
    var html = "&nbsp; <a id='upvotefairy' href='javascript:void;'>Upvote Fairy</a>";
    $('#captions').children('div').children('h2').html($('#captions').children('div').children('h2').html()+html);
    $('#upvotefairy').click(function() {
        $('div[class="arrows"]').find("div[title='like']").each(function() {
            if (!$(this).hasClass("pushed")) {
                $(this).children("span").click();
            }
        });
    });
}





$('#mainUpArrow').children('span').click(function() {
        $('div[class="arrows"]').find("div[title='like']").each(function() {
            if (!$(this).hasClass("pushed")) {
                $(this).children("span").click();
            }
        });
    });
