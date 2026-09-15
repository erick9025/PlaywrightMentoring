import { SortingOption } from "../../../utils/enums/sortingOption";

export class ProductsConstants {
    public readonly availableProducts: string[] = [
        "Sauce Labs Backpack",
        "Sauce Labs Bike Light",
        "Sauce Labs Bolt T-Shirt",
        "Sauce Labs Fleece Jacket",
        "Sauce Labs Onesie",
        "Test.allTheThings() T-Shirt (Red)"
    ];

    public readonly legalMessage: string = "© 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy";

    public readonly options: Record<SortingOption, string> = {
        [SortingOption.NumericDescending]: "hilo",
        [SortingOption.NumericAscending]: "lohi",
        [SortingOption.AlphabeticalAscending]: "az",
        [SortingOption.AlphabeticalDescending]: "za"
    };
}