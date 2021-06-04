<template>
  <section class="container">
    <table v-if="queryResult && queryResult.length > 0" class="table">
      <thead>
        <tr class="table-heading__row">
          <th class="table__heading">S/N</th>
          <th
            v-for="(heading, index) in getTableHeadings"
            :key="index"
            class="table__heading"
          >
            {{ heading }}
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
export default {
  name: 'TableComponent',
  props: {
    queryResult: {
      type: Array,
      required: false,
      default: () => {
        return []
      },
    },
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
  methods: {},
}
</script>

<style lang="scss" scoped>
.container {
  overflow-x: scroll;
  &--empty {
    display: flex;
    border: 1px solid rgba(191, 198, 220, 0.5);
    border-radius: 8px;
    margin-top: 14px;
    background: #fff;
    justify-content: center;
    align-items: center;
    min-height: 300px;
  }
  &__text {
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
    background-color: rgba(65, 84, 184, 0.5);
  }
  &__heading {
    text-align: left;
    vertical-align: middle;
    min-width: 100px;
    text-transform: capitalize;
    font-weight: 500;
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
</style>
