import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { HomeComponent } from './components/core/home/home.component';
import { GrupaComponent } from './components/grupa/grupa.component';
import { ProjekatComponent } from './components/projekat/projekat.component';
import { SmerComponent } from './components/smer/smer.component';

const routes: Routes = [
  {path:'projekat',component:ProjekatComponent},
  {path:'smer', component:SmerComponent},
  {path:'grupa',component:GrupaComponent},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutComponent},
  {path:'author',component:AuthorComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
