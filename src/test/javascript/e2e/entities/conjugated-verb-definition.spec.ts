import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('ConjugatedVerbDefinition e2e test', () => {

    let navBarPage: NavBarPage;
    let conjugatedVerbDefinitionDialogPage: ConjugatedVerbDefinitionDialogPage;
    let conjugatedVerbDefinitionComponentsPage: ConjugatedVerbDefinitionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load ConjugatedVerbDefinitions', () => {
        navBarPage.goToEntity('conjugated-verb-definition');
        conjugatedVerbDefinitionComponentsPage = new ConjugatedVerbDefinitionComponentsPage();
        expect(conjugatedVerbDefinitionComponentsPage.getTitle())
            .toMatch(/doushiApp.conjugatedVerbDefinition.home.title/);

    });

    it('should load create ConjugatedVerbDefinition dialog', () => {
        conjugatedVerbDefinitionComponentsPage.clickOnCreateButton();
        conjugatedVerbDefinitionDialogPage = new ConjugatedVerbDefinitionDialogPage();
        expect(conjugatedVerbDefinitionDialogPage.getModalTitle())
            .toMatch(/doushiApp.conjugatedVerbDefinition.home.createOrEditLabel/);
        conjugatedVerbDefinitionDialogPage.close();
    });

   /* it('should create and save ConjugatedVerbDefinitions', () => {
        conjugatedVerbDefinitionComponentsPage.clickOnCreateButton();
        conjugatedVerbDefinitionDialogPage.setDefinitionInput('definition');
        expect(conjugatedVerbDefinitionDialogPage.getDefinitionInput()).toMatch('definition');
        conjugatedVerbDefinitionDialogPage.conjugatedVerbSelectLastOption();
        conjugatedVerbDefinitionDialogPage.save();
        expect(conjugatedVerbDefinitionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ConjugatedVerbDefinitionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-conjugated-verb-definition div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ConjugatedVerbDefinitionDialogPage {
    modalTitle = element(by.css('h4#myConjugatedVerbDefinitionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    definitionInput = element(by.css('input#field_definition'));
    conjugatedVerbSelect = element(by.css('select#field_conjugatedVerb'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDefinitionInput = function(definition) {
        this.definitionInput.sendKeys(definition);
    };

    getDefinitionInput = function() {
        return this.definitionInput.getAttribute('value');
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
