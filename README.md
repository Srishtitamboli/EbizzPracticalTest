# EbizzPracticalTest
## This Project was bootstrapped using [Create React App.](https://reactjs.org/docs/create-a-new-react-app.html)

##### Backend -----

# Imported Modules
imported [ExpressJS](https://expressjs.com/)
imported [mongoDB](https://cloud.mongodb.com/v2/61115f55ee14ab34a7e8ce8e#clusters)
imported [body-parser](https://www.npmjs.com/package/body-parser)
imported [cors](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
imported [nodemailer](https://www.npmjs.com/package/nodemailer)
imported [dotenv](https://www.npmjs.com/package/dotenv)

### Created Server
### Middleware usage
### Connected to Database (using MongoClient , database url including database name)
Console if there is connection error to database

# Register
Using Post API -
find the details of existingUser using .find()method from database.
if the existingUser's length is greater than 0 show error "user already exists" else if existingUser's length is equals to 0 then insert the request.body into the database using .insertOne() method.
Using nodemailer create transport and then sendMail to the user with proper subject and html keys.Used try/ catch for any error occurance.

# Login 
Using Post API -
find the details of existingUser using .find()method from database.
if the existingUser's length is equals to 0 then show "User does not exist, please Register" else check the password of the request.body.password with the existingUser's password, if it does not matches show message "wrong password" entered.

# Adding Category
Using post API - 
Insert the request.body using .insertOne()method into the database also check if acknowledged or not.

# Getting Data
Using get API - 
Find data using .find()method from database

# Deleting Data
Using Delete API -(using params)
delete using deleteOne() method from database data by comparing dataID and request.params.dataID

# Updating Data
Using put API - (using params)
update using updateOne()method by comparing dataID and request.params.dataID and setting new value by using $set

# Listen server
Listen server using .server method and passing two parameters 1st is port no. and second is a callback function with a message.


##### Frontend -------

# Index.js File
 
import Provider from [react-redux](https://react-redux.js.org/)
import store from store.js file


Wrap App component in Provider mentioning store store in the Provider opening tag

# App.js File 
import css file
import header file
import BrowserRouter,switch,Route from [react-router-dom](https://reactrouter.com/web/guides/quick-start)
import ProductListing and ProductDetail file

###### Inside render function
Add route to the components ProductListing and ProductDetail providing path with the 'exact' keyword wrapping all routes inside BrowserRouter and switch tags


# Header.js File
import css file

Inside function add the required header text inside div container


# ProductDetail.js File
import useEffect from [react](https://reactjs.org/)
import axios from [axios](https://www.npmjs.com/package/axios)
import useParams from react-router-dom
import useDispatch and useSelector from react-redux
import selectProduct from productActions file

Inside function 
use useSelector to find the details of the product selected 
useDispatch to find the productID
useDispatch to dispatch data
inside another function named as fetchProductDetail use axios to get data inside async function
Add fetchProductDetails functions inside useEffect
Inside return write the productDetails example productName , type etc.


# ProductListing.js File
import useDispatch and useSelector react-redux
import ProductComponent from productComponent file
import productActions from productActions file
import axios


create fetchProducts async function getting data using axios and dispatch setProducts
inside useEffect call fetchProducts method and return data dispatched from removeSelectedProduct function
inside return wrap productComponent inside div container


# ProductComponent.js File 
import useSelector forn react-redux
import Link from react-router-dom


inside function 
use useSelector to get all the products and get the product by using map method and return the details of the product obtained 

### exported all functional components 

# Redux folder
### action-types.js file
Contains a function that will contain all the action types - SET_PRODUCTS,SELECTED_PRODUCT, REMOVE_SELECTED_PRODUCT 
exported the component

### productActions.js File
import action-types file
create functions setProducts, selectedProduct, and removeSelectedProduct taking products as parameter having their type as ActionTypes.SET_PRODUCTS, ActionTypes.SELECTED_PRODUCT, ActionTypes.REMOVE_SELECTED_PROJECT and setProducts and selectedProduct functions having payload as products

exported function components

### productReducer.js File
import action-types.js file
create an products array
create functions productReducer and selectedProductReducer taking parameters state and type and payload
inside switch (type) 
case ActionTypes.SET_PRODUCTS and ActionTypes.REMOVE_SELECTED_PRODUCT
return state and payload 

export function component


### Index.js File
import combineReducers from redux
import productReducer and selectedProductReducer from productReducer file
inside combineReducers function set allProducts as productReducer and product as selectedProductReducer

exported function component


### Store.js File
import createStore from redux
import reducers from Index.js file
create store function inside that reducers, {}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export function component















