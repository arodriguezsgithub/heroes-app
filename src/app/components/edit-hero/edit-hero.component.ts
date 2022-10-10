import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/services/hero.interface';
import { HeroesService } from 'src/services/heroes.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-edit-hero',
  templateUrl: './edit-hero.component.html',
  styleUrls: ['./edit-hero.component.scss']
})
export class EditHeroComponent implements OnInit {

  newCardTitle: string = 'Crea tu héroe';
  editCardTitle: string = 'Modifica tu héroe';
  heroId: number = -1;
  heroForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    description: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _heroesService: HeroesService,
    public _dialog: MatDialog) { }

  ngOnInit(): void {
    if(this._route.snapshot.paramMap.get('id')){
      this.heroId = parseInt(this._route.snapshot.paramMap.get('id')!);
      this.getHeroById();
    }
  }

  getHeroById() {
    this._heroesService.getHeroById(this.heroId)
      .subscribe(
        response => {
          this.heroForm.controls['name'].patchValue(response.name);
          this.heroForm.controls['description'].patchValue(response.description);
        },
        error => {
          this.handleError(error);
        }
      );
  }

  onSubmit(){
    let hero: Hero = {
      name: this.heroForm.controls['name'].value!,
      description: this.heroForm.controls['description'].value!
    }
    if(this.heroId != -1){
      hero.id = this.heroId;
      this.editHero(hero);
    }else{
      this.addHero(hero);
    }
  }

  addHero(hero: Hero){
    this._heroesService.addHero(hero)
      .subscribe(
        () => {
          this._router.navigate(['/heroes'])
        },
        error => {
          this.handleError(error);
        }
      );
  }

  editHero(hero: Hero){
    this._heroesService.updateHero(hero)
      .subscribe(
        () => {
          this._router.navigate(['/heroes'])
        },
        error => {
          this.handleError(error);
        }
      );
  }

  handleError(error: any){
    const dialogRef = this._dialog.open(DialogComponent, {
      data: {
        confirm: false,
        title: 'Ha ocurrido un error',
        text: error.statusText
      },
    });
    dialogRef.afterClosed().subscribe(() => {
      this._router.navigate(['/heroes']);
    });
  }

}
