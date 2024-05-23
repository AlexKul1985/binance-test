<template>
      <VSelect
        label="Select"
        :items="valueList"
        v-model="currentCurrency"
      />
</template>
<script lang="ts">
import { useFilter } from '../model/use-filter'

export default {
  setup() {
    return useFilter()
  }
}
</script>
