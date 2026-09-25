let thrivingList = [];
let strugglingList = [];
let currentStatus = "all"

let total = document.getElementById("total");
let thrivingCount = document.getElementById("thriving-count");
let strugglingCount = document.getElementById("struggling-count");


const allFilterBtn = document.getElementById("all-filter-btn");
const thrivingBtn = document.getElementById("thriving-filter-btn");
const strugglingBtn = document.getElementById("struggling-filter-btn")

let allCardSection = document.getElementById("all-cards");
let remainingCardCount = allCardSection.children.length;

const mainContainer = document.querySelector("main");
const filteredSection = document.getElementById("filtered-section");
const emptyMsgSection = document.getElementById("no-applicants")



function calculateCount() {
    total.innerText = remainingCardCount;
    thrivingCount.innerText = thrivingList.length;
    strugglingCount.innerText = strugglingList.length;
}
calculateCount()





function toggleStyle(id) {
    // console.log("clicked", id)

    // Remove black style from all 3 buttons
    allFilterBtn.classList.remove("bg-black", "text-white")
    thrivingBtn.classList.remove("bg-black", "text-white")
    strugglingBtn.classList.remove("bg-black", "text-white")

    // Add gray style to all buttons to make them neutral
    allFilterBtn.classList.add("bg-gray-300", "text-black")
    thrivingBtn.classList.add("bg-gray-300", "text-black")
    strugglingBtn.classList.add("bg-gray-300", "text-black")

    // Remove gray style from the selected button and add black style
    const selected = document.getElementById(id);
    currentStatus = id;

    selected.classList.remove("bg-gray-300", "text-black")
    selected.classList.add("bg-black", "text-white")



    if (id == "thriving-filter-btn") {
        allCardSection.classList.add("hidden")
        filteredSection.classList.remove("hidden")
        renderThriving()

        if (thrivingList.length == 0) {
            emptyMsgSection.classList.remove("hidden");
        }
        else {
            emptyMsgSection.classList.add("hidden");
        }
    }

    else if (id == "all-filter-btn") {
        filteredSection.classList.add("hidden")
        allCardSection.classList.remove("hidden")
        renderThriving()

        if (remainingCardCount == 0) {
            emptyMsgSection.classList.remove("hidden")
        }
        else {
            emptyMsgSection.classList.add("hidden")
        }
    }

    else if (id == "struggling-filter-btn") {
        filteredSection.classList.remove("hidden")
        allCardSection.classList.add("hidden")
        renderStruggling()

        if (strugglingList.length == 0) {
            emptyMsgSection.classList.remove("hidden");
        }
        else {
            emptyMsgSection.classList.add("hidden");
        }
    }
}






mainContainer.addEventListener("click", function (event) {

    if (event.target.classList.contains('thriving-btn')) {

        // const parentNode = event.target.parentNode.parentNode;
        const parentNode = event.target.closest('.card')  //Easy way

        const plantName = parentNode.querySelector(".plantName").innerText;
        const latinName = parentNode.querySelector(".latinName").innerText;

        const light = parentNode.querySelector(".light").innerText;
        const water = parentNode.querySelector(".water").innerText;

        const status = parentNode.querySelector(".status").innerText;
        const notes = parentNode.querySelector(".notes").innerText;

        // console.log(plantName, light, water, status, notes)
        parentNode.querySelector(".status").innerText = "Thrive"

        parentNode.classList.remove("border-l-red-400");
        parentNode.classList.add("border-l-green-400", "border-l-4");


        parentNode.querySelector(".status").classList.add(
            "text-green-600",
            "font-semibold",
            "bg-green-50",
            "px-3",
            "border",
            "border-green-200",
            "py-1",
            "rounded-full",
            "inline-block"
        );

        const cardInfo = {
            plantName,
            latinName,
            light,
            water,
            status: "Thrive",
            notes
        }

        // thrivingList এবং   cardInfo match করাতে হবে..
        const plantExist = thrivingList.find(item => item.plantName == cardInfo.plantName);
        if (!plantExist) {
            thrivingList.push(cardInfo)
        }

        // Thrive এ Struggling কার্ড থাকলে সেটা Thrive থেকে রিমুভ হয়ে যাবে
        strugglingList = strugglingList.filter(item => item.plantName != cardInfo.plantName)

        calculateCount()

        if (currentStatus == "struggling-filter-btn") {
            renderStruggling()

            if (strugglingList.length == 0) {
                emptyMsgSection.classList.remove("hidden")
            }
            else {
                emptyMsgSection.classList.add("hidden")
            }
        }

        // renderThriving()   // Removed & called where contains selected varibale.
    }





    else if (event.target.classList.contains('struggling-btn')) {

        // const parentNode = event.target.parentNode.parentNode;
        const parentNode = event.target.closest('.card')  //Easy way

        const plantName = parentNode.querySelector(".plantName").innerText;
        const latinName = parentNode.querySelector(".latinName").innerText;

        const light = parentNode.querySelector(".light").innerText;
        const water = parentNode.querySelector(".water").innerText;

        const status = parentNode.querySelector(".status").innerText;
        const notes = parentNode.querySelector(".notes").innerText;

        parentNode.classList.remove("border-l-green-400");
        parentNode.classList.add("border-l-red-400", "border-l-4");

        // console.log(plantName, light, water, status, notes)
        parentNode.querySelector(".status").innerText = "Struggle"
        parentNode.querySelector(".status").classList.add(
            "text-red-600",
            "font-semibold",
            "bg-red-50",
            "px-3",
            "border",
            "border-red-200",
            "py-1",
            "rounded-full",
            "inline-block"
        );

        const cardInfo = {
            plantName,
            latinName,
            light,
            water,
            status: 'Struggle',
            notes
        }

        // thrivingList এবং   cardInfo match করাতে হবে..
        const plantExist = strugglingList.find(item => item.plantName == cardInfo.plantName);
        if (!plantExist) {
            strugglingList.push(cardInfo)
        }

        // Struggle এ Thriving কার্ড থাকলে সেটা Struggle থেকে রিমুভ হয়ে যাবে
        // Thrive card remove from "Struggling"
        thrivingList = thrivingList.filter(item => item.plantName != cardInfo.plantName)


        if (currentStatus == "thriving-filter-btn") {
            renderThriving();

            if (thrivingList.length == 0) {
                emptyMsgSection.classList.remove("hidden");
            }
            else {
                emptyMsgSection.classList.add("hidden");
            }
        }
        calculateCount()

        // renderStruggling()  // Removed & called where contains selected varibale.
    }

})









