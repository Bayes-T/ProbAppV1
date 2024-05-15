import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Stat } from 'src/app/shared/interfaces/stat.interface';
import { StatService } from '../../services/stat.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogUpdateComponent } from '../dialog_update/dialog_update';
import { DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { concatMap, filter, map, switchMap, tap } from 'rxjs';


@Component({
  selector: 'stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.css']
})
export class StatCardComponent {

  constructor(private statService:StatService, private router: Router, private _snackBar: MatSnackBar, public dialog:MatDialog){}

  @Input()
  public edit_flag_hijo:boolean = true
 
  @Input()
  public read_flag_hijo:boolean = true

  @Input()
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

  onUpdateStat(){

    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true
    dialogConfig.data = this.stat

    //Configuro lo que va a suceder cuando se inicie la instancia del dialog. 
    this.dialog.open(DialogUpdateComponent, dialogConfig)

    //Esta variable va a almacenar lo que el usuario haga en el dialog

    const dialogRef = this.dialog.open(DialogUpdateComponent, dialogConfig)
    dialogRef.afterClosed()
    .pipe(
      //filter emite valores del observable que cumplan
      filter( (resp) => Object.values(resp) !== Object.values(this.stat) && resp.index ),
      //El subscribe debe suscribirse a un Observable, no hacer el mismo las operaciones dentro de él.!!! Si hago el statService.editStat dentro del subscribe, no hay nadie que se suscriba a esos cambios!!!!! cuando edite un valor, necesita un suscriptor después!!
      concatMap((resp) => this.statService.editStat(resp, resp.index)),
    )
    .subscribe()
  }

  onDeleteStat(){
    this.statService.deleteStat(this.stat.index)
    .subscribe(() => console.log('borrado'))
  }


}
