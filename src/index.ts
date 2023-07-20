import './styles.css';
const keyboardContainer = document.getElementById('virtual-keyboard');
const sequenceInput = document.getElementById(
	'sequence-input'
) as HTMLInputElement;
const shiftKey = document.getElementById('shift-key');

let shiftEnabled = false;

if (keyboardContainer && sequenceInput && shiftKey) {
	// Define the virtual keyboard layout
	const keyboardLayout: string[] = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

	// Function to toggle shift state
	const toggleShift = () => {
		shiftEnabled = !shiftEnabled;
		const keys = document.querySelectorAll('.keyboard-key');
		keys.forEach((key) => {
			const label = key.textContent;
			key.textContent = shiftEnabled
				? label!.toUpperCase()
				: label!.toLowerCase();
		});
	};

	// Create the virtual keyboard
	keyboardLayout.forEach((row) => {
		const rowElement = document.createElement('div');
		rowElement.classList.add('keyboard-row');

		row.split('').forEach((key) => {
			const keyElement = document.createElement('div');
			keyElement.classList.add('keyboard-key');
			keyElement.textContent = key;
			rowElement.appendChild(keyElement);
		});

		keyboardContainer.appendChild(rowElement);
	});

	// Add event listener to highlight keys based on the sequence
	sequenceInput.addEventListener('input', () => {
		const sequence = sequenceInput.value.toUpperCase();

		// Remove previous highlights
		const keys = document.querySelectorAll('.keyboard-key');
		keys.forEach((key) => key.classList.remove('highlight'));

		// Highlight matching keys
		keys.forEach((key) => {
			if (sequence.includes(key.textContent!)) {
				key.classList.add('highlight');
			}
		});
	});

	// Add event listener for shift key
	shiftKey.addEventListener('click', () => {
		toggleShift();
		shiftKey.classList.toggle('shift');
	});

	// Cursor position in the sequence input
	let cursorPosition = 0;
	// Function to handle text input change
	const handleInputChange = () => {
		cursorPosition = sequenceInput.selectionStart!;
	};

	// Add event listener for text input change
	sequenceInput.addEventListener('input', handleInputChange);

	// Function to handle click on text input
	const handleInputClick = () => {
		cursorPosition = sequenceInput.selectionStart!;
	};

	// Add event listener for click on text input
	sequenceInput.addEventListener('click', handleInputClick);

	// Function to update cursor position in sequence input
	const updateCursorPosition = () => {
		sequenceInput.selectionStart = cursorPosition;
		sequenceInput.selectionEnd = cursorPosition;
		sequenceInput.focus();
	};

	// Function to handle key press events
	const handleKeyPress = (event: KeyboardEvent) => {
		const pressedKey = event.key.toUpperCase();
		const currentCharacter = sequenceInput.value[cursorPosition]?.toUpperCase();

		if (pressedKey === currentCharacter) {
			cursorPosition++;
			updateCursorPosition();
		}
	};

	// Add event listener to handle key press events
	document.addEventListener('keydown', handleKeyPress);
}
