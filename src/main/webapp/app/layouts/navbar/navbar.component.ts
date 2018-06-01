import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiLanguageService, JhiEventManager } from 'ng-jhipster';

import { ProfileService } from '../profiles/profile.service';
import { JhiLanguageHelper, Principal, LoginModalService, LoginService } from '../../shared';

import { VERSION } from '../../app.constants';
import { Verb } from '../../entities/verb/verb.model';
import { VerbService } from '../../entities/verb/verb.service';
import { ConjugatedVerb } from '../../entities/conjugated-verb/conjugated-verb.model';
import { ConjugatedVerbService } from '../../entities/conjugated-verb/conjugated-verb.service';

@Component({
    selector: 'jhi-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: [
        'navbar.scss'
    ]
})
export class NavbarComponent implements OnInit {
    inProduction: boolean;
    isNavbarCollapsed: boolean;
    languages: any[];
    swaggerEnabled: boolean;
    modalRef: NgbModalRef;
    version: string;
    lessonCount: number;
    verbQuizCount: number;
    conjugatedVerbQuizCount: number;

    constructor(
        private loginService: LoginService,
        private languageService: JhiLanguageService,
        private languageHelper: JhiLanguageHelper,
        private principal: Principal,
        private loginModalService: LoginModalService,
        private profileService: ProfileService,
        private router: Router,
        private verbService: VerbService,
        private conjugatedVerbService: ConjugatedVerbService,
        private eventManager: JhiEventManager
    ) {
        this.version = VERSION ? 'v' + VERSION : '';
        this.isNavbarCollapsed = true;
        this.verbQuizCount = 0;
        this.conjugatedVerbQuizCount = 0;
        router.events.subscribe((val) => {
            if (val instanceof NavigationEnd) {
              this.refreshCounts();
            }
        });
    }

    ngOnInit() {
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });

        this.profileService.getProfileInfo().then((profileInfo) => {
            this.inProduction = profileInfo.inProduction;
            this.swaggerEnabled = profileInfo.swaggerEnabled;
            if (this.inProduction && window.location.href.lastIndexOf('http://', 0) === 0) {
              window.location.href = window.location.href.replace('http://', 'https://');
            }
        });
        this.refreshCounts();
        this.eventManager.subscribe('quizTaken', (response) => this.refreshCounts());
    }

    refreshCounts() {
      　this.verbService.queryAvailableForStudy({lesson: true})
            .subscribe((verbResponse: HttpResponse<Verb[]>) => {
                this.lessonCount = verbResponse.body.length;
            });
      　this.verbService.queryAvailableForStudy({lesson: false})
            .subscribe((verbResponse: HttpResponse<Verb[]>) => {
                this.verbQuizCount = verbResponse.body.length;
            });
        this.conjugatedVerbService.queryAvailableForStudy()
            .subscribe((verbResponse: HttpResponse<ConjugatedVerb[]>) => {
               this.conjugatedVerbQuizCount = verbResponse.body.length;
            });
    }

    changeLanguage(languageKey: string) {
      this.languageService.changeLanguage(languageKey);
    }

    collapseNavbar() {
        this.isNavbarCollapsed = true;
    }

    isAuthenticated() {
        return this.principal.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }

    logout() {
        this.collapseNavbar();
        this.loginService.logout();
        this.router.navigate(['']);
    }

    toggleNavbar() {
        this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }

    getImageUrl() {
        return this.isAuthenticated() ? this.principal.getImageUrl() : null;
    }
}
