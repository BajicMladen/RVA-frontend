import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './components/core/home/home.component';
import { AuthorComponent } from './components/core/author/author.component';
import { AboutComponent } from './components/core/about/about.component';
import { GrupaComponent } from './components/grupa/grupa.component';
import { ProjekatComponent } from './components/projekat/projekat.component';
import { SmerComponent } from './components/smer/smer.component';
import { StudentComponent } from './components/student/student.component';
import { ProjekatDialogComponent } from './components/dialogs/projekat-dialog/projekat-dialog.component';
import { FormsModule } from '@angular/forms';
import { SmerDialogComponent } from './components/dialogs/smer-dialog/smer-dialog.component';
import { GrupaDialogComponent } from './components/dialogs/grupa-dialog/grupa-dialog.component';
import { StudentDialogComponent } from './components/dialogs/student-dialog/student-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthorComponent,
    AboutComponent,
    GrupaComponent,
    ProjekatComponent,
    SmerComponent,
    StudentComponent,
    ProjekatDialogComponent,
    SmerDialogComponent,
    GrupaDialogComponent,
    StudentDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatSelectModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
