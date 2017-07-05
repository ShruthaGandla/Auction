import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';


const APP_ROUTES: Routes = [
    { path: '', redirectTo:'/login',pathMatch:'full' },
    { path: 'login', component: LoginComponent },

    { path: 'currentAuctions/:name', component: ProductComponent },
    {path:'create/:name',component:CreateComponent },
    { path: 'edit/:id/:name', component: EditComponent },
];


export const routing = RouterModule.forRoot(APP_ROUTES);