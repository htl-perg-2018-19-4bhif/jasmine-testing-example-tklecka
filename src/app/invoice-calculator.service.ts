import { Injectable } from '@angular/core';
import { VatCategory, VatCategoriesService } from './vat-categories.service';

export interface InvoiceLine {
  product: string;
  vatCategory: VatCategory;
  priceInclusiveVat: number;
}

export interface InvoiceLineComplete extends InvoiceLine {
  priceExclusiveVat: number;
}

export interface Invoice {
  invoiceLines: InvoiceLineComplete[];
  totalPriceInclusiveVat: number;
  totalPriceExclusiveVat: number;
  totalVat: number;
}

@Injectable({
  providedIn: 'root'
})
export class InvoiceCalculatorService {
  constructor(private vatCategoriesService: VatCategoriesService) { }

  public CalculatePriceExclusiveVat(
    priceInclusiveVat: number,
    vatPercentage: number
  ): number {
    const factor = 100 / (100 + vatPercentage);
    return priceInclusiveVat * factor;
  }

  public CalculateInvoice(invoiceLines: InvoiceLine[]): Invoice {
    const invoice: Invoice = {
      invoiceLines: [],
      totalPriceInclusiveVat: 0,
      totalPriceExclusiveVat: 0,
      totalVat: 0
    };

    const completeInvoiceLines: InvoiceLineComplete[] = [];
    let totalVat = 0;
    let totalExclVat = 0;
    let totalInclVat = 0;

    invoiceLines.forEach(invoiceLine => {
      const vat = this.vatCategoriesService.getVat(
        invoiceLine.vatCategory
      );
      const priceExclusiveVat = this.CalculatePriceExclusiveVat(
        invoiceLine.priceInclusiveVat,
        vat
      );
      const lineComplete: InvoiceLineComplete = {
        ...invoiceLine,
        priceExclusiveVat
      };
      completeInvoiceLines.push(lineComplete);
      totalVat +=
        lineComplete.priceInclusiveVat - lineComplete.priceExclusiveVat;
      totalExclVat += lineComplete.priceExclusiveVat;
      totalInclVat += lineComplete.priceInclusiveVat;
    });

    invoice.invoiceLines = completeInvoiceLines;
    invoice.totalVat = totalVat;
    invoice.totalPriceExclusiveVat = totalExclVat;
    invoice.totalPriceInclusiveVat = totalInclVat;
    return invoice;
  }
}
