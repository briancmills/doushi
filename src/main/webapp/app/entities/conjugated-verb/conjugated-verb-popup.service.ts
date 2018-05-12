import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ConjugatedVerb } from './conjugated-verb.model';
import { ConjugatedVerbService } from './conjugated-verb.service';

@Injectable()
export class ConjugatedVerbPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private conjugatedVerbService: ConjugatedVerbService

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
                this.conjugatedVerbService.find(id)
                    .subscribe((conjugatedVerbResponse: HttpResponse<ConjugatedVerb>) => {
                        const conjugatedVerb: ConjugatedVerb = conjugatedVerbResponse.body;
                        this.ngbModalRef = this.conjugatedVerbModalRef(component, conjugatedVerb);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.conjugatedVerbModalRef(component, new ConjugatedVerb());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    conjugatedVerbModalRef(component: Component, conjugatedVerb: ConjugatedVerb): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.conjugatedVerb = conjugatedVerb;
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
