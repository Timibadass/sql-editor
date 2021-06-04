<template>
  <main class="main">
    <div>
      <Logo class="logo" />
      <section class="editor">
        <h1 class="main__title">Online SQL IDE</h1>
        <query-editor @find-query="fetchQuery" />
      </section>
    </div>
  </main>
</template>

<script>
import queryEditor from '@/components/Editor'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Index',
  components: {
    queryEditor,
  },
  computed: {
    ...mapGetters('query', ['queryResult']),
  },
  methods: {
    ...mapActions('query', ['getQueryResult']),
    async fetchQuery(query) {
      try {
        await this.getQueryResult(query)
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&family=Jost:wght@400;500;600;700&display=swap');
* {
  font-family: 'Jost', sans-serif;
}
.main {
  padding: 30px;
  &__title {
    font-weight: 700;
  }
}

.logo {
  width: 100px;
  height: 40px;
  margin-bottom: 40px;
}
</style>
