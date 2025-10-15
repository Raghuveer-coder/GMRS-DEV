import { type Page, type Locator, expect } from '@playwright/test';

export class MeterPage {
    readonly page: Page;

    // Navigation
    readonly transactionsLink: Locator;
    readonly meterLink: Locator;
    readonly newMeterLink: Locator;
    readonly meterHomeLink: Locator;

    // Form Fields
    readonly manufactureDateInput: Locator;
    readonly meterNumPrefixInput: Locator;
    readonly meterNumFromInput: Locator;
    readonly meterNumSuffixInput: Locator;
    readonly meterSerialNumInput: Locator;
    readonly meterBrandSelect: Locator;
    readonly meterModelSelect: Locator;
    readonly meterTypeSelect: Locator;
    readonly meterSizeSelect: Locator;
    readonly uomSelect: Locator;
    readonly dialLengthSelect: Locator;
    readonly gratingInput: Locator;
    readonly gratingSuggestionList: Locator;
    readonly gratingExactValue: Locator;
    readonly pUnitSelect: Locator;
    readonly temperatureInput: Locator;
    readonly pressureInput: Locator;
    readonly zFactorInput: Locator;
    readonly cfFactorInput: Locator;

    // Actions
    readonly saveButton: Locator;

    // Messages & Headings
    readonly successMessage: Locator;
    readonly editSuccessMessage: Locator;
    readonly listPageHeading: Locator;

    // Meter Home Page
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;

        // Navigation
        this.transactionsLink = page.getByRole('link', { name: ' Transactions ' });
        this.meterLink = page.getByRole('link', { name: ' Meter ' });
        this.newMeterLink = page.getByRole('link', { name: ' New Meter' });
        this.meterHomeLink = page.getByRole('link', { name: ' Meter-Home' });

        // Form Fields
        this.manufactureDateInput = page.locator("#ManufactureDate");
        this.meterNumPrefixInput = page.locator('#MeterNumPrefix');
        this.meterNumFromInput = page.locator('#MeterNumFrom');
        this.meterNumSuffixInput = page.locator('#MeterNumSuffix');
        this.meterSerialNumInput = page.locator('#MeterSerialNum');
        this.meterBrandSelect = page.locator('#MeterBrand');
        this.meterModelSelect = page.locator('#MeterModel');
        this.meterTypeSelect = page.locator('#MeterType');
        this.meterSizeSelect = page.locator('#MeterSize');
        this.uomSelect = page.locator('#UOM');
        this.dialLengthSelect = page.locator('#DialLength');
        this.gratingInput = page.locator("//input[@id='Grating']");
        this.gratingSuggestionList = page.locator("//ul[@role='listbox']");
        this.gratingExactValue = page.locator("//a[@class='pull-left selectItem'][normalize-space()='GRating: 1.25 | Con Size: 1.250 | QMax: 0.000 | QMin: 0.000 | PMax: 0.000']");
        this.pUnitSelect = page.locator('#PUnit');
        this.temperatureInput = page.locator('#Temparature');
        this.pressureInput = page.locator('#Pressure');
        this.zFactorInput = page.locator('#ZFactor');
        this.cfFactorInput = page.locator('#CFFactor');

        // Actions & Messages
        this.saveButton = page.getByRole('button', { name: ' Save' });
        this.successMessage = page.getByText("Meter purchase saved");
        this.editSuccessMessage = page.getByText('Meter purchase saved succesfully');
        this.listPageHeading = page.getByRole('heading', { name: 'List of meter' });

        // Meter Home Page
        this.searchInput = page.locator('div.dataTables_filter input[type="search"]');
    }

    async gotoNewMeterForm() {
        await this.transactionsLink.click();
        await this.meterLink.click();
        await this.newMeterLink.click();
    }

    async gotoMeterHome() {
        await this.transactionsLink.click();
        await this.meterLink.click();
        await this.meterHomeLink.click();
    }
}