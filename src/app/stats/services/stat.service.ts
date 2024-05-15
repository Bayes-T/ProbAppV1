import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stat } from 'src/app/shared/interfaces/stat.interface';
import { Observable, catchError, delay, map, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatService {

  constructor(private http:HttpClient) { }

  public basic_URL = "http://localhost:3000/stats"

  getStats():Observable<Stat[]>{
    return this.http.get<Stat[]>(`${this.basic_URL}`)
  }

  getDetail(id:string):Observable<Stat>{
    return this.http.get<Stat>(`${this.basic_URL}/${id}`)
  }


  newStat(stat:Stat):Observable<Stat>{
    return this.http.post<Stat>(`${this.basic_URL}`, stat)
  }

  editStat(stat: Stat, index:string):Observable<Stat>{
    return this.http.patch<Stat>(`${this.basic_URL}/${index}`,stat)
  }

  deleteStat(index:string):Observable<boolean>{
   return this.http.delete<boolean>(`${this.basic_URL}/${index}`)
  }
}
