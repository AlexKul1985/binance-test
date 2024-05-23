import { defineStore } from 'pinia'

export const useLogListStore = defineStore('log-list', {
  state: () => ({
    logList: []
  }),
  actions: {
   setLogList(logList) {
     this.logList = logList
   },
  }
})
