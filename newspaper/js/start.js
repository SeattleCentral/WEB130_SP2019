/* global URLSearchParams */

import { loadArticlesList } from './listView'
import { loadArticle } from './detailView'
import { renderMenuItems } from './categories'

renderMenuItems()

let params = new URLSearchParams(window.location.search)

if (params.get('article') !== null) {
    const id = params.get('article')
    loadArticle(id)
} else {
    loadArticlesList()
}