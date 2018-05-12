import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DoushiVerbModule } from './verb/verb.module';
import { DoushiVerbDefinitionModule } from './verb-definition/verb-definition.module';
import { DoushiConjugatedVerbModule } from './conjugated-verb/conjugated-verb.module';
import { DoushiConjugatedVerbDefinitionModule } from './conjugated-verb-definition/conjugated-verb-definition.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        DoushiVerbModule,
        DoushiVerbDefinitionModule,
        DoushiConjugatedVerbModule,
        DoushiConjugatedVerbDefinitionModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DoushiEntityModule {}
