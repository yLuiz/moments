import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMoment } from 'src/app/interfaces/Moment.entity';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {

  constructor(
    private momentService: MomentService,
    private messagesService: MessagesService,
    private router: Router
  ) { }

  btnText = "Compartilhar";
  load = false;
  
  async createHandler(moment: IMoment) {
    this.load = true;
    const momentFormData = new FormData()

    momentFormData.append("title", moment.title);
    momentFormData.append("description", moment.description);

    if(moment.image) {
      momentFormData.append('image', moment.image)
    }

    this.momentService.createMoment(momentFormData).subscribe({
      next: () =>{
        this.load = true;
        this.messagesService.add("Momento adicionado com sucesso!");
        this.router.navigate(['/'])
      }
    });
  }

  ngOnInit(): void {}

}
