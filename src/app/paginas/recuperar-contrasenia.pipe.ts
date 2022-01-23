import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'recuperarContrasenia'
})
export class RecuperarContraseniaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
