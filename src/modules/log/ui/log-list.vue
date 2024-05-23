<template> 
   <VList>
        <VListItem
          v-for="item in logList"
          :key="item.id"
          :title="item.val"
          :subtitle="item.date"
        />
   </VList>
</template>
<script lang="ts">
import { useLogList } from '../model/use-log-list'

export default {
  setup() {
    const { logList  } = useLogList()
    return { logList }
 }
}
</script>
