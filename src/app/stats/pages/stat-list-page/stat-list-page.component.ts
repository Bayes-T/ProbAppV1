import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { Stat } from 'src/app/shared/interfaces/stat.interface';
import { StatService } from '../../services/stat.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-stat-list-page',
  templateUrl: './stat-list-page.component.html',
  styleUrls: ['./stat-list-page.component.css']
})
export class StatListPageComponent implements OnInit{

  constructor(private statService:StatService, private authService: AuthService){}

  ngOnInit(): void {
    this.statService.getStats()
    .subscribe(resp => this.stats = resp)

  }

  public stats:Stat[] = []

  public edit_flag:boolean = false

}
