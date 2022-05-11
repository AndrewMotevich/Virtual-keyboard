const keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
    },

    properties: {
        value: "",
        capsLock: false,
        shift: false,
        ctrl: false,
        alt: false
    },


    init_textarea() {
        const div = document.createElement("div");
        const textArea = document.createElement("textarea");
        textArea.setAttribute("style", "width: 60%; height: 300px; position: relative; left: 20%");
        textArea.classList.add('use-keyboard-input');
        div.textContent = "Ctrl + Alt to change language";
        document.body.appendChild(textArea);
        document.body.appendChild(div);
        div.style = "text-align: center";

    },

    init() {
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        this.elements.main.classList.add('keyboard');
        this.elements.keysContainer.classList.add('keyboard__keys');
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    changeableKeys: {
    keyChangeableBase: ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    keyChangeableEng: ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+"],
    keyChangeableRus: ["Ё", "!", "\"", "№", ";", "%", ":", "?", "*", "(", ")", "_", "+"],
    keyTemp: []
    },

    _createKeys() {
        function changeLanguage() {
            keyLayout3 = keyLayout;
            keyLayout = keyLayout2;
            keyLayout2 = keyLayout3;
            keyboard.changeableKeys.keyTemp = keyboard.changeableKeys.keyChangeableEng;
            keyboard.changeableKeys.keyChangeableEng = keyboard.changeableKeys.keyChangeableRus;
            keyboard.changeableKeys.keyChangeableRus = keyboard.changeableKeys.keyTemp;
        }


        const fragment = document.createDocumentFragment();
        let keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "Up", "Shift",
            "ln", "Ctrl", "Win", "Alt", "space", "Alt", "Win", "Ctrl", "Left", "Down", "Right"
        ];

        let keyLayout2 = [
            "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace",
            "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "\\", "enter",
            "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Up", "Shift",
            "ln", "Ctrl", "Win", "Alt", "space", "Alt", "Win", "Ctrl", "Left", "Down", "Right"
        ];

        let keyLayout3 = [];

        if (variable == 'true') {
            changeLanguage();
        }

        if (changeLan == true) {
            changeLanguage();
        }
        const createIconHTML = (icon_name) => {
            return `<span>${icon_name}</span>`
        }

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "]", "enter", "Shift", "Right"].indexOf(key) !== -1;

            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("BACKSPACE");
                    keyElement.id = "backspace";

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    document.addEventListener("keydown", (event) => {
                        if (event.code == `Backspace`) {
                            document.body.querySelector(`#backspace`).classList.add("active");
                            console.log('hello');
                        }
                    })
                    document.addEventListener("keyup", (event) => {
                        if (event.code == `Backspace`) {
                            document.body.querySelector(`#backspace`).classList.remove("active");
                        }
                    })

                    break;

                case "Tab":
                keyElement.classList.add("keyboard__key--wide");
                keyElement.innerHTML = createIconHTML("TAB");
                keyElement.id = "tab";

                keyElement.addEventListener("click", () => {
                    this.properties.value += "    ";
                    this._triggerEvent("oninput");
                });

                document.addEventListener("keydown", (event) => {
                    if (event.code == `Tab`) {
                        document.body.querySelector(`#tab`).classList.add("active");
                        console.log('hello');
                        this.properties.value += "    ";
                        this._triggerEvent("oninput");
                    }
                })
                document.addEventListener("keyup", (event) => {
                    if (event.code == `Tab`) {
                        document.body.querySelector(`#tab`).classList.remove("active");
                    }
                })

                break;

                case "Ctrl":
                keyElement.classList.add("keyboard__key");
                keyElement.innerHTML = createIconHTML("Ctrl");
                keyElement.id = "Ctrl";

                keyElement.addEventListener("click", () => {
                    this._toggleCtrl()
                    if (keyboard.properties.alt == true && keyboard.properties.ctrl == true){
                        changeLan = !changeLan;
                            sessionStorage.setItem('rus', `true`);
                            keyboard.init();
                            if (variable === 'true') {
                                sessionStorage.setItem('rus', `false`);
                            }
                            alert ("I dont know how to switch the Operation System keyboard\nPlease, switch the right Operation System keyboard\nP.S. IT needs for highlights")
                            location.reload();
                    }
                });

                document.addEventListener("keydown", (event) => {
                    if (event.code == `ControlLeft` || event.code == `ControlRight`) {
                        document.body.querySelector(`#Ctrl`).classList.add("active");
                        console.log('hello');
                        
                    }
                })
                document.addEventListener("keyup", (event) => {
                    if (event.code == `ControlLeft` || event.code == `ControlRight`) {
                        document.body.querySelector(`#Ctrl`).classList.remove("active");
                    }
                })

                break;
                case "Win":
                keyElement.classList.add("keyboard__key");
                keyElement.innerHTML = createIconHTML("Win");
                keyElement.id = "Win";

                break;
                case "Alt":
                keyElement.classList.add("keyboard__key");
                keyElement.innerHTML = createIconHTML("Alt");
                keyElement.id = "Alt";

                keyElement.addEventListener("click", () => {
                    this._toggleAlt()
                    if (keyboard.properties.alt == true && keyboard.properties.ctrl == true){
                        changeLan = !changeLan;
                            sessionStorage.setItem('rus', `true`);
                            keyboard.init();
                            if (variable === 'true') {
                                sessionStorage.setItem('rus', `false`);
                            }
                            alert ("I dont know how to switch the Operation System keyboard\nPlease, switch the right Operation System keyboard\nP.S. IT needs for highlights")
                            location.reload();
                    }
                });

                document.addEventListener("keydown", (event) => {
                    if (event.code == `AltLeft` || event.code == `AltRight`) {
                        document.body.querySelector(`#Alt`).classList.add("active");
                        console.log('hello');
                    }
                })
                document.addEventListener("keyup", (event) => {
                    if (event.code == `AltLeft` || event.code == `AltRight`) {
                        document.body.querySelector(`#Alt`).classList.remove("active");
                    }
                })

                break;
                case "Up":
                keyElement.classList.add("keyboard__key");
                keyElement.innerHTML = createIconHTML("Up");
                keyElement.id = "Up";

                document.addEventListener("keydown", (event) => {
                    if (event.code == `ArrowUp`) {
                        document.body.querySelector(`#Up`).classList.add("active");
                        console.log('hello');
                    }
                })
                document.addEventListener("keyup", (event) => {
                    if (event.code == `ArrowUp`) {
                        document.body.querySelector(`#Up`).classList.remove("active");
                    }
                })

                break;
                case "Left":
                keyElement.classList.add("keyboard__key");
                keyElement.innerHTML = createIconHTML("Left");
                keyElement.id = "Left";

                document.addEventListener("keydown", (event) => {
                    if (event.code == `ArrowLeft`) {
                        document.body.querySelector(`#Left`).classList.add("active");
                        console.log('hello');
                    }
                })
                document.addEventListener("keyup", (event) => {
                    if (event.code == `ArrowLeft`) {
                        document.body.querySelector(`#Left`).classList.remove("active");
                    }
                })

                break;
                case "Right":
                keyElement.classList.add("keyboard__key");
                keyElement.innerHTML = createIconHTML("Right");
                keyElement.id = "Right";

                document.addEventListener("keydown", (event) => {
                    if (event.code == `ArrowRight`) {
                        document.body.querySelector(`#Right`).classList.add("active");
                        console.log('hello');
                    }
                })
                document.addEventListener("keyup", (event) => {
                    if (event.code == `ArrowRight`) {
                        document.body.querySelector(`#Right`).classList.remove("active");
                    }
                })

                break;
                case "Down":
                keyElement.classList.add("keyboard__key");
                keyElement.innerHTML = createIconHTML("Down");
                keyElement.id = "Down";

                document.addEventListener("keydown", (event) => {
                    if (event.code == `ArrowDown`) {
                        document.body.querySelector(`#Down`).classList.add("active");
                        console.log('hello');
                    }
                })
                document.addEventListener("keyup", (event) => {
                    if (event.code == `ArrowDown`) {
                        document.body.querySelector(`#Down`).classList.remove("active");
                    }
                })

                break;

                case "ln":
                keyElement.classList.add("keyboard__key");
                keyElement.innerHTML = createIconHTML("LN");

                keyElement.addEventListener("click", () => {
                    this.properties.value += "    ";
                    this._triggerEvent("oninput");
                });

                break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("CAPS LOCK");
                    keyElement.id = "caps";

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    document.addEventListener("keydown", (event) => {
                        if (event.code == `CapsLock`) {
                            document.body.querySelector(`#caps`).classList.add("active");
                            this._toggleCapsLock();
                            console.log('hello');
                        }
                    })
                    document.addEventListener("keyup", (event) => {
                        if (event.code == `CapsLock`) {
                            document.body.querySelector(`#caps`).classList.remove("active");
                        }
                    })

                    break;

                case "shift":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.classList.add("right");
                    keyElement.innerHTML = createIconHTML("SHIFT");
                    keyElement.id = "shift";
                    

                    keyElement.addEventListener("click", () => {
                        this._toggleShift();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
                    });

                    const pushShift = (event) => {
                        if (event.code == `ShiftLeft`) {
                            this._toggleShift();
                            document.body.querySelector(`.right`).classList.add("active");
                            console.log('hello');
                            document.removeEventListener("keydown", pushShift);
                        }
                    }

                    const pullShift = (event) => {
                        if (event.code == `ShiftLeft`) {
                            this._toggleShift();
                            document.body.querySelector(`.right`).classList.remove("active");
                            document.addEventListener("keydown", pushShift);
                        }
                    }

                    document.addEventListener("keydown", pushShift);
                    document.addEventListener("keyup", pullShift);

                    break;
                    
                case "Shift":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.classList.add("left");
                    keyElement.innerHTML = createIconHTML("SHIFT");
                    keyElement.id = "shift";

                    keyElement.addEventListener("click", () => {
                        this._toggleShift();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.shift);
                    });

                    document.addEventListener("keydown", (event) => {
                        if (event.code == `ShiftRight`) {
                            this._toggleShift();
                            document.body.querySelector(`.left`).classList.add("active");
                            console.log('hello');
                        }
                    })
                    document.addEventListener("keyup", (event) => {
                        if (event.code == `ShiftRight`) {
                            this._toggleShift();
                            document.body.querySelector(`.left`).classList.remove("active");
                        }
                    })

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key");
                    keyElement.innerHTML = createIconHTML("ENTER");
                    keyElement.id = "enter";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    document.addEventListener("keydown", (event) => {
                        if (event.code == `Enter`) {
                            document.body.querySelector(`#enter`).classList.add("active");
                            console.log('hello');
                        }
                    })
                    document.addEventListener("keyup", (event) => {
                        if (event.code == `Enter`) {
                            document.body.querySelector(`#enter`).classList.remove("active");
                        }
                    })

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("SPACE");
                    keyElement.id = "space";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    document.addEventListener("keydown", (event) => {
                        if (event.code == `Space`) {
                            document.body.querySelector(`#space`).classList.add("active");
                            console.log('hello');
                        }
                    })
                    document.addEventListener("keyup", (event) => {
                        if (event.code == `Space`) {
                            document.body.querySelector(`#space`).classList.remove("active");
                        }
                    })

                    break;

                    default:
                        keyElement.textContent = key.toLowerCase();
                        keyElement.id = `${key}`;
    
                        keyElement.addEventListener("click", () => {
                            this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                            this._triggerEvent("oninput");
                        });
    
                        document.addEventListener("keydown", (event) => {
                            if (event.key == `${key}`) {
                                document.body.querySelector(`#${key}`).classList.add("active");
                                console.log('hello');
                            }
                        })
                        document.addEventListener("keyup", (event) => {
                            if (event.key == `${key}`) {
                                document.body.querySelector(`#${key}`).classList.remove("active");
                            }
                        })
    
                        break;
            }

            fragment.appendChild(keyElement);
            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        if (this.properties.capsLock == true) {
            document.body.querySelector(`#caps`).classList.add("active");
        } else {document.body.querySelector(`#caps`).classList.remove("active");}
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    _toggleCtrl() {
        this.properties.ctrl = !this.properties.ctrl;
        if (this.properties.ctrl == true) {
            document.body.querySelector(`#Ctrl`).classList.add("active");
        } else {document.body.querySelector(`#Ctrl`).classList.remove("active");}
    },

    _toggleAlt() {
        this.properties.alt = !this.properties.alt;
        if (this.properties.alt == true) {
            document.body.querySelector(`#Alt`).classList.add("active");
        } else {document.body.querySelector(`#Alt`).classList.remove("active");}
    },

    _toggleShift() {
        this.properties.shift = !this.properties.shift;
        if (this.properties.shift == true) {
            document.body.querySelector(`#shift`).classList.add("active");
            for (let i = 0; i < 12; i += 1){
                document.querySelectorAll('.keyboard__key')[i].innerHTML = this.changeableKeys.keyChangeableEng[i];
            }
        } else {
            document.body.querySelector(`#shift`).classList.remove("active");
            for (let i = 0; i < 12; i += 1){
                document.querySelectorAll('.keyboard__key')[i].innerHTML = this.changeableKeys.keyChangeableBase[i];
            }
        }
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.shift ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            }
        }
    },

    open(initialValue, oninput) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
    },
}

window.addEventListener("DOMContentLoaded", function () {
    keyboard.init_textarea();
    keyboard.init();
})

let changeLan = false;
let variable = sessionStorage.getItem('rus');
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.altKey) {
        changeLan = !changeLan;
        sessionStorage.setItem('rus', `true`);
        keyboard.init();
        if (variable === 'true') {
            sessionStorage.setItem('rus', `false`);
        }
        alert ("I dont know how to switch the Operation System keyboard\nPlease, switch the right Operation System keyboard\nP.S. IT needs for highlights")
        location.reload();
    }
})

