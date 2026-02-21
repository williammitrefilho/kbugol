class KBugol{
	static sendToAll(eventName){
		if(!KBugol.listeners[eventName])
			return

		KBugol.listeners[eventName].forEach((listener)=>{
			listener[eventName]?.()
		})
	}
	static addListener(eventName, listener){
		if(!KBugol.listeners[eventName])
			KBugol.listeners[eventName] = []

		KBugol.listeners[eventName].push(listener)
	}
	static removeListener(eventName, listener){
		if(!KBugol.listeners[eventName])
			return
		
		let listeners = KBugol.listeners[eventName]
		listeners.splice(listeners.indexOf(listener, 1))
	}

	send(eventName){
		if(KBugol.target){
			console.log(KBugol.target[eventName])
			KBugol.target[eventName]?.()
		}
		else
			KBugol.sendToAll(eventName)
	}

	constructor(){
		this.controllered = null
	}
	listen(){
		this.oldListener = window.onkeydown
		window.onkeydown = (e) => {
			this.parseListener(e)
		}
	}
	stopListening(){
		
		window.onkeydown = this.oldListener
	}
	parseListener(e){
		if(e.target.nodeName.toLowerCase() == "input")
			return

		e.preventDefault()
		const eventName = `key${e.key.toUpperCase()}Pressed`
		for(var category in KBugol.keys){
			let keys = KBugol.keys[category]
			if(keys.includes(e.key)){
				this[`${category}KeyPressed`]?.(e)
				break;
			}
		}
		this.send(eventName)
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
KBugol.keys = {
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
	],
	number:[
		"0","1","2","3","4","5","6","7","8","9",
	],
	letter:[
		"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
	],
	esc:[
		"Escape",
	],
}
KBugol.listeners = {}
