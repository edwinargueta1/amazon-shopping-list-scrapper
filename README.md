# Amazon Scraper Web Server

This project is a web server that scrapes product information from a list of URLs in a JSON file and appends new product data as it becomes available. The updated product data is stored locally and can be accessed in a neat display format whenever a user visits the web server.
Features

    Product Scraping: Scrapes product information (e.g., name, price, image URL) from external URLs provided in a JSON file.
    Data Persistence: Stores the scraped data in a local JSON file (list.json) and updates it automatically.
    Scheduled Updates: Uses a cron job to automatically update product information on a scheduled interval (e.g., every hour).
    User-Friendly Display: Serves the scraped product information in a clean, readable format when users access the web server.

# Installation

## Clone this repository:

git clone https://github.com/yourusername/product-scraper-server.git

## Navigate to the project directory:

cd product-scraper-server

## Install dependencies:

    npm install

# Usage

    Start the server:

    node server.js

    The server will run on http://localhost:3005 by default.

    Open your web browser and go to http://localhost:3005 to view the scraped product data.

    Scheduled Updates: The server will automatically update product data every hour using a cron job. You can adjust the schedule in the server configuration if needed.

# Configuration

    Product Links: Place URLs of products you want to scrape in the list.json file in the src directory. Each product should have a link attribute to allow the scraper to retrieve data.
    The 'want' and 'dateAdded' are optional to add. They provide the user additional information to the user.
    Cron Job: The server is set up to update product data every hour. To change the frequency, modify the cron job schedule in server.js.

# Dependencies

    axios: For making HTTP requests to fetch product data.
    cheerio: For parsing HTML and extracting product information.
    node-cron: For setting up scheduled scraping updates.

# License

This project is open-source and available under the MIT License.