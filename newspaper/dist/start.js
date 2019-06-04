/* global URLSearchParams */

import { loadArticlesList, loadFilteredArticlesList } from './listView'
import { loadArticle } from './detailView'
import { renderMenuItems } from './categories'

renderMenuItems()

let params = new URLSearchParams(window.location.search)

if (typeof js_page !== 'undefined' && js_page === 'articles') {
    // Only run on the articles pages.
    if (params.get('article') !== null) {
        const id = params.get('article')
        loadArticle(id)
    } else if (params.get('filter') !== null) {
        loadFilteredArticlesList(params.get('filter'))
    } else {
        loadArticlesList()
    }
} else if (typeof js_page !== 'undefined' && js_page === 'login') {
    alert('You are on the login page!')
}





// nvm alias default 10.15.3
