import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UserVerbFormLevel } from './user-verb-form-level.model';
import { UserVerbFormLevelService } from './user-verb-form-level.service';

@Injectable()
export class UserVerbFormLevelPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private userVerbFormLevelService: UserVerbFormLevelService

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
                this.userVerbFormLevelService.find(id)
                    .subscribe((userVerbFormLevelResponse: HttpResponse<UserVerbFormLevel>) => {
                        const userVerbFormLevel: UserVerbFormLevel = userVerbFormLevelResponse.body;
                        this.ngbModalRef = this.userVerbFormLevelModalRef(component, userVerbFormLevel);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.userVerbFormLevelModalRef(component, new UserVerbFormLevel());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userVerbFormLevelModalRef(component: Component, userVerbFormLevel: UserVerbFormLevel): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userVerbFormLevel = userVerbFormLevel;
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
