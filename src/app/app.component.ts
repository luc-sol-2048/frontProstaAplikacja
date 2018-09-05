import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';


interface Messages {
  content: string;
  author: string;
  time: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  data = 'xyz';
  topic = 'java';
  messages = Array<Messages>();
  newMessage: Messages = {author: '', content: '' , time: ''};

  constructor(private http: HttpClient) {}

   ngOnInit(): void {
    this.http.get('/api/time', { responseType: 'text'} ).subscribe(data => {
      this.data = data ;
    });
    this.reload();
     }

       send() {
       this.http.post('/api/messages/' + this.topic, this.newMessage).subscribe((data: Array<Messages>) => {
         this.messages = data;
       });
     }

     changeTopic (name) {
        this.topic = name;
        this.reload();
     }

     reload() {
       this.http.get('/api/messages/' + this.topic ).subscribe((data: Array<Messages>) => {
         this.messages = data;
       });
     }

}
