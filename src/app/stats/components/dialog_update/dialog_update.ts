import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Stat } from 'src/app/shared/interfaces/stat.interface';
import { StatService } from '../../services/stat.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-update',
  templateUrl: './dialog_update.component.html',
  styleUrls: ['./dialog_update.component.css']
})
export class DialogUpdateComponent implements OnInit{

  constructor(private fb:FormBuilder, private statService: StatService, public dialogRef: MatDialogRef<DialogUpdateComponent>, @Inject(MAT_DIALOG_DATA) public data:Stat){
    //con esto estoy llenando la data para quue lo que no se edite no se envie vacío!!
    this.currentStat = data 
  }

  ngOnInit(): void {
      this.updateForm = this.fb.group({
      name : [this.currentStat.name, []],
      bithplace: [this.currentStat.bithplace, []],
      institution: [this.currentStat.institution, []],
      maininterest : [this.currentStat.maininterest, []],
      index: [this.currentStat.index, []]
    })
  }

  //Crear antes el formulario. por qué?
  public updateForm!: FormGroup

   public currentStat:Stat
  
  onNoclick():void {
    this.dialogRef.close(false)
  }

  //asi le mando data al componente padre.
  onConfirm():void {
    this.dialogRef.close(this.updateForm.value)
  }

}
