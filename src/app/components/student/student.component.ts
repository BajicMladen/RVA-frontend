import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Grupa } from 'src/app/models/grupa';
import { Projekat } from 'src/app/models/projekat';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { StudentDialogComponent } from '../dialogs/student-dialog/student-dialog.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit,OnDestroy,OnChanges {

  displayedColumns =['id','brojIndeksa','ime', 'prezime','grupa','projekat','actions'];
  dataSource: MatTableDataSource<Student>;
  subscription:Subscription
  @Input() selektovanaGrupa: Grupa;

  @ViewChild(MatSort,{static: false}) sort:MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator:MatPaginator

  constructor(private studentService: StudentService, private dialog:MatDialog) { }


  ngOnChanges(): void {
    if(this.selektovanaGrupa.id!=null){
      this.loadData();
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    //this.loadData();
  }

  loadData(){
    this.subscription = this.studentService.getStudentiIzGrupe(this.selektovanaGrupa.id).subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);

                 // pretraga po nazivu ugnježdenog objekta
     this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm: string, key: string) => {
        return key === 'projekat' ? currentTerm + data.projekat.naziv : currentTerm + data[key];
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

     // sortiranje po nazivu ugnježdenog objekta
    this.dataSource.sortingDataAccessor = (data, property) => {
      switch (property) {
        case 'projekat': return data.projekat.naziv.toLocaleLowerCase();
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

  openDialog(flag:number, id?:number, brojIndeksa?:string, ime?: string, prezime?: string, grupa?: Grupa, projekat?:Projekat){
    const dialogRef = this.dialog.open(StudentDialogComponent,
      {data:{id,brojIndeksa,ime,prezime,grupa,projekat}});
    
      dialogRef.componentInstance.flag = flag;
      if(flag===1){
        dialogRef.componentInstance.data.grupa = this.selektovanaGrupa;
      }
      dialogRef.afterClosed().subscribe(res =>{
        if(res==1){
          this.loadData();
        }
      })
  }

  applyFilter(event: Event) {
    var filterValue =  (event.target as HTMLInputElement).value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

}
