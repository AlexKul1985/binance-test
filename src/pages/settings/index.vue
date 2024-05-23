<template>
  <VContainer>
    <SettingsFilter />
    <LogList class="log-list"/>
  </VContainer>
</template>
<script lang="ts" setup>
  import { watch } from 'vue'
  import { useRouter } from 'vue-router'

  import { SettingsFilter, useSettingsStore } from '@/modules/settings'
  import { LogList, useLogList } from '@/modules/log'
  
  import { RoutesNames } from '@/router/constants'

  const settingsStore = useSettingsStore()
  const logList = useLogList()
  const router = useRouter()

  logList.restore()
  
  watch(() => settingsStore.selectedCurrency, (oldValue: string, newValue: string ) => {
        if(oldValue !== newValue) {
          router.push({ name: RoutesNames.OrderBook })
        }
  })
</script>
<style>
.log-list {
  height: calc(100vh - 180px);
}
</style>
