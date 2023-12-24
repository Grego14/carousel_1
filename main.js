const d = document;

const carousel = d.querySelector(".carousel .carousel-images")
let carouselSLeft = carousel.scrollLeft
const buttons = d.querySelectorAll(".buttons-container .button")
const images = d.querySelectorAll(".carousel-images .image")
const dialog = d.querySelector(".dialog-image")
let actualCheckButton = buttons[0];

const arrows = [ d.getElementById("arrow-left"), d.getElementById("arrow-right") ]
const imageWidth = carousel.querySelector(".image-item").offsetWidth
const scrollMax = carousel.scrollWidth - carousel.clientWidth // **ELEMENT.scrollLeftMax**

const cAdd = (elem, cName)=> elem.classList.add(cName)
const cRev = (elem, cName)=> elem.classList.remove(cName)

d.addEventListener('DOMContentLoaded', e => {
	if(carouselSLeft < imageWidth) cAdd(arrows[0], "hide-arrow")
	if(carouselSLeft === scrollMax) cAdd(arrows[1], "hide-arrow")

	carousel.addEventListener('scroll', e => {
		carouselSLeft = carousel.scrollLeft

		if(carouselSLeft > imageWidth){
			cRev(arrows[0], "hide-arrow")
		}else cAdd(arrows[0], "hide-arrow")

		if(carouselSLeft === scrollMax){
			cAdd(arrows[1], "hide-arrow")
		}else cRev(arrows[1], "hide-arrow")
		})
})

const imageEventHandler = (e) => {

	if(e.target.matches("#arrow-left") || e.target.matches("#arrow-left *")){
		carousel.scrollLeft -= imageWidth
	}else if(e.target.matches("#arrow-right") || e.target.matches("#arrow-right *")) carousel.scrollLeft += imageWidth 

	for (const image of images) {
		if(!dialog.getAttribute("open") && e.target === image){
			dialog.querySelector("img").src = image.src
			dialog.showModal()
			cAdd(dialog, "open")

				dialog.addEventListener('click', e => {
					if(e.target !== dialog.querySelector("img")) dialog.close()
				})

			dialog.addEventListener('close', e => cRev(dialog, "open"))
		}
	}
}


d.addEventListener('touchstart', e => imageEventHandler(e))

d.addEventListener('click', e => {

	imageEventHandler(e)

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
					if(!buttons[4]){
						carousel.scrollLeft = scrollMax
					}else carousel.scrollLeft = carousel.offsetWidth * 3
					break;
				case buttons[4]:
					carousel.scrollLeft = carousel.offsetWidth * 4
					break;
				case buttons[5]:
					carousel.scrollLeft = scrollMax
					break;
			}
		}
	}


})
