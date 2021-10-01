import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Projekat } from 'src/app/models/projekat';
import { ProjekatService } from 'src/app/services/projekat.service';
import { ProjekatDialogComponent } from '../dialogs/projekat-dialog/projekat-dialog.component';

@Component({
  selector: 'app-projekat',
  templateUrl: './projekat.component.html',
  styleUrls: ['./projekat.component.css']
})
export class ProjekatComponent implements OnInit,OnDestroy {

  displayedColumns = ['id','naziv','opis','oznaka','actions'];
  dataSource: MatTableDataSource<Projekat>;
  subscription: Subscription;

  @ViewChild(MatSort,{static: false}) sort:MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator:MatPaginator

  constructor(private projekatService: ProjekatService,
      private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData()
  }

  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

  public loadData(){
    this.subscription = this.projekatService.getAllProjekti().subscribe(
      data =>{
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ),
    (error:Error)=>{
      console.log(error.name+' '+ error.message)
    }
  }

  public openDialog(flag:number,id?:number,naziv?:string,opis?:string,oznaka?:string):void{
    const dialogRef = this.dialog.open(ProjekatDialogComponent,{data:{id,naziv,opis,oznaka}});

    dialogRef.componentInstance.flag = flag;

    dialogRef.afterClosed().subscribe(result=>{
      if (result === 1) {
        this.loadData();
      }
    })
  }

  applyFilter(event: Event) {
    var filterValue =  (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue; //  MoJa   --> MoJa --> moja
  }

}
