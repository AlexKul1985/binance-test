import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    selectedCurrency: 'BTCUSDT'
  }),
  actions: {
    updateSelectedCurrency(selectedCurrency) {
      this.selectedCurrency = selectedCurrency
    }
  }
})
