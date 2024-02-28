/* All data: https://openapi.programming-hero.com/api/ai/tools

Single data details: https://openapi.programming-hero.com/api/ai/tool/${id}

Single data Example: https://openapi.programming-hero.com/api/ai/tool/01 */

const loadData = async () => {
    // try {
    const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
    const data = await res.json()
    const cards = data.data.tools
    displayCards(cards)
    // }
    // catch {
    //     console.log('error occur');
    // }
}


const displayCards = (cards) => {
    // console.log(cards);

    const sectionContainer = document.getElementById('card-container')
    sectionContainer.textContent = ''

    // if (cards.length>6) {

    // }
    cards = cards.slice(0, 6)

    cards.forEach(card => {
        console.log(card);

        const oneCard = document.createElement('div')
        oneCard.classList = `card w-full bg-base-100 p-6 shadow-xl`
        oneCard.innerHTML = `
                <figure class="h-full"><img class="w-full" src="${card.image}" alt="image" />
                </figure>
                <div class="mt-6">
                    <h2 class="card-title">Features</h2>
                    <ol class="list-decimal">
                        <li>${card.features[0] || ""}</li>
                        <li>${card.features[1] || ""}</li>
                        <li>${card.features[2] || ""}</li>
                        <li>${card.features[3] || ""}</li>
                        <li>${card.features[4] || ""}</li>
                    </ol>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
        `

        // const cardFeaturesArray = card.features
        // const ol = document.getElementsByTagName('ol')
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


loadData()