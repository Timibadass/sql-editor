<template>
  <section class="history">
    <ul v-if="queryHistory && queryHistory.length > 0" class="history__list">
      <li
        v-for="(history, index) in queryHistory"
        :key="index"
        class="history__item"
        @mouseover="hovered = index"
      >
        <p v-if="history && history.filterValue" class="">
          {{
            history.value +
            ' where ' +
            history.heading +
            ` = ${history.filterValue}`
          }}
        </p>
        <p v-else class="">{{ history.value }}</p>
        <div v-if="hovered === index" class="history-item__buttons">
          <run-button @click="getQuerySlug(history)" />
          <!-- <button class="history__button"></button> -->
        </div>
      </li>
    </ul>
    <div v-else class="history--empty">
      <p class="history__text">No query has been saved yet</p>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import runButton from '@/components/Button'
export default {
  name: 'QueryHistory',
  components: {
    runButton,
  },
  props: {
    queryHistory: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      slug: null,
      hovered: null,
    }
  },
  computed: {
    ...mapGetters('query', ['predefinedQuery']),
  },
  methods: {
    ...mapActions('query', ['getPredefinedQueryValue']),
    ...mapMutations('query', ['SET_PREDEFINED_QUERY_OBJECT']),
    async getQuerySlug(query) {
      await this.getPredefinedQueryValue(query.value)
      this.slug = this.predefinedQuery ? this.predefinedQuery.key : query
      const heading = query.heading
      const filterValue = query.filterValue
      const value = query.value
      const key = query.key
      if (filterValue) {
        this.SET_PREDEFINED_QUERY_OBJECT({ key, value, heading, filterValue })
      } else {
        this.SET_PREDEFINED_QUERY_OBJECT({ key, value })
      }
      this.$emit('find-query', this.slug)
    },
  },
}
</script>

<style lang="scss" scoped>
.history {
  min-height: 300px;
  &--empty {
    display: flex;
    border: 1px solid rgba(191, 198, 220, 0.5);
    border-radius: 8px;
    min-height: 300px;
    margin-top: 14px;
    background: #fff;
    justify-content: center;
    align-items: center;
  }
  &__list {
    margin-top: 20px;
  }
  &__item {
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(191, 198, 220, 0.5);
  }
  &__button {
  }
  &-item__buttons {
    display: flex;
  }
}
</style>
