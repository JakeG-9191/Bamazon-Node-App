# Bamazon-Node-App
A Node.JS application that allows the user to engage in online ordering with data persistence

# Application Information
Bamazon is an online (CLI) shopping platform that currently provides two distinct modes based on the inital Node.JS execution.
bamazonCustomer will provide the customer interface, which allows the user to view inventory and purchase items, while the bamazonManager provides the manager interface, which allows the manager to view inventory, see which items have low inventory, add inventory to any existing items and even add a new product to the Bamazon store!

This CLI application ties in with a mySQL database (bamazon_db) and offers data persistence. Given its nature, items can deplete over time if the manager fails to replenish them, resulting in users being notified that the item they wish to shop for does not have the stock value they desire.

This application also incorperates inquirer in order to faciliate user movement through the online store. In both customer and manager mode, users and prompted to move throughout the store and complete thier requests through a variety of prompts. In areas where deemend appropriate, additional validation has been added in order to improve user experience (item ID's, stock values, etc.). The user will need to install both mySql and Inquirer with an npm install function in order to visit the Bamazon store.

Additional information for both the customer interface and manager interface can be found below.

Enjoy!
 
# Screenshots and Additional Information

Customer User Experience
------------ | -------------
Customer Entry| ![Customer Entry](/images/customerEntry.JPG)
If the user decides to shop at Bamazon, the current inventory is displayed | ![Customer Inventory](/images/customerInventory.JPG)
The user is then prompted to answer about the item that they want to purchase, if enough stock of that item exists, then the purchase will be successful | ![Customer Purchase](/images/customerPurchase.JPG)
If the user tries to buy an item but the stock is too low, they will be notified that thier purchase is not successful | ![Customer Low Inventory](/images/customerLowInventory.JPG)
Once the user is done with all of thier shopping, they may select to leave the store| ![Customer End](/images/customerEnd.JPG)