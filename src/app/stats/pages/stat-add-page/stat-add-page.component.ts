import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StatService } from '../../services/stat.service';
import { Stat } from 'src/app/shared/interfaces/stat.interface';
import { delay, map, switchMap, tap, timer } from 'rxjs';
import { FormService } from '../../services/form.service';


@Component({
  selector: 'app-stat-add-page',
  templateUrl: './stat-add-page.component.html',
  styleUrls: ['./stat-add-page.component.css']
})
export class StatAddPageComponent implements OnInit{

  constructor(private statService: StatService, private fb: FormBuilder, private formService: FormService){}

  ngOnInit(): void {
    this.statService.getStats()
    .subscribe(resp => this.stats = resp)

    setTimeout(() => {
      console.log(this.stats)
    }, 1000);

  }

  public stats:Stat[] = []



  public addForm = this.fb.group({
    // id: [""],
    // _id:[""],
    name: ["", [Validators.required, Validators.minLength(3)], []],
    bithplace: ["", [Validators.required, Validators.minLength(3)], []],
    institution: ["", [Validators.required, Validators.minLength(3)], []],
    topics: [[""], [], []],
    maininterest: ["", [Validators.required, Validators.minLength(3)], []],
    img: ["", [Validators.required, Validators.minLength(3)], []]
  })

  public check1:boolean = false
  public check2:boolean = false
  public check3:boolean = false
  public check4:boolean = false

  onCheck1(check:Event){
    const isChecked = (<HTMLInputElement>event!.target).checked;
    this.check1 = isChecked;
  }

  onCheck2(check:Event){
    const isChecked = (<HTMLInputElement>event!.target).checked;
    this.check2 = isChecked;
  }

  onCheck3(check:Event){
    const isChecked = (<HTMLInputElement>event!.target).checked;
    this.check3 = isChecked;
  }

  onCheck4(check:Event){
    const isChecked = (<HTMLInputElement>event!.target).checked;
    this.check4 = isChecked;
  }

   get newStat(){
    const stat = this.addForm.value as Stat
    return stat
  }

  public isValid(field:string){
    return this.formService.isValid(this.addForm, field)
  }

  public getFieldError(field:string){
    return this.formService.getFieldError(this.addForm, field)
  }

  onSave(stat:Stat):void{  
    // Object.keys(this.addForm.controls).forEach(key => {
    //   console.log(this.addForm.get(key)!.errors);
    // });

    //esta retornandome null, ergo no se muestra nada!!
    console.log(this.getFieldError('name'))

    if(!this.addForm.valid) return
    const topics:any = []
    if(this.check1 == true){
      topics.push('Estadística Bayesiana')
    }
    if(this.check2 == true){
      topics.push('Optimización')
    }
    if(this.check3 == true){
      topics.push('Estadística General')
    }
    if(this.check4 == true){
      topics.push('Matemática General')
    }

   this.newStat.topics = topics

   const array_length = this.stats.length + 1

   this.newStat.index = array_length.toString()
   timer(1000).pipe(
    switchMap(() => this.statService.newStat(stat)
    )
   ).subscribe()

   this.addForm.reset()
  }

  
 
}
