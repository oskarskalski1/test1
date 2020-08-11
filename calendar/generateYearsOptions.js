const yearsGenerator = () => {
    let chooseYearElement = document.querySelector('#choose-year__select')
    let currentYear = new Date().getFullYear()

    for(let i = currentYear; i <= currentYear + 30; i++){
        let createOptionElement = document.createElement('option')
        createOptionElement.value = i
        createOptionElement.textContent = i

        chooseYearElement.appendChild(createOptionElement);
    }
}