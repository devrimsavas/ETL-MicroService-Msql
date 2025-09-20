# ETL and Microservices with AdventureWorks

## 📂 Additional resources:

- **`/documents` folder** → contains detailed tutorial notes and screenshots.
- **`/PowerBI_Graphs` folder** → contains Power BI `.pbix` files used for visualizations.

---

This project demonstrates a complete **ETL pipeline** and **microservices architecture** using the Microsoft **AdventureWorksLT2019** sample database.  
It is divided into two major parts:

1. **Part 1 – Microservices** (Gateway, Product, Customer, Management)
2. **Part 2 – ETL & Power BI Visualizations**

The goal of this project was to show how raw SQL commands, ETL concepts, and microservices can be combined into a single workflow — from database to API to visualization.

---

## Part 1: Microservices

The microservices are structured as follows:

- **Gateway Service** – runs on port `8000`, routes traffic to other services.
- **Product Service** – provides product data from AdventureWorks (port `8001`).
- **Customer Service** – provides customer data (port `8002`).
- **Management Service** – runs SQL queries for analysis and exports results (port `8003`).

### Features

- **Customer Service:** query customers by prefix of last name.
- **Product Service:** fetch product details by ID (id, name, category, price, etc).
- **Management Service:** raw SQL queries answering business-style questions (e.g., average prices, active customers, sales by category).
- **CSV Export:** query results can be exported and later visualized in Power BI.

### Setup Instructions

1. Clone the repository and navigate into each service (`customer`, `gateway`, `management`, `product`).
2. Create an `.env` file with the following variables:

   ```env
   ADMIN_USERNAME=
   ADMIN_PASSWORD=
   DATABASE_NAME=
   HOST=
   DIALECT="mssql"
   PORT=8000
   ```

- Gateway: port 8000

- Product: port 8001

- Customer: port 8002

- Management: port 8003

3. Install dependencies in each service:

```bash
npm install
```

4. Start the application from the gateway:

` npm start`

5. Access endpoints:

- http://localhost:8000/customer

- http://localhost:8000/product

- http://localhost:8000/management

## ETL & Power BI

Using Azure Data Studio and SQL, we transformed AdventureWorksLT2019 tables into cleaner versions:

- TransformedSalesOrderHeader – excludes unnecessary fields (rowguid, modifieddate, comment).

- TransformedCustomer – excludes unnecessary fields (rowguid, modifieddate, passwordhash, passwordsalt).

Data was inserted into transformed tables directly from the originals using `INSERT INTO … SELECT ` ….

Example SQL Snippet

```sql
INSERT INTO SalesLT.TransformedCustomer (
    CustomerID, NameStyle, Title, FirstName, MiddleName, LastName,
    Suffix, CompanyName, SalesPerson, EmailAddress, Phone
)
SELECT
    CustomerID, NameStyle, Title, FirstName, MiddleName, LastName,
    Suffix, CompanyName, SalesPerson, EmailAddress, Phone
FROM SalesLT.Customer;
```

## Power BI Visualizations

The transformed tables were then loaded into Power BI for visualization.

- Steps included:

- Filtering out empty/duplicate rows.

- Handling null values.

- Renaming columns (Status → Order Status).

- Creating graphs and dashboards to answer business questions.

Sample questions answered:

- How many rows are missing in Suffix or Middlename?

- What is the total tax amount paid?

- Which account paid the most taxes?

- Which product was sold the most / least?

- Power BI .pbix files are available inside the PowerBI_Graphs folder.

## Tech Stack

- Database: Microsoft SQL Server (AdventureWorksLT2019 sample)

- Backend: Node.js + Express (Microservices)

- ETL: Raw SQL transformations

\*\* Visualization: Power BI

- Export: CSV generation for query results

## Key Learnings

- Building pipelines using raw SQL transformations.

- Integrating microservices with a shared SQL database.

- Using ETL concepts to prepare data for analysis.

- Visualizing data pipelines with Power BI dashboards.

- Combining backend development with data analytics.

## Portfolio Notes

This project demonstrates an end-to-end workflow:

Working with a real relational database.

Transforming and cleaning data.

Exposing the data through microservices.

Exporting and visualizing data with BI tools.
