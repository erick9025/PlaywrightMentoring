import { BasePage } from '../../parent/basePage';

export class CartElements {
	public readonly shoppingCartLinkLocator: string = '.shopping_cart_link';
	public readonly checkoutButtonLocator: string = '#checkout';
	public readonly firstNameInputLocator: string = '#first-name';
	public readonly lastNameInputLocator: string = '#last-name';
	public readonly postalCodeInputLocator: string = '#postal-code';
	public readonly continueButtonLocator: string = '#continue';
	public readonly summaryTotalLabelLocator: string = '.summary_total_label';
}