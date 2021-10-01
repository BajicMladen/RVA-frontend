import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Grupa } from 'src/app/models/grupa';
import { Smer } from 'src/app/models/smer';
import { GrupaService } from 'src/app/services/grupa.service';
import { SmerService } from 'src/app/services/smer.service';

@Component({
  selector: 'app-grupa-dialog',
  templateUrl: './grupa-dialog.component.html',
  styleUrls: ['./grupa-dialog.component.css']
})
export class GrupaDialogComponent implements OnInit {
  public flag:number;
  smer: Smer[]

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GrupaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Grupa,
    public grupaService: GrupaService,
    public smerService: SmerService
    ) { }

  ngOnInit(): void {
    this.smerService.getAllSmer().subscribe(smer=>
      this.smer=smer
    )
  }

  compareTo(a : any,b : any){
    return a.id == b.id;
  }

  public add(): void{
    this.grupaService.addGrupa(this.data).subscribe(()=>{
      this.snackBar.open('Grupa uspjesno dodata '+ this.data.id, 'OK',{
        duration: 2500
      })
    }),
    (error: Error)=>{
      console.log(error.name+ ' ' + error.message)
      this.snackBar.open('Doslo je do greske prilikom dodavanja grupe '+this.data.id,'OK',{
        duration: 2500
      })
    }
  }

  public update():void{
    this.grupaService.updateGrupa(this.data).subscribe(()=>{
      this.snackBar.open('Grupa uspjesno izmjenjena '+ this.data.id, 'OK',{
        duration: 2500
      })
    }),
    (error: Error)=>{
      console.log(error.name+ ' ' + error.message)
      this.snackBar.open('Doslo je do greske prilikom izmjene grupe '+this.data.id,'OK',{
        duration: 2500
      })
    }
  }

  public delete(): void{
    this.grupaService.deleteGrupa(this.data.id).subscribe(()=>{
      this.snackBar.open('Grupa uspjesno obrisana '+ this.data.id, 'OK',{
        duration: 2500
      })
    }),
    (error: Error)=>{
      console.log(error.name+ ' ' + error.message)
      this.snackBar.open('Doslo je do greske prilikom brisanja grupe '+this.data.id,'OK',{
        duration: 2500
      })
    }
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od akcije '+this.data.id,'Zatvori',{
      duration:2500
    })
  }

}
