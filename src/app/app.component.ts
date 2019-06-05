import { Component } from '@angular/core';
import { InvoiceLine, InvoiceCalculatorService, Invoice } from './invoice-calculator.service';
import { VatCategory } from './vat-categories.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  invoiceLines: InvoiceLine[] = [];
  invoice: Invoice = {
    invoiceLines: [],
    totalPriceExclusiveVat: 0,
    totalPriceInclusiveVat: 0,
    totalVat: 0
  };

  product = '';
  priceInclusiveVat = 0;
  vatCategoryString = 'Food';

  vatCategories = VatCategory;

  constructor(private invoiceCalculator: InvoiceCalculatorService) { }

  addInvoice() {
    // ADD necessary code here
    console.log(this.vatCategories[this.vatCategoryString]);
    const invoiceLine: InvoiceLine = {
      priceInclusiveVat: this.priceInclusiveVat,
      product: this.product,
      vatCategory: this.vatCategories[this.vatCategoryString]
    };
    this.invoiceLines.push(invoiceLine);
    this.invoice = this.invoiceCalculator.CalculateInvoice(this.invoiceLines);
    console.log(this.invoice);

    this.product = '';
    this.priceInclusiveVat = 0;
    this.vatCategoryString = 'Food';
  }
}
