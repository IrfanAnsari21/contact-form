const form = document.querySelector("form");
const inputs = document.querySelectorAll("input:not([type='radio']), textarea");
const radios = document.querySelectorAll("input[type='radio']");
const radioError = document.getElementById(radios[0].getAttribute("aria-describedby"));
const successMsg = document.querySelector(".success-msg");

form.addEventListener('submit', (e) => {
    e.preventDefault();

    inputs.forEach(input => validateInput(input));

    const selected = [...radios].some(radio => radio.checked);

    if(!selected){
        radioError.hidden = false;
        radios.forEach(radio => radio.setAttribute("aria-invalid", "true"));
    } else {
        radioError.hidden = true;
        radios.forEach(radio => radio.setAttribute("aria-invalid", "false"));
    }

    const errors = form.querySelectorAll("[aria-invalid = 'true']").length;

    if (errors == 0){
        successMsg.hidden = false;
        form.reset();

        setTimeout(() => successMsg.classList.add("show"), 1);
        setTimeout(() => successMsg.classList.remove("show"), 4000);
        setTimeout(() => successMsg.hidden = true, 4500);
    }
});

function validateInput(input) {
    const errorMsg = document.getElementById(input.getAttribute("aria-describedby"));

    if ((input.type == "text" || input.tagName == "TEXTAREA") && input.value.trim() == "") {
        errorMsg.hidden = false;
        input.setAttribute("aria-invalid", "true");
        input.classList.add("error");
        return;
    }

    if (input.type == "email" && input.value.trim() == "") {
        errorMsg.hidden = false;
        input.setAttribute("aria-invalid", "true");
        input.classList.add("error");
        return;
    }

    if (input.type == "checkbox" && !input.checked) {
        errorMsg.hidden = false;
        input.setAttribute("aria-invalid", "true");
        input.classList.add("error");
        return;
    }

    errorMsg.hidden = true;
    input.setAttribute("aria-invalid", "false");
    input.classList.remove("error");
}

inputs.forEach(input => input.addEventListener("input", () => validateInput(input)));

radios.forEach(radio => radio.addEventListener("change", () => {
    radioError.hidden = true;
    radios.forEach(r => r.setAttribute("aria-invalid", "false"));
}));

