# Personal Trainer Frontend Project

This project is a React + TypeScript frontend built with Vite for the Personal Trainer assignment in the Haaga-Helia frontend course.
The application allows managing customers and trainings using a REST API.
This repository includes the completed Task 1 and Task 2 requirements, I didn't do more because of timing issues.

## Task 1 – List Pages, Sorting, Searching

The following features were implemented:
Customer list page
Training list page
Navigation between both pages
Sorting using MUI DataGrid
Searching/filtering
Date formatting using Day.js
Data loaded from the given backend
Both lists are implemented using Material UI DataGrid for clean UI and automatic sorting, mostly at least.

## Task 2 – CRUD Features

### Customer Management

Add new customer
Edit existing customer
Delete customer (with yes/no confirmation)

### Training Management

Add training to a specific customer
Date selection using a datetime picker
Delete training (with yes/no confirmation)
Each customer row includes an ADD TRAINING button that opens a dialog linked to that customer, but the according customer doesn't show up in the table.

## API

https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi

Endpoints:

/api/customers
/api/gettrainings
/api/trainings
... etc.

## Tech Stack

React + TypeScript
Vite
Material UI
MUI DataGrid
Day.js
React Router

## Running the project

npm install
npm run dev

