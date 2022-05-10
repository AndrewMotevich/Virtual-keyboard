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
        capsLock: false
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


    _createKeys() {
        function changeLanguage() {
            keyLayout3 = keyLayout;
            keyLayout = keyLayout2;
            keyLayout2 = keyLayout3;
        }

        const fragment = document.createDocumentFragment();
        let keyLayout = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+", "backspace",
            "Tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "\\", "enter",
            "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "Up", "Shift",
            "ln", "Ctrl", "Win", "Alt", "space", "Alt", "Win", "Ctrl", "Left", "Down", "Right"
        ];

        let keyLayout2 = [
            "`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "+", "backspace",
            "Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
            "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "\\", "enter",
            "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Up", "Shift",
            "ln", "Ctrl", "Win", "Alt", "space", "Alt", "Win", "Ctrl", "Left", "Down", "Right"
        ];

        let keyLayout3 = [];

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

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "Tab":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("TAB");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "    ";
                        this._triggerEvent("oninput");
                    });

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

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "shift":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("SHIFT");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "Shift":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("SHIFT");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key");
                    keyElement.innerHTML = createIconHTML("ENTER");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("SPACE");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

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
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
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
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.altKey) {
        changeLan = !changeLan;
        keyboard.init();
    }
})