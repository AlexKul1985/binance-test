<template>
  <div class="order-book">
    <div class="order-book__filter-quantity filter-quantity">
      <h2 class="order-book__title">Filter Quantity</h2>
      <VSelect
        class="filter-quantity__select"
        label="Quantity"
        :items="QuantityList"
        variant="outlined"
        v-model="limitValue"
      />
    </div>
    <div class="order-book__content">
      <div class="order-book__item">
        <h2 class="order-book__title  order-book__title--table-title">Asks ({{selectedCurrency}})</h2>
        <AsksTable class="order-book__table"/> 
      </div>
      <div class="order-book__item">
        <h2 class="order-book__title order-book__title--table-title">Bids ({{selectedCurrency}})</h2>
        <BidsTable class="order-book__table"/> 
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onUnmounted, computed } from 'vue' 

import { AsksTable, BidsTable, useOrderBookStore, CLOSE_FROM_CLIENT, QuantityList, type QuantityVariants } from '@/modules/order-book'
import { useSettingsStore, type CurrencyVariants } from '@/modules/settings'
import { useLogList } from '@/modules/log'

export default {
  components: {
    AsksTable,
    BidsTable,
  },
  setup() {
    const settingsStore = useSettingsStore()
    const orderBookStore = useOrderBookStore()

    let closeWsConnectionFn: () => void  = () => {}

    const onChangeFilterQuantity = (limit: QuantityVariants) => {
          closeWsConnectionFn()
          orderBookStore.updateLimit(limit)
          subscribeToMarketOrderUpdates()
    }
    
    const limitValue = computed({
      get() {
         return orderBookStore.limit 
      },
      set(limit: QuantityVariants) {
        onChangeFilterQuantity(limit)
      }
    })

    const subscribeToMarketOrderUpdates = () => {
      orderBookStore.subscribeToMarketOrderUpdates(settingsStore.selectedCurrency, (event: CloseEvent) => {
        if(event.reason === CLOSE_FROM_CLIENT) {
              const logList = useLogList()
              logList.restore()
              logList.setCurrentCurrency<CurrencyVariants>(settingsStore.selectedCurrency)
        }
      }).then((fn: () => void ) => {
        closeWsConnectionFn = fn
      })
    }

    subscribeToMarketOrderUpdates()

    onUnmounted(() => {
      closeWsConnectionFn()
    })

    return {
      selectedCurrency: computed(() => settingsStore.selectedCurrency),
      limitValue,
      QuantityList,
    }
  }
}
 
</script>
<style lang="scss">
.order-book {
  &__content {
    display: flex;
    @media screen and (max-width: 922px) {
      flex-direction: column;
    }
  }
  .filter-quantity {
    display: flex;
    align-items: center;
    margin: 0 10px;
    &__select {
      margin-left: 20px;
      max-width: 150px;
      margin-top: 10px;
    }
  }
  &__title {
    padding: 10px 0;
    margin-left: 5px;
    font-size: 18px;
    font-weight: normal;
    @media screen and (max-width: 922px) {
      font-size:  calc(14px + 5 * ((100vw - 320px) / (1280 - 320)));
    }
    &--table-title {
      margin-top: -20px;
    }
  }
  &__item {
    margin:  10px 10px;
    flex-grow: 1;
    flex-basis: 50%;
    height: calc(100vh - 205px);

  @media screen and (max-width: 922px) {
    flex-basis: auto;
    height: calc(50vh - 100px);
  }
 }
 &__table {
  height: calc(100vh - 200px);
  overflow: hidden;
  @media screen and (max-width: 922px) {
    height: calc(50vh - 125px);
  }
 }
}
</style>
