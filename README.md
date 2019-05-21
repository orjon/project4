# **Project4**
## Project 4 : Web Development Immersive, General Assembly ![General Assembly](images/readme/ga-logo.png "General Assembly logo")

http://www.orjon.com/project4/


## Overview

Born out of my own frustrations, the purpose of this application is to give small businesses a clear oversight of their project-related finances.

The below diagram explains the typical relationships between Projects, Clients, Suppliers, Expenses and Invoices. Each user will have their own unique set of Projects, Clients etc.

![](images/readme/p4datasummary.png)

The app aims to structure this information through a clean and easily-understood interface to help users monitor their projects over time.

This was my final project completed whilst undertaking the Web Development Immersive course at General Assembly, London. I decided to work on this as a solo project. It was completed in one week.

## Brief


* Build a full-stack application.
* Use a Python Flask API to serve your data from a Postgres database.
* Consume your API with a separate front-end built with React.
* [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) functionality for at least a couple of models.
* Visually impressive design.
* Application must be deployed online.

## Technologies Used
* React.js
* Sass
* Axios
* Python
* Flask
* PostgreSQL
* SQLAlchemy
* Marshmallow
* Yarn
* Git
* GitHub

## Approach Taken

### Database Structure

The first step in creating the database was to define the fields of each table and analyse their relationships. The arrows in the diagram below show fields within tables that are referenced from other tables.

![](images/readme/p4db_structure.png)

The users in this application do not form part part of the main database structure - however it is their login details that grant them, and not others, access to their project information.

The arrows also illustrate the order in which entries must be made. For instance, an invoice has to be allocated to an existing project, and similarly, a project must be assigned to a client.

### Navigation


page per entity type
clickable interface

### Site Structure & User Journey

The site structure closely follows that of the database; Clients, Projects, Invoices, Suppliers and Expenses are all pages and each displays the users' data arranged accordingly.

![](images/readme/p4ScreenshotProjects.jpg)
![](images/readme/p4ScreenshotExpenses.jpg)
![](images/readme/p4ScreenshotInvoices.jpg)
![](images/readme/p4ScreenshotClients.jpg)
![](images/readme/p4ScreenshotSuppliers.jpg)




Highlight late payments
add / edit / delete buttons


![](images/readme/p4ScreenRecordingGeneral.gif)

(this readme is being updated)

### Screen Layout

### User Flow

## Bugs
Some known bugs:


## Wins and Blockers

* Sort options for table data. (choose column, ascendind/descedning etc.)
