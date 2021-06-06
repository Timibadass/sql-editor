<template>
  <button type="submit" class="button" @click.prevent="$emit('click')">
    <run-icon class="button__icon" />
    Run Query
  </button>
</template>

<script>
import runIcon from '@/components/icons/RunIcon'
export default {
  components: {
    runIcon,
  },
}
</script>

<style lang="scss">
.button {
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
  &:disabled {
    opacity: 0.5;
  }
  &__icon {
    margin-right: 11px;
  }
}
</style>
