// ==UserScript==
// @name         Upvote Fairy
// @version      0.1
// @author       Jerald Johnson
// @match        http://imgur.com/user/*
// ==/UserScript==

if ($('#captions').children('div').children('h2').html() == "Gallery comments") {
    function upvote() {
        $('div[class="arrows"]').find("div[title='like']").each(function() {
                if (!$(this).hasClass("pushed")) {
                    $(this).children("span").click();
                }
            }
     	);
    }                        
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




