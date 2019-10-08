# Bamazon-Node-App
A Node.JS, CLI application that allows the user to engage in online ordering with data persistence via mySQL.

# Application Information
Bamazon is an command prompt (CLI) shopping platform that currently provides two distinct modes based on the inital Node.JS execution. bamazonCustomer will provide the customer interface to the user, which allows the user to view inventory and purchase items, while the bamazonManager provides the manager interface to the user, which allows the user to view inventory, see which items currently are low on inventory, add inventory to any existing items and even add a new product or products to the Bamazon store for future purchase by customers!

This CLI application ties in with a mySQL database (bamazon_db) and offers data persistence. Given its nature, items can deplete over time if the manager fails to replenish them, resulting in users being notified that the item they wish to shop for does not have the stock required to complete thier request.

This application also incorperates inquirer in order to faciliate user movement through the online store in a clean and concise way. In both customer and manager modes, users are prompted to move throughout the store and complete thier requests through a variety of prompts that are populated after the last executed function. In areas that have been deemend appropriate, additional validation has been added in order to improve user experience and keep the SQL database running smoothly These validations are focused in areas that ask for item ID's, stock values, and others that take in specific numbers. The user will need to install both mySql and Inquirer with an npm install function in order to visit the Bamazon store and explore its inventory.

Additional information for both the customer and manager interfaces can be found below.

Enjoy!
 
# Screenshots and Additional Information

Customer User Experience | Results
------------ | -------------
Customer Entry, with prompts on desire to start shopping | ![Customer Entry](/images/customerEntry.JPG)
If the user decides to shop at Bamazon, the current inventory is displayed | ![Customer Inventory](/images/customerInventory.JPG)
The user is then prompted to answer a few questions about the item that they want to purchase and if enough stock of that item exists, then the purchase will be successful and the total cost of the purchase will be displayed | ![Customer Purchase](/images/customerPurchase.JPG)
If the user tries to buy an item but the stock is too low to meet thier needs, they will be notified that thier purchase has not been successful and will be asked if they want to shop again | ![Customer Low Inventory](/images/customerLowInventory.JPG)
Once the user is done with all of thier shopping, they may select to leave the store | ![Customer End](/images/customerEnd.JPG)

===================================================================

Manager User Experience | Results
------------ | -------------
Manager Entry, with prompts on which action to take | ![Manager Entry](/images/managerEntry.JPG)
If the user decides to view the current inventory at Bamazon, the following results are displayed via the "View Products For Sale" option| ![Manager Inventory](/images/managerViewInventory.JPG)
If the user wants to view items that currently have a low inventory, they can search for such items via the "View Low Invenotry" option | ![Manager Low Inventory](/images/managerLowInventory.JPG)
If the user decides that there are items that need to be replenished due to low stock, they can do so through the "Add to Inventory" option | ![Manager Add Inventory](/images/managerAddInventory.JPG)
If the user decides they want to add an entirely new item to Bamazon, they can do so through the "Add New Product" option | ![Manager Add Item](/images/managerAddItem.JPG)
If the user seaches the inventory after making any of the above changes, the results are shown the next time the inventory search is performed via "View Products For Sale" | ![Manager Add Item Two](/images/managerAddItem2.JPG)
When the user is done, they may sign out of work and clock out by indicating no additional actions are required | ![Manager End](/images/managerEnd.JPG)
