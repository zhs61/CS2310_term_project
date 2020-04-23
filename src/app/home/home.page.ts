import { Component , OnInit} from '@angular/core';
import {Observable, BehaviorSubject, Subscriber, timer} from 'rxjs';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { AlertController } from '@ionic/angular';
import {UserprofileService} from '../userprofile.service';
import {SendmessageService} from '../sendmessage.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  X: any;
  Y: any;
  Z: any;
  public alertPresented: any;
  subscription: any;
  username: any;
  sent;
  welocomeMessage: string;

  constructor(private sendMessageService: SendmessageService, private userprofile: UserprofileService, private deviceMotion: DeviceMotion, public alertController: AlertController) {
    this.X = 1;
    this.Y = 2;
    this.Z = 3;
    this.alertPresented = false;
    this.sent = false;
  }

  ngOnInit() {
    this.username = this.userprofile.getFirstName() + ' ' + this.userprofile.getLastName();
    this.welocomeMessage = 'Welcome, ' + this.username;
    this.sendMessageService.initComponente(this.username);
  }

  async presentSendMessage() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Help Message Sent!',
      buttons: [{
        text: 'OK'
      }]
    });
    await alert.present();
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Do you need help?',
      buttons: [{
        text: 'Help',
        handler: () => {
          this.alertPresented = false;
          alert.dismiss();
          this.sendmessage();
          this.presentSendMessage();
          this.sent = true;
        }
      },
        {
          text: 'Not Help',
          handler: () => {
            this.sent = true;
            this.alertPresented = false;
            alert.dismiss();
          }
        }]
    });
    if (!this.alertPresented) {
      await alert.present();
      this.alertPresented = true;
      setTimeout(() => {
        this.alertPresented = false;
        alert.dismiss();
        if (!this.sent) {
          this.sendmessage();
          this.presentSendMessage();
        }
        this.sent = false;
      }, 10000);
    }
  }

  start() {
    this.subscription = this.deviceMotion.watchAcceleration({frequency: 50}).subscribe( (acceleration: DeviceMotionAccelerationData) => {
      this.X = acceleration.x;
      this.Y = acceleration.y;
      this.Z = acceleration.z;
      if (this.Z >= 16.8) {
        this.subscription.unsubscribe();
        this.presentAlertMultipleButtons();
    }
  });
  }

  stop() {
    this.subscription = null;
    this.alertPresented = false;
  }

  sendmessage() {
    this.sendMessageService.sendMessage(this.username);
  }
}
