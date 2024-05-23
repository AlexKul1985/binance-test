import { ComputedRef } from 'vue'
type LogListItem = {id: number, date: string, val: string}

export type LogListHookResult = { logList: ComputedRef<Array<LogListItem>>, setCurrentCurrency: (val: string) => void, restore: () => void }
