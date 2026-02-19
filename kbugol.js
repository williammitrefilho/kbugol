class KBugol{
	constructor(){
		this.controllered = null
	}
	
	arrowKeyPressed(e){
	}

	tabKeyPressed(e){
	}

	enterKeyPressed(e){
	}
	
	letterKeyPressed(e){
	}

	numberKeyPressed(e){
	}
	
	listen(){
		this.oldListener = window.onkeydown
		window.onkeydown = (e) => {
			this.findListenerFor(e)
		}
	}
	stopListening(){
		
		window.onkeydown = this.oldListener
	}
	findListenerFor(e){
		if(e.target.nodeName == "input")
			return
		for(var category in KBugol.codes){
			let codes = KBugol.codes[category]
			if(codes.includes(e.code))
				return this[`${category}KeyPressed`](e)
		}
	}
}

KBugol.codes = {
	arrow:[
		"ArrowUp",
		"ArrowDown",
		"ArrowLeft",
		"ArrowRight",
	],
	tab:[
		"Tab",
	],
	enter:[
		"Enter",
		"NumpadEnter",
	],
	number:[
		"Numpad0","Numpad1","Numpad2","Numpad3","Numpad4","Numpad5","Numpad6","Numpad7","Numpad8","Numpad9",
		"Digit0","Digit1","Digit2","Digit3","Digit4","Digit5","Digit6","Digit7","Digit8","Digit9",
	],
	letter:[
		"KeyA","KeyB","KeyC","KeyD","KeyE","KeyF","KeyG","KeyH","KeyI","KeyJ","KeyK","KeyL","KeyM","KeyN","KeyO","KeyP","KeyQ","KeyR","KeyS","KeyT","KeyU","KeyV","KeyW","KeyX","KeyY","KeyZ",
	],
}
