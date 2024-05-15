import { Component, OnInit } from '@angular/core';
import { Stat } from 'src/app/shared/interfaces/stat.interface';
import { StatService } from '../../services/stat.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-stat-detail-page',
  templateUrl: './stat-detail-page.component.html',
  styleUrls: ['./stat-detail-page.component.css']
})
export class StatDetailPageComponent implements OnInit{

  constructor(private statService:StatService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params
    .pipe(
      switchMap(({id}) => this.statService.getDetail(id))
    ).subscribe(resp => this.stat = resp)
  }

  public stat:Stat = {
    id: "",
    _id: "",
    name: "",
    bithplace: "",
    institution: "",
    topics: [],
    maininterest: "",
    img: "",
    index: ''
  }

  public read_flag:boolean = false

}
