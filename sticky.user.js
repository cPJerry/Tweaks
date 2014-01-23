// ==UserScript==
// @name                Sticky Header
// @include             https://staff.cpanel.net/staff/*
// @include             https://dec.cpanel.net/staff/*
// @include             https://hex.cpanel.net/staff/*
// @include             https://oct.cpanel.net/staff/*
// ==/UserScript==

function makeSticky() {
    var window_top,div_top;
    window_top = $(window).scrollTop();
    div_top = $('#anchor').offset().top;
    if (window_top > div_top) {
        $('#header2').addClass('sticky');
    } else {
        $('#header2').removeClass('sticky');
    }
}

function addSticky() {
    $(window).scroll(makeSticky);
    makeSticky();
}
function addAnchor() {
    $('<div id="anchor"></div>').insertBefore('#header');
}

function moveDivIntoOne() {
    var newDiv;
    $("#header").remove();
    $('#navigation_menu').each(function() {
         newDiv = $('<div/>').attr("id","header2");
        $(this).before(newDiv);
        //var next = $(this).next();
        newDiv.append(this);
    });
}

function addStyle() {
    $("<style type='text/css'>  .sticky {     position: fixed;     top: 0;  }</style>").appendTo("head");
    $("<style type='text/css'>  .header545 { z-index:500;  background-position: -1px -161px;width: 100%;display: inline-block;margin-top:28px; }</style>").appendTo("head");
    $("<style type='text/css'> .ticketsLink a { color:black !important;}</style>").appendTo("head");
}

function addClass() {
    $("#header2").addClass("header545");
    $('[id="Closed tickets that require your classification"]').addClass("ticketsLink");
    
}
addAnchor(); // !
moveDivIntoOne(); // !
addStyle(); // !
addSticky(); // !
addClass(); // !
