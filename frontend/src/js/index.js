const url = 'http://localhost:3001';

const generateProducts = () => {
    const token = window.localStorage.getItem('authToken');
    console.log(token);
    if(!token) {
        return window.location.href = "login.html"
    }
    axios.get(`${url}/products`, { headers: { 'token': token } }).then(resp => {
        console.log(resp.data)
        if(resp.data.auth == false) {
            console.log(resp.data.result)
            return window.location.href = "login.html"
        } 
        const products = resp.data.result;
        console.log(products)
        const productsContainer = document.querySelector('.products-container');
        productsContainer.innerHTML += products.map(product =>
            `<div data-id="${product.id}" class="product">
            <img class="product-img" src="${product.img_url}" alt="product-img">
            <p class="product-description">${product.description}</p>
            <p class="product-price"> R$${product.price}</p>
            <button class="add-button">Adicionar ao carrinho</button>
            </div>`).join('');
    });
}

generateProducts();