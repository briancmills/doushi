import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('VerbDefinition e2e test', () => {

    let navBarPage: NavBarPage;
    let verbDefinitionDialogPage: VerbDefinitionDialogPage;
    let verbDefinitionComponentsPage: VerbDefinitionComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load VerbDefinitions', () => {
        navBarPage.goToEntity('verb-definition');
        verbDefinitionComponentsPage = new VerbDefinitionComponentsPage();
        expect(verbDefinitionComponentsPage.getTitle())
            .toMatch(/doushiApp.verbDefinition.home.title/);

    });

    it('should load create VerbDefinition dialog', () => {
        verbDefinitionComponentsPage.clickOnCreateButton();
        verbDefinitionDialogPage = new VerbDefinitionDialogPage();
        expect(verbDefinitionDialogPage.getModalTitle())
            .toMatch(/doushiApp.verbDefinition.home.createOrEditLabel/);
        verbDefinitionDialogPage.close();
    });

   /* it('should create and save VerbDefinitions', () => {
        verbDefinitionComponentsPage.clickOnCreateButton();
        verbDefinitionDialogPage.setDefinitionInput('definition');
        expect(verbDefinitionDialogPage.getDefinitionInput()).toMatch('definition');
        verbDefinitionDialogPage.verbSelectLastOption();
        verbDefinitionDialogPage.save();
        expect(verbDefinitionDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });*/

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class VerbDefinitionComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-verb-definition div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class VerbDefinitionDialogPage {
    modalTitle = element(by.css('h4#myVerbDefinitionLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    definitionInput = element(by.css('input#field_definition'));
    verbSelect = element(by.css('select#field_verb'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setDefinitionInput = function(definition) {
        this.definitionInput.sendKeys(definition);
    };

    getDefinitionInput = function() {
        return this.definitionInput.getAttribute('value');
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
