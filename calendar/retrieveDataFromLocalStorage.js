const retrieveData = () => {
    let getTasksElement = document.querySelector('.todos__tasks')
    getTasksElement.querySelectorAll('*').forEach(n => n.remove())

    if (localStorage.length == 0){
        
        let createHeadingElement = document.createElement('h3')

        createHeadingElement.classList.add('tasks__not-found-tasks-heading')
        createHeadingElement.innerHTML = 'There\'s no tasks for this day!'
        getTasksElement.appendChild(createHeadingElement)
    }else{
        let getDay = document.querySelector('.current-day__day-of-month')
        let getDate = document.querySelector('.current-day__date')
        let hasFoundData = false
        let fullDate = `${getDay.innerHTML} ${getDate.innerHTML}`
        console.log(fullDate)
        for(let i = 0; i<localStorage.length; i++){
            let key = localStorage.key(i)
            if(key.startsWith(fullDate)){
                let value = JSON.parse(localStorage.getItem(key))

                let createTaskElement = document.createElement('div')
                let createHeadingElement = document.createElement('h3')
                let createContentElement = document.createElement('p')
                let createHoursElement = document.createElement('p')

                createTaskElement.classList.add('tasks_task')
                createTaskElement.classList.add(`${value.priority}-priority`)
                createHeadingElement.classList.add('task__heading')
                createContentElement.classList.add('task__content')
                createHoursElement.classList.add('task__hours')

                createTaskElement.appendChild(createHeadingElement)
                createTaskElement.appendChild(createContentElement)
                createTaskElement.appendChild(createHoursElement)

                
                createHeadingElement.innerHTML = value.title
                createContentElement.innerHTML = value.content

                setInterval(() => {
                    let currentDay = new Date()
                    let targetDate = new Date(`${fullDate} ${value.time}:00`)
                    let dateDifference = targetDate - currentDay
                    let dateDifferenceToMinutes = dateDifference / 1000 / 60

                    let days = 0
                    let hours = Math.floor(dateDifferenceToMinutes / 60)
                    let minutes = Math.floor(dateDifferenceToMinutes - (hours * 60))
                    let seconds = Math.floor((dateDifference / 1000) - (hours * 60 * 60 + minutes * 60))
                    let months = 0
                    
                    if(hours / 24 > 1){
                        days = Math.floor(hours / 24)
                        hours = Math.floor(hours - 24 * days)
                    }
                    
                    if(days / 30 >= 1){
                        months = Math.floor(days / 30)
                        days = Math.floor(days - 30 * months) 
                    }

                    let fixedHours = hours < 10 ? '0' + hours : hours
                    let fixedMinutes = minutes < 10 ? '0' + minutes : minutes
                    let fixedSeconds = seconds < 10 ? '0' + seconds : seconds

                    let timeLeftToEnd = (dateDifference < 0) ? 0 : 
                                        `${months} months, ${days} days, ${fixedHours}:${fixedMinutes}:${fixedSeconds}`
                                        
                    createHoursElement.innerHTML = `Deadline ${value.time}, time left: ${timeLeftToEnd}`
                
                }, 1000)


                getTasksElement.appendChild(createTaskElement)

                hasFoundData = true
                
            }else{
            }
        }
        if(!hasFoundData){
            let createHeadingElement = document.createElement('h3')

            createHeadingElement.classList.add('tasks__not-found-tasks-heading')
            createHeadingElement.innerHTML = 'There\'s no tasks for this day!'
            getTasksElement.appendChild(createHeadingElement)
        }
    }


}