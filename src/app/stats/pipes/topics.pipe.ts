import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'topicsPipe'
})
export class TopicsPipe implements PipeTransform {

  transform(topics: string[]): string {

    const cantidad = topics.length
    let temas:string = ""
    let resultado:string = ""

    topics.forEach((topic, index) => {
      if(topics.length == cantidad) {
        resultado = ` y ${topic}`
      }
      if(index !== cantidad && topic !== topics[cantidad - 1]) {
       temas += `${topic}, ` 
      } 
    })
    return temas + resultado
  }

}
