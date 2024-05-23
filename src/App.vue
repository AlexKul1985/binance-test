<template>
  <VApp>
    <VAppBar :elevation="2">
      <VBtnToggle
          v-model="currentLink"
          color="deep-purple-accent-3"
          rounded="0"
          group
        >
          <VBtn v-for="(link, index) in links" :value="link.value" :key="index" >
            {{ link.title }}
          </VBtn>
        </VBtnToggle>
    </VAppBar>
     <VMain>
      <RouterView />
     </VMain>
  </VApp>
</template>

<script lang="ts" >
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'
  import { RoutesNames } from './router/constants'
  
 export default {
  setup() {
      const links = [{ value: RoutesNames.OrderBook, title: 'Order Book' }, { value: RoutesNames.Settings, title: 'Settings' } ]
      const router = useRouter()

      const currentLink = computed({
        get(){
          return router.currentRoute.value.name
        },
        set(linkName: string) {
          onChangePage(linkName)
        }
      })

      const onChangePage = (linkName: string) => {
        router.push({ name: linkName })
      }
    return {
      currentLink,
      links,
    }
  }
 } 
</script>
