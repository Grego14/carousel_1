const d = document;

const carousel = d.querySelector(".carousel .carousel-images")

const buttons = d.querySelectorAll(".buttons-container .button")
const images = d.querySelectorAll(".carousel-images .image")
const dialog = d.querySelector(".dialog-image")
let actualCheckButton;

for (const button of buttons) {
	if(button.getAttribute("checked") !== null){
		actualCheckButton = button
	}
}

const mobileArrowLeft = d.getElementById("arrow-left")
const mobileArrowRight = d.getElementById("arrow-right")
const scrollWidth = carousel.querySelector(".image-item").offsetWidth + 19.2

if(carousel.scrollLeft < 750){
	mobileArrowLeft.classList.add("hide-btn")
}else if(carousel.scrollLeft >= carousel.scrollWidth){
	mobileArrowRight.classList.add("hide-btn")
}

carousel.addEventListener('scroll', e => {

	if(carousel.scrollLeft > 0){
		mobileArrowLeft.classList.remove("hide-btn")
	}else{
		mobileArrowLeft.classList.add("hide-btn")
	}

	if(carousel.scrollLeft === carousel.scrollWidth){
		mobileArrowRight.classList.add("hide-btn")
	}
})

d.addEventListener('click', e => {
	for (const button of buttons) {
		if(e.target === button){

			actualCheckButton.removeAttribute("checked")
			actualCheckButton = button
			button.setAttribute("checked", "")

			switch (e.target) {
				case buttons[0]:
					carousel.scrollLeft = 0
					break;
				case buttons[1]:
					carousel.scrollLeft = carousel.offsetWidth * 1
					break;
				case buttons[2]:
					carousel.scrollLeft = carousel.offsetWidth * 2
					break;
				case buttons[3]:
					carousel.scrollLeft = carousel.scrollWidth
					break;
			}
		}
	}

	if(e.target.matches("#arrow-left") || e.target.matches("#arrow-left *")){
		carousel.scrollLeft -= scrollWidth
	}else if(e.target.matches("#arrow-right") || e.target.matches("#arrow-right *")){
		carousel.scrollLeft += scrollWidth
	}

	for (const image of images) {
		if(!dialog.getAttribute("open") && e.target === image){
			dialog.querySelector("img").src = image.src
			dialog.showModal()
			dialog.classList.add("open")
			dialog.addEventListener('close', e => {
				dialog.classList.remove("open")
			})
		}
	}

	//if(dialog.getAttribute("open") && e.target !== dialog.querySelector("img")){
		//dialog.close()
	//}
})

setInterval(() => {
	console.log(carousel.offsetWidth)
}, 1000);
