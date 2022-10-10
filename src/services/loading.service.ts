import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  subjectLoading = new Subject<boolean>();

  constructor() { }

  showLoading(show: boolean){
    this.subjectLoading.next(show);
  }

}
