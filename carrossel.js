// const imgs = document.getElementById("img")
// const img = document.querySelectorAll("#img img")

// let idx = 0

// function carrossel(){
//     idx++

//     if (idx > img.length - 1){
//         idx = 0
//     }

//     imgs.style.opacity = 1
// }

// setInterval(container_carrossel, 2000);

// Carrossel de imagens

const slider = document.querySelectorAll('.slider')
const btnPrev = document.getElementById('prev-button')
const btnNext = document.getElementById('next-button')

let currentSlide = 0

function hideSlider(){
    slider.forEach(item => item.classList.remove('on'))
}

function showSlider(){
    slider[currentSlide].classList.add('on')
}

function nextSlider(){
    hideSlider()

    if(currentSlide === slider.length - 1){
        currentSlide = 0
    }
    else{
        currentSlide++
    }
    showSlider()
}

function prevSlider(){
    hideSlider()

    if(currentSlide === 0){
        currentSlide = slider.length - 1
    }
    else{
        currentSlide--
    }
    showSlider()
}

btnNext.addEventListener('click', nextSlider)
btnPrev.addEventListener('click', prevSlider)

console.log(slider)