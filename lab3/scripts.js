const passwordOutput = document.getElementById('passwordOutput');
const copyBtn = document.getElementById('copyBtn');
const lengthRange = document.getElementById('lengthRange');
const lengthValue = document.getElementById('lengthValue');
const generateBtn = document.getElementById('generateBtn');

const lowercase = document.getElementById('lowercase');
const uppercase = document.getElementById('uppercase');
const numbers = document.getElementById('numbers');
const symbols = document.getElementById('symbols');

const charSets = {
	lowercase: 'abcdefghijklmnopqrstuvwxyz',
	uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	numbers: '0123456789',
	symbols: '!@$#%^*'
};

function getPool() {
	let pool = '';

	if (lowercase.checked) pool += charSets.lowercase;
	if (uppercase.checked) pool += charSets.uppercase;
	if (numbers.checked) pool += charSets.numbers;
	if (symbols.checked) pool += charSets.symbols;

	return pool;
}

function generatePassword() {
	const length = Number(lengthRange.value);
	const pool = getPool();

	if (!pool) {
		passwordOutput.value = 'Оберіть хоча б 1 тип';
		return;
	}

	let password = '';
	for (let i = 0; i < length; i += 1) {
		const index = Math.floor(Math.random() * pool.length);
		password += pool[index];
	}

	passwordOutput.value = password;
}

lengthRange.addEventListener('input', () => {
	lengthValue.textContent = lengthRange.value;
	generatePassword();
});

generateBtn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', async () => {
	if (!passwordOutput.value) return;

	try {
		await navigator.clipboard.writeText(passwordOutput.value);
		const originalText = copyBtn.textContent;
		copyBtn.textContent = 'OK';
		setTimeout(() => {
			copyBtn.textContent = originalText;
		}, 900);
	} catch (error) {
		copyBtn.textContent = 'ERR';
	}
});

generatePassword();
