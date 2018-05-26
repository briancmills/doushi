import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('UserVerbFormLevel e2e test', () => {

    let navBarPage: NavBarPage;
    let userVerbFormLevelDialogPage: UserVerbFormLevelDialogPage;
    let userVerbFormLevelComponentsPage: UserVerbFormLevelComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load UserVerbFormLevels', () => {
        navBarPage.goToEntity('user-verb-form-level');
        userVerbFormLevelComponentsPage = new UserVerbFormLevelComponentsPage();
        expect(userVerbFormLevelComponentsPage.getTitle())
            .toMatch(/doushiApp.userVerbFormLevel.home.title/);

    });

    it('should load create UserVerbFormLevel dialog', () => {
        userVerbFormLevelComponentsPage.clickOnCreateButton();
        userVerbFormLevelDialogPage = new UserVerbFormLevelDialogPage();
        expect(userVerbFormLevelDialogPage.getModalTitle())
            .toMatch(/doushiApp.userVerbFormLevel.home.createOrEditLabel/);
        userVerbFormLevelDialogPage.close();
    });

   /* it('should create and save UserVerbFormLevels', () => {
        userVerbFormLevelComponentsPage.clickOnCreateButton();
        userVerbFormLevelDialogPage.levelSelectLastOption();
        userVerbFormLevelDialogPage.userSelectLastOption();
        userVerbFormLevelDialogPage.verbSelectLastOption();
        userVerbFormLevelDialogPage.conjugatedVerbSelectLastOption();
        userVerbFormLevelDialogPage.save();
        expect(userVerbFormLevelDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class UserVerbFormLevelComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-user-verb-form-level div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class UserVerbFormLevelDialogPage {
    modalTitle = element(by.css('h4#myUserVerbFormLevelLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    levelSelect = element(by.css('select#field_level'));
    userSelect = element(by.css('select#field_user'));
    verbSelect = element(by.css('select#field_verb'));
    conjugatedVerbSelect = element(by.css('select#field_conjugatedVerb'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setLevelSelect = function(level) {
        this.levelSelect.sendKeys(level);
    };

    getLevelSelect = function() {
        return this.levelSelect.element(by.css('option:checked')).getText();
    };

    levelSelectLastOption = function() {
        this.levelSelect.all(by.tagName('option')).last().click();
    };
    userSelectLastOption = function() {
        this.userSelect.all(by.tagName('option')).last().click();
    };

    userSelectOption = function(option) {
        this.userSelect.sendKeys(option);
    };

    getUserSelect = function() {
        return this.userSelect;
    };

    getUserSelectedOption = function() {
        return this.userSelect.element(by.css('option:checked')).getText();
    };

    verbSelectLastOption = function() {
        this.verbSelect.all(by.tagName('option')).last().click();
    };

    verbSelectOption = function(option) {
        this.verbSelect.sendKeys(option);
    };

    getVerbSelect = function() {
        return this.verbSelect;
    };

    getVerbSelectedOption = function() {
        return this.verbSelect.element(by.css('option:checked')).getText();
    };

    conjugatedVerbSelectLastOption = function() {
        this.conjugatedVerbSelect.all(by.tagName('option')).last().click();
    };

    conjugatedVerbSelectOption = function(option) {
        this.conjugatedVerbSelect.sendKeys(option);
    };

    getConjugatedVerbSelect = function() {
        return this.conjugatedVerbSelect;
    };

    getConjugatedVerbSelectedOption = function() {
        return this.conjugatedVerbSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
