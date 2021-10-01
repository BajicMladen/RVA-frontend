import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PROJEKAT_URL } from 'src/app/app.constants';
import { Projekat } from 'src/app/models/projekat';
import { ProjekatService } from 'src/app/services/projekat.service';

@Component({
  selector: 'app-projekat-dialog',
  templateUrl: './projekat-dialog.component.html',
  styleUrls: ['./projekat-dialog.component.css']
})
export class ProjekatDialogComponent implements OnInit {

  public flag: number;
  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<ProjekatDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: Projekat,
     public projekatService: ProjekatService ) { }

  ngOnInit(): void {
  }

  public addProjekat():void{
    this.projekatService.addProjekat(this.data).subscribe(()=>{
      this.snackBar.open('Uspjesno dodan projekat: ' + this.data.naziv, 'OK',{
        duration:2500
      })
    }),
    (error:Error)=>{
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske pri dodavanju novog projekta,','Zatvori',{
        duration:2500
      })
    }
  }

  public updateProjekat():void{
    this.projekatService.updateProjekat(this.data).subscribe(()=>{
      this.snackBar.open('Uspesno modifikovan projekat: '+this.data.naziv,'OK',{
        duration:2500
      })
    }),
    (error:Error)=>{
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske pri modifikovanju projekta,','Zatvori',{
        duration:2500
      })
    }
  }

  public deleteProjekat(): void{
    this.projekatService.deleteProjekat(this.data.id).subscribe(()=>{
      this.snackBar.open('Uspjesno obrisan projekat: '+ this.data.naziv,'OK',{
        duration:2500
      })
    }),
    (error:Error)=>{
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske pri brisanju projekta,','Zatvori',{
        duration:2500
      })
    }
  }

  public cancel(): void{
    this.dialogRef.close();
    this.snackBar.open('Odustali ste','Zatvori',{
      duration:1000
    })
  }

}
