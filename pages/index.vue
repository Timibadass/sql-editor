<template>
  <main class="main">
    <div>
      <Logo class="logo" />
      <section class="editor">
        <h1 class="main__title">Online SQL IDE</h1>
        <query-editor @find-query="fetchQuery" />
      </section>
      <section class="main__result">
        <nav class="main__nav">
          <button
            class="main__button main__button--white"
            :class="
              currentTab === 'tableComponent' ? 'main__button--active' : null
            "
          >
            Result
          </button>
          <button
            class="main__button main__button--white"
            :class="currentTab === '' ? 'main__button--active' : null"
          >
            History
          </button>
          <button
            class="main__button main__button--purple"
            :disabled="!queryResult || queryResult.length < 1"
          >
            <save-icon class="main__icon" />
            Save Query
          </button>
        </nav>
        <keep-alive>
          <component :is="currentTab" :query-result="queryResult"></component>
        </keep-alive>
      </section>
    </div>
  </main>
</template>

<script>
import queryEditor from '@/components/Editor'
import tableComponent from '@/components/Table'
import { mapActions, mapGetters } from 'vuex'
import saveIcon from '@/components/icons/SaveIcon'
export default {
  name: 'Index',
  components: {
    queryEditor,
    tableComponent,
    saveIcon,
  },
  data() {
    return {
      currentTab: 'tableComponent',
    }
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

html {
  background: #fafcfe;
}
.main {
  padding: 30px;
  &__title {
    font-weight: 700;
  }
  &__icon {
    margin-right: 10px;
  }
  &__result {
    margin-top: 50px;
  }
  &__nav {
    border-bottom: 1px solid rgba(191, 198, 220, 0.5);
    width: 100%;
    display: flex;
    height: 48px;
  }
  &__button {
    border-radius: 5px;
    padding: 0;
    width: 80px;
    height: 47px;
    border: 0;
    &--white {
      background: #fafcfe;
      /* border-bottom: 1px solid rgba(191, 198, 220, 0.5); */
    }
    &--active {
      border: 1px solid rgba(191, 198, 220, 0.5);
      border-bottom-left-radius: 0;
      background: #fafcfe;
      border-bottom-right-radius: 0;
      height: 48px;
      border-bottom: 1px solid #fff;
    }
    &--purple {
      height: 42px;
      color: #fff;
      width: 139px;
      justify-content: center;
      display: flex;
      align-items: center;
      transition: all 500ms ease-in-out;
      background: #4ca672;
      cursor: pointer;
      margin-left: auto;
    }
    &:disabled {
      opacity: 0.5;
    }
  }
}

.logo {
  width: 100px;
  height: 40px;
  margin-bottom: 40px;
}
</style>
