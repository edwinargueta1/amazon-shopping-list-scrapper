// src/main.js

// document.addEventListener('load', ()=>{
//     displayList
// })

/**
 * 
 * @param {JSON} list Contains information of all the products in list 
 */
async function displayList(list){
  const listContainer = document.getElementById("list");

  try {
    const response = await fetch("/src/list.json"); // Relative URL to /data
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    data.forEach(product => {
        const htmlProduct = createItem(product);
        listContainer.appendChild(htmlProduct);
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
function createItem(item){
    const wrapper = document.createElement('a');
    const name = document.createElement('h3');
    const price = document.createElement('p');
    const image = document.createElement('img');
    const dateAdded = document.createElement('p');
    const want = document.createElement('p');
    const sale = document.createElement('span');

    name.textContent = item.name;
    price.textContent = item.price;
    price.classList.add('price');
    sale.textContent = item.sale;
    price.appendChild(sale);
    
    image.src = item.image;

    dateAdded.textContent = item.dateAdded;
    dateAdded.classList.add('date');

    want.textContent = item.want
    want.classList.add('want');
    
    wrapper.href = item.link;
    wrapper.classList.add('item')

    const left = document.createElement('div');
    const middle = document.createElement('div');
    const right = document.createElement('div');
    left.classList.add('left');
    middle.classList.add('middle');
    right.classList.add('right');

    wrapper.appendChild(left);
    wrapper.appendChild(middle);
    wrapper.appendChild(right);

    left.appendChild(image);
    middle.appendChild(name);
    middle.appendChild(dateAdded);
    middle.appendChild(price);
    right.appendChild(want);    
    return wrapper;
}
console.log('end');

displayList();