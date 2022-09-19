import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMoment } from 'src/app/interfaces/Moment.entity';
import { MessagesService } from 'src/app/services/messages.service';
import { MomentService } from 'src/app/services/moment.service';

@Component({
  selector: 'app-edit-moment',
  templateUrl: './edit-moment.component.html',
  styleUrls: ['./edit-moment.component.css']
})
export class EditMomentComponent implements OnInit {

  constructor(
    private momentService: MomentService,
    private router: ActivatedRoute,
    private route: Router,
    private messagesService: MessagesService
  ) { }

  id: number = Number(this.router.snapshot.paramMap.get('id'))
  moment!: IMoment;
  btnText: string = "Editar";

  updateHandler(moment: IMoment) {

    const momentFormData = new FormData()
    momentFormData.append("title", moment.title);
    momentFormData.append("description", moment.description);
    
    if(moment.image) {
      momentFormData.append('image', moment.image)
    }

    this.momentService.updateMoment(this.id, momentFormData).subscribe({
      next: () => {
        this.messagesService.add(`Momento ${this.id} foi atualizado!`);
        this.route.navigate(['/']);
      }
    });

  }

  ngOnInit(): void {
    this.momentService.getMoment(this.id).subscribe({
      next: (response) => {
        this.moment = response.data;
      }
    });
  }

}
