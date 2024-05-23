import {  computed } from 'vue'
import { useSettingsStore } from './use-settings-store'

export const useFilter = () => {
  const valueList = ['BTCUSDT', 'BNBBTC', 'ETHBTC']
  
  const settingsStore = useSettingsStore()

  const currentCurrency = computed({
    get() {
      return settingsStore.selectedCurrency
    },
    set(val) {
     settingsStore.updateSelectedCurrency(val)
    }
  })
  return {
    valueList,
    currentCurrency
  }
}
