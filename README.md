# City Search

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.0.1.

## Tools used

- Angular 8
- TypeScript
- RxJS 6
- Sass
- Font Awesome
- Node.js
- Express

## Features and optimizations

- Search button is activated only if the user selects a city in the results list. Modifying the input value disables the button again until a new city is selected.
- If there's at least one character in the input field, a 'clear' icon appears on the right to delete the entered value with a single click click.
- A load spinner appears briefly in the dropdown while an API request is in progress.
- If there aren't any results for the given input value, an appropriate message is displayed in the dropdown.
- If there's a network error (API is not accessible), an appropriate error message is displayed in the dropdown.
- Applied a caching solution to store search results in the data service and eliminate duplicated API requests.
- Applied a debouncer to further reduce the necessary amount of requests.
- Cached results appear instantly in the dropdown menu whereas new requests are made 500ms after the last keystroke.
- Applied a regexp-based marker pipe to highlight the search string in the results list.
- Clicking outside the dropdown menu closes the menu (except if the user clicks inside the input field). Deleting the input value also closes the dropdown.

## Development server

Run `npm start` to launch the Angular frontend and the Node.js backend together (both with hot reload!). It takes ~15 seconds to start and then opens the browser at `http://localhost:4200/`.

Run `npm run client` to launch the Angular frontend with hot reload. It opens the browser at `http://localhost:4200/`.

Run `npm run server` to launch the Node.js backend in the terminal with hot reload.

## Unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
