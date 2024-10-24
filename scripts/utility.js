function getElementById(elementId) {
  const element = document.getElementById(elementId);
  return element;
}

function setElementValue(elementId, value) {
  if (value !== "null") {
    const element = getElementById(elementId);
    element.innerText = value;
  } else {
    const element = getElementById(elementId);
    element.innerText = 'undefined';
  }
}

/* function modalUlObject(elementId, value, ){

} */
