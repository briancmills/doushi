import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ConjugatedVerbDefinition } from './conjugated-verb-definition.model';
import { ConjugatedVerbDefinitionService } from './conjugated-verb-definition.service';

@Injectable()
export class ConjugatedVerbDefinitionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private conjugatedVerbDefinitionService: ConjugatedVerbDefinitionService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.conjugatedVerbDefinitionService.find(id)
                    .subscribe((conjugatedVerbDefinitionResponse: HttpResponse<ConjugatedVerbDefinition>) => {
                        const conjugatedVerbDefinition: ConjugatedVerbDefinition = conjugatedVerbDefinitionResponse.body;
                        this.ngbModalRef = this.conjugatedVerbDefinitionModalRef(component, conjugatedVerbDefinition);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.conjugatedVerbDefinitionModalRef(component, new ConjugatedVerbDefinition());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    conjugatedVerbDefinitionModalRef(component: Component, conjugatedVerbDefinition: ConjugatedVerbDefinition): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.conjugatedVerbDefinition = conjugatedVerbDefinition;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
