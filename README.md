# Concept: Management Application

## Inventory
- Ability to view stock stored in a DB
- Ability to delete stock
- Ability to add stock
- Ability to edit/update stock

### DB Table: Stock
- ItemID: Unique numeric ID
- Item: Item name
- Count: Count of item in the inventory

## Orders
- Ability to view orders stored in a DB
- Ability to delete orders
- Ability to create orders
- Ability to modify orders

### DB Table: Orders
- OrderID: Unique numeric ID
- ContactName: Name of person/team/affiliation to put in the order
- ContactEmail: Email for contact purposes
- ContactNumber: Phone number for contact purposes
- OrderSubmitted: Datetime when client submitted order
- OrderProcessStart: Datetime when order processing began
- OrderPlaced: Datetime when order was placed with the manufacturer
- OrderReceived: Datetime when order received from the manufacturer
- OrderReady: Datetime when order has passed QC and is ready for pick-up

### DB Table: Ordered Items
- OrderItemID: Unique numeric ID
- OrderID: Numeric ID that corresponds to the OrderID in 'Orders'
- ItemID: Numeric ID that corresponds to the ItemID in 'Stock'
    * This will be changed to a 'Designs' table for all custom orders since clients will be ordering based on available designs as opposed to items in stock.
- Count: Total number of this item that was ordered

### Order Statuses
Status of order as it is being processed.
For stock orders, customers will only go through the following statuses:
Submitted, Order Placed, Order Ready, Order Delivered.

#### Submitted
Order has been submitted by client.
#### Received - Await Contact
Confirmation of design and approximate numbers to be done through LB-Client communications.
#### Order Processing
LB-Client communication to determine final design and order total.
#### Final Order Confirmed
Final design and total order confirmed.
#### Order Placed
Order has been placed with manufacturer, awaiting delivery.
#### Shipment Received - Quality Control
Order has arrived locally and going through quality control.
#### Order Ready
Order is ready to be picked up/delivered to client, pending payment received.
#### Order Delivered
Client has received order.
#### Order Cancelled
Order is cancelled, non-refundable once final order has been placed.

### Payment Statuses
Status of payments as order is being processed.
For stock orders, customers will only go through the following statuses:
N/A, Final Invoice Sent, Final Payment Received.

#### N/A
Order unconfirmed, process has not begun so no payment expected.
#### Deposit Invoice Sent
Initial invoice with deposit stated and approximate final total sent.
#### Deposit Received
Confirmed deposit received, receipt sent.
#### Final Invoice Sent
Following Final Order Confirmed, a final invoice will be sent out.
#### Final Payment Received
Payment received.

## Designs
- View/showcase all designes
- Each design should contain a name and description + some sample images