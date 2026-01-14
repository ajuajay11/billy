# Welcome to Billy

Billy is a tiny billing workflow demo. You can add items, add customers with discounts, then create invoices from those ingredients. Each invoice can be viewed and printed as a PDF.

## Links

- **Client GitHub Repository:** https://github.com/ajuajay11/billy  
- **Server GitHub Repository:** https://github.com/ajuajay11/billyServer  
- **Live Website (Vercel):** https://billy-seven-indol.vercel.app/

---

## How it works

Start by creating a few items and customers. Then head to **Invoices** to build a bill by selecting a customer and adding line items. Totals are calculated automatically, and the invoice detail view lets you review and print a clean copy.

---

## Features

### Items
- **Item name:** the label that appears on invoices  
- **Price:** the default unit price used when the item is selected  
- *(Optional in UI)* **Phone:** stored with item info (if added)

### Customers
- **Customer name:** the person or company being billed  
- **Discount %:** the default discount applied to that customer  

### Invoices
- **Invoice ID:** the unique number for the invoice  
- **Customer:** the selected customer for the bill  
- **Date:** when the invoice was created  
- **Line items:** each row has an item name, quantity, price, and line total  
- **Subtotal:** sum of all line totals before discount  
- **Discount %:** applied to the subtotal  
- **Total:** subtotal minus discount  

---

## Interview Task (Requirement)

Build a functional replica of this app. Your version should include all features you see here, with the same user flows, data points, and behaviors. You can choose your own design and layout, but the app should be functionally similar to this one.

Have fun with it — and all the best.
