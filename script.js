//Project added to github !
//https://github.com/Vure-sh/productManagr

//DOM elements//

const btnSave = document.getElementById("btnSave")
const productList = document.getElementById("Products")
const productName = document.getElementById("Pname")
const productPrice = document.getElementById("Pprice")
const productQuan = document.getElementById("Pquan")
const msg = document.getElementById("msg")
const productCount = document.getElementById("kl")

/*************************************************************/

let editIndex = null;
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
          productList.innerHTML += `<div class="items">
    <div class="product-info">
        <h3>${P.name}</h3>
        <p>Price: ${P.price}$</p>
        <p>Quantity: ${P.Quan}</p>

        <div class="actions">
            <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
            <button class="delete-btn" onclick="removeProduct(${index})">Delete</button>
        </div>
    </div>
</div>`
                ;
    })
    productCount.textContent = `Products (${Products.length}) :`
};



function removeProduct(index){
    Products.splice(index, 1)
    localStorage.setItem("Products", JSON.stringify(Products))
    displayProduct()
}

function editProduct(index){
    editIndex = index;
    productQuan.value = Products[index].Quan
    productPrice.value = Products[index].price
    productName.value = Products[index].name
}

btnSave.addEventListener("click", function(){
    let product = {
        name : productName.value,
        price : Number(productPrice.value),
        Quan : Number(productQuan.value)
    };

     if (editIndex == null) {
        Products.push(product);
    } else {
        Products[editIndex] = product;
        editIndex = null;
    }
    productQuan.value = "";
    productPrice.value = "";
    productName.value = "";

    
    displayProduct();
});

displayProduct();