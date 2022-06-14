import React from 'react'
//import { JsonDifferComponent } from '../../dist/jsonDiffer'
//import '../../dist/style.css';
import { JsonDifferComponent } from '../../src/index'
import ReactDOM from 'react-dom/client'
import './index.css'

import bigObject1 from "./bigObject1.json";
import bigObject2 from "./bigObject2.json";

const a = {prop1: 1, prop2: 2, table:[1,2,3,4]};
const b = {prop1: 3, prop3: 4, table:[1,2,5,3]};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <JsonDifferComponent object1={a} object2={b}/>
    <p></p>
    <JsonDifferComponent object1={bigObject1} object2={bigObject2}/>
  </React.StrictMode>
)
