import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instPipe'
})
export class InstPipe implements PipeTransform {

  transform(institution: String): String {

    if(institution.includes('Universidad' || 'University')){
      return `la ${institution}`
    } else {
      return institution
    }
  }

}
