/* All data: https://openapi.programming-hero.com/api/ai/tools

Single data details: https://openapi.programming-hero.com/api/ai/tool/${id}

Single data Example: https://openapi.programming-hero.com/api/ai/tool/01 */

const loadData = async (displayMore, isShortButtonClicked) => {
    // try {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
    const data = await res.json()
    const cards = data.data.tools
    displayCards(cards, displayMore, isShortButtonClicked)
    // }
    // catch {
    //     console.log('error occur');
    // }
}
const shortByDateButton = () => {
    isShortButtonClicked = true
    loadData(false, isShortButtonClicked)

}

const displayCards = (cards, displayMore, isShortButtonClicked) => {
    console.log(cards);

    const sectionContainer = document.getElementById('card-container')
    sectionContainer.textContent = ''
    const seeMoreDiv = document.getElementById('see-more-div')
    if (isShortButtonClicked) {
        cards.sort((a, b) => new Date(a.published_in) - new Date(b.published_in))
    }
    else {
        cards = cards
    }

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
                    <button class="btn btn-circle bg-[#fef7f7] border-none">
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



const seeMore = () => {
    displayMore = true
    loadData(displayMore)
}

loadData()