document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('a').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault()

            const href = this.getAttribute('href').substring(1)
            const scrollTarget = document.getElementById(href)

            const topOffset = 75
            const elementPosition = scrollTarget.
            getBoundingClientRect().top
            const offsetPosition = elementPosition - topOffset

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            })
        })
    })

    document.addEventListener('mousemove', parallax)

    function parallax (e) {
        this.querySelectorAll('.about__benefits').forEach(item => {
            const speed = item.getAttribute('data-speed')
            
            let x = (window.innerWidth - e.pageX*speed) / 250
            let y = (window.innerHeight - e.pageY*speed) / 250
            
            item.style.transform = `translateX(${x}px) translateY(${y}px)`
        })
    }

    const btns         = document.querySelectorAll('[data-modal-btn]')
    const modalWrapper = document.querySelector('.modal__wrapper')
    const modalItem    = document.querySelectorAll('[data-modal-item]')
    
    btns.forEach(item => {
        item.addEventListener('click', (e) => {
            let btn = e.currentTarget.getAttribute('data-modal-btn')

            modalItem.forEach(item => {
                item.classList.remove('modal__item--open')
            })

            document.querySelector(`[data-modal-item='${btn}']`).classList.add('modal__item--open')
            modalWrapper.classList.add('modal__wrapper--open')
            
            disableScroll()
        })
    })
    
    modalWrapper.addEventListener('click', (e) => {
        if (e.target == modalWrapper) {
            modalWrapper.classList.remove('modal__wrapper--open')

            modalItem.forEach(item => {
                item.classList.remove('modal__item--open')
            })

            enableScroll()
        }
    })

    let disableScroll = function () {
        let pagePosition = window.scrollY
        document.body.classList.add('disable-scroll')
        document.body.dataset.position = pagePosition
        document.body.style.top = -pagePosition + 'px'
        document.body.style.paddingRight = '18px'
    }
    
    let enableScroll = function () {
        let pagePosition = parseInt(document.body.dataset.position, 10)
        document.body.style.top = 'auto'
        document.body.style.scrollBehavior = 'auto'
        document.body.style.paddingRight = '0'
        document.body.classList.remove('disable-scroll')
        window.scroll({top: pagePosition, left: 0})
        document.body.removeAttribute('data-position')
    }

    new WOW().init()

})