let thrivingList = []
let strugglingList = []
let currentStatus = "all"

const total = document.getElementById("total")
const thrivingCount = document.getElementById("thriving-count")
const strugglingCount = document.getElementById("struggling-count")

const allCardSection = document.getElementById("all-cards")
let remainingCardCount = allCardSection.children.length;


const mainContainer = document.querySelector('main')
const filteredSection = document.getElementById("filtered-section")
const emptyMsgSection = document.getElementById("no-applicants")

const allFilterBtn = document.getElementById("all-filter-btn")
const thrivingBtn = document.getElementById("thriving-filter-btn")
const strugglingBtn = document.getElementById("struggling-filter-btn")




function calculateCount() {
    total.innerText = remainingCardCount;
    if (remainingCardCount < 1) {
        total.innerText = 0;
    }


    thrivingCount.innerText = thrivingList.length;
    strugglingCount.innerText = strugglingList.length;
}
calculateCount()



function toggleStyle(id) {
    allFilterBtn.classList.remove("bg-black", 'text-white')
    thrivingBtn.classList.remove("bg-black", 'text-white')
    strugglingBtn.classList.remove("bg-black", 'text-white')

    allFilterBtn.classList.add("bg-gray-300", 'text-black')
    thrivingBtn.classList.add("bg-gray-300", 'text-black')
    strugglingBtn.classList.add("bg-gray-300", 'text-black')

    const selected = document.getElementById(id)
    currentStatus = id

    selected.classList.remove("bg-gray-300", 'text-black')
    selected.classList.add("bg-black", 'text-white')

    if (id == "all-filter-btn") {
        allCardSection.classList.remove('hidden')
        filteredSection.classList.add('hidden')

        if (remainingCardCount > 0) {
            emptyMsgSection.classList.add("hidden")
        }
        else if (remainingCardCount == 0) {
            emptyMsgSection.classList.remove("hidden")
        }

    }
    else if (id == "thriving-filter-btn") {
        filteredSection.classList.remove('hidden')
        allCardSection.classList.add('hidden')

        renderThriving()

        if (thrivingList.length < 1) {
            emptyMsgSection.classList.remove('hidden')
        }
        else {
            emptyMsgSection.classList.add('hidden')
        }
    }

    else if (id == "struggling-filter-btn") {
        filteredSection.classList.remove('hidden')
        allCardSection.classList.add('hidden')

        renderStruggling()

        if (strugglingList.length < 1) {
            emptyMsgSection.classList.remove("hidden")
        }
        else {
            emptyMsgSection.classList.add("hidden")
        }
    }


}


mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains("thriving-btn")) {

        const card = event.target.closest('.card')

        const plantName = card.querySelector('.plantName').textContent;
        const latinName = card.querySelector('.latinName').textContent;
        const light = card.querySelector('.light').textContent;
        const water = card.querySelector('.water').textContent;
        const status = card.querySelector('.status').textContent;
        const notes = card.querySelector('.notes').textContent;

        card.querySelector('.status').innerText = 'Thrive'


        const cardInfo = {
            plantName: plantName,
            latinName: latinName,
            light: light,
            water: water,
            status: 'Thrive',
            notes: notes,
        }

        const plantExist = thrivingList.find(item => item.plantName == cardInfo.plantName)
        if (!plantExist) {
            thrivingList.push(cardInfo)
        }

        strugglingList = strugglingList.filter(item => item.plantName != cardInfo.plantName)

        calculateCount()

        if (currentStatus == "struggling-filter-btn") {
            renderStruggling()
        }


        // renderThriving()
    }


    else if (event.target.classList.contains("struggling-btn")) {

        const card = event.target.closest('.card')

        const plantName = card.querySelector('.plantName').textContent;
        const latinName = card.querySelector('.latinName').textContent;
        const light = card.querySelector('.light').textContent;
        const water = card.querySelector('.water').textContent;
        const status = card.querySelector('.status').textContent;
        const notes = card.querySelector('.notes').textContent;

        card.querySelector('.status').innerText = 'Struggle'


        const cardInfo = {
            plantName: plantName,
            latinName: latinName,
            light: light,
            water: water,
            status: 'Struggle',
            notes: notes,
        }

        const plantExist = strugglingList.find(item => item.plantName == cardInfo.plantName)
        if (!plantExist) {
            strugglingList.push(cardInfo)
        }

        thrivingList = thrivingList.filter(item => item.plantName != cardInfo.plantName)

        if (currentStatus == "thriving-filter-btn") {
            renderThriving()
        }
        calculateCount()
        // renderStruggling()
    }


})



function renderThriving() {
    filteredSection.innerHTML = "";

    for (const thrive of thrivingList) {
        console.log(thrive)

        const div = document.createElement("div")
        div.className = "card flex justify-between my-6 py-6 border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1  p-4"

        div.innerHTML = `
        <div class="leftside space-y-6">
                    <!-- part - 01 -->
                    <div>
                        <p class="plantName text-4xl mb-2 font-semibold text-black/70">${thrive.plantName}</p>
                        <p class="latinName">${thrive.latinName}</p>
                    </div>
                    <!-- part 02 -->
                    <div class="flex gap-3">
                        <p class="light bg-gray-200 rounded-md px-3 py-1">${thrive.light}</p>
                        <p class="water bg-gray-200 rounded-md px-3 py-1">${thrive.water}</p>
                    </div>
                    <!-- part 03 -->
                    <div>
                        <p class="status">${thrive.status}</p>
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
                        class="bg-red-100 px-4 py-2 rounded-md text-red-500 border border-red-100  hover:border hover:border-red-500 transition-all duration-300 ease-in-out">Delete</button>
                </div>
        
        `;

        filteredSection.appendChild(div)
    }



}


function renderStruggling() {
    filteredSection.innerHTML = "";

    for (const struggle of strugglingList) {
        console.log(struggle)

        const div = document.createElement("div")
        div.className = "card flex justify-between my-6 py-6 border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1  p-4"

        div.innerHTML = `
        <div class="leftside space-y-6">
                    <!-- part - 01 -->
                    <div>
                        <p class="plantName text-4xl mb-2 font-semibold text-black/70">${struggle.plantName}</p>
                        <p class="latinName">${struggle.latinName}</p>
                    </div>
                    <!-- part 02 -->
                    <div class="flex gap-3">
                        <p class="light bg-gray-200 rounded-md px-3 py-1">${struggle.light}</p>
                        <p class="water bg-gray-200 rounded-md px-3 py-1">${struggle.water}</p>
                    </div>
                    <!-- part 03 -->
                    <div>
                        <p class="status">${struggle.status}</p>
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
                        class="bg-red-100 px-4 py-2 rounded-md text-red-500 border border-red-100  hover:border hover:border-red-500 transition-all duration-300 ease-in-out">Delete</button>
                </div>
        
        `;

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



