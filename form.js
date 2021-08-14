/* HTML Elements */
const elements = {
    form: document.getElementById('form'),
    typeRadios: document.querySelectorAll("input[type=radio][name=type]"),
    rate: {
        container: document.getElementById('rate-container'),
        input: document.getElementById("rate-input"),
    }
}

/* Methods */
function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(elements.form);
    const data = Object.fromEntries(formData.entries());

    const validator = new Validator(data, {
        postalcode: {
            type: "regex",
            pattern: /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
        },
    });
    if (validator.valid()) {
        this.submit();
    }

}

function handleRadioChange() {
    if (this.value === "hiring") {
        elements.rate.container.style.display = "block";
        elements.rate.input.setAttribute("required", "");
    } else {
        elements.rate.container.style.display = "none";
        elements.rate.input.removeAttribute("required");
    }
}

/* Event Listeners */
elements.form.addEventListener("submit", handleFormSubmit);
elements.typeRadios.forEach(radio => radio.addEventListener("change", handleRadioChange));

class Validator {
    constructor(data, validations) {
        this.invalid = [];
        this.data = data;
        this.validations = validations;
    }

    regex(key, options) {
        return this.data[key].toString().match(options.pattern);
    }

    valid() {
        for (const key in this.validations) {
            if (Object.hasOwnProperty.call(this.validations, key)) {
                const options = this.validations[key];
                if (!this[options.type](key, options)) {
                    this.invalid.push(key);
                    this.showValidationError(key);
                }
            }
        }
        return this.invalid.length === 0;
    }

    showValidationError(key) 
    {
        const toast = document.createElement('div');
        const text = document.createTextNode(`Please enter a valid ${key.toUpperCase()}`);
        toast.appendChild(text);
        toast.className = "toast toast-danger show";
        document.body.appendChild(toast);
        setTimeout(() => document.body.removeChild(toast), 5000);
    }
}