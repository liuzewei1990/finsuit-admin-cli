

import "@common/finsuit-assets/css/reset.css"

import bootstrap from "./libs/bootstrap.js"

const finsuit = function (Vue, options = {}) {

    Vue.prototype["$bootstrap"] = bootstrap;
}

export default {
    install: finsuit
}