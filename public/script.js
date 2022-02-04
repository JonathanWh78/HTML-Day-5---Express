`use strict`

import * as DOM from './dom.js';

// list item function
const writeItem = item => {
  const child = document.createElement(`li`);
  child.id = item._id;
  child.innerHTML = `${JSON.stringify(item)}`;
  DOM.listOutput.appendChild(child);
}

// GET all function
const get = () => {
  DOM.listOutput.innerHTML = ``;

  axios.get(`/read`)
    .then((response) => {
      if (!Array.isArray(response.data)) {
        writeItem(response.data);
      } else {
        for (let item of response.data) {
          writeItem(item);
        }
      }
    }).catch((err) => {
      console.log(err);
    });
}

// POST function
const post = () => {
  axios.post(`/create`, {name : DOM.inputName.value})
    .then((response) => {
      console.log(response);
      get();
    }).catch((err) => {
      console.log(err);
    });
}

//added single search
function Get2()
{
  DOM.OutputGet.innerHTML = ``;

  axios.get(`/read`)
    .then((response) => {
      if (!Array.isArray(response.data)) {
        GetWrite(response.data);
      } else {
        for (let item of response.data) {
          if (item._id == DOM.inputID.value)
          GetWrite(item);
        }
      }
    }).catch((err) => {
      console.log(err);
    });
}

//print for get
function GetWrite(item)
{
    const child = document.createElement(`div`);
    child.id = item._id;
    child.innerHTML = `${JSON.stringify(item)}`;
    DOM.OutputGet.appendChild(child);
}

//Get ID Function
function GetId()
{
  DOM.OutputGet.innerHTML = ``;
  axios.get(`/read`, {_id : DOM.inputID.value})
  .then((response) => {
    console.log(response);
    Get2();
  }).catch((err) => {
    console.log(err);
  });
}

//function for delete
function DeleteID()
{
  axios.delete(`/delete`, {_id: DOM.inputID.value} )
  .then((response) => {
    console.log(response);
  }).catch((err) => {
    console.log(err);
  });
}

DOM.buttonCreate.onclick = () => post();
DOM.buttonGet.onclick = () => GetId();