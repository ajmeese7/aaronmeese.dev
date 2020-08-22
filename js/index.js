$.fn.immediateText = function() {
    // https://stackoverflow.com/a/32170000/6456163
    return this.contents().not(this.children()).text();
};

jQuery.fn.textNodes = function() {
    // https://stackoverflow.com/a/4106957/6456163
    return this.contents().filter(function() {
      return (this.nodeType === Node.TEXT_NODE && this.nodeValue.trim() !== "");
    });
}

$(function() {
    $('.scroll-down').click (function() {
        $('html, body').animate({scrollTop: $('#aboutme').offset().top }, 750);
        return false;
    });

    // Set the article header to the RSS title
    let articlesHeader = document.getElementById("feedTitle");
    $(".rss-title span").remove();
    $(".rss-title a").text("Stories on Medium");
    articlesHeader.innerHTML = $(".rss-title").html();
    $(".rss-box .rss-title").css("display", "none");

    // Remove all the elements that are comments and not articles
    let articleMessage = "Continue reading on ";
    $("li.rss-item").each(function(index, element) {
        let text = $(this).immediateText();
        if (!text.includes(articleMessage)) {
            // Remove any comments, leaving only articles
            element.remove();
        } else {
            text = text.substring(0, text.lastIndexOf(articleMessage));
            $(this).textNodes().first().replaceWith(text);
        }
    });

    // Copy data to my div and delete the script populated HTML
    let mediumFeed = document.getElementById("mediumFeed");
    let rssBox = document.getElementsByClassName("rss-box")[0].outerHTML;
    mediumFeed.innerHTML += rssBox;

    // https://stackoverflow.com/a/15481533/6456163
    $(".rss-box").eq(1).remove();
});