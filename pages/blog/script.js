fetch(
  "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@douglasabnovato"
)
  .then((res) => res.json())
  .then((data) => {
    // Filter for acctual posts. Comments don't have categories, therefore can filter for items with categories bigger than 0
    const res = data.items; //This is an array with the content. No feed, no info about author etc..
    const posts = res.filter((item) => item.categories.length > 0); // That's the main trick* !

    // Functions to create a short text out of whole blog's content
    function toText(node) {
      let tag = document.createElement("div");
      tag.innerHTML = node;
      node = tag.innerText;
      return node;
    }

    function shortenText(text, startingPoint, maxLength) {
      return text.length > maxLength
        ? text.slice(startingPoint, maxLength)
        : text;
    }

    // Put things in right spots of markup
    let output = "";

    posts.forEach((item) => {
      output += `
         <div class="blog__post">
            <a href="${item.link}" target="_blank">
               <img src="${item.thumbnail}" class="blog__topImg"></img>
               <div class="blog__content">
                  <div class="blog_preview">
                     <h2 class="blog__title">${
                       shortenText(item.title, 0, 80) + "..."
                     }</h2>
                     <p class="blog__intro">${
                       "..." +
                       shortenText(toText(item.content), 60, 250) +
                       "..."
                     }</p>
                  </div>
                  <hr>
                  <div class="blog__info">
                     <span class="blog__author">${item.author}</span>
                     <span class="blog__date">${shortenText(
                       item.pubDate,
                       0,
                       20
                     )}</span>
                  </div>
               </div>
            <a/>
         </div>`;
    });
    document.querySelector(".blog__slider").innerHTML = output;
  });
