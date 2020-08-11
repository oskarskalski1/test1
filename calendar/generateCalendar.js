const generateCalendarForMonth =  (currentMonth, currentYear) => {
    const delayLoop = (i) => {
        setTimeout(() => {
            let container = document.createElement('div')
            container.classList.add('rectangle')

            let createNumberOfDay = document.createElement('span')
            createNumberOfDay.classList.add('number-of-day')
            
            if(i >= firstDayOfMonth && numOfDay <= numOfDays){
                createNumberOfDay.innerText = numOfDay
                container.appendChild(createNumberOfDay)

                if(numOfDay == getDate.getDate() && getDate.getMonth() == currentMonth){
                    container.classList.add('current-day')
                }

                let lowPriority = false
                let mediumPriority = false
                let hardPriority = false

                let getSelectElement = document.querySelector('#choose-month__select')
                let getNameOfMonth = getSelectElement.options[currentMonth].text
                let fullDate = `${numOfDay} ${getNameOfMonth} ${currentYear}`
                for(let j = 0 ; j < localStorage.length; j++){
                    let key = localStorage.key(j)
                        
                    if(key.startsWith(fullDate)){
                        let value = JSON.parse(localStorage.getItem(key))
                        if(value.priority == 'low')
                            lowPriority = true
                        else if(value.priority == 'medium')
                            mediumPriority = true
                        else if(value.priority == 'hard')
                            hardPriority = true
                    }
                }

                let createDivContainerForPriorities = document.createElement('div')
                createDivContainerForPriorities.classList.add('container-priorities')

                if(lowPriority){
                    let createLowPriorityElement = document.createElement('div')
                    createLowPriorityElement.classList.add('low-priority-element')
                    createDivContainerForPriorities.appendChild(createLowPriorityElement)
                }

                if(mediumPriority){
                    let createMediumPriorityElement = document.createElement('div')
                    createMediumPriorityElement.classList.add('medium-priority-element')
                    createDivContainerForPriorities.appendChild(createMediumPriorityElement)
                }

                if(hardPriority){
                    let createHardPriorityElement = document.createElement('div')
                    createHardPriorityElement.classList.add('hard-priority-element')
                    createDivContainerForPriorities.appendChild(createHardPriorityElement)
                }

                container.appendChild(createDivContainerForPriorities)

                numOfDay++  
            }else if(numOfDay > numOfDays){
                container.classList.add('not-current-month')
                container.classList.add('go-to-next-month')
                container.innerText = countNumberOfDaysForNextMonth

                container.addEventListener('click', () => {
                    let monthSelected = document.querySelector('#choose-month__select')
                    let yearSelected = document.querySelector('#choose-year__select')

                    if(monthSelected.value != 12){
                        monthSelected.dispatchEvent(new Event(monthSelected.value++))
                    }else{
                        yearSelected.dispatchEvent(new Event(yearSelected.value++))
                        monthSelected.dispatchEvent(new Event(monthSelected.value -= 11))
                    }
                    
                    generateCalendarForMonth(monthSelected.value, yearSelected.value)
                }, false)

                countNumberOfDaysForNextMonth++
            }else{
                container.classList.add('not-current-month')
                container.classList.add('go-to-previous-month')
                container.innerText = numOfDaysForLastMonth
                let currentDate = new Date()
                container.addEventListener('click', () => {
                    let monthSelected = document.querySelector('#choose-month__select')
                    let yearSelected = document.querySelector('#choose-year__select')

                    if(monthSelected.value != '1'){
                        monthSelected.dispatchEvent(new Event(monthSelected.value--))
                    }else if(currentDate.getFullYear() != yearSelected.value){
                        yearSelected.dispatchEvent(new Event(yearSelected.value--))
                        monthSelected.dispatchEvent(new Event(monthSelected.value += 2))
                    }
                    
                    generateCalendarForMonth(monthSelected.value, yearSelected.value)
                }, false)
                numOfDaysForLastMonth++
            }
            
            container.addEventListener('click', () => {
                let setDay = document.querySelector('.current-day__day-of-month')
                let setDate = document.querySelector('.current-day__date')

                let choosenDay = document.querySelector('.choosen-day')
                if(choosenDay){
                    choosenDay.classList.remove('choosen-day')
                    container.classList.add('choosen-day')
                }else{
                    container.classList.add('choosen-day')
                }
                
                let getMonthSelect = document.querySelector('#choose-month__select')
                let getYearSelect = document.querySelector('#choose-year__select')
                let getMonth = getMonthSelect.options[getMonthSelect.selectedIndex].text
                let getYear = getYearSelect.options[getYearSelect.selectedIndex].text
                
                setDay.innerHTML = createNumberOfDay.innerHTML
                setDate.innerHTML = `${getMonth} ${getYear}`
                retrieveData()
            }, false)

            calendarContainer.appendChild(container)


        }, 50 * i)
    }

    let calendarContainer = document.querySelector('.calendar__days-of-month')
    let getDate = new Date()
    currentMonth -= 1

    let firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    if(firstDayOfMonth == 0)
        firstDayOfMonth = 7

    let numOfDays = new Date(currentYear, currentMonth + 1, 0).getDate()
    let numOfDaysForLastMonth = new Date(currentYear, currentMonth, 0).getDate() + 2 - firstDayOfMonth

    let numOfDay = 1
    
    if(calendarContainer.hasChildNodes()){
        let calendarChildren = document.querySelector('.calendar__days-of-month')

        calendarChildren.querySelectorAll('*').forEach(n => n.remove());
    }

    console.log(currentMonth)

    let countNumberOfDaysForNextMonth = 1

    for(let i = 1; i <= 42; i++){
        delayLoop(i)

        
        if(numOfDays+firstDayOfMonth <= 36 && i == 35)
            break
        
    }

    
}