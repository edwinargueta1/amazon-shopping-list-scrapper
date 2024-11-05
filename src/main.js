// src/main.js

//Might Delete
document.getElementById('func').addEventListener('click', () => {
    getItemFromAmazon('https://www.amazon.com/Logitech-MX-Master-3S-Graphite/dp/B09HM94VDS/');
});
//Might Delete
async function getItemFromAmazon(url) {
    try {
        const response = await fetch(`/fetchData?url=${encodeURIComponent(url)}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Do something with the data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
async function getList(){

}

async function displayList(){
    console.log('display')
    try{
        parseList();
        
        console.log(result);
    }catch(error){
        console.error(error);
    }
}
function parseList(){
    const listDiv = document.getElementById('list');
    console.log(list);
    
    let data = list.map(async(listItem)=>{
        let itemData = {};
        itemData.link = listItem.link;
        itemData.amazon =  await getItemFromAmazon(listItem.link);
        return itemData;
    })
    console.log(data);
    return data;
}
function createItem(item){
    const wrapper = document.createElement('div');
    const name = document.createElement('h3');
    const price = document.createElement('p');
    const image = document.createElement('img');
    const dateAdded = document.createElement('p');
    const link = document.createElement('a');
    const want = document.createElement('p');
    
    image.src(item.link);
    link.href(item.link);

    const left = document.createElement('div');
    const right = document.createElement('div');
    left.classList.add('left');
    right.classList.add('right');

    wrapper.appendChild(left);
    wrapper.appendChild(right);

    left.appendChild(image);
    right.appendChild(name);
    right.appendChild(price);
    right.appendChild(dateAdded);
    right.appendChild(want);
    right.appendChild(link);
    
    return wrapper;
}
console.log('end');