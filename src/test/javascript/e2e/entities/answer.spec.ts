import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Answer e2e test', () => {

    let navBarPage: NavBarPage;
    let answerDialogPage: AnswerDialogPage;
    let answerComponentsPage: AnswerComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Answers', () => {
        navBarPage.goToEntity('answer');
        answerComponentsPage = new AnswerComponentsPage();
        expect(answerComponentsPage.getTitle())
            .toMatch(/doushiApp.answer.home.title/);

    });

    it('should load create Answer dialog', () => {
        answerComponentsPage.clickOnCreateButton();
        answerDialogPage = new AnswerDialogPage();
        expect(answerDialogPage.getModalTitle())
            .toMatch(/doushiApp.answer.home.createOrEditLabel/);
        answerDialogPage.close();
    });

   /* it('should create and save Answers', () => {
        answerComponentsPage.clickOnCreateButton();
        answerDialogPage.getCorrectInput().isSelected().then((selected) => {
            if (selected) {
                answerDialogPage.getCorrectInput().click();
                expect(answerDialogPage.getCorrectInput().isSelected()).toBeFalsy();
            } else {
                answerDialogPage.getCorrectInput().click();
                expect(answerDialogPage.getCorrectInput().isSelected()).toBeTruthy();
            }
        });
        answerDialogPage.setDateInput(12310020012301);
        expect(answerDialogPage.getDateInput()).toMatch('2001-12-31T02:30');
        answerDialogPage.setInputInput('input');
        expect(answerDialogPage.getInputInput()).toMatch('input');
        answerDialogPage.userSelectLastOption();
        answerDialogPage.verbSelectLastOption();
        answerDialogPage.conjugatedVerbSelectLastOption();
        answerDialogPage.save();
        expect(answerDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class AnswerComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-answer div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class AnswerDialogPage {
    modalTitle = element(by.css('h4#myAnswerLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    correctInput = element(by.css('input#field_correct'));
    dateInput = element(by.css('input#field_date'));
    inputInput = element(by.css('input#field_input'));
    userSelect = element(by.css('select#field_user'));
    verbSelect = element(by.css('select#field_verb'));
    conjugatedVerbSelect = element(by.css('select#field_conjugatedVerb'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    getCorrectInput = function() {
        return this.correctInput;
    };
    setDateInput = function(date) {
        this.dateInput.sendKeys(date);
    };

    getDateInput = function() {
        return this.dateInput.getAttribute('value');
    };

    setInputInput = function(input) {
        this.inputInput.sendKeys(input);
    };

    getInputInput = function() {
        return this.inputInput.getAttribute('value');
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
