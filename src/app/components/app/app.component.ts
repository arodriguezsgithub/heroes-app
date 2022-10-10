import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { LoadingService } from 'src/services/loading.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  hasHistory: boolean = false;
  showLoading: boolean = true;

  constructor(
    private _router: Router,
    private _location: Location,
    private _loadingService: LoadingService,
    private _cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this._loadingService.subjectLoading.subscribe(
      value => {
        this.showLoading = value;
        this._cdRef.detectChanges();
      }
    )
  }

  goBack(){
    this._location.back();
  }

  goHome(){
    this._router.navigate(['/']);
  }

  onActivate(){
    if(this._router.url != '/heroes'){
      this.hasHistory = this._router.navigated;
    }else{
      this.hasHistory = false;
    }
  }

}
