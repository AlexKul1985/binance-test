<template>
  <CustomTable :list="asksList" :is-loading="isLoading"/>
</template>

<script lang="ts">
  import { computed } from 'vue'
  import CustomTable from './table.vue'  
  import { getFormattedData, getSortedDataByTotal } from './adapter' 
  import { useOrderBookStore } from '../model/use-order-book-store'
  import { RequestStatus } from '../data/constants';

  export default {
  components: { CustomTable },
    setup() {
      const orderBookStore = useOrderBookStore()
      
      const isLoading = computed(() => orderBookStore.requestStatus === RequestStatus.Pending)
      return {
        isLoading,
        asksList: computed(() => getSortedDataByTotal(getFormattedData(orderBookStore.asks.data)))
      }
    },
  }
</script>
