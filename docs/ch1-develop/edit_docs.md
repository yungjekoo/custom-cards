# Editing Documentation

## Editing Gitbook

#### Option 1: Edit in Github

https://github.ibm.com/IoT/iotf-react/blob/master/docs/home.md

(downside: publishing the book requires running a local script currently)

#### Option 2: Edit locally

```bash
cd /path/to/dashboard-component/
npm run docs:watch
```

(push changes to the *master* branch)

## Publishing the Gitbook
There is a bug in the edit-link plugin. Since this is loaded with every new ```npm install```, it has to be rechanged after each ```npm install```. Go to iotf-react/node_modules/gitbook-plugin-edit-link/book/plugin.js and change
```  window.open(base + lang + filepath); ``` to ```  window.open(base + filepath); ``` 
then you can run 
```bash
npm run docs:publish
```

