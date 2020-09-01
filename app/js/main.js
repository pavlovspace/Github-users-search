import {
    Search
} from './search.js'

import {
    View
} from './view.js'

import {
    Api
} from './api.js'

const api = new Api()

new Search(new View(), api);