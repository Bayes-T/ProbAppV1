import { AfterViewInit, Component, Input, OnChanges, OnInit, EventEmitter } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User, authStatus, loginInterface } from 'src/app/auth/interfaces/atuh.interfaces';
import { delay, of } from 'rxjs';

@Component({
  selector: 'shared-layout',
  templateUrl: './shared-layout.component.html',
  styleUrls: ['./shared-layout.component.css']
})
export class SharedLayoutComponent  implements OnInit{


  constructor(private authService:AuthService) {

  }
  ngOnInit(): void {
    this.authService.dataEmitter.subscribe(data => this.currentUser = data)
  }

  public currentUser:User | null = null
 

  public itemList = [
    {name: "Lista",
    icon: 'list',
    url: '/stats/list'
  },
  {name: "Agregar estadístico",
  icon: 'add',
  url: '/stats/add'
  },
  {name: "Ingresar con otra cuenta",
  icon: 'login',
  url: '/auth/login'
  },
  {name: "Registrarme",
  icon: 'app_registration',
  url: '/auth/register'
  }
  ]

  logout(){
    this.authService.dataEmitter.subscribe(data => this.currentUser = data)
    this.authService.logout()
  }
}
