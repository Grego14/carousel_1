// shortcuts
const d = document;
const qs = (s) => d.querySelector(s);
const qsa = (s) => d.querySelectorAll(s);
const cAdd = (elem, cName)=> elem.classList.add(cName)
const cRev = (elem, cName)=> elem.classList.remove(cName)

const carousel = qs(".carousel .carousel-images")
const buttons = qsa(".buttons-container .button")
const images = qsa(".carousel-images .image")
const dialog = qs(".dialog-image")
const arrows = [ d.getElementById("arrow-left"), d.getElementById("arrow-right") ]
const imageWidth = qs(".carousel-images .image-item").offsetWidth
const scrollMax = carousel.scrollWidth - carousel.clientWidth // **ELEMENT.scrollLeftMax**

let actualCheckButton = buttons[0];
let openDialog = false

function checkArrowsVisibility(){
	if(carousel.scrollLeft > imageWidth){
		cRev(arrows[0], "hide-arrow")
	}else cAdd(arrows[0], "hide-arrow")

	if(carousel.scrollLeft === scrollMax){
		cAdd(arrows[1], "hide-arrow")
	}else cRev(arrows[1], "hide-arrow")
	console.log(carousel.scrollLeft)
}

function arrowsHandler(e){
	if(e.target.matches("#arrow-left") || e.target.matches("#arrow-left *")){
		carousel.scrollLeft -= imageWidth
	}else if(e.target.matches("#arrow-right") || e.target.matches("#arrow-right *")) carousel.scrollLeft += imageWidth 
}

const dialogHandler = (e) => {
		const dialogImg = dialog.querySelector("img")
		if(!openDialog){
		  dialogImg.src = e.target.src
			dialog.showModal()
			cAdd(dialog, "open")
			openDialog = true

			dialog.addEventListener('close', e => {
			cRev(dialog, "open")
				openDialog = false
			})

			dialog.addEventListener('click', e => { if(e.target !== dialogImg && openDialog) dialog.close() })
		}
}

function buttonsHandler(e){
			actualCheckButton.removeAttribute("checked")
			actualCheckButton = e.target
			e.target.setAttribute("checked", "")

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

d.addEventListener('DOMContentLoaded', e => {
	if(carousel.scrollLeft < imageWidth) cAdd(arrows[0], "hide-arrow")
	if(carousel.scrollLeft === scrollMax) cAdd(arrows[1], "hide-arrow")

	carousel.addEventListener('scroll', e => checkArrowsVisibility(e))
})

d.addEventListener('pointerdown', e => {
	arrowsHandler(e)
	for (const image of images) {
		if(e.target === image) dialogHandler(e)
	}

	for(const button of buttons){
		if(e.target === button){
			buttonsHandler(e)
		}
	}
})
