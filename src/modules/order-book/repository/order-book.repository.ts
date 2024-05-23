import { Connector } from '../api/websocket'
import { getOrderBookForCurrencyPair } from '../api/rest'
import  { ApiPayload,  ConnectorEventsHandlers } from '../api/types'

export const orderBookRepository = {
  async subscribe(payload: ApiPayload, eventsHandlers: ConnectorEventsHandlers) {
     await getOrderBookForCurrencyPair(payload)
     const wsConnector = new Connector(`wss://stream.binance.com:9443/ws/${payload.symbol.toLowerCase()}@depth`)
     wsConnector.setHandlerOnMessage(eventsHandlers.messageHandler)
     wsConnector.setHandlerOnClose(eventsHandlers.closeHandler)
     wsConnector.setHandlerOnError(eventsHandlers.errorHandler)
     wsConnector.setHandlerOnOpenConnection(eventsHandlers.openHandler)
     return () => {
      wsConnector.unsetHandlerOnClose(eventsHandlers.closeHandler)
      wsConnector.unsetHandlerOnError(eventsHandlers.errorHandler)
      wsConnector.unsetHandlerOnMessage(eventsHandlers.messageHandler)
      wsConnector.unsetHandlerOnOpenConnection(eventsHandlers.openHandler)
      wsConnector.closeConnection()
     }
  }
}
