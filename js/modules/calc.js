function calc() {
    // Калькулятор

    const calculatingResult = document.querySelector('.calculating__result span')




    let sex,
        height,
        weight,
        age,
        ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex')
    } else {
        sex = 'female'
        localStorage.setItem('sex', 'female')
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio')
    } else {
        ratio = 1.375
        localStorage.setItem('ratio', 1.375)
    }

    function initLocalSettings(selector, activeClass) {
        const elem = document.querySelectorAll(selector)

        elem.forEach(item => {
            item.classList.remove(activeClass)

            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add(activeClass)
            }

            if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add(activeClass)
            }
        })

    }


    initLocalSettings('#gender div', 'calculating__choose-item_active')
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active')


    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            calculatingResult.textContent = '__';
            return;
        }

        if (sex === 'female') {
            calculatingResult.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio)

        } else {
            calculatingResult.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio)
        }


    }



    calcTotal();

    function getStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector)

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                let target = e.target

                if (target.getAttribute('data-ratio')) {
                    ratio = +target.getAttribute('data-ratio')
                    localStorage.setItem('ratio', +target.getAttribute('data-ratio'))
                } else {
                    sex = target.getAttribute('id')
                    localStorage.setItem('sex', target.getAttribute('id'))
                }


                elements.forEach(item => {
                    item.classList.remove(activeClass)
                })

                target.classList.add(activeClass)


                calcTotal()
            })
        })
    }

    getStaticInfo('#gender div', 'calculating__choose-item_active')
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active')


    function getDynamicInfo(selector) {
        const input = document.querySelector(selector)

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red'
            } else {
                input.style.border = 'none'
            }


            switch (input.getAttribute('id')) {
                case "height":
                    height = +input.value
                    break;
                case "weight":
                    weight = +input.value
                    break;
                case "age":
                    age = +input.value
                    break;
            }

            calcTotal()
        })


    }

    getDynamicInfo('#height')
    getDynamicInfo('#weight')
    getDynamicInfo('#age')
}


export default  calc;