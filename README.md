# Bibliomar

[![Netlify Status](https://api.netlify.com/api/v1/badges/bd4c5d37-8033-4b0f-abc4-7f8203e957a5/deploy-status)](https://app.netlify.com/sites/bibliomar/deploys)

Sua suíte completa de leitura: pesquise, baixe e leia livros gratuitamente.

<div align="center">
  <img alt="preview" src="./images/bibliomar-search-full.png">
</div>

## What is it?

Bibliomar is a book search engine that uses the LibraryGenesis database as a base.
The best way to understand how it works, is to simply access the [site](https://bibliomar.site).

The target audience is Brazilian, since in our country some books can reach more than 5% of the minimum salary, and the
existing alternatives on the internet force the user to wait long download queues, or simply do not have such a
robust catalog.

However, Bibliomar is fully available in English. And we also plan to support more languages down the road (we are
looking for volunteers!)

## Always evolving

Bibliomar became a big project, and will probably continue to grow.
Our goal is to make Bibliomar the definitive reading solution in Brazil (and in Portuguese-speaking countries), and the
world.

## Features

Some of the main features are:

- Search and download books in an intuitive interface.
  And that tied to the use of the huge LibraryGenesis catalog means that you will probably find what you are looking
  for.
- Our search engine is powered by [manticore-search](https://manticoresearch.com/)
  This gives us:
- Fast (and i mean it) search results.
- Search suggestions, autocomplete and highlighting of search terms.
- Full flexibility on how we build our search queries.
- Fulltext search and boolean queries.
- Massively improved human language processing (when compared to MySQL's native fulltext search).
- A library with five different categories, where you can save your books.
- A explore screen where you can find the most popular entires, and also the most recent.
- Read your books online, without the need to download an ePub reader.
  Powered by [epub-js](https://github.com/futurepress/epub.js/)
  and [react-reader](https://www.npmjs.com/package/react-reader).
  We have built a custom reader component that allows the user to customize the font size, font family, background and
  etc.
  You are free to use it in your own projects. Just copy the code
  from [here](https://github.com/bibliomar/bibliomar-client/tree/main/src/components/reader/screen)
- A dark mode, of course.
- Lots of things that don't fit here. Check for yourself ;)

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=bibliomar/bibliomar-client&type=Date)](https://star-history.com/#bibliomar/bibliomar-client&Date)
