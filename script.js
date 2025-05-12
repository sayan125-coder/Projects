//Create you project here from scratch
let k=0;
//Adding eventLister to each unoccupied seat--------------------------------------------------------------
let parent=document.querySelector("#seatCont");
let seats = parent.querySelectorAll("*");
let selectedSeats = [];
const selectedSeatsHolder = document.querySelector("#selectedSeatsHolder");
let totalPrice = document.querySelector("#totalPrice");
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];
//Adding the movies to the dropdown menu
var select = document.querySelector("#selectMovie");
let option;
for (let i = 0; i < moviesList.length; i++) 
{ 
  option = document.createElement("option"); 
  option.value = moviesList[i].price; 
  option.text = moviesList[i].movieName; 
  select.appendChild(option); 
}
// Update selected seats
function updateSelectedSeats() {
  selectedSeatsHolder.innerHTML = "";
  selectedSeats.forEach((seatIndex) => {
    const seatNumber = seatIndex + 1;
    const seatBlock = document.createElement("div");
    seatBlock.classList.add("seat-block");
    seatBlock.textContent =seatNumber;
    seatBlock.style.borderColor = "green";
    selectedSeatsHolder.appendChild(seatBlock);
  });
  k=0;
}
function seatClickEvent(e) {
  const seat = e.target;
  if (seat.classList.contains("occupied")) {
    return;
  }
  if (seat.dataset.clicked === "true") {
    return;
  }
  seat.dataset.clicked = "true";
  seat.classList.toggle("selected");

  const seatIndex = [...seats].indexOf(seat);
  if (selectedSeats.includes(seatIndex)) {
    selectedSeats = selectedSeats.filter((index) => index !== seatIndex);
  } else {
    selectedSeats.push(seatIndex);
  }
  updateTotalPrice();
  updateSelectedSeats(k);
  setTimeout(() => {
    seat.dataset.clicked = "false";
  }, 100);
}
//adding event listeners to the options of the dropdown menu
select.addEventListener('change',function(){
  let selectedOption = this.options[this.selectedIndex];
  document.querySelector("#movieName").textContent = selectedOption.textContent;
  document.querySelector("#moviePrice").textContent="$ "+selectedOption.value;
  document.querySelector("#totalPrice").textContent="$ "+(selectedOption.value*selectedSeats.length);

})
// Seat click event
function updateTotalPrice() {
  const selectedMovie = document.querySelector(".selectMovie option:checked");
  const ticketPrice = selectedMovie.value;
  totalPrice.textContent = `$${selectedSeats.length * ticketPrice}`;
  document.querySelector("#numberOfSeat").innerHTML=selectedSeats.length;
}
// Seat click event
seats.forEach((seat) => {
  k++;
  if(seat.className=="seat" || seat.className=="seat Occupied")
  seat.dataset.clicked = "false";
  seat.addEventListener("click", seatClickEvent)
});
//default function--------------------------------------------------------
function defaultValues(){
  selectedSeats=[];
  totalPrice.textContent ="$0";
  for(i of selectedSeatsHolder.childNodes)
  i.classList.remove("seat-block");
  document.querySelector("#numberOfSeat").innerHTML=selectedSeats.length;
  selectedSeatsHolder.textContent="No seat Selected";
}
//continue button
const continueBtn=document.querySelector("#proceedBtn");
continueBtn.addEventListener("click",function(){
  if(selectedSeats.length>=1)
  {
    alert("Yayy! Your Seats have been booked.");
    seats.forEach((seat)=>{
      if(seat.classList.contains("selected")){
      seat.classList.remove("selected");
      seat.classList.toggle("occupied");}
    });
    defaultValues();
  }
  else
  {
    alert("Oops no seat Selected");
  }
})
//cancel button
let cancelBtn=document.querySelector("#cancelBtn");
cancelBtn.addEventListener("click",function(){
  seats.forEach((seat)=>{
    if(seat.classList.contains("selected")){
      seat.classList.remove("selected");
    }
  });
  defaultValues();
})
//premium section
let count=0;
let forms=document.querySelectorAll(".bid")
let icons=document.querySelectorAll(".golden-seat-icon");
icons.forEach((items)=>{
  items.addEventListener('click',function(){
    count++;
    forms.forEach((part)=>{
    if(part.id==items.id)
    {
      part.style.display="block";
    }
    else
    {
      part.style.display="none";
    }
  })
  });
})
let owner=document.querySelectorAll(".owner");
let maxValue=[9,9,9];
let divi=[0,0,0];
let nameInput=document.querySelectorAll('input[name="name"]');
let priceInput=document.querySelectorAll('input[name="price"]');
let btns=document.querySelectorAll('input[value="BID"]');
btns.forEach((button)=>{
  button.addEventListener('click',function(){
    if(nameInput[button.id-1].value.trim()==="" || priceInput[button.id-1].value.trim()===""){
      alert("PLEASE ENTER VALID INFORMATION");
    }
    else{
      if(priceInput[button.id-1].value>maxValue[button.id-1])
      {
        alert(`CONGRATS ON BIDDING FOR ${priceInput[button.id-1].value}$`);
        maxValue[button.id-1]=priceInput[button.id-1].value;
        priceInput.placeholder=`Current Bid=${maxValue[button.id-1]}`;
        owner.forEach((person)=>{
          if(person.id-1==button.id-1){
            let div2=document.createElement("div")
            person.textContent=`SEAT:${person.id} :  OWNER:${nameInput[button.id-1].value},BID:${priceInput[button.id-1].value+"$"}`;
            person.style.color="black";
            person.style.fontWeight="bold";
            div2.style.color="black";
            div2.className="div2";
          }
        })        
      }
      else
      {
        alert("PLEASE ENTER AMOUNT GREATER THAN THE CURRENT BID");
      }
    }
  })
})

