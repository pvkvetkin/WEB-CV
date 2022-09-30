import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server;

  @SubscribeMessage('messagePrLang')
  handleMessagePrLang(@MessageBody() message: string): void {
    this.server.emit('messagePrLang', message);
  }

  @SubscribeMessage('messageFrame')
  handleMessageFrame(@MessageBody() message: string): void {
    this.server.emit('messageFrame', message);
  }

  @SubscribeMessage('messageProject')
  handleMessageProject(@MessageBody() message: string): void {
    this.server.emit('messageProject', message);
  }
}
