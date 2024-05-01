//App.js

import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import { Suspense, lazy } from "react";

//Lazy Loading
const DataCollect = React.lazy(() => delayForDemo(import('./DataCollect')));

function App() {

    return (
    <div className="App">
            <h1>GiftStore </h1>
            <Suspense fallback=
                {
                    <div>Loading please wait ...</div>
                 }>
                <DataCollect />
            </Suspense>
    </div>
    );
}
export default App;


// Add a fixed delay so you can see the loading state
function delayForDemo(promise) {
  return new Promise(resolve => {
    setTimeout(resolve, 2000);
  }).then(() => promise);
}