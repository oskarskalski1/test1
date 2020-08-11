const changeMonthsAndYearsEvents = () => {
    let rightArrowBtn = document.querySelector('.right-direction-arrow')
    let leftArrowBtn = document.querySelector('.left-direction-arrow')

    let monthSelected = document.querySelector('#choose-month__select')
    let yearSelected = document.querySelector('#choose-year__select')

    let currentDate = new Date()

    let tasksSettings = document.querySelector('.current-day__tasks-settings')
    let clickState = 1

    monthSelected.addEventListener('change', () => {
        let getMonthSelected = monthSelected.options[monthSelected.selectedIndex].value
        let getYearSelected = yearSelected.options[yearSelected.selectedIndex].text
        generateCalendarForMonth(getMonthSelected, getYearSelected)
    }, false)
    yearSelected.addEventListener('change', () => {
        let getMonthSelected = monthSelected.options[monthSelected.selectedIndex].value
        let getYearSelected = yearSelected.options[yearSelected.selectedIndex].text
        generateCalendarForMonth(getMonthSelected, getYearSelected)
    }, false)

    rightArrowBtn.addEventListener('click', () => {
        if(monthSelected.value != 12){
            monthSelected.dispatchEvent(new Event(monthSelected.value++))
        }else{
            yearSelected.dispatchEvent(new Event(yearSelected.value++))
            monthSelected.dispatchEvent(new Event(monthSelected.value -= 11))
        }

        generateCalendarForMonth(monthSelected.value, yearSelected.value)
    }, false)

    leftArrowBtn.addEventListener('click', () => {
        if(monthSelected.value != '1'){
            monthSelected.dispatchEvent(new Event(monthSelected.value--))
        }else if(currentDate.getFullYear() != yearSelected.value){
            yearSelected.dispatchEvent(new Event(yearSelected.value--))
            monthSelected.dispatchEvent(new Event(monthSelected.value += 2))
        }
        
        generateCalendarForMonth(monthSelected.value, yearSelected.value)
    }, false)

    

    tasksSettings.addEventListener('click', () => {
        let test = document.querySelector('.calendar__current-day')
        let transformLines = document.querySelector('.tasks-settings__transform-lines')
        if(clickState == 1){
            let createDiv = document.createElement('div')
            let createHeading = document.createElement('h3')
            let createHeadingElement = document.createElement('input')
            let createTextAreaContent = document.createElement('textarea')
            let createTimeElement = document.createElement('input')
            let createSelectElement = document.createElement('select')
            let createErrorElement = document.createElement('div')
            let createAddTaskBtn = document.createElement('button')
            let options = ['low', 'medium', 'hard']

            tasksSettings.classList.toggle('change-bg-color')

            createHeadingElement.type = 'text'
            createTimeElement.type = 'time'
            createTimeElement.required = true

            createHeading.innerText = 'Add new task!'
            createAddTaskBtn.innerText = 'Add task!'

            createHeadingElement.placeholder = 'Write title here...'
            createTextAreaContent.placeholder = 'Write content of the task here...'
            
            createTextAreaContent.maxLength = 100   

            for(let i in options){
                let createOption = document.createElement('option')
                createOption.value = options[i]
                createOption.innerText = `${options[i]} priority`

                createSelectElement.appendChild(createOption)
            }

            createDiv.classList.add('current-day__add-tasks')
            createDiv.classList.add('testz')
            createHeading.classList.add('add-tasks__heading')
            createHeadingElement.classList.add('add-tasks__title-task')
            createTextAreaContent.classList.add('add-tasks__content-task')
            createTimeElement.classList.add('add-tasks__time-task')
            createSelectElement.classList.add('add-tasks__priority-task')
            createErrorElement.classList.add('add_tasks__error-element')
            createAddTaskBtn.classList.add('add-tasks__add-task')
            
            transformLines.classList.add('open-settings')


            createAddTaskBtn.addEventListener('click', () => {
                let createWarmingElement = document.createElement('div')
                if(tasksHandler()){
                    createWarmingElement.innerHTML = 'Task added!'
                    createWarmingElement.classList.add('add-tasks__complete')
                }else{
                    createWarmingElement.innerHTML = 'Complete the title to add the task!'
                    createWarmingElement.classList.add('add-tasks__failed')
                }
                createErrorElement.appendChild(createWarmingElement)

                setTimeout(() => {
                    createErrorElement.removeChild(createWarmingElement)
                }, 1000) 
            }, false)

            test.appendChild(createDiv)
            createDiv.appendChild(createHeading)
            createDiv.appendChild(createHeadingElement)
            createDiv.appendChild(createTextAreaContent)
            createDiv.appendChild(createTimeElement)
            createDiv.appendChild(createSelectElement)
            createDiv.appendChild(createErrorElement)
            createDiv.appendChild(createAddTaskBtn)

            clickState++
        }else{
            let testElement = document.querySelector('.current-day__add-tasks')

            testElement.classList.remove('testz')
            testElement.classList.add('test2')
            transformLines.classList.add('close-settings')
            setTimeout(() => {
                test.removeChild(testElement)
                transformLines.classList.remove('open-settings')
                transformLines.classList.remove('close-settings')
            }, 2000)


            clickState--
        }
    }, false)

    const tasksHandler = (errorHandler) => {
        let getTitleElement = document.querySelector('.add-tasks__title-task')
            
            if(getTitleElement.value.length != 0){
                let getDayOfMonth = document.querySelector('.current-day__day-of-month')
                let getDate = document.querySelector('.current-day__date')
                let getTimeElement = document.querySelector('.add-tasks__time-task')
                let getContentElement = document.querySelector('.add-tasks__content-task')
                let getPriorityElement = document.querySelector('.add-tasks__priority-task')

                let selectedOption = getPriorityElement
                                    .options[getPriorityElement.selectedIndex]
                                    .text
                                    .replace(/ /g, '-')
                
                let settings = {
                    title: getTitleElement.value,
                    content: getContentElement.value,
                    time: getTimeElement.value,
                    priority: getPriorityElement.value
                }

                window.localStorage
                .setItem(`${getDayOfMonth.innerHTML} ${getDate.innerHTML} ${new Date().getTime()}`
                    , JSON.stringify(settings));

                
                let getTasksElement = document.querySelector('.todos__tasks')
                getTasksElement.querySelectorAll('*').forEach(n => n.remove());

                retrieveData()
                getTitleElement.value = ''

                let testzx = document.querySelector('.test123')
                
                if(testzx)
                    testzx.classList.remove('test123')
                    
                return true
            }else{
                getTitleElement.classList.add('test123')

                return false
            }
    }

}