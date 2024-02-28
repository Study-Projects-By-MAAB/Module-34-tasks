/* All data: https://openapi.programming-hero.com/api/ai/tools

Single data details: https://openapi.programming-hero.com/api/ai/tool/${id}

Single data Example: https://openapi.programming-hero.com/api/ai/tool/01 */

const loadData = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/ai/tools')
        const data = await res.json()
        const cards = data.data.tools
        displayCards(cards)
    }
    catch {
        console.log('error occur');
    }
}

const displayCards = (cards) => {
    // console.log(cards);
    cards.forEach(card => {
        console.log(card);

        const oneCard = document.getElementById('div')
        oneCard.

    })
}


loadData()