import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Hero } from 'src/services/hero.interface';
import { HeroesService } from 'src/services/heroes.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  pageSizeOptions: number[] = [5, 10, 15];
  searchValue: string = '';
  displayedColumns: string[] = ['name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Hero>();

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private _heroesService: HeroesService,
    private _router: Router,
    public _dialog: MatDialog) { }

  ngOnInit(){
    this.getHeroes();
  }

  getHeroes(){
    this._heroesService.getHeroes()
    .subscribe(
      response => {
        this.dataSource.data = response;
      },
      error => {
        this.handleError(error);
      }
    )
  }

  searchHeroes(){
    const searchText = this.searchValue;
    this.dataSource.filter = searchText.trim().toLowerCase();
  }

  addHero(){
    this._router.navigate(['edit-hero']);
  }

  editHero(id: number){
    this._router.navigate(['edit-hero', id]);
  }

  deleteHero(id: number){
    const dialogRef = this._dialog.open(DialogComponent, {
      data: {
        confirm: true,
        title: '¿Seguro que quieres borrar el héroe?',
        text: 'La acción no se podrá deshacer'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this._heroesService.deleteHero(id)
          .subscribe(
            () => {
              this.getHeroes();
            },
            error => {
              this.handleError(error);
            }
          );
      }
    });
  }

  clearValue(){
    this.searchValue = '';
    this.getHeroes();
  }

  handleError(error: any){
    const dialogRef = this._dialog.open(DialogComponent, {
      data: {
        confirm: false,
        title: 'Ha ocurrido un error',
        text: error.statusText
      },
    });
    dialogRef.afterClosed().subscribe();
  }

}
