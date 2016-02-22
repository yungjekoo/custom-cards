# iotf-react
Sandbox for developing React components for the IoT Foundation UI.

## Background

React and Angular can fit together nicely in a UI architecture, but the combined build-process is non-trivial.  This repository will enforce a certain pattern for React component structure and deployment that will simplify the integration of components into the IoTF RTC project, while still providing a sandbox for rapid collaborative development.

## Running

Install dependencies
`npm install`

Start build and watch
`gulp`

Install the example app
`cd examples ; npm install`

Run the example application
`npm run start`

Watch the output to get the PORT

http://localhost:PORT

## Developing new components

### Summary (tl;dr)

* Create a branch off **master**
* Create a new folder in components/ with your exact component name (ex. components/MyComponent)
* Build and export your component in components/MyComponent/MyComponent.jsx
  * If it makes sense to require sub-components, put them either in subfolders of components/MyComponent/, or in components/common if they could be re-used in other contexts.
  * If any CSS/LESS is required (on top of inline-styling), add this in components/MyComponent/MyComponent.less
  * If any new external modules are required, add these in the package.json **browserify-shim** definition (not **dependencies**)
  * NLS strings go in nls/react-modules/messages-en.json
* Modify the **build-js** script in package.json to add an additional browserify command:
  * `browserify -d ./components/MyComponent/MyComponent.jsx -o ./examples/public/js/MyComponent.js --standalone MyComponent`
* Add your component to the sample application
* Commit your code, issue a pull request back to master

### Example

TBD
