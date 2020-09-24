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
    console.log(`
    ░█████╗░░█████╗░██████╗░░█████╗░███╗░░██╗
    ██╔══██╗██╔══██╗██╔══██╗██╔══██╗████╗░██║
    ███████║███████║██████╔╝██║░░██║██╔██╗██║
    ██╔══██║██╔══██║██╔══██╗██║░░██║██║╚████║
    ██║░░██║██║░░██║██║░░██║╚█████╔╝██║░╚███║
    ╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚══╝`);
    console.log("Checking out the internals of my site? Come work with me!");
    displayMediumArticles();

    $(".scroll-down").click (function() {
      $("html, body").animate({scrollTop: $("#aboutme").offset().top }, 750);
      return false;
    });
});

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function displayMediumArticles() {
  const articles = await getMediumArticles();
  const rssItems = document.getElementsByClassName("rss-items")[0];
  while (articles.length == 0) await sleep(250);

  for (let i = 0; i < 3; i++) {
    let articleData = articles[i];
    let article = document.createElement("li");
    article.className = "rss-item";

    let title = document.createElement("a");
    title.className = "rss-title";
    title.innerText = articleData.title;
    title.href = articleData.url;
    article.appendChild(title);
    article.appendChild(document.createElement("br"));

    let date = document.createElement("span");
    date.className = "rss-date";
    date.innerText = `${new Date(articleData.createdAt)}`.slice(0, 28);
    article.appendChild(date);
    article.appendChild(document.createElement("br"));

    let desc = document.createElement("p");
    desc.innerText = articleData.description;
    article.appendChild(desc);

    rssItems.appendChild(article);
  }
}

async function getMediumArticles() {
  let articles = [];

  const getMediumData = (nextArticle) => {
    if (!nextArticle) nextArticle = "";
    const url = `https://medium-feed.ajmeese7.workers.dev?username=ajmeese7&next=${nextArticle}`;
    fetch(url)
      .then(response => response.json())
      .then(async json => {
        if (json.data.posts.length === 0) return;
        json.data.posts.forEach(post => articles.push(post));
        await getMediumData(json.next);
      })
      .catch(error => console.error(error.message))
      .finally(() => articles = articles.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1));
  };

  await getMediumData();
  return articles;
}