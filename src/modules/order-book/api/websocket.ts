export const CLOSE_FROM_CLIENT = 'CLOSE_FROM_CLIENT'

export class Connector  {
  private socket: WebSocket | null = null
  private closeHandler: ( error: CloseEvent ) => void | null = null

  constructor( url: string ) {
    this.socket = new WebSocket( url )
  }

  public closeConnection() {
     this.socket?.close()
    this.closeHandler?.({ reason: CLOSE_FROM_CLIENT })
  }

  public setHandlerOnMessage( handler: ( message: MessageEvent ) => void ) {
    if(handler) {
      this.socket?.addEventListener( 'message', handler )
    }
  }
  
  public setHandlerOnError( handler: ( error: ErrorEvent ) => void ) {
    if(handler) {
      this.socket?.addEventListener( 'error', handler  )
    }
  }
  
  public setHandlerOnClose( handler: ( error: CloseEvent ) => void ) {
    if(handler) {
      this.closeHandler = handler
      this.socket?.addEventListener( 'close', handler )
    }
  }

  public unsetHandlerOnMessage( handler: ( message: MessageEvent ) => void ) {
    if(handler) {
      this.socket?.removeEventListener( 'message', handler )
    }
  }

  public unsetHandlerOnError( handler: ( error: ErrorEvent ) => void ) {
    if(handler) {
      this.socket?.removeEventListener( 'error', handler   )
    }
  }

  public unsetHandlerOnClose( handler: ( error: CloseEvent ) => void ) {
    if(handler) {
      this.socket?.removeEventListener( 'close', handler )
    }
  }

  public setHandlerOnOpenConnection( handler: ( error: Event ) => void ) {
    if(handler) {
      this.socket?.addEventListener( 'open', handler )
    }
  }
  
  public unsetHandlerOnOpenConnection( handler: ( error: Event ) => void ) {
    if(handler) {
      this.socket?.removeEventListener( 'open', handler )
    }
  }
}
