<template>
  <form class="editor" @submit.prevent>
    <div class="editor__div">
      <h2 class="editor__text editor__text--margin-bottom">
        Type in your queries here.
      </h2>
      <button
        type="submit"
        class="editor__button"
        :disabled="!query"
        @click.prevent="getQuerySlug"
      >
        <run-icon class="editor__icon" />
        Run Query
      </button>
    </div>
    <div
      class="editor-textarea__container"
      :class="[focused ? 'editor-textarea__container--bordered' : null]"
    >
      <textarea
        id="query"
        v-model.trim="query"
        name="query"
        cols="30"
        rows="10"
        class="editor__textarea"
        @focus="focused = true"
        @blur="focused = false"
      ></textarea>
    </div>
    <button
      class="editor__button editor__button--margin-top"
      :disabled="!queries"
      @click="getRandomQuery"
    >
      Get Random query
    </button>
  </form>
</template>

<script>
import runIcon from '@/components/icons/RunIcon'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'SqlEditor',
  components: {
    runIcon,
  },
  data() {
    return {
      focused: false,
      query: null,
      slug: null,
    }
  },
  fetch() {
    const store = this.$nuxt.context.store
    store.dispatch('query/getExistingQueries')
  },
  computed: {
    ...mapGetters('query', ['queries', 'predefinedQuery']),
  },
  methods: {
    ...mapActions('query', ['getExistingQueries', 'getPredefinedQueryValue']),
    getQuerySlug() {
      const query = this.query
      this.getPredefinedQueryValue(query)
      if (this.predefinedQuery) {
        this.slug = this.predefinedQuery.key
        this.$emit('find-query', this.slug)
      } else {
        this.$emit('find-query', query)
      }
    },
    getRandomQuery() {
      const queries = this.queries
      const queriesLength = queries.length
      const randomIndex = Math.floor(Math.random() * queriesLength)
      const randomQuery = queries[randomIndex]
      this.getPredefinedQueryValue(randomQuery)
      this.query = this.predefinedQuery.value
    },
  },
}
</script>

<style lang="scss">
.editor {
  &__div {
    margin-bottom: 15px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  &__text {
    font-size: 18px;
    line-height: 26px;
    color: #6366ab;
    &--margin-bottom {
      margin-bottom: 8px;
    }
  }
  &__button {
    background: #4154b8;
    border-radius: 5px;
    width: 135px;
    cursor: pointer;
    border: 0;
    color: #fff;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 500ms ease-in-out;
    padding: 0;
    height: 42px;
    &--margin-top {
      margin-top: 30px;
    }
    &:disabled {
      opacity: 0.5;
    }
  }
  &__icon {
    margin-right: 11px;
  }
  &-textarea__container {
    border-radius: 8px;
    border: 1px solid rgba(191, 198, 220, 0.5);
    border-left: 25px solid #d8dee3;
    transition: all 500ms ease-in-out;
    &--bordered {
      border: 1px solid #4154b8;
      border-left: 25px solid #d8dee3;
    }
  }
  &__textarea {
    width: 100%;
    height: 100%;
    border: 0;
    resize: none;
    font-family: 'Fira Code', monospace;
    font-size: 16px;
    line-height: 21px;
    color: #8789a4;
    padding: 20px 5px;
    background: #fff;
    &:focus-within {
      border: 0;
      outline: 0;
    }
  }

  @media (min-width: 768px) {
    .editor {
      &__div {
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-end;
        margin-bottom: 8px;
      }
    }
    &__text {
      color: #6366ab;
      &--margin-bottom {
        margin-bottom: 0;
      }
    }
  }
}
</style>
