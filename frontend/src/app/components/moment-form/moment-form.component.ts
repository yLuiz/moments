import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMoment } from 'src/app/interfaces/Moment.entity';

@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<IMoment>();

  @Input()
  btnText !: string;
  @Input()
  moment: IMoment | null = null;

  momentForm!: FormGroup;
  
  constructor(private router: Router) { }

  submitMethod() {
    if(this.momentForm.invalid) {
      return;
    }

    this.onSubmit.emit(this.momentForm.value)
  };

  cancel() {
    this.router.navigate(['/'])
  }


  ngOnInit(): void {
    this.momentForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(this.moment ? this.moment.title : '', [Validators.required]),
      description: new FormControl(this.moment ? this.moment.description :'', [Validators.required]),
      image: new FormControl(this.moment ? this.moment.image : ''),
    })
  }
  
  get title() {
    return this.momentForm.get('title')!;
  }

  get description() {
    return this.momentForm.get('description')!;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0]

    this.momentForm.patchValue({ image: file })
  }
}
