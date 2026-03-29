let saveEl = document.querySelector(".save-btn");
let myLeads = [];
let inputEl = document.querySelector("#input-box");
let unEl = document.querySelector("#un-el");
let leadFromLocalStoreage = JSON.parse(localStorage.getItem("myLeads"));
let deleteBtn = document.querySelector(".Delete-btn");
let tabBtn = document.querySelector(".save-tab-btn");



tabBtn.addEventListener("click", function () {
  chrome.tabs.query({active:true , currentWindow:true},function(tabs){
  myLeads.push(tabs[0].url);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);


  })

  
});

if (leadFromLocalStoreage) {
  myLeads = leadFromLocalStoreage;
  render(myLeads);
}

deleteBtn.addEventListener("dblclick", function () {
  localStorage.clear();
  myLeads = [];
  // unEl.innerHTML = ''
  render(myLeads);
});

function render(Leads) {
  let listItems = "";

  for (let i = 0; i < Leads.length; i++) {
    listItems += `
    <li>
        <a target='_blank' href='${Leads[i]}' > ${Leads[i]} </a>
     </li>
    `;
  }

  unEl.innerHTML = listItems;
}

saveEl.addEventListener("click", function () {
  myLeads.push(inputEl.value);

  localStorage.setItem("myLeads", JSON.stringify(myLeads));

  render(myLeads);
  inputEl.value = "";

  console.log(localStorage.getItem("myLeads"));
});
