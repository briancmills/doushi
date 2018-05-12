import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Verb e2e test', () => {

    let navBarPage: NavBarPage;
    let verbDialogPage: VerbDialogPage;
    let verbComponentsPage: VerbComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Verbs', () => {
        navBarPage.goToEntity('verb');
        verbComponentsPage = new VerbComponentsPage();
        expect(verbComponentsPage.getTitle())
            .toMatch(/doushiApp.verb.home.title/);

    });

    it('should load create Verb dialog', () => {
        verbComponentsPage.clickOnCreateButton();
        verbDialogPage = new VerbDialogPage();
        expect(verbDialogPage.getModalTitle())
            .toMatch(/doushiApp.verb.home.createOrEditLabel/);
        verbDialogPage.close();
    });

    it('should create and save Verbs', () => {
        verbComponentsPage.clickOnCreateButton();
        verbDialogPage.typeSelectLastOption();
        verbDialogPage.setDefinitionInput('definition');
        expect(verbDialogPage.getDefinitionInput()).toMatch('definition');
        verbDialogPage.jlptLevelSelectLastOption();
        verbDialogPage.setGradeLevelInput('5');
        expect(verbDialogPage.getGradeLevelInput()).toMatch('5');
        verbDialogPage.endingSelectLastOption();
        verbDialogPage.setVerbTextInput('verbText');
        expect(verbDialogPage.getVerbTextInput()).toMatch('verbText');
        verbDialogPage.setKanjiTextInput('kanjiText');
        expect(verbDialogPage.getKanjiTextInput()).toMatch('kanjiText');
        verbDialogPage.setRomanjiTextInput('romanjiText');
        expect(verbDialogPage.getRomanjiTextInput()).toMatch('romanjiText');
        verbDialogPage.save();
        expect(verbDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class VerbComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-verb div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class VerbDialogPage {
    modalTitle = element(by.css('h4#myVerbLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    typeSelect = element(by.css('select#field_type'));
    definitionInput = element(by.css('input#field_definition'));
    jlptLevelSelect = element(by.css('select#field_jlptLevel'));
    gradeLevelInput = element(by.css('input#field_gradeLevel'));
    endingSelect = element(by.css('select#field_ending'));
    verbTextInput = element(by.css('input#field_verbText'));
    kanjiTextInput = element(by.css('input#field_kanjiText'));
    romanjiTextInput = element(by.css('input#field_romanjiText'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTypeSelect = function(type) {
        this.typeSelect.sendKeys(type);
    };

    getTypeSelect = function() {
        return this.typeSelect.element(by.css('option:checked')).getText();
    };

    typeSelectLastOption = function() {
        this.typeSelect.all(by.tagName('option')).last().click();
    };
    setDefinitionInput = function(definition) {
        this.definitionInput.sendKeys(definition);
    };

    getDefinitionInput = function() {
        return this.definitionInput.getAttribute('value');
    };

    setJlptLevelSelect = function(jlptLevel) {
        this.jlptLevelSelect.sendKeys(jlptLevel);
    };

    getJlptLevelSelect = function() {
        return this.jlptLevelSelect.element(by.css('option:checked')).getText();
    };

    jlptLevelSelectLastOption = function() {
        this.jlptLevelSelect.all(by.tagName('option')).last().click();
    };
    setGradeLevelInput = function(gradeLevel) {
        this.gradeLevelInput.sendKeys(gradeLevel);
    };

    getGradeLevelInput = function() {
        return this.gradeLevelInput.getAttribute('value');
    };

    setEndingSelect = function(ending) {
        this.endingSelect.sendKeys(ending);
    };

    getEndingSelect = function() {
        return this.endingSelect.element(by.css('option:checked')).getText();
    };

    endingSelectLastOption = function() {
        this.endingSelect.all(by.tagName('option')).last().click();
    };
    setVerbTextInput = function(verbText) {
        this.verbTextInput.sendKeys(verbText);
    };

    getVerbTextInput = function() {
        return this.verbTextInput.getAttribute('value');
    };

    setKanjiTextInput = function(kanjiText) {
        this.kanjiTextInput.sendKeys(kanjiText);
    };

    getKanjiTextInput = function() {
        return this.kanjiTextInput.getAttribute('value');
    };

    setRomanjiTextInput = function(romanjiText) {
        this.romanjiTextInput.sendKeys(romanjiText);
    };

    getRomanjiTextInput = function() {
        return this.romanjiTextInput.getAttribute('value');
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
