import { Injectable } from '@angular/core';
import {RxStompService} from '@stomp/ng2-stompjs';

@Injectable({
  providedIn: 'root'

})
export class SendmessageService {

  // init的地址是/queue/SISMQ
  // 根据init的时候传的name决定
  constructor(private rxStompService: RxStompService) { }

  sendMessage(userProfile) {
    const message = '(Scope$$$SIS.Scope1$$$Receiver$$$SuperController$$$MessageType$$$Alert$$$Sender$$$FallingDetector$$$Message$$$' + userProfile + '_Need_Help$$$Date$$$' + new Date().getTime();
    console.log('send', message);
    this.rxStompService.publish({destination: '/queue/SISMQ', body: message});
  }

  initComponente(username: any) {
    const message = '(Scope$$$SIS.Scope1$$$MessageType$$$Register$$$Role$$$Basic$$$Name$$$FallingDetector$$$)';
    console.log('init: ', message);
    this.rxStompService.publish({destination: '/queue/SISMQ', body: message});
    const connectMessage = '(Scope$$$SIS.Scope1$$$MessageType$$$Connect$$$Role$$$Basic$$$Name$$$FallingDetector$$$)';
    console.log('init: ', connectMessage);
    this.rxStompService.publish({destination: '/queue/SISMQ', body: connectMessage});
  }
}
