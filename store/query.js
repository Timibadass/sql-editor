export const state = () => ({
  queryResult: [],
  queriesArray: null,
  predefinedQueries: null,
  predefinedQuery: null,
  queryHistory: [],
})

export const getters = {
  queryResult: (state) => state.queryResult,
  queries: (state) => state.queriesArray.map((query) => query.slug),
  predefinedQueries: (state) => state.predefinedQueries,
  predefinedQuery: (state) => state.predefinedQuery,
  queryHistory: (state) => state.queryHistory,
}

export const mutations = {
  SET_QUERY_RESULT(state, queryResult) {
    state.queryResult = queryResult
  },
  SET_EXISTING_QUERIES(state, queriesArray) {
    state.queriesArray = queriesArray
  },
  SET_PREDEFINED_QUERIES(state, predefinedQueries) {
    state.predefinedQueries = predefinedQueries
  },
  SET_PREDEFINED_QUERY_OBJECT(state, predefinedQuery) {
    state.predefinedQuery = predefinedQuery
  },
  SET_QUERY_HISTORY(state, query) {
    state.queryHistory.push(query)
  },
}

export const actions = {
  async getQueryResult({ commit, state }, query) {
    const predefinedQuery = state.predefinedQuery
    const queryType =
      predefinedQuery && predefinedQuery.filterValue
        ? predefinedQuery.key
        : query
    const result = await this.$content(`CSV/${queryType}`).fetch()
    if (predefinedQuery.filterValue) {
      const filteredQuery = result.body.filter((object) => {
        return object[predefinedQuery.heading] === predefinedQuery.filterValue
      })
      commit('SET_QUERY_RESULT', filteredQuery)
    } else {
      commit('SET_QUERY_RESULT', result.body)
    }
  },
  async getExistingQueries({ commit, dispatch }) {
    const queriesArray = await this.$content(`CSV`).fetch()
    commit('SET_EXISTING_QUERIES', queriesArray)
    dispatch('getPredefinedQueries', queriesArray)
  },
  getPredefinedQueries({ commit }, queriesArray) {
    const predefinedQueries = {}
    queriesArray.forEach((query) => {
      predefinedQueries[
        query.slug
      ] = `select * from ${query.slug.toLowerCase()}`
    })
    commit('SET_PREDEFINED_QUERIES', predefinedQueries)
  },
  getPredefinedQueryValue({ commit, state }, slug) {
    const predefinedQueries = state.predefinedQueries
    const statePredefinedQuery = state.predefinedQuery
    let predefinedQuery = null
    for (const [key, value] of Object.entries(predefinedQueries)) {
      if (slug === key || slug === value) {
        predefinedQuery = { key, value }
        return commit('SET_PREDEFINED_QUERY_OBJECT', predefinedQuery)
      }
    }
    if (
      !predefinedQuery &&
      statePredefinedQuery &&
      statePredefinedQuery.filterValue &&
      slug === statePredefinedQuery.key
    ) {
      return commit('SET_PREDEFINED_QUERY_OBJECT', statePredefinedQuery)
    }
    if (slug.includes('=')) {
      const texts = slug.split(' ')
      const heading = texts[texts.indexOf('where') + 1]
      const filterValue = texts[texts.indexOf('=') + 1]
      const keyLowerCase = texts[texts.indexOf('from') + 1]
      const key = keyLowerCase.charAt(0).toUpperCase() + keyLowerCase.slice(1)
      const value = `select * from ${key}`
      return commit('SET_PREDEFINED_QUERY_OBJECT', {
        heading,
        filterValue,
        key,
        value,
      })
    }
    commit('SET_PREDEFINED_QUERY_OBJECT', predefinedQuery)
  },
  saveQuery({ commit }, query) {
    commit('SET_QUERY_HISTORY', query)
  },
  async getQueryByHeading({ commit, state }, headingObject) {
    const heading = headingObject.heading
    const filterValue = headingObject.category
    const queryResult = state.queryResult
    const key = state.predefinedQuery.key
    const value = state.predefinedQuery.value
    const newQueryResult = await queryResult.filter((result) => {
      return result[heading] === filterValue
    })
    commit('SET_QUERY_RESULT', newQueryResult)
    commit('SET_PREDEFINED_QUERY_OBJECT', { key, value, heading, filterValue })
  },
}
