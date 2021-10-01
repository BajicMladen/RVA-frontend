import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Grupa } from 'src/app/models/grupa';
import { Smer } from 'src/app/models/smer';
import { GrupaService } from 'src/app/services/grupa.service';
import { GrupaDialogComponent } from '../dialogs/grupa-dialog/grupa-dialog.component';

@Component({
  selector: 'app-grupa',
  templateUrl: './grupa.component.html',
  styleUrls: ['./grupa.component.css']
})
export class GrupaComponent implements OnInit, OnDestroy {

  displayedColumns =['id','oznaka','smer', 'actions'];
  dataSource: MatTableDataSource<Grupa>;
  subscription: Subscription;
  selektovanaGrupa: Grupa; 

  @ViewChild(MatSort,{static: false}) sort:MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator:MatPaginator

  constructor(private grupaService: GrupaService, 
    private dialog:MatDialog) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }
  
  loadData(){
    this.subscription = this.grupaService.getAllGrupe().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);

           // pretraga po nazivu ugnježdenog objekta
     this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm: string, key: string) => {
        return key === 'smer' ? currentTerm + data.smer.naziv : currentTerm + data[key];
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

     // sortiranje po nazivu ugnježdenog objekta
    this.dataSource.sortingDataAccessor = (data, property) => {
      switch (property) {
        case 'projekat': return data.smer.naziv.toLocaleLowerCase();
        default: return data[property];
      }
    };


      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }),
    (error: Error)=>{
      console.log(error.name+' '+ error.message)
    }
  }

  public openDialog(flag: number,id?: number,oznaka?:string,smer?: Smer){
    const dialogRef = this.dialog.open(GrupaDialogComponent,{data:{
      id,oznaka,smer
    }});
    dialogRef.componentInstance.flag=flag;
    dialogRef.afterClosed().subscribe(res =>{
      if(res==1){
        this.loadData();
      }
    })
  }

  selectRow(row: any){
    this.selektovanaGrupa=row;
  }

  applyFilter(event: Event) {
    var filterValue =  (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue; 
  }

}
