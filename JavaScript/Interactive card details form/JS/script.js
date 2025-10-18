const submitBtn = document.querySelector('#submit');
const continueBtn = document.querySelector('#continue');
const form = document.querySelector('#form');
const success = document.querySelector('#success');
const inputs = document.querySelectorAll('input');

submitBtn.addEventListener('click', () => {
    let isValid = true;

    inputs.forEach(input => {
        const error = input.nextElementSibling;
        if (!input.value.trim()) {
            error.style.visibility = 'visible';
            isValid = false;
        } else {
            error.style.visibility = 'hidden';
        }
    });

    if (isValid) {
        inputs.forEach(input => input.value = '');
        form.style.display = 'none';
        success.style.display = 'flex';
    }
});

continueBtn.addEventListener('click', () => {
    success.style.display = 'none';
    form.classList.remove('anima');
    form.style.display = 'flex';
    setTimeout(() => {
        form.classList.add('anima');
    }, 50);
});
