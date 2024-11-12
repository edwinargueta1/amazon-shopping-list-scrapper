// src/main.js

async function displayList(){
  const listContainer = document.getElementById("list");
  const dateUpdated = document.getElementById("dateUpdated");

  try {
    const response = await fetch("/src/list.json"); // Relative URL to /data
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    dateUpdated.textContent = `Last Updated: ${new Date(data.timeUpdated).toLocaleString()}`;
    data.products.forEach(product => {
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
    const rating = document.createElement('p');
    const image = document.createElement('img');
    const dateAdded = document.createElement('p');
    const want = document.createElement('p');
    
    
    wrapper.href = item.link;
    wrapper.classList.add('item')
    
    name.textContent = item.name;
    rating.textContent = `${item.rating}/5 Stars with ${item.ratingCount}`;
    image.src = item.image;

    dateAdded.textContent = `Date Added: ${item.dateAdded}`;
    dateAdded.classList.add('date');

    want.textContent = item.want;
    want.classList.add('want');
    

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
    middle.appendChild(rating);
    middle.appendChild(dateAdded);
    middle.appendChild(dataDiv(item.price, item.sale, item.primePrice, item.coupon));
    right.appendChild(want);    
    return wrapper;
}
/**
 * 
 */
function dataDiv(price, sale, prime, coupon){
  const wrapper = document.createElement('div');
  wrapper.classList.add("data");
  const left = document.createElement('div');
  const right = document.createElement('div');

  const priceP = document.createElement('p');
  priceP.textContent = price;
  priceP.classList.add('price');
  left.appendChild(priceP);
  
  if(sale){
    const saleP = document.createElement('p');
    saleP.textContent = "Discounted By: ";
    const saleSpan = document.createElement('span');
    saleSpan.textContent = sale;
    saleSpan.classList.add("discount");
    saleP.appendChild(saleSpan);
    right.appendChild(saleP);
  }
  
  if(prime){
    const primeP = document.createElement('p');
    primeP.textContent = "Prime Price: ";
    const primeSpan = document.createElement('span');
    primeSpan.classList.add("prime");
    primeSpan.textContent = prime;
    primeP.appendChild(primeSpan);
    right.appendChild(primeP);
  }

  if(coupon){
    const couponP = document.createElement('p');
    couponP.textContent = "Additional Coupon for: ";
    const couponSpan = document.createElement('span');
    couponSpan.classList.add("discount");
    couponSpan.textContent = coupon;
    couponP.appendChild(couponSpan);
    right.appendChild(couponP);
  }

  wrapper.appendChild(left);
  wrapper.appendChild(right);

  return wrapper;
}
console.log('Compiled Functions');

displayList();