import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IMoment } from 'src/app/interfaces/Moment.entity';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private momentService: MomentService
    ) { }
    allMoments: IMoment[] = [];
    moments: IMoment[] = [];
    loading: boolean = true;

    apiUrl = environment.apiUrl

    getAllMoments() {
      this.momentService.getAllMoment().subscribe({
        next: (response) => {
          const data = response.data;
          data.map((item) => {
            //Manipula a data para o formato pt-BR
            item.created_at = new Date(item.created_at!).toLocaleDateString('pt-BR');
          })
          this.moments = data;
          this.allMoments = data;
          this.loading = false;
        }
      });
    }

    search(event: Event) {
      const target = event.target as HTMLInputElement;
      const value = target.value;

      this.moments = this.allMoments.filter(moment => moment.title.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
    }


  ngOnInit(): void {
    this.getAllMoments();
  }

}
