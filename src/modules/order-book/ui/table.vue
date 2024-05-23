<template>
  <VTable class="table" :fixed-header="true" >
    <thead>
      <tr>
        <th class="text-left">
          Price
        </th>
        <th class="text-left th-quantity">
          Quantity
        </th>
        <th class="text-left">
          Total
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in list"
        :key="item.key"
      >
        <td>{{ item.price }}</td>
        <td class="td-quantity">{{ item.quantity }}</td>
        <td>{{ item.total }}</td>
      </tr>
    </tbody>
    <v-progress-circular
      v-if="isLoading"
      class="loader"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </VTable>
</template>

<script lang="ts" setup>
import type { ConvertedCurrency } from './types'
defineProps({ list: { type: Array<ConvertedCurrency>}, isLoading: { type: Boolean, default: false }})
</script>
<style lang="scss">
.table {
  position: relative;
}
@media screen and (max-width: 540px){
  .th-quantity, .td-quantity {
    display: none;
  }
}
.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
