//Code has been written by Oskar Skalski
//github 

const table = []
const getElementsByDataId = []

const countElementsInContainer = document.querySelector('.container').childElementCount

for (let i = 1; i <= countElementsInContainer; i++) {
    table.push(i)
    getElementsByDataId.push(`[data-id*="${i}"]`)
}

const test3 = []
const test4 = []

for (let i = 1; i < Math.floor((countElementsInContainer / 2) + 1); i++)
    test3.push(i)
for (let i = Math.floor((countElementsInContainer / 2) + 1); i > 0; i--)
    test3.push(i)

const test5 = []
const test6 = []

for (let i = Math.floor((countElementsInContainer / 2) + 1); i > 0; i--)
    test5.push(i)
for (let i = 2; i <= Math.floor((countElementsInContainer / 2) + 1); i++)
    test5.push(i)

    console.log(test5)

const sliderVersions = version => {
    let tableOfSlider = []
    const z = Math.floor(((version) / 2)) * 200

    for (let i = z * -1; i <= z; i += 200) {
        tableOfSlider.push(i)
    }

    return [...tableOfSlider]
}

const getsliderSettings = sliderVersions(countElementsInContainer)

console.log(getsliderSettings)

const transitions = getsliderSettings
const transitionsHelper = []
for (let i = 0; i < countElementsInContainer; i++) {
    document.querySelector(`${getElementsByDataId[i]}`).style = `
        left:50%;
        z-index:${test3[i]};
        transform:translateX(calc(-50% + ${ transitions[i]}px)) scale(${(2 / test5[i])});
    `
}

const id = () => {
    for (let i = transitions.length - 1; i < transitions.length; i++) {
        transitionsHelper.push(transitions[i])
        test4.push(test3[i])
        test6.push(test5[i])
    }

    for (let i = 0; i < transitions.length - 1; i++) {
        transitionsHelper.push(transitions[i])
        test4.push(test3[i])
        test6.push(test5[i])
    }

    test3.length = 0
    test5.length = 0
    transitions.length = 0
    for (let i = 0; i < transitionsHelper.length; i++) {
        transitions.push(transitionsHelper[i])
        test3.push(test4[i])
        test5.push(test6[i])
    }
    transitionsHelper.length = 0
    test4.length = 0
    test6.length = 0

    for (let i in table) {
        if (table[i] == table.length)
            table[i] = 1
        else
            table[i] += 1
    }
    for (let i in table) {
        let getElement = document.querySelector(`${getElementsByDataId[i]}`)
        const test = parseInt(i) + 1 < countElementsInContainer ? transitions[parseInt(i) + 1] : transitions[0]

        getElement.style = `
        z-index:${test3[i]};
            left:50%;
            transform:translateX(calc(-50% + ${ transitions[i]}px)) scale(${2 / test5[i]});
            transition: all ease 0.5s;
        `
    }
}

function intervalSettings(callback, delay) {
    let timerId, state = 0

    this.pause = () => {
        if (state != 1)
            return

        window.clearInterval(timerId);
        state = 2;
    }

    this.resume = () => {
        if (state != 2)
            return

        state = 3
        window.setTimeout(this.timeoutCallback, 1000)
    }

    this.timeoutCallback = () => {
        if (state != 3)
            return

        timerId = window.setInterval(callback, delay)
        state = 1
    }

    timerId = window.setInterval(callback, delay)
    state = 1
}

const newInterval = new intervalSettings(id, 3000)

document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === 'visible') {
        newInterval.resume()
    } else {
        newInterval.pause()
    }
})

document.querySelector('.btn1').addEventListener('click', () => {
    newInterval.pause()
}, false)

document.querySelector('.btn2').addEventListener('click', () => {
    newInterval.resume()
}, false)