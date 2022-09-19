import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { IMoment } from 'src/app/interfaces/Moment.entity';
import { IComment } from 'src/app/interfaces/Comment.entity';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';
import { CommentService } from 'src/app/services/comment.service';
import { IResponse } from 'src/app/interfaces/Response.entity';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private router: Router,
    private commentService: CommentService,
    private messageService: MessagesService
  ) { }

  loading = true;
  moment !: IMoment;
  apiUrl = environment.apiUrl;

  commentForm!: FormGroup;
  comment!: IComment;

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }

  removeHandler(id: any) {
    this.momentService.deleteMoment(id).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(["/"]);
      }
    });
  };

  onSubmit(formDirective: FormGroupDirective) {
    if(this.commentForm.invalid) {
      return;
    }

    const data: IComment = this.commentForm.value;
    data.momentId = Number(this.moment.id);

    this.commentService.createComment(data).subscribe({
      next: (response: IResponse<IComment>) => {
        this.moment.comments!.push(response.data)
        this.loading = false;
      }
    })

    this.messageService.add("Comentário adicionado!");
    
    this.commentForm.reset();
    formDirective.resetForm();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe({
      next: (response) => {
        this.moment = response.data;
        this.loading = false;
      }
    })

    this.commentForm = new FormGroup({
      text: new FormControl('', [Validators.required]), 
      username: new FormControl('', [Validators.required])
    });

    this.commentService.createComment(this.comment).subscribe({
      next: (response) => {
        this.comment = response.data;
      }
    });
  }

}
