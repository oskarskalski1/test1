const inspectDay = (day, month, year) => {
    let dayInput = document.querySelector('.current-day__day-of-month')
    let dateInput = document.querySelector('.current-day__date')
    let namesOfMonths = document.querySelector(`#choose-month__select option:nth-of-type(${month})`).innerHTML

    console.log(namesOfMonths)

    dayInput.innerHTML = day
    dateInput.innerHTML = `${namesOfMonths} ${year}`

}