> **Functionality Thinking Process**

## Toggling
### Firstly
- total count find out
- total --> allcards er length
- all card er child er number 
- console.log(allCardSection.children.length)
- calculateCount()

### Secondly -- empty array

- thrivingList = [];
-  thrivingCount.innerText = thrivingList.length;
- cards will push in this array

```
thrivingList.push({ name: "A" }, { name: "B" }, { name: "C" });
Thrive count : 3
```
- event delegation --> main e

- <button onclick="toggleStyle('all-filter-btn')" class="bg-black text-white px-5 py-2 rounded-md mr-2" id="all-filter-btn">All</button>

 - make ()
- all button select and eventListener or function using too make short the code
- <button onclick="toggleStyle('struggling-filter-btn')
- যে বাটনে ক্লিক করা হচ্ছে তার আইডি কে দিয়ে দিচ্ছে।
- এবার --

<br>


 ### Button Toggling

- প্রথমে ৩টি button-এর active `class` remove করে সবগুলোকে neutral style দেওয়া হবে।
- সব button-এ `bg-gray-300` এবং `text-black` class add করা হবে।
- যে button-এ click করা হবে, সেটিকে তার `id` দিয়ে select করা হবে।
- Selected button থেকে `bg-gray-300` এবং `text-black` class remove করা হবে।
- এরপর selected button-এ `bg-black` এবং `text-white` class add করা হবে।
- ফলে একসাথে শুধু selected button-ই active থাকবে।




### Why not add bg-black?  first remove bg-gray
```
  function toggleStyle(id) {
    // console.log("clicked", id)
    allFilterBtn.classList.remove("bg-black", "text-white")
    thrivingBtn.classList.remove("bg-black", "text-white")
    strugglingBtn.classList.remove("bg-black", "text-white")


    allFilterBtn.classList.add("bg-gray-300", "text-black")
    thrivingBtn.classList.add("bg-gray-300", "text-black")
    strugglingBtn.classList.add("bg-gray-300", "text-black")


    <!-- Fix process -->
    const selected = document.getElementById(id);
    selected.classList.remove("bg-gray-300", "text-black")
    selected.classList.add("bg-black", "text-white")
}
```




<br><br><br>






## 🔥 Rest of the projet - Part-01
- get the main container
```
const mainContainer = document.querySelector("main");
```
- Information gather from the targetted card ✔️..



```
 ✔️ mainContainer-এর ভিতরে user যেই card-এ click করে, event.target.parentNode.parentNode ব্যবহার করে সেই card-টিকে (parentNode) select করা হচ্ছে। এরপর parentNode.querySelector() দিয়ে ওই card-এর plantName, latinName, light, water, status এবং notes-এর text (innerText) বের করে আলাদা JavaScript variable-এ store করা হচ্ছে।  


mainContainer.addEventListener("click", function (event) {
    const parentNode = event.target.parentNode.parentNode;
    const plantName = parentNode.querySelector(".plantName").innerText;
    const latinName = parentNode.querySelector(".latinName").innerText;

    const light = parentNode.querySelector(".light").innerText;
    const water = parentNode.querySelector(".water").innerText;

    const status = parentNode.querySelector(".status").innerText;
    const notes = parentNode.querySelector(".notes").innerText;

    console.log(plantName, light, water, status, notes)
 
})
```

```
✔️ Make an object with card Info (Card element's innerText)

const cardInfo = {
    plantName,
    latinName,
    light,
    water,
    status,
    notes
    // এরপর thrivingList এ আছে কিনা চেক করতে হবে।
}
```

## Push []
- Thrive button click korle Count++ hobe. But first click only
- if include item in list - then not add
- find()
- thrivingList = []

```
// thrivingList এবং   cardInfo match করাতে হবে..
const plantExist = thrivingList.find(item => item.plantName == cardInfo.plantName);
if (!plantExist) {
    thrivingList.push(cardInfo)
}
console.log(thrivingList)
```

## Info showing
- Thriving clicked -- showing somewhere -- that's why
- filtered section create

```
<!-- Filtered Section -->

<section id="filtered-section">
<!-- Empty -->
</section>

```

- const filteredSection = document.getElementById("filtered-section");


- NOW . make a function renderThriving()
- Called -  renderThriving()  কোথায়?  mainContainer e event.target that's why
maincontainer er ekdom last e call korte hobe


- mainContainer e event listener na diye oi thrive button e dibo
- mainContainer এর ভিতরের অংশ সম্পূর্ণ কাট করে -


