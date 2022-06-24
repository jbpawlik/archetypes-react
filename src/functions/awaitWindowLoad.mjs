// import load from '../libs/javascript-sandbox-console/src/libs/jquery.min.js';

export default async function awaitWindowLoad() {

  function load(url, element)
{
    fetch(url).then(res => {
        element.innerHTML = res; 
    });
}

let w = await window.open();
load(w, "child.html");
}