import { SortingOption } from "../../../utils/enums/sortingOption";
import { Asserts } from "../../../utils/asserts";

export class ProductsElements {
    public readonly buttonAnyProduct: string = "//div[@class='inventory_item_description' and contains(.,'{{key}}')]//button";

    public readonly ddlSort: string = ".product_sort_container";

    public returnLocatorForSorting(byOption: SortingOption): string {
        switch(byOption) {
            case SortingOption.AlphabeticalAscending:
            case SortingOption.AlphabeticalDescending:
                return ".inventory_item_name" ; // do this line for above 2 cases
            case SortingOption.NumericAscending:
            case SortingOption.NumericDescending:
                return ".inventory_item_price" ; // do this line for above 2 cases
            default:
                Asserts.assertFail("Unhandled option yet: " + byOption);
                return ""; // Not reachable code because above assert will throw an error, but required to prevent error in code
        }
    }
}