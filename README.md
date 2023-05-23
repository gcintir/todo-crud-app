# ToDo Item App

## Description

Here is my multi-tenant ToDo Item Application which I built with NodeJs on top of Express framework. It allows users to create, update, delete and search todo items. With this application, users can easily manage their tasks. I hope you enjoy this application and look forward to your contributions.

## High Level Flow

User credentials and their todo items are persisted on Postgresql database. User crendetials are stored in encrypted format. All Rest APIs regarding to CRUD operations are protected so users should send a valid JWT token in `Authorization header` parameter along with those API calls. In order to use this application, users first need to register to application. Then, users need to login to application via username and password. Once the login is successful, JWT token is returned back to user in response. Users need to use this JWT token.

## Features

This application has the following features:

-   User registration, login and logout
-   Todo item creation
-   Todo item update
-   Todo item delete
-   Todo items search

## Installation

## Usage

## Contributing

I welcome any kind of contributions. Here are some ways you can get started:

1. Report bugs: If you encounter any bugs, please let me know. Open up an issue and let me know the problem.
2. Contribute code: If you are a developer and want to contribute, follow the instructions below to get started!
3. Suggestions: If you don't want to code but have some awesome ideas, open up an issue explaining some updates or imporvements you would like to see!
4. Documentation: If you see the need for some additional documentation, feel free to add some!

## Instructions

1. Fork this repository
2. Clone the forked repository
3. Add your contributions (code or documentation)
4. Commit and push
5. Wait for pull request to be merged
