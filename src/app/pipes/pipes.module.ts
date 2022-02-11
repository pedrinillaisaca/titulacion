import { NgModule } from '@angular/core';
import { FiltroCoincidentPipe } from './filtro-coincident.pipe';
import { FiltroProvPipe } from './filtro-prov.pipe';


@NgModule({
declarations: [FiltroCoincidentPipe, FiltroProvPipe],
imports: [],
exports: [FiltroCoincidentPipe,FiltroProvPipe],
})

export class PipesModule {}