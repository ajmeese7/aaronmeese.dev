$(function() {
    $('.scroll-down').click (function() {
        // TODO: Try to make it a little slower
        $('html, body').animate({scrollTop: $('#aboutme').offset().top }, 'slow');
        return false;
    });

    // Set the article header to the RSS title
    var articlesHeader = document.getElementById("feedTitle");
    $(".rss-title span").remove();
    $(".rss-title a").text("Stories on Medium");
    articlesHeader.innerHTML = $(".rss-title").html();
    $(".rss-box .rss-title").css("display", "none");

    // Remove all the elements that are comments and not articles
    var articleMessage = "Continue reading on Medium »";
    $("li.rss-item").each(function(index, element) {
        var currentText = $(this).text();

        // Tests for if it's an article or a comment
        if (!currentText.includes(articleMessage)) {
            element.remove();
        }
    });

    // Copy data to my div and delete the script populated HTML
    var mediumFeed = document.getElementById("mediumFeed");
    var rssBox = document.getElementsByClassName("rss-box")[0].outerHTML;
    mediumFeed.innerHTML += rssBox;

    // https://stackoverflow.com/a/15481533/6456163
    $(".rss-box").eq(1).remove();
});