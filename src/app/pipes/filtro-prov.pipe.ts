import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroProv'
})
export class FiltroProvPipe implements PipeTransform {

  transform(value: any, arg: any): any { 
        // if (arg === '' || arg.length < 3) return value;
    try {
      // PILAS ES PORQUE ALGUNAS JUNTAS NO TIENE LA PROVINCIA
      const resultPosts = [];
      for (const post of value) {
        // PILAS CON ESTTO  post.nombre
          if ( post.provincia.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
            resultPosts.push(post);
          };
        }    
      return resultPosts;
    } catch (error) {      
    }
  }


}
