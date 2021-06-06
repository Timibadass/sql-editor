export const state = () => ({
  queryResult: [],
  queriesArray: null,
  predefinedQueries: null,
  predefinedQuery: null,
})

export const getters = {
  queryResult: (state) => state.queryResult,
  queries: (state) => state.queriesArray.map((query) => query.slug),
  predefinedQueries: (state) => state.predefinedQueries,
  predefinedQuery: (state) => state.predefinedQuery,
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
}

export const actions = {
  async getQueryResult({ commit }, query) {
    const result = await this.$content(`CSV/${query}`).fetch()
    commit('SET_QUERY_RESULT', result.body)
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
    let predefinedQuery = null
    for (const [key, value] of Object.entries(predefinedQueries)) {
      if (slug === key || slug === value) {
        predefinedQuery = { key, value }
        return commit('SET_PREDEFINED_QUERY_OBJECT', predefinedQuery)
      }
    }
  },
  getQueryByHeading({ commit, state }, headingObject) {
    const heading = headingObject.heading
    const value = headingObject.category
    const queryResult = state.queryResult
    const newQueryResult = queryResult.filter((result) => {
      return result[heading] === value
    })
    commit('SET_QUERY_RESULT', newQueryResult)
  },
}
