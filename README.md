# iotf-react
Template for custom card creation

## Background

This repo is a template for custom card creation. Fork it to create your own custom cards. See the dashboard documentation to link your custo cards with a dashboard installation. https://pages.github.ibm.com/IoT/iotf-react/

## Running

Install dependencies
`npm install`

Start build and watch
`gulp`

Run server
`node app.js`

### Deployment

* change manifest.yml to match your environment
* cf api https://api.ng.bluemix.net
* cf login -u mielke@de.ibm.com -o markus.juettner@de.ibm.com -s IoTFDashboard (adapt user, org and space)
* cf push manifest
