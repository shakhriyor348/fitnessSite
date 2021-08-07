import { closeModal, openModal} from "./modal";
import {postData} from '../services/services';


function forms(formSelector, modalTimerId) {
    // FORMS



    const forms = document.querySelectorAll(formSelector)


    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }


    forms.forEach(item => {
        bindPostData(item)
    })



  

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault()

            const statusMessage = document.createElement('img')

            statusMessage.src = message.loading
            statusMessage.style.cssText = `
                diplay: block;
                margin: 0 auto;
            `
            // form.append(statusMessage)
            form.insertAdjacentElement('afterend', statusMessage)


            // const request = new XMLHttpRequest()

            // request.open('POST', 'server.php') /* Создает новый запрос */



            // request.setRequestHeader('Content-type', 'application/json') /* Для JSON */



            // console.log(formData);

            // При верстке всегда нужно в input указывать аттрибут name чтобы FormData() смог взять его value






            // request.send(formData);


            const formData = new FormData(form)

            const json = JSON.stringify(Object.fromEntries(formData.entries()))





            postData('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success)
                    statusMessage.remove()
                }).catch(() => {
                    showThanksModal(message.failure)
                }).finally(() => {
                    form.reset()
                })
        })
    }


    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog')

        prevModalDialog.classList.add('hide')

        openModal('.modal', modalTimerId)

        const thanksModal = document.createElement('div')

        thanksModal.classList.add('modal__dialog')
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>
                ×
                </div>
                <div class="modal__title">
                    ${message}
                </div>
            </div>
        `

        document.querySelector('.modal').append(thanksModal)

        setTimeout(() => {
            thanksModal.remove()
            prevModalDialog.classList.add('show')
            prevModalDialog.classList.remove('hide')
            closeModal('.modal')
        }, 4000)
    }

    fetch('http://localhost:3000/menu')
        .then(data => data.json())
        .then(res => console.log(res))
}


export default forms;