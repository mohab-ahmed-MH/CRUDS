let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('btn');
let error = document.getElementById('error');
error.style.display = 'none';
let proId;
let mood = 'create';

//get total
function getTotal()
{
    if(price.value != '' && price.value > 0)
    {
        let result = (+price.value + +taxes.value) - +discount.value;
        total.innerHTML = result ;
        total.style.background = '#040';
    }else
    {
        total.innerHTML= ''
        total.style.background = '#a00d02';
    }
};

//create product
let data ;
if(localStorage.product != null)
{
    data = JSON.parse(localStorage.product) ;
}else
{
    data = [];
}

create.onclick = function()
{
    product = 
    {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(title.value !='' && price.value !='' && category.value !='' && product.count <=100 )
    {
        if(mood === 'create')
        {
        if(product.count >1)
        {
            for(let i=0; i<product.count ;i++)
            {
                data.push(product);
            }
        }else
        {
            data.push(product);
        }
        }else
        {
            data[proId] = product ;
            mood='create';
            create.innerHTML = 'Create';
            count.style.display = 'block';
        }
        clearData();
        error.style.display = 'none';
    }else{
        error.style.display = 'block';
        error.innerHTML = 'pleasa add title and price and category and count <= 100';
    }
    
    
    //save localStorage
    localStorage.setItem('product', JSON.stringify(data));
    
    
    listData();
}

//clear inputs
function clearData()
{
        title.value='';
        price.value='';
        taxes.value='';
        discount.value='';
        total.innerHTML='';
        count.value='';
        category.value='';
}
//read
 function listData()
 {
    let table = '';
    for(let i =0 ; i< data.length; i++)
    {
        table += `
        <tr>
            <td>${i+1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>
            <td><button onclick="updateItem(${i})" id="update">Update</button></td>
            <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(data.length >0)
    {
        btnDelete.innerHTML =`
        <td><button onclick="deleteAll()">DeleteAll (${data.length})</button></td>
        `
    }else
    {
        btnDelete.innerHTML = '';
    }
    getTotal();
}
listData()

//deleteItem
function deleteItem(i)
{
    data.splice(i,1);
    localStorage.product = JSON.stringify(data);
    listData();
}

//deleteAll
 function deleteAll()
 {
    data.splice(0);
    localStorage.clear();
    listData();
 }

 //updateItem

 function updateItem(i)
 {

        title.value= data[i].title;
        price.value=data[i].price;
        taxes.value=data[i].taxes;
        discount.value=data[i].discount;
        getTotal();
        count.style.display = 'none';
        category.value=data[i].category;
        create.innerHTML = 'Update';
        mood = 'update';
        proId = i ;
        scroll({
            top:0,
            behavior:'smooth'
        })
 }

//search
let searchMood = 'title';

function getSearchMood(id)
{
    let search = document.getElementById('search');
    if(id == 'searchTitle')
    {
        searchMood = 'title'
        
    }else
    {
        searchMood = 'category'
        
    }
    search.placeholder = 'Search By '+searchMood;
    search.focus();
    search.value = '';
    listData();
    
}

function search(value)
{
    let table = '';
    for(let i=0; i< data.length; i++)
    {
        if(searchMood == 'title')
        {
            if(data[i].title.includes(value.toLowerCase()))
            {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateItem(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
                </tr>
                `
            }
        }else
        {  
            if(data[i].category.includes(value.toLowerCase()))
            {
                table += `
                <tr>
                    <td>${i}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>
                    <td><button onclick="updateItem(${i})" id="update">Update</button></td>
                    <td><button onclick="deleteItem(${i})" id="delete">Delete</button></td>
                </tr>
                `
            }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}