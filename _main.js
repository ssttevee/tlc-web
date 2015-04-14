var section = parseInt(window.location.hash == "" ? 1 : window.location.hash.substring(1));
var lolapi = new RiotAPI("df24491f-6f73-4d9d-b122-66f3c6550b66");
var TEAM_ID = "TEAM-13858490-8b87-11e3-9291-782bcb4d0bb2";
var scrolling = false;
var streams = {};

var onresize = function() {
    $(".section").height($(window).height());

    $("body").scrollTop($(".section:nth-of-type(" + (section) + ")").offset().top);
    scroll();
};

var mousewheelhandler = function(e) {
    if(scrolling) return;
    e.preventDefault();

    e = window.event || e.originalEvent; // old IE support
    var delta = e.wheelDelta || -e.detail;

    if (delta < 0) {
        if(section < $(".section").length) section++;
    } else {
        if(section > 1) section--;
    }

    scroll();
};

var scroll = function() {
    scrolling = true;
    window.location.hash = section;

    $("html, body").animate({
        scrollTop: $(".section:nth-of-type(" + (section) + ")").offset().top
    }, 200, "swing", function() {
        scrolling = false;
    });

    $(".nav a.selected").removeClass("selected");
    $($(".nav a")[section - 2]).addClass("selected");

    if(section == 1) $(".nav").addClass("home");
    else $(".nav").removeClass("home");
};

$(function() {
    onresize();
    $(window).resize(onresize);

    $("[name='roster'] label").click(function() {
        $("[name='roster'] label.selected").removeClass("selected");
        $(this).addClass("selected");
    });

    $("body").bind("mousewheel", mousewheelhandler);
    $("body").bind("DOMMouseScroll", mousewheelhandler);
    $("body").on('swipedown', function() {
        if(section > 1) section--;
        scroll();
    });
    $("body").on('swipeup', function() {
        if(section < $(".section").length) section++;
        scroll();
    });

    $.each(["ssttevee","shinigami4560"], function(index, value) {
        $.ajax({
            url: "https://api.twitch.tv/kraken/streams/" + value,
            type: "GET",
            dataType: "jsonp"
        }).done(function (data) {
            if(data.stream == null) return;
            streams[value] = data;

            var $content = $("[name='streams'] .content");
            var $div = $("<div style=\"background-image: url('" + data.stream.preview.medium + "');\"><a href=\"" + data.stream.channel.url + "\"><span class=\"title\">" + data.stream.channel.status + "</span><span class=\"streamer\">" + data.stream.channel.display_name + "</span></a></div>");

            $content.removeClass("empty");
            $content.append($div);
        });
    });

});