// Push in filterdSection (Which is empty)
function renderThriving() {
    filteredSection.innerHTML = "";

    for (let thrive of thrivingList) {
        // console.log(thrive)

        let div = document.createElement("div");
        // Card er class name added
        div.className = "card border-l-green-400 border-l-4 flex justify-between my-6 py-6 border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1  p-4"

        // Card er body ta paste
        div.innerHTML = `
         <div class="leftside space-y-6">
                    <!-- part - 01 -->
                    <div>
                        <p class="plantName text-4xl  mb-2 font-semibold text-black/70"">${thrive.plantName}</p>
                        <p class="latinName">${thrive.latinName}</p>
                    </div>
                    <!-- part 02 -->
                    <div class="flex gap-3">
                        <p class="light bg-gray-200 rounded-md px-3 py-1">${thrive.light}</p>
                        <p class="water bg-gray-200 rounded-md px-3 py-1">${thrive.water}</p>
                    </div>
                    <!-- part 03 -->
                    <div>
                        <p class="status text-green-600 font-semibold bg-green-50 px-3 border border-green-200 py-1 rounded-full inline-block">${thrive.status}</p>
                        <p class="notes">${thrive.notes}</p>
                    </div>

                    <div class="flex gap-4">
                        <button
                            class="thriving-btn bg-green-200 px-4 py-2 rounded-md border border-green-200  hover:border hover:border-green-500 transition-all duration-300 ease-in-out">Thrive</button>

                        <button
                            class="struggling-btn bg-red-200 px-4 py-2 rounded-md border border-red-200  hover:border hover:border-red-500 transition-all duration-300 ease-in-out">Struggle</button>
                    </div>
                </div>


                <div class="rightside">
                    <button
                        class="bg-red-100 text-red-500 px-4 py-2 rounded-md border border-red-200  hover:border hover:border-red-500 transition-all duration-300 ease-in-out">Delete</button>
                </div>

        `;

        // Rest of the project Part-01 
        filteredSection.appendChild(div)

    }

}





function renderStruggling() {
    filteredSection.innerHTML = "";

    for (let struggle of strugglingList) {
        // console.log(thrive)

        let div = document.createElement("div");
        // Card er class name added
        div.className = "card border-l-red-400 border-l-4 flex justify-between my-6 py-6 border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1  p-4"

        // Card er body ta paste
        div.innerHTML = `
         <div class="leftside space-y-6">
                    <!-- part - 01 -->
                    <div>
                        <p class="plantName text-4xl  mb-2 font-semibold text-black/70"">${struggle.plantName}</p>
                        <p class="latinName">${struggle.latinName}</p>
                    </div>
                    <!-- part 02 -->
                    <div class="flex gap-3">
                        <p class="light bg-gray-200 rounded-md px-3 py-1">${struggle.light}</p>
                        <p class="water bg-gray-200 rounded-md px-3 py-1">${struggle.water}</p>
                    </div>
                    <!-- part 03 -->
                    <div>
                        <p class="status text-red-600 font-semibold bg-red-50 px-3 border border-red-200 py-1 rounded-full inline-block">${struggle.status}</p>
                        <p class="notes">${struggle.notes}</p>
                    </div>

                    <div class="flex gap-4">
                        <button
                            class="thriving-btn bg-green-200 px-4 py-2 rounded-md border border-green-200  hover:border hover:border-green-500 transition-all duration-300 ease-in-out">Thrive</button>

                        <button
                            class="struggling-btn bg-red-200 px-4 py-2 rounded-md border border-red-200  hover:border hover:border-red-500 transition-all duration-300 ease-in-out">Struggle</button>
                    </div>
                </div>


                <div class="rightside">
                    <button
                        class="bg-red-100 text-red-500 px-4 py-2 rounded-md border border-red-200  hover:border hover:border-red-500 transition-all duration-300 ease-in-out">Delete</button>
                </div>

        `;

        // Rest of the project Part-01 
        filteredSection.appendChild(div)

    }

}










mainContainer.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete-btn")) {

        const card = event.target.closest(".card")
        card.style.display = "none"

        remainingCardCount--;
        calculateCount()
    }

})