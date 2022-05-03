// I wish you good luck and happy coding 🥰🤠🥳🥳💯💯


//COMPUTER TIME FORMAT/MUDA WA KOMPYUTA
function formattedTime() {
    const now = new Date().toLocaleTimeString('en-us',
        {
            day: 'numeric',
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
        }
    );

    const time = now.split(",")[1];
    const date = now.split(",")[0].split(" ")//DATE TO ARRAY OBJECT/TAREHE KWENDA KWENYE BOXI


    return `${date[1]} ${date[0]}, ${time}`;
}

//ADD ITEM AND RESET FORM/ONGEZA BIDHAA

//Main
document.querySelector("#ewallet-form").addEventListener('submit',
    function submit(e) {
        //FORM SUBMIT CODE
        e.preventDefault();

        console.log("Form Submitted");

        const desc = document.querySelector(".add__description").value;
        const type = document.querySelector(".add__type").value;
        const value = document.querySelector(".add__value").value;


        if (desc.length > 0 && value.length > 0) {
            add(type, desc, value);//DISPLAY INSERTED CODE
            //LATER (".collection").append(".item")
            
            resetForm();
        }
        else {
            console.log("You've entered nothing")
        }
        
        
    });


//DISPLAY ITEMS RIGHT AWAY
showItems();
function showItems() {

    let items = getItemFromLS();

    for (let item of items) {
        const newHTML = `
    <div class="item">
    <div class="item-description-time">
      <div class="item-description">
        <p>${item.desc}</p>
      </div>
      <div class="item-time">
        <p>${item.time}</p>
      </div>
    </div>
    <div class="item-amount ${item.type === "+" ? "income-amount" : "expense-amount"}">
      <p>${item.type}${item.value}</p>
    </div>
  </div>
 `
        const collection = document.querySelector('.collection');
        collection.insertAdjacentHTML('afterbegin', newHTML);
        

    }
}

function add(type, desc, value) {

    formattedTime();
    const time = formattedTime();
    const newHTML = `
   <div class="item">
   <div class="item-description-time">
     <div class="item-description">
       <p>${desc}</p>
     </div>
     <div class="item-time">
       <p>${time}</p>
     </div>
   </div>
   <div class="item-amount ${type === "+" ? "income-amount" : "expense-amount"}">
     <p>${type}${value}</p>
   </div>
 </div>
`
    const collection = document.querySelector('.collection');
    collection.insertAdjacentHTML('afterbegin', newHTML);

    addItemToLs(desc, type, value, time);
    showTotalExpenses();

    totalBalance();
}

function resetForm() {
    document.querySelector(".add__description").value = "";
    document.querySelector(".add__type").value = "+";
    document.querySelector(".add__value").value = "";
};


//SET AND GET FROM LOCAL STORAGE/ KUWEKA NA KUVUTA KUTOKA CHUMBA CHA NDANI
//GET ITEMS
function getItemFromLS() {

    let items = localStorage.getItem('items');

    if (items) {
        items = JSON.parse(items);
    }
    else {
        items = [];
    };

    return items;

}
function addItemToLs(desc, type, value, time) {

    let items = getItemFromLS();

    items.push({ desc, type, value, time });
    localStorage.setItem('items', JSON.stringify(items));
}

//Total income and total expenses


showTotalIncome()
function showTotalIncome() {
    let items = getItemFromLS();

    let totalIncome = 0;

    for (item of items) {
        if (item.type === '+') {
            totalIncome += parseInt(item.value);
        }
    }
    console.log(totalIncome);
    document.querySelector(".income__amount p").innerText = `$${totalIncome}`
}

showTotalExpenses()
function showTotalExpenses() {
    let items = getItemFromLS();

    let totalExpenses = 0;

    for (item of items) {
        if (item.type === '-') {
            totalExpenses += parseInt(item.value);
        }
   }
   console.log(totalExpenses) ;
    document.querySelector(".expense__amount p").innerText = `$${totalExpenses}`
}

//Total Balance
totalBalance()
function totalBalance(){
let items = getItemFromLS();

let tB = 0;

for (let item of items){
    if(item.type === "+"){
tB+=parseInt(item.value);
    }
    else{
tB-= parseInt(item.value);
    }
}

console.log(tB) ;

document.querySelector('.balance__amount p').innerText= `$${tB}`

if(tB>=0){
document.querySelector('header').className = "green"
}
else{
    document.querySelector('header').className = "red"
}
}