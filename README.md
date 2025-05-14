## UCalgary Course Explorer

A web app that explores the different courses offered at the University of Calgary

Currently not deployed - Visit the User Manual for more details!

## Installation and Setup Instructions

Clone this repository to your machine. 
You will need `node` and `npm` installed on your machine, as well as MySQL. 

### Installation:

Run one of the SQL scripts in `SQL Script`. 
`471PopulatedCourseDB.sql` Has sample information filled in, with courses from CPSC and MATH departments. `471SQLStructure.sql` only contains the structure, and will need to be populated.

In `backend/index.js`, line 14, edit the password and database name according to your own SQL server.

In both the `client` and `backend` folders,

`npm install`
`npm start`

Follow the Login Instructions in the User Manual

## Tech Stack:

* ReactJS for the frontend
* NodeJS + Express for the backend
* MySQL for the database
* BcryptJS for auth
* D3JS
