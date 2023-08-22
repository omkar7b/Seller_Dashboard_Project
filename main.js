function addProduct(event) {
    event.preventDefault();

    let price = document.getElementById('price').value;
    let name = document.getElementById('name').value;
    let category = document.getElementById('category').value;

    let product = {
        price: price,
        name: name,
        category: category
    }

    let key = name; 
    let productJSON = JSON.stringify(product);
   // localStorage.setItem(key, productJSON);

    axios.post('https://crudcrud.com/api/f3b4c87a049f448784267f41fb0042e9/products', product)
    .then(response => {
        console.log(response);
        showProductOnScreen(response.data);
    })
    .catch(err => {
        console.error(err);
    })
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/f3b4c87a049f448784267f41fb0042e9/products')
    .then(response => {
        console.log(response);
        for(let i=0;i<response.data.length;i++){
            showProductOnScreen(response.data[i]);
        }
    })
    .catch(err => {
        console.error(err);
    })
})

function showProductOnScreen(product) {
    let parentElement = document.getElementById('listOfProducts');
    let childElement = document.createElement('li');
    childElement.textContent = product.price + '-' + product.name + '-' + product.category;
   
    var deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'delete';

   deleteBtn.onclick = () => {
   // localStorage.removeItem(product.name);

    let item_id = product._id;
    axios.delete(`https://crudcrud.com/api/f3b4c87a049f448784267f41fb0042e9/products/${item_id}`)
    .then(response => {
        console.log(response);
        parentElement.removeChild(childElement);
    })
    .catch(err => {
        console.log(err);
    })

   }

   childElement.appendChild(deleteBtn);
    parentElement.appendChild(childElement);
}
