import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Smer } from 'src/app/models/smer';
import { SmerService } from 'src/app/services/smer.service';

@Component({
  selector: 'app-smer-dialog',
  templateUrl: './smer-dialog.component.html',
  styleUrls: ['./smer-dialog.component.css']
})
export class SmerDialogComponent implements OnInit {

  public flag: number;
  constructor(public snackBar: MatSnackBar, public dialogRef: MatDialogRef<SmerDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data: Smer,
     public smerService: SmerService ) { }

  ngOnInit(): void {
  }

  public addSmer():void{
    this.smerService.addSmer(this.data).subscribe(()=>{
      this.snackBar.open('Uspjesno dodan smer: ' + this.data.naziv, 'OK',{
        duration:2500
      })
    }),
    (error:Error)=>{
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske pri dodavanju novog smera,','Zatvori',{
        duration:2500
      })
    }
  }

  public updateSmer():void{
    this.smerService.updateSmer(this.data).subscribe(()=>{
      this.snackBar.open('Uspesno modifikovan smer: '+this.data.naziv,'OK',{
        duration:2500
      })
    }),
    (error:Error)=>{
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske pri modifikovanju smera,','Zatvori',{
        duration:2500
      })
    }
  }

  public deleteSmer(): void{
    this.smerService.deleteSmer(this.data.id).subscribe(()=>{
      this.snackBar.open('Uspjesno obrisan smer: '+ this.data.naziv,'OK',{
        duration:2500
      })
    }),
    (error:Error)=>{
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske pri brisanju smera,','Zatvori',{
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
