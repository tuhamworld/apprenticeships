const search = instantsearch({
  appId: process.env.ALGOLIA_APP_ID,
  apiKey: process.env.ALGOLIA_ADMIN_KEY,
  indexName: "apprenticeships",
  routing: true,
  searchableAttributes: ["company", "description", "location"],
  searchFunction: function(helper) {
    helper.search();
  }
});

search.addWidget(
  instantsearch.widgets.hits({
    container: "#hits",
    hitsPerPage: 10,
    templates: {
      allItems: `
        <ul class="list-reset flex flex-col md-flex-row justify-between flex-wrap -mx-2">
          {{#hits}}
            <li class="w-full md-w-1-2 px-2 mb-8 flex">
              <a class="bg-white block shadow hover-shadow-md transition px-4 pt-2 pb-8 flex flex-col flex-grow" href="{{{link}}}" target="_blank">
                <span class="text-xs italic block self-end">{{{location}}}</span>
                <h2 class="post-header text-base font-bold mb-2">{{{company}}}</h2>
                <p class="leading-normal text-sm">{{{description}}}</p>
              </a>
            </li>
          {{/hits}}
        </ul>
    `,
      empty: "No results for {{query}}"
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: "#pagination-container",
    maxPages: 20,
    // default is to scroll to 'body', here we disable this behavior
    scrollTo: false,
    showFirstLast: false
  })
);

search.addWidget(
  instantsearch.widgets.searchBox({
    container: "#search__box",
    placeholder: "Search for apprenticeships",
    autofocus: false
  })
);

search.start();
