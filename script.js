/* All data: https://openapi.programming-hero.com/api/ai/tools

Single data details: https://openapi.programming-hero.com/api/ai/tool/${id}

Single data Example: https://openapi.programming-hero.com/api/ai/tool/01 */

const loadData = async (displayMore) => {
    // try {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
    const data = await res.json()
    const cards = data.data.tools
    displayCards(cards, displayMore)
    // }
    // catch {
    //     console.log('error occur');
    // }
}


const displayCards = (cards, displayMore) => {
    // console.log(cards);

    const sectionContainer = document.getElementById('card-container')
    sectionContainer.textContent = ''
    const seeMoreDiv = document.getElementById('see-more-div')


    if (cards.length > 6 && !displayMore) {
        cards = cards.slice(0, 6)
        seeMoreDiv.classList.remove('hidden')
    }

    else {
        seeMoreDiv.classList.add('hidden')
    }
    cards.forEach(card => {
        console.log(card);
        card.features.map(feature => console.log(`<li>${feature}</li>`))
        const oneCard = document.createElement('div')
        oneCard.classList = `card w-full bg-base-100 p-6 shadow-xl`
        oneCard.innerHTML = `
        <figure class="h-full"><img class="w-full" src="${card.image || ""}" alt="image" />
        </figure>
        <div class="mt-6">
            <h2 class="card-title">Features</h2>
            <ol id="LL" class="list-decimal pl-4 mt-4">
                ${card.features.map(feature => `<li>${feature}</li>`).join('')}
            </ol>
            <hr class="my-6">
            <div class="flex items-center justify-between">
                <div>
                    <h2 class="mb-4 text-2xl font-semibold">${card.name}</h2>
                    <p>${card.published_in}</p>
                </div>
                <div class="card-actions justify-end">
                    <button class="btn btn-lg btn-circle ">
                    <i class="fa-solid fa-arrow-right text-[rgb(235,87,87)]"></i>
                    </button>
                </div>
            </div>
        </div>
        `

        // const cardFeaturesArray = card.features
        // const ol = document.getElementById('LL')
        // console.log(ol);
        // const cardFeatures = cardFeaturesArray.forEach(arrEle => {
        //     const li = document.createElement('li')
        //     li.innerText = arrEle
        //     ol.appendChild(li)
        // })
        // console.log(oneCard);
        sectionContainer.appendChild(oneCard)
    })
}


const seeMore = () => {
    displayMore = true
    loadData(displayMore)
}

loadData()