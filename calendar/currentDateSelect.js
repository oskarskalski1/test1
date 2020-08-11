const setCurrentMonthAndYear = () => {
    const chooseMonthElement = document.querySelector('#choose-month__select')
    let currentDate = new Date()

    for(let i = 1; i<=currentDate.getMonth(); i++){
        chooseMonthElement.dispatchEvent(new Event(chooseMonthElement.value++))
    }
}