```
if (event.target.classList.contains('thriving-btn')) {
// এখানে পেস্ট করে দিতে হবে।
}

```


- appendChild(div)
- cardInfo কে thrivingList এ এপেন্ড করার পর পরই...
- parentNode.querySelector(".status").innerText = "Thrive"

-  toggleStyle ফাংশনের ভিতরে selected এরপরে...


```
if (id == "thriving-filter-btn") {
    allCardSection.classList.add("hidden")
    filteredSection.classList.remove("hidden")
}
```

<br>

- Problem: Thrive button-এ click করলে card-টি Thriving section-এ render হয়ে যায়। এরপর Thriving tab-এ click করলে card দেখা যায়। কিন্তু পরে All button-এ click করলেও শুধু Thriving-এর card-টাই দেখা যায়।
- Fix: All button-এ click করলে সব ধরনের card আবার render/display করতে হবে, যাতে শুধু Thriving-এর card আটকে না থাকে।
- এটা Fix করতে...

```
else if (id == "all-filter-btn") {
    filteredSection.classList.add("hidden")
    allCardSection.classList.remove("hidden")
}
```


- Anothe Problem : এপেন্ড হলে সেটা স্ট্যাটিক ডাটা স্টোর হচ্ছে , সেটা ডাইনামিকভাবে দেখানোর জন্য,
- N.B:    ${thrive.plantName} 
```
<div>
    <p class="plantName text-4xl">${thrive.plantName}</p>
    <p class="latinName">${thrive.latinName}</p>
</div>
```



-  parentNode.querySelector(".status").innerText = "Thrive" 
- উপরের লাইনটি CardInfo অবজেক্টের আগে লিখে দিতে হবে।

Or, 

```
const cardInfo = {
    plantName,
    latinName,
    light,
    water,
    status: "Thrive",
    notes
}
```



- To show Thrive Count , ফাংশন কল 

```
const plantExist = thrivingList.find(item => item.plantName == cardInfo.plantName);
if (!plantExist) {
    thrivingList.push(cardInfo)
}
calculateCount()    // ফাংশন কল
```
<br>




### Important Part : Struggling 

-  if (event.target.classList.contains('thriving-btn')) {} - এই স্টেটমেন্টের মতো আরেকটা else if স্টেট্মেন্ট ব্যবহার করে...।
- renderThriving() কে কপি করে শুধু পেস্ট করে ডাটা পরিবর্তন করতে হবে।
- renderStruggling() //Create  - Copy - paste
- 
- একইভাবে calculateCount() & renderStruggling() ফাংশন কল
- Data/Information Update for Struggling




### ⚠️ Toggling Issue

কার্ড টগল করার সময় একটি সমস্যা দেখা যাচ্ছে।

* **Struggling** এ ক্লিক করলে Struggling-এর কার্ডটি সঠিকভাবে দেখাচ্ছে।
* এরপর **Thriving** টগল বাটনে ক্লিক করলে আগের **Struggling** কার্ডটিই দেখাচ্ছে।
* কিন্তু **All** বাটনে ক্লিক করলে ৩টি কার্ডই সঠিকভাবে দেখাচ্ছে।

**সমস্যা:** টগল পরিবর্তন করার সময় আগের ফিল্টার করা কার্ডের স্টেট সঠিকভাবে রিসেট হচ্ছে না।


#### Think Logically
- এমনভাবে লজিক বিল্ড করতে হবে যেন Thrive এ ক্লিক করলে কার্ড একেবারে থ্রাইভে চলে যায়। all থেকে যেন একটা কার্ড কমে যায়। & Thrive থেকে আবার Struggle এ ক্লিক করলে টগল হয়ে Struggle এ কার্ডটি চলে আসবে।

<br>

- if() condition (Thrive-btn এর) -ভিতরে একটা শর্ত লিখে দিতে হবে - CardInfo Push করার পরেই...
 - Thrive এ Struggling কার্ড থাকলে সেটা Thrive থেকে রিমুভ হয়ে যাবে

```
- কোনো একটা item কে array থেকে বাদ দেয়।
- if() এর ভিতরে --
strugglingList = strugglingList.filter(item => item.plantName != cardInfo.plantName)
```

- একইভাবে

```
// Struggle এ Thriving কার্ড থাকলে সেটা Struggle থেকে রিমুভ হয়ে যাবে
else if() এর ভিতরে --
thrivingList = thrivingList.filter(item => item.plantName == cardInfo.plantName)
calculateCount()
```

















 

