const username = document.querySelector('#username');
const pass = document.querySelector('#password');
const pass2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const closeBtn = document.querySelector('.close');
const popup = document.querySelector('.popup');

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');
	formBox.classList.add('error');
	errorMsg.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const checkForm = (input) => {
	input.forEach((e) => {
		if (e.value === '') {
			showError(e, e.placeholder);
		} else {
			clearError(e);
		}
	});
};

const checkLeght = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText.slice(
				0,
				-1
			)} składa się z ${min} znaków`
		);
	}
};

const checkPassword = (pass1, pass2) => {
	const numbers = /[0-9]/;
	const special = /[!@#$%^&*()]/;
	if (pass1.value !== pass2.value) {
		showError(pass2, 'Hasła do siebie nie pasują');
	} else if (!numbers.test(pass1.value)) {
		showError(pass1, 'Hasło musi zawierać cyfrę');
	} else if (!special.test(pass1.value)) {
		showError(pass1, 'Hasło musi zawierać znak specjalny');
	}
};
const checkMail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'E-mail jest niepoprawny');
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box');
	let errorCount = 0;
	allInputs.forEach((box) => {
		if (box.classList.contains('error')) {
			errorCount++;
		}
	});
	if (errorCount === 0) {
		popup.classList.add('show-popup');
	}
};
sendBtn.addEventListener('click', (e) => {
	e.preventDefault();

	checkForm([username, pass, pass2, email]);
	checkLeght(username, 3);
	checkLeght(pass, 8);
	checkPassword(pass, pass2);
	checkMail(email);
	checkErrors();
});

clearBtn.addEventListener('click', (e) => {
	e.preventDefault();

	[username, pass, pass2, email].forEach((el) => {
		el.value = '';
		clearError(el);
	});
});
