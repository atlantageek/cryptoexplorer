import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { MainComponent } from './components/main/main.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';




const routes: Routes = [

  {
    path: 'pages', component: PagesComponent, data: {breadcrumb: 'Menu'},
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main',  component: MainComponent },
      { path: 'portfolio',  component: PortfolioComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PagesRoutingModule { }
