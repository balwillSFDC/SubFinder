# Welcome to the SFMC React App w/Express Server Template
This has been a few iterations in the making, but this template contains 90-95% of what you need to get started develop your own Salesforce Marketing Cloud Web App! Actually, you can use this bootstrap to jump start any app that you want to build, which uses a React front-end and a Node-Express Server backend (this allows you to proxy your API requests and avoid CORS!). The beauty of this? This template structure allows you to deploy a single project to Heroku. 

## About the Template 
The Project has two main folders; 
  1. **react-ui** - this contains the react front-end
  2. **server** - this contains the server back-end

Each folder is its own npm project. So there are two package.json configs and two places where you'll need to run npm commands to start or stop your app. For more details on this structure see the [mars/heroku-cra-node repo](https://github.com/mars/heroku-cra-node)

### About the Template Dependencies
This template comes with a few helpful node packages and other things that will help you get started to develop a scalable app
* **Server**
  * **Axios** - Used to make promise-based API calls within your router
  * **Express** - Used to define the routes in your router 
  * **SFMC-fuelsdk-node** - Used to interact with the SFMC API
* **React-ui**
  * **Axios** - Used to make API calls to the Server and return the response
  * **React** - Used for the front-end, obviously
  * **React-dom** - Used to render React front-end. Installed with create-react-app
  * **React-scripts** - Necessary scripts to start the React server. Installed with create-react-app
  * **React-redux** - Used so the React UI can interact with Redux
  * **Redux** - Used to manage the App's state 
  * **Redux-devtools-extension** - Used to enable the Redux DevTools chrome extension. It's already connected to the middleware 
  * **Redux-persist** - Used to maintain the App's state even after refreshing the browser. It saves it to local storage (if you need to clear it for development, use ```localstorage.clear()``` in the window). It's already connected to the App in ```index.js```
  * **Redux-thunk** - Used to make async API calls to the Server 

### Other Things to Note 
* **The Server is HTTPS enabled** - For local development, the Server is HTTPS enabled using a self-signed certificate created via OpenSSL. The certificates are the ```server.cert``` and ```server.key``` files
* **The React-Ui proxies API requests to the server** - The package.json file in the React npm is set up to proxy requests to the Node server. ```"proxy": "https://localhost:5000/"``` Visit the [heroku-cra-node](https://github.com/mars/heroku-cra-node#user-content-deploy-to-heroku) repo for more details on how to deploy to production
* **The App supports the SFMC Web/Public App Authorization Code Grant Type** - This flow allows your web/public app to access Marketing Cloud resources on behalf of your user. See the SFMC documentation on [Web and Public App Integrations with Authorization Code Grant Type](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/integration-app-auth-code.htm) for more details