const init = () => {
    let currentDate = new Date()
    yearsGenerator()
    generateCalendarForMonth(currentDate.getMonth() + 1, currentDate.getFullYear())
    changeMonthsAndYearsEvents()
    setCurrentMonthAndYear()
    inspectDay(currentDate.getDate(), currentDate.getMonth() + 1, currentDate.getFullYear())
    retrieveData()
}

init();