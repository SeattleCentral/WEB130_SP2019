/* global $ */

const listArticlesQL = `
    query {
        articles {
            id
            title
            category
            published
            author {
            name
            }
            content {
                html
            }
        }
    }
`

const filteredArticlesQL = (filter) => `
    query {
        articles(where:{ category: ${filter} }) {
            id
            title
            category
            published
            author {
            name
            }
            content {
                html
            }
        }
    }
`

const renderArticle = (data) => {
    return `
        <article class="col-md-6">
            <h2>${data.title}</h2>
            <small>Published on: ${data.published}</small>
            <div>
                ${data.content.html}
            </div>
            <a href="?article=${data.id}">Read More</a>
        </article>
    `
}

const loadArticles = (query) => {
    $.post(
        {
            url: 'https://api-uswest.graphcms.com/v1/cjvx3xdjrb7px01ghu7z3xxtf/master',
            data: JSON.stringify({"query": query}),
            success: (response) => {
                const articles = response.data.articles
                let html = ''
                for (let article of articles) {
                    html += renderArticle(article)
                }
                $('main').html(html)
            },
            contentType: 'application/json'
        }
    )
}

const loadArticlesList = () => loadArticles(listArticlesQL)

const loadFilteredArticlesList = (filter) => {
    return loadArticles(filteredArticlesQL(filter))
}

export { loadArticlesList, loadFilteredArticlesList }
