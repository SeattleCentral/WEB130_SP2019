(function () {
    'use strict';

    /* global $ */
    var listArticlesQL = "\n    query {\n        articles {\n            id\n            title\n            category\n            published\n            author {\n            name\n            }\n            content {\n                html\n            }\n        }\n    }\n";

    var filteredArticlesQL = function filteredArticlesQL(filter) {
      return "\n    query {\n        articles(where:{ category: ".concat(filter, " }) {\n            id\n            title\n            category\n            published\n            author {\n            name\n            }\n            content {\n                html\n            }\n        }\n    }\n");
    };

    var renderArticle = function renderArticle(data) {
      var col = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
      return "\n        <article class=\"col-md-".concat(col, "\">\n            <div class=\"list-article\">\n                <h2>").concat(data.title, "</h2>\n                <small>Published on: ").concat(data.published, "</small>\n                <div>\n                    ").concat(data.content.html, "\n                </div>\n            </div>\n            <a href=\"?article=").concat(data.id, "\">Read More</a>\n        </article>\n    ");
    };

    var loadArticles = function loadArticles(query) {
      $.post({
        url: 'https://api-uswest.graphcms.com/v1/cjvx3xdjrb7px01ghu7z3xxtf/master',
        data: JSON.stringify({
          "query": query
        }),
        success: function success(response) {
          var articles = response.data.articles;
          var html = '';
          var firstArticle = articles.shift();
          html += renderArticle(firstArticle, 8);
          var secondArticle = articles.shift();
          html += renderArticle(secondArticle, 4);
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = articles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var article = _step.value;
              html += renderArticle(article);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          $('main').html(html);
        },
        contentType: 'application/json'
      });
    };

    var loadArticlesList = function loadArticlesList() {
      return loadArticles(listArticlesQL);
    };

    var loadFilteredArticlesList = function loadFilteredArticlesList(filter) {
      return loadArticles(filteredArticlesQL(filter));
    };

    /* global $ */
    var generateArticleQL = function generateArticleQL(id) {
      return "\n    query {\n        article(where: {\n            id: \"".concat(id, "\"\n        }) {\n            id\n            title\n            published\n            author {\n                name\n            }\n            category\n            content {\n                html\n            }\n        }\n    }");
    };

    var renderArticle$1 = function renderArticle(data) {
      return "\n        <article class=\"col-md-12\">\n            <h2>".concat(data.title, "</h2>\n            <small>Published on: ").concat(data.published, "</small>\n            <div>\n                ").concat(data.content.html, "\n            </div>\n        </article>\n    ");
    };

    var loadArticle = function loadArticle(id) {
      $.post({
        url: 'https://api-uswest.graphcms.com/v1/cjvx3xdjrb7px01ghu7z3xxtf/master',
        data: JSON.stringify({
          "query": generateArticleQL(id)
        }),
        success: function success(response) {
          console.log(response.data);
          var article = response.data.article;
          var html = renderArticle$1(article);
          $('main').html(html);
        },
        contentType: 'application/json'
      });
    };

    var Category = {
      Sports: 'Sports',
      National: 'National',
      Local: 'Local',
      Opinion: 'Opinion',
      Lifestyle: 'Lifestyle'
    };

    var renderMenuItems = function renderMenuItems() {
      var html = '';

      for (var category in Category) {
        html += "\n            <a class=\"dropdown-item\" href=\"?filter=".concat(category, "\">\n                ").concat(category, "\n            </a>\n        ");
      }

      $('#categoryDropdown').html(html);
    };
    /*
    query {
      articles(where:{ category: National }) {
        id
        title
        category
      }
    }

    https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams

    */

    /* global URLSearchParams */
    renderMenuItems();
    var params = new URLSearchParams(window.location.search);

    if (typeof js_page !== 'undefined' && js_page === 'articles') {
      // Only run on the articles pages.
      if (params.get('article') !== null) {
        var id = params.get('article');
        loadArticle(id);
      } else if (params.get('filter') !== null) {
        loadFilteredArticlesList(params.get('filter'));
      } else {
        loadArticlesList();
      }
    } else if (typeof js_page !== 'undefined' && js_page === 'login') {
      alert('You are on the login page!');
    } // nvm alias default 10.15.3

}());