/* All data: https://openapi.programming-hero.com/api/ai/tools

Single data details: https://openapi.programming-hero.com/api/ai/tool/${id}

Single data Example: https://openapi.programming-hero.com/api/ai/tool/01 */

const loadData = async (displayMore, isShortButtonClicked) => {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
    const data = await res.json()
    const cards = data.data.tools
    if (isShortButtonClicked) {
        cards.sort((a, b) => new Date(a.published_in) - new Date(b.published_in))
    }
    displayCards(cards, displayMore)
}

const shortByDateButton = () => {
    isShortButtonClicked = true
    loadData(false, isShortButtonClicked)
}

const displayCards = (cards, displayMore) => {
    // console.log(cards);

    const sectionContainer = document.getElementById('card-container')
    sectionContainer.textContent = ''
    const seeMoreDiv = document.getElementById('see-more-div')
    // else {
    //     cards = cards
    // }

    if (cards.length > 6 && !displayMore) {
        cards = cards.slice(0, 6)
        seeMoreDiv.classList.remove('hidden')
    }

    else {
        seeMoreDiv.classList.add('hidden')
    }
    cards.forEach(card => {
        // console.log(card);
        const oneCard = document.createElement('div')
        oneCard.classList = `card w-full bg-base-100 p-6 shadow-xl`
        oneCard.innerHTML = `
        <figure class="h-full"><img class="w-full" src="${card.image || ""}" alt="image" />
        </figure>
        <div class="mt-6">
            <h2 class="card-title">Features</h2>
            <ol class="list-decimal pl-4 mt-4 text-[#585858]">
                ${card.features.map(feature => `<li>${feature}</li>`).join('')}
            </ol>
            <hr class="my-6">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="mb-4 text-2xl font-semibold">${card.name}</h2>
                    <div class="flex items-center gap-2 text-[#585858]">
                    <i class="fa-solid fa-calendar-days"></i>
                    <p >${card.published_in}</p>
                    </div>
                </div>
                <div class="card-actions justify-end">
                    <button onclick="openModal(${card.id}); my_modal_5.showModal()" class="btn btn-circle bg-[#fef7f7] border-none">
                    <i class="fa-solid fa-arrow-right-long text-xl text-[rgb(235,87,87)]"></i>
                    </button>
                </div>
            </div>
        </div>
        `
        // console.log(oneCard);
        sectionContainer.appendChild(oneCard)
    })
}
const loadModal = async (id) => {
    console.log(id);
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/0${id}`)
    const data = await res.json()
    const modalCard = data.data
    // console.log(modalCard.features['1'].feature_name);

    const modalDiv = document.createElement('div')
    modalDiv.classList = 'modal-box max-w-[1246px]'
    modalDiv.innerHTML = `
    <div class="m-[102px] flex gap-5">
    <!-- left part -->
    <div class="max-w-[487px] border border-[rgb(235,87,87)] rounded-2xl p-[30px] bg-[rgba(235,87,87,0.05)]">
        <h3 class="text-[25px] font-semibold text-black">${modalCard.description}</h3>
        <!-- 3 box -->
        <div class="flex gap-4 text-center my-6">
            <div class="bg-white px-[26px] py-[22px] w-[132px] rounded-2xl flex items-center">
                <p class="text-[#03A30A] font-bold">
                ${modalCard.pricing[0].price}<br>${modalCard.pricing[0].plan}
                </p>
            </div>
            <div class="bg-white px-[26px] py-[22px] w-[132px] rounded-2xl flex items-center">
                <p class="text-[#F28927] font-extrabold">
                ${modalCard.pricing[1].price}<br>${modalCard.pricing[0].plan}
                </p>
            </div>
            <div class="bg-white px-[26px] py-[22px] w-[132px] rounded-2xl flex items-center">
                <p class="text-[#EB5757] font-extrabold">
                ${modalCard.pricing[2].price}<br>${modalCard.pricing[0].plan}
                </p>
            </div>
        </div>
        <!-- left bottom box  -->
        <div class="flex ">
            <div class="w-[249px]">
                <h3 class="mb-4 text-black text-[25px] font-semibold">Features</h3>
                <ul class="text-[#585858] list-disc ml-6">
                    <li>${modalCard.features['1'].feature_name}</li>
                    <li>${modalCard.features['2'].feature_name}</li>
                    <li>${modalCard.features['3'].feature_name}</li>
                </ul>
            </div>
            <div>
                <h3 class="mb-4 text-black text-[25px] font-semibold">Integrations</h3>
                <ul class="text-[#585858] list-disc ml-6">
                    <li>${modalCard.integrations[0]}</li>
                    <li>${modalCard.integrations[1]}</li>
                    <li>${modalCard.integrations[2]}</li>
                </ul>
            </div>
        </div>
    </div>
    <!-- right part  -->
    <div class="max-w-[487px] border border-[#E7E7E7] rounded-2xl p-[30px]">
        <div class="mb-[25px]">
            <img class="rounded-2xl" src="${modalCard.image_link[0] || modalCard.image_link[1]}" alt="">
        </div>
        <div class="text-center">
            <h3 class="text-black mb-4 font-semibold text-[25px]">${modalCard.input_output_examples[0].input}</h3>
            <p class="text-[#585858] w-[361px] mx-auto">${modalCard.input_output_examples[0].output}</p>
        </div>
    </div>
</div>
<div class="modal-action absolute top-[-23px] right-[4px]">
    <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
    </form>
</div>
`
    modalContainer.appendChild(modalDiv)
}

const modalContainer = document.getElementById('my_modal_5')
modalContainer.textContent = ''
const openModal = (id) => {
    console.log('open modal');
    loadModal(id)
}
// my_modal_5.showModal()

const seeMore = () => {
    displayMore = true
    loadData(displayMore)
}

loadData()