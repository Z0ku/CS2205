$(window).ready(function(){

    if($(".indexContainer").length > 0)
    {
        $(window).on('hashchange', function() {
            var hash = location.hash;

            if(hash == null || hash.substr(1).length == 0)
            {
                $(".topbar").attr("data-filter-name", "all");
            }
            else
            {
                $(".topbar").attr("data-filter-name", hash.substr(1));
            }

            getNewArticles(true);

            var type = $(".topbar").attr("data-filter-name");
            if(type == "all")
            {
                type = null;
            }
            var rssUrl = Routing.generate("goboiano_media_rss_all", {type: type});

            $("#rssFeed").attr('href', rssUrl);

            var rssTitle = "RSS Feed for goboiano.com";
            if(type != null)
            {
                rssTitle = type + " " + rssTitle;
            }

            rssTitle = rssTitle.charAt(0).toUpperCase() + rssTitle.slice(1);

            $("#rssFeed").attr('title', rssTitle);

        });

        $(window).scroll(handleHomeScroll);

        $(window).trigger("hashchange");

        !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="http://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");
    }

    $(".socialTwitter").click(function()
    {
        var url = $(this).attr('data-twitter-href');
        myPopup(url);
    });

    $('a').filter(function() {
        return this.hostname && this.hostname !== location.hostname;
    }).attr("target","_blank");

});

function myPopup(url) {
    window.open( url, "myWindow", "status = 1, height = 500, width = 500, resizable = 1" )
}

var waitingOnHandleScroll = false;
function handleHomeScroll()
{
    if(!waitingOnHandleScroll && elementsRemaining)
    {
        waitingOnHandleScroll = true;
        var loadingDiv = $("#loading");

        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + window.innerHeight;

        var elemTop = loadingDiv.offset().top;

        if(elemTop < docViewBottom)
        {
            getNewArticles(false);
        }
        waitingOnHandleScroll = false;
    }
}

var waitingOnNewArticles = false;
var elementsRemaining = true;
var curOffset = 0;
function getNewArticles(refresh)
{
    if((elementsRemaining || refresh) && !waitingOnNewArticles)
    {
        var loadingDiv = $("#loading");
        var endDiv = $("#end");

        var postData = { };

        var url = Routing.generate('goboiano_media_articles_loadMore');
        var feed = $(".indexColumnWrapper");

        postData["filterName"] = $(".topbar").attr("data-filter-name");

        loadingDiv.show();
        endDiv.hide();

        var oldOffset = curOffset;

        if(refresh)
        {
            postData["offset"] = 0;
            oldOffset = 0;
        }
        else
        {
            postData["offset"] = curOffset;
        }

        waitingOnNewArticles = true;

        $.ajax({
            type: "POST",
            url: url,
            data:postData,
            dataType: 'json',
            success: function(data) {

                if(data.status == "success")
                {
                    if(refresh)
                    {
                        feed.html(data.content);
                    }
                    else
                    {
                        feed.append(data.content);
                    }
                    curOffset = data.curOffset;
                }
                else if(data.status == "error")
                {
                    alert(data.error);
                }
                else if(data.status == "end")
                {
                    loadingDiv.hide();
                    endDiv.show();
                    if(oldOffset == 0)
                    {
                        feed.html(data.content);
                    }
                    else
                    {
                        feed.append(data.content);
                    }
                    curOffset = data.curOffset;
                    elementsRemaining = false;
                }
            },
            error: function(e)
            {
                elementsRemaining = false; // fail quietly
            },
            complete: function(e)
            {
                waitingOnNewArticles = false;
            }
        });
    }
}

