# City Search

City Photo Search project.

## Tools

- Angular
- TypeScript
- RxJS
- Sass
- FontAwesome
- Node.js
- Express

## Notes

- The app is responsive, it should look fine on the most common desktop, tablet and mobile resolutions.
- Tested in Chrome, Firefox and Edge. Unfortunately I couldn't test it in Safari, since I don't have a Mac. But it should run without issues.
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
- All unit and integration tests (25) should pass.

## Setup

(Node.js has to be installed!)

1. Copy/clone the repository.
2. Run `npm install` in the project root folder to install dependencies.

## Running the app

Run `npm start` to launch the Angular frontend and the Node.js backend together (both with hot reload!). It takes ~15 seconds to start and then opens the browser at `http://localhost:4200/`.

Run `npm run client` to launch the Angular frontend only with hot reload. It opens the browser at `http://localhost:4200/`.

Run `npm run server` to launch the Node.js backend only with hot reload.

## Testing

Run `ng test` to execute unit and integration tests for the Angular frontend (in headless mode).
