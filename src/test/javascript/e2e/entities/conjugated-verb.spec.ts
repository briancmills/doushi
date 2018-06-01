import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ConjugatedVerb e2e test', () => {

    let navBarPage: NavBarPage;
    let conjugatedVerbDialogPage: ConjugatedVerbDialogPage;
    let conjugatedVerbComponentsPage: ConjugatedVerbComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ConjugatedVerbs', () => {
        navBarPage.goToEntity('conjugated-verb');
        conjugatedVerbComponentsPage = new ConjugatedVerbComponentsPage();
        expect(conjugatedVerbComponentsPage.getTitle())
            .toMatch(/doushiApp.conjugatedVerb.home.title/);

    });

    it('should load create ConjugatedVerb dialog', () => {
        conjugatedVerbComponentsPage.clickOnCreateButton();
        conjugatedVerbDialogPage = new ConjugatedVerbDialogPage();
        expect(conjugatedVerbDialogPage.getModalTitle())
            .toMatch(/doushiApp.conjugatedVerb.home.createOrEditLabel/);
        conjugatedVerbDialogPage.close();
    });

   /* it('should create and save ConjugatedVerbs', () => {
        conjugatedVerbComponentsPage.clickOnCreateButton();
        conjugatedVerbDialogPage.conjugationTypeSelectLastOption();
        conjugatedVerbDialogPage.setRomanjiTextInput('romanjiText');
        expect(conjugatedVerbDialogPage.getRomanjiTextInput()).toMatch('romanjiText');
        conjugatedVerbDialogPage.setKanjiTextInput('kanjiText');
        expect(conjugatedVerbDialogPage.getKanjiTextInput()).toMatch('kanjiText');
        conjugatedVerbDialogPage.verbSelectLastOption();
        conjugatedVerbDialogPage.save();
        expect(conjugatedVerbDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ConjugatedVerbComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-conjugated-verb div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ConjugatedVerbDialogPage {
    modalTitle = element(by.css('h4#myConjugatedVerbLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    conjugationTypeSelect = element(by.css('select#field_conjugationType'));
    englishInput = element(by.css('input#field_english'));
    japaneseInput = element(by.css('input#field_japanese'));
    verbSelect = element(by.css('select#field_verb'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setConjugationTypeSelect = function(conjugationType) {
        this.conjugationTypeSelect.sendKeys(conjugationType);
    };

    getConjugationTypeSelect = function() {
        return this.conjugationTypeSelect.element(by.css('option:checked')).getText();
    };

    conjugationTypeSelectLastOption = function() {
        this.conjugationTypeSelect.all(by.tagName('option')).last().click();
    };
    setRomanjiTextInput = function(english) {
        this.romanjiTextInput.sendKeys(english);
    };

    getRomanjiTextInput = function() {
        return this.romanjiTextInput.getAttribute('value');
    };

    setKanjiTextInput = function(japanese) {
        this.kanjiTextInput.sendKeys(japanese);
    };

    getKanjiTextInput = function() {
        return this.kanjiTextInput.getAttribute('value');
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