$(window).ready(function(){

    if($("#reviewCanvas").length > 0)
    {
        window.onresize = function(event) {
            moveHex(event);
        }

        moveHex(null);


        var context = document.getElementById('reviewCanvas').getContext('2d');
        var hex = new Hexagon(85, 85, 85, context, 255, 255, 255, 1, true);
        hex.draw();
        hexagons.push(hex);

        var hex2 = new Hexagon(85, 85, 75, context, 49, 49, 49, 1, true);
        hex2.draw();
        hexagons.push(hex2);

        var hex3 = new Hexagon(85, 85, 70, context, 38, 161, 231, 1, false);
        hex3.draw();
        hexagons.push(hex3);
    }
    /*Leaderboard adhesion */
    $(window).scroll(function() {
        // if ($(window).scrollTop() >= 1200)
        //     $('.top_sticky').css({display: 'none'});
        if ($(window).scrollTop() >= 1200) {
            $('.top_sticky').css({position: 'static'});
            $('.leader_buffer').css({height: '0px'});
        }
        // if ($(window).scrollTop() < 1000)
        //     $('.top_sticky').css({display: 'block'});
    });

    if ($("#deviceType").length > 0)
    {
        deviceType = $("#deviceType").val();
    }

    $("iframe").wrap('<div class="responsiv-iframe"></div>');
    //$("iframe[src^='http://www.youtube.com'], iframe[src^='//www.youtube.com']").wrap('<div class="responsiv-iframe"></div>');

    // Find all YouTube videos (and instagram embeds), filter out ads
    var allVideos = $("iframe").filter(":parents(.ad)");
    //var allVideos = $("iframe");
    //var allVideos = $("iframe[src^='http://www.youtube.com'], iframe[src^='//www.youtube.com']"),


    // The element that is fluid width
    fluidEl = $(".textContent");

    // Figure out and save aspect ratio for each video
    allVideos.each(function() {

        var calcHeight = this.height;
        if(
            ($(this).attr("src")) &&
            ($(this).attr("src").substr(0, 16) == "//instagram.com/" || $(this).attr("src").substr(0, 21) == "http://instagram.com/"))
        {
            $(this).data('extraHeight', 100);
            calcHeight = calcHeight - 100;
        }
        else
        {
            $(this).data('extraHeight', 0);
        }
        //console.log("Aspect Ratio: " + (this.height / this.width));
        $(this)
            .data('aspectRatio', calcHeight / this.width)
            .data('maxWidth', this.width)

            // and remove the hard coded width/height
            .removeAttr('height')
            .removeAttr('width');

    });

    // When the window is resized
    $(window).resize(function() {

        var newWidth = fluidEl.width();

        // Resize all videos according to their own aspect ratio
        allVideos.each(function() {

            var el = $(this);
            var useWidth = newWidth;
            if(el.data('maxWidth') < useWidth)
            {
                useWidth = el.data('maxWidth');
            }
            el
                .width(useWidth)
                .height((useWidth * el.data('aspectRatio')) + (el.data('extraHeight')));

        });

        // Kick off one resize to fix all videos on page load
    }).resize();

});

jQuery.expr[':'].parents = function(a,i, m){
    return jQuery(a).parents(m[3]).length < 1;
};

var allvideos;
var fluidEl;

var deviceType = "desktop";
$(window).ready(function(){

    if($("#titleContainer").length > 0)
    {
        window.onresize = function(event) {
            formatTitle();
        }
        formatTitle();
    }
});

function formatTitle()
{
    var windowWidth = window.innerWidth;

    if(windowWidth > 540 && deviceType != "phone")
    {
        var titleHeight = $("#titleContainer").innerHeight();

        var bannerTop = $("#articleBanner").position().top;
        var bannerHeight = $("#articleBanner").innerHeight();

        var titleTop = bannerTop + bannerHeight - titleHeight - 43;

        $("#titleContainer").css("top", titleTop + "px");
        $("#titleContainer").css("display", "block");
    }
    else
    {
        $("#titleContainer").css("top", "0");
    }
}

function moveHex(event)
{
    var windowWidth = window.innerWidth;
    if(windowWidth > 540)
    {
        var wrapperHeight = $(".reviewScoreWrapper").height();
        var wrapperPadding = parseInt($(".reviewScoreWrapper").css("padding-top"));
        var canvasHeight = $("#reviewCanvas").height();
        var canvasMargin = (wrapperHeight - canvasHeight) / 2;
        $(".scoreColumn").css("margin-top", canvasMargin + "px");
    }
    else
    {
        $(".scoreColumn").css("margin-top", "0");
    }
}

var hexagons = [];

function polygon(ctx, x, y, radius, sides, startAngle, anticlockwise) {
    if (sides < 3) return;
    var a = (Math.PI * 2)/sides;
    a = anticlockwise?-a:a;
    ctx.save();
    ctx.beginPath();
    ctx.translate(x,y);
    ctx.rotate(startAngle);
    ctx.moveTo(radius,0);
    for (var i = 1; i < sides; i++) {
        ctx.lineTo(radius*Math.cos(a*i),radius*Math.sin(a*i));
    }
    ctx.closePath();
    ctx.restore();
}

