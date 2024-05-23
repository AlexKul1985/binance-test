export type ApiPayload = {
  symbol: string;
  limit: number;
}

export type ConnectorEventsHandlers = {
  messageHandler: ( event: MessageEvent ) => void 
  closeHandler: ( event: CloseEvent ) => void 
  errorHandler: ( event: ErrorEvent ) => void 
  openHandler: ( event: Event ) => void 
}
