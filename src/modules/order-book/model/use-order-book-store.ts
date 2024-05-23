import { defineStore } from 'pinia'
import { orderBookRepository } from '../repository/order-book.repository'
import { RequestStatus } from '../data/constants'
import { type QuantityVariants } from './types'
export const useOrderBookStore = defineStore('order-book', {
  state: () => ({
    asks: { data: [] },
    bids: { data: [] },
    limit: 1000,
    requestStatus: RequestStatus.Init, 
  }),
  actions: {
    updateLimit(limit: QuantityVariants) {
       this.limit = limit;
    },

     subscribeToMarketOrderUpdates<T extends string>(symbol: T, closeHandler = (event: CloseEvent) => {}) {
      this.requestStatus = RequestStatus.Pending
      return orderBookRepository.subscribe({ symbol, limit: this.limit }, {
        messageHandler: (event) => {
          if(event?.data) {
            const data = JSON.parse(event.data)
            const { a: asks, b: bids } = data
            this.asks.data = asks
            this.bids.data = bids
          }
        },
        closeHandler: (event) => {
          this.requestStatus = RequestStatus.Init
          this.bids.data = []
          this.asks.data = []
          closeHandler(event)
        },
        openHandler: () => {
          this.requestStatus = RequestStatus.Success
        }
      })
    }
  }
})
