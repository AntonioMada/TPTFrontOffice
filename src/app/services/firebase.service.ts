import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MessagingService {
    currentMessage = new BehaviorSubject(null);
    constructor(private router:Router   ,private http:HttpClient,private angularFireMessaging: AngularFireMessaging) {
        this.angularFireMessaging.messages.subscribe(
        (_messaging:AngularFireMessaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        }
    )
}
    requestPermission() {
        this.angularFireMessaging.requestToken.subscribe(
            (token) => {
            console.log(token);
            },
            (err) => {
            console.error('Unable to get permission to notify.', err);
            }
        );
    }
    receiveMessage() {
        this.angularFireMessaging.messages.subscribe(
        (payload:any) => {
            //console.log("new message received. ", payload);
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(["/dashboard"]);
             return this.currentMessage.next(payload);
        })
    }
    postmsg(){            
        var json = 
            { 
            "notification": {
            "title": "Hey there", 
            "body": "Bonjour cochon"
            },
            "to":"d2En0TTRurekk1cx1igz0D:APA91bHwJCKC3SCl0aHYdDKpwFNg13XoJxE6PnYmf71FS9NR312XAMSuDCbqp3X35-KLO6RkpNdpzXzbi8TUPm1pwr3jZVENUahkDJ-ydzwSuTDkwdVlbQlMkMT1KJCYRqIzlubWJke2"
            }
        
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAA-UOHAMM:APA91bE7xDdzuktya8O4p2YMMxwz8oDWs-iJwdnx8FSDxfQX_oaLBGV2R3R8wfzqktdbOymOTKZ9YISYsNziEqnO6NG4FbXH7CjhYh_kfh_z17BYQAMmImRtmeS5_KWD8R3MPuPOAkkD' });
        let options = { headers: headers };
        return this.http.post("https://fcm.googleapis.com/fcm/send",json,options);

    }
}