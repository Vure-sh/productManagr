//DOM elements//

const btnSave = document.getElementById("btnSave")
const productList = document.getElementById("Products")
const productName = document.getElementById("Pname")
const productPrice = document.getElementById("Pprice")
const productQuan = document.getElementById("Pquan")
const msg = document.getElementById("msg")

/*************************************************************/

//Parsing values from local storage
let Products = [];
Products = JSON.parse(localStorage.getItem("Products"));

//functions to be reused later
function saveProduct(product) {
    Products.push(product);

    localStorage.setItem("Products", JSON.stringify(Products));

    msg.style.color = "#22c55e";
    msg.textContent = "Success";
}


function displayProduct(){
    productList.innerHTML = ""; //resetting the list
    Products.forEach(function(P , index){
          productList.innerHTML += `
                    <div class="items">
                        <h3>${P.name}</h3>
                        <p>Price: ${P.price}</p>
                        <p>Quantity: ${P.Quan}</p>
                        <button onclick="removeProduct(${index})">delete</button>
                    </div>`
                ;
    })
};

function removeProduct(index){
    Products.splice(index, 1)
    localStorage.setItem("Products", JSON.stringify(Products))
    displayProduct()
}

btnSave.addEventListener("click", function(){
    let product = {
        name : productName.value,
        price : Number(productPrice.value),
        Quan : Number(productQuan.value)
    };
    saveProduct(product)
    displayProduct();
});

displayProduct();