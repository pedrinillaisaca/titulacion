import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filtroCoincident'
})
export class FiltroCoincidentPipe implements PipeTransform {

  transform(value: any, arg: any, arg1:any): any { 

    if (arg === '' || arg.length < 3) return value;
    const resultPosts = [];
    for (const post of value) {
      // PILAS CON ESTTO  post.nombre
        if (post.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
          resultPosts.push(post);
      // if(arg1 == undefined){
      //   };
      // }else{
      //   if (post.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1 && post.provincia.toLowerCase().indexOf(arg1.toLowerCase()) > -1) {
      //     resultPosts.push(post);
      //   };
      }
    };
    return resultPosts;
  }

}
