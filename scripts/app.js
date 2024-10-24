const loadData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const dataOfAi = data.data.tools.slice(0, 6);
  displayDatas(dataOfAi);
};

const displayDatas = (data) => {
  let i = 0;
  data.forEach((element) => {
    i = i + 1;
    const dataCard = document.createElement("div");
    const ul = document.createElement("ul");
    dataCard.classList = `card bg-base-100 lg:w-96 shadow-xl mx-auto`;
    dataCard.innerHTML = `
            <figure class="min-h-52">
              <img src="${element.image}" alt="AI Image" />
            </figure>
            <div class="card-body">
              <h2 class="card-title text-2xl">Features</h2>
              <div id="list-div-${i}">
                
              </div>
              <div
                class="card-actions justify-between border-t p-2 border-[#11111133]"
              >
                <div>
                  <h2 class="card-title text-2xl">${element.name}</h2>
                  <p class="flex"><image class="mr-2" src="images/calender.svg"/>${element.published_in}</p>
                </div>
                <button onclick="my_modal_3.showModal() ; modalFunc(${element.id})" class="btn btn-circle">
                  <img src="images/Frame.svg" alt=""/>
                </button>
              </div>
            </div>
        `;
    const cardContainer = document.getElementById("card-container");
    cardContainer.appendChild(dataCard);
    let m = 0;
    element.features.map((liData) => {
      m = m + 1;
      const li = document.createElement("li");
      li.innerText = m + " " + liData;
      ul.appendChild(li);
    });
    const listDiv = document.getElementById(`list-div-${i}`);
    listDiv.appendChild(ul);
  });
};

loadData();

const seeMore = async () => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const dataOfAi = data.data.tools;

  if (data.data.tools.length >= 12) {
    const seeMore = document.getElementById("see_more");
    seeMore.disabled = true;
  }
  displayDatas(dataOfAi);
};

const modalFunc = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${
      id.toString().length === 1 ? "0" + id : id
    }`
  );
  const data = await res.json();
  const {
    description,
    image_link,
    features,
    integrations,
    pricing,
    input_output_examples,
  } = data.data;
  console.log(data.data);
  const modalFeatures = getElementById("modal-features");
  const modalIntegrations = getElementById("modal-integrations");
  const ul1 = document.createElement("ul");
  modalFeatures.innerHTML = "";
  const ul2 = document.createElement("ul");
  modalIntegrations.innerHTML = "";

  setElementValue("description", description);
  setElementValue("price-1", pricing ? pricing[0].price : "Undefined");
  setElementValue("price-2", pricing ? pricing[1].price : "Undefined");
  setElementValue("price-3", pricing ? pricing[2].price : "Undefined");
  setElementValue("plan-1", pricing ? pricing[0].plan : "Undefined");
  setElementValue("plan-2", pricing ? pricing[1].plan : "Undefined");
  setElementValue("plan-3", pricing ? pricing[2].plan : "Undefined");
  setElementValue(
    "question",
    input_output_examples ? input_output_examples[0].input : "Undefined"
  );
  setElementValue(
    "answer",
    input_output_examples ? input_output_examples[0].output : "Undefined"
  );

  ul1.classList.add("text-xs");
  ul2.classList.add("text-xs");
  let i = 1;
  console.log(Object.keys(features), integrations, features);
  if (features != null) {
    Object.keys(features).forEach((key) => {
      const li1 = document.createElement("li");
      li1.innerHTML = `${i} ${features[key].feature_name}`;
      ul1.appendChild(li1);
      i = i + 1;
    });
  } else {
    const modalFeatures = getElementById("modal-features");
    modalFeatures.innerHTML = "No Data Found!!!";
  }

  console.log(integrations);

  let m = 1;
  if (integrations != null) {
    integrations.forEach((integration) => {
      const li2 = document.createElement("li");
      li2.innerHTML = `${m} ${integration}`;
      ul2.appendChild(li2);
      m = m + 1;
    });
  } else {
    const modalIntegrations = getElementById("modal-integrations");
    modalIntegrations.innerHTML = "No Data Found!!!";
  }
  modalFeatures.appendChild(ul1);
  modalIntegrations.appendChild(ul2);

  const modalImage = getElementById("modalImg");
  modalImage.src =
    image_link[0] || image_link[1] || image_link[2] || image_link[3];
  modalImage.alt = "No Image Found!!!";
};

const sortByDate = async () => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const dataOfAi = data.data.tools;
  const sortedDate = dataOfAi.sort((a, b) => {
    return new Date(a.published_in) - new Date(b.published_in);
  });

  if (data.data.tools.length >= 12) {
    const seeMore = document.getElementById("see_more");
    seeMore.disabled = true;
  }
  displayDatas(sortedDate);
};
