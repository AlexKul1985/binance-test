import { computed, ref  } from 'vue';
import { useStorage } from '../services/storage'
import { useLogListStore } from './use-log-list-store'
import { LogListHookResult } from './types';

export const useLogList = (): LogListHookResult => {
  const isRestored = ref(false)
  const logListStore = useLogListStore()
  const { isHas, get, set } = useStorage()
  
  const restore = () => {
    if(!isRestored.value) {
      const list = get('log') ?? []
      logListStore.setLogList(list)
      isRestored.value = true
    }
  } 
  const convertDate = (date: Date) => {
    return date.toLocaleString("ru")
  }
  const setCurrentCurrency = <T extends string>(val: T) => {
    let list = null
    if(!isHas('log')) {
      list = [{ id: 1, val, date: convertDate(new Date()) }]
    } else {
      list = [ ...logListStore.logList]
      const firstItem = list[0]
      
      if(firstItem?.val == val) {
        firstItem.date =  convertDate(new Date())
      } else {
        let id = firstItem?.id ?? 0
        id++
        list.unshift({ id, val, date: convertDate(new Date())  })
      }
    }
    logListStore.setLogList(list)
    set('log', list)
 }
 
 return { logList: computed(() =>  logListStore.logList), setCurrentCurrency, restore }
}