function Hexagon(x, y, radius, context, r, g, b, a, fill)
{
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.context = context;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
    this.fillstyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    this.strokestyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";

    this.setColor = function(r,g,b,a)
    {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.fillstyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
        this.strokestyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
    }

    this.draw = function ()
    {
        context.fillStyle=this.fillstyle;
        context.strokeStyle=this.strokestyle;
        polygon(this.context,this.x,this.y,this.radius,6,Math.PI/2);
        if(fill)
        {
            context.fill();
        }

        context.stroke();
    }
}
$(window).ready(function(){

    if($(".searchMainContainer").length > 0)
    {
        $(window).on('hashchange', function() {

            handleFilter();

            if(!initialLoad || (location.hash.substr(1).length != 0 && location.hash.substr(1) != "all"))
            {
                getMoreSearchResults(true);
            }else
            {
                $(".resultsContainer").css("display", "block");
                initialLoad = false;
            }

        });

        curSearchOffset = $("#initialCount").val();

        $(window).scroll(handleScroll);

        $(window).trigger("hashchange");
    }
});

var initialLoad = true;

var currentFilter = "all";
function handleFilter()
{
    var hash = location.hash;
    var calloutRow = $(".searchCalloutRow");
    calloutRow.removeClass("news").removeClass("reviews").removeClass("originals").removeClass("lists").removeClass("all");

    currentFilter = hash.substr(1);

    if(hash == null || hash.substr(1).length == 0)
    {
        calloutRow.addClass("all");
    }
    else if(hash == "#news")
    {
        calloutRow.addClass("news");
    }
    else if(hash == "#reviews")
    {
        calloutRow.addClass("reviews");
    }
    else if(hash == "#originals")
    {
        calloutRow.addClass("originals");
    }
    else if(hash == "#lists")
    {
        calloutRow.addClass("lists");
    }
    else
    {
        calloutRow.addClass("all");
    }

}


var waitingOnHandleScroll = false;
function handleScroll()
{
    if(!waitingOnHandleScroll && searchElementsRemaining)
    {
        waitingOnHandleScroll = true;
        var loadingDiv = $("#loading");

        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + window.innerHeight;

        var elemTop = loadingDiv.offset().top;

        if(elemTop < docViewBottom)
        {
            getMoreSearchResults(false);
        }
        waitingOnHandleScroll = false;
    }
}

var waitingOnMoreResults = false;
var searchElementsRemaining = true;
var curSearchOffset = 0;
function getMoreSearchResults(refresh)
{
    if((searchElementsRemaining || refresh) && !waitingOnMoreResults)
    {
        var loadingDiv = $("#loading");
        var endDiv = $("#end");

        var queryDiv = $("#queryString");

        var postData = { };

        var url = Routing.generate('goboiano_media_search_moreResults');
        var feed = $(".resultsContainer");

        postData["filterName"] = currentFilter;
        postData["queryString"] = queryDiv.val();

        loadingDiv.show();
        endDiv.hide();

        if(refresh)
        {
            postData["offset"] = 0;
        }
        else
        {
            postData["offset"] = curSearchOffset;
        }

        waitingOnMoreResults = true;

        $.ajax({
            type: "POST",
            url: url,
            data:postData,
            dataType: 'json',
            success: function(data) {

                if(data.status == "success")
                {
                    if(refresh)
                    {
                        feed.html(data.content);
                    }
                    else
                    {
                        feed.append(data.content);
                    }
                    curSearchOffset = data.curOffset;
                }
                else if(data.status == "error")
                {
                    alert(data.error);
                }
                else if(data.status == "end")
                {
                    loadingDiv.hide();
                    endDiv.show();
                    if(refresh)
                    {
                        feed.html(data.content);
                        if(data.content.trim().length == 0)
                        {
                            feed.html("No Results");
                        }
                    }
                    else
                    {
                        feed.append(data.content);
                    }
                    curOffset = data.curOffset;
                    searchElementsRemaining = false;
                }
            },
            error: function(e)
            {
                searchElementsRemaining = false; // fail quietly
            },
            complete: function(e)
            {
                waitingOnMoreResults = false;
                if(initialLoad)
                {
                    $(".resultsContainer").css("display", "block");
                    initialLoad = false;
                }
            }
        });
    }
}

$(window).ready(function(){

    $(".topbar input").keydown(searchKeydown);

    $("#searchBar").keydown(searchKeydown);

    $(".searchButton").click(function() {
        searchArticles($("#searchBar").val())
    });
});

function searchKeydown(e)
{
    if (e.keyCode == 13) {
        var val = $(this).val();
        searchArticles(val);
    }
}

function searchArticles(queryVal)
{
    var route = Routing.generate("goboiano_media_search", {query: queryVal});
    location.href = route;
}