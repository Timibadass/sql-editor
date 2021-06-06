<template>
  <section class="container">
    <table v-if="queryResult && queryResult.length > 0" class="table">
      <thead>
        <tr class="table-heading__row">
          <th class="table__heading">S/N</th>
          <th
            v-for="(heading, index) in getTableHeadings"
            :key="index"
            class="table__heading table__heading--relative"
          >
            <span class="table__heading--flex">
              {{ heading }}
              <button class="table__button" @click="getCategories(heading)">
                <filter-icon />
              </button>
            </span>
            <div
              v-show="currentCategory === heading"
              :ref="heading"
              class="categories"
              @mouseleave="toggleVisibility(heading, 'hide')"
            >
              <h1 class="categories__heading">Filter by {{ heading }}</h1>
              <p
                v-for="(category, key) in categories"
                :key="key"
                class="categories__text"
                @click="filterQuery({ heading, category })"
              >
                {{ category }}
              </p>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(result, index) in queryResult"
          :key="index"
          class="table-body__row"
        >
          <td class="table__description">{{ index + 1 }}</td>
          <td v-for="(data, id) of result" :key="id" class="table__description">
            {{ data }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else class="container--empty">
      <p class="container__text">No Results yet</p>
    </div>
  </section>
</template>

<script>
import filterIcon from '@/components/icons/FilterIcon'
import { mapActions } from 'vuex'
export default {
  name: 'TableComponent',
  components: {
    filterIcon,
  },
  props: {
    queryResult: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      categories: null,
      currentCategory: null,
    }
  },
  computed: {
    getTableHeadings() {
      const results = this.queryResult
      const headings = []
      for (const [head] of Object.entries(results[0])) {
        headings.push(head)
      }
      return headings
    },
  },
  methods: {
    ...mapActions('query', ['getQueryByHeading']),
    getCategories(heading) {
      const queryResult = this.queryResult
      const categories = []
      queryResult.forEach((result) => {
        if (!categories.includes(result[heading])) {
          categories.push(result[heading])
        }
      })
      this.currentCategory = heading
      this.toggleVisibility(heading, 'show')
      this.categories = categories
    },
    toggleVisibility(heading, value) {
      const container = this.$refs[heading]
      switch (value) {
        case 'show':
          container[0].classList.add('categories--visible')
          break
        case 'hide':
          container[0].classList.remove('categories--visible')
          break
      }
    },
    filterQuery(obj) {
      this.currentCategory = null
      this.getQueryByHeading(obj)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  overflow-x: scroll;
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
}
.table {
  margin-top: 30px;
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
  overflow-x: scroll;
  &-heading__row {
    border-bottom: 1px solid #eee;
    height: 40px;
    background-color: #4154b8;
  }
  &__heading {
    text-align: left;
    vertical-align: middle;
    min-width: 100px;
    color: #fff;
    text-transform: capitalize;
    font-weight: 500;
    &--relative {
      position: relative;
    }
    &--flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  &__button {
    border: 0;
    background: transparent;
    width: 30px;
    height: 30px;
    cursor: pointer;
    padding: 0;
    margin-left: 10px;
    &:hover {
      border: 1px solid rgba(191, 198, 220, 0.5);
      border-radius: 5px;
    }
  }
  &__heading,
  &__description {
    border: 1px solid rgba(191, 198, 220, 0.5);
    border-collapse: collapse;
    padding: 10px;
  }
  &-body__row {
    height: 40px;
  }
  &__description {
    vertical-align: middle;
    text-align: left;
    white-space: nowrap;
  }
}

.categories {
  position: absolute;
  padding: 15px 0;
  right: 0;
  top: 49px;
  width: 100%;
  background: #fff;
  color: #000;
  max-height: 350px;
  border-radius: 3px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 33%);
  overflow-y: scroll;
  display: none;
  border: 1px solid rgba(191, 198, 220, 0.5);
  &--visible {
    display: block;
  }
  &__heading {
    text-align: center;
    margin-bottom: 10px;
  }
  &__text {
    margin-bottom: 8px;
    padding: 10px 15px;
    transition: all 3ms ease-in-out;
    &:hover {
      cursor: pointer;
      background: rgba(65, 84, 184, 0.8);
      color: #fff;
    }
  }
}
</style>
