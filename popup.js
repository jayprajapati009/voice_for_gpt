const startButton = document.getElementById('start-button');
const copyButton = document.getElementById('copy-button');
const closeButton = document.getElementById('close-button');
const transcriptElement = document.getElementById('transcript');
const statusElement = document.getElementById('status');

// Check if the browser supports SpeechRecognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    statusElement.textContent = 'Speech Recognition is not supported in this browser.';
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';  // Set the language
    recognition.interimResults = true;  // Enable interim results for real-time display

    // Start voice recognition when the button is clicked
    startButton.addEventListener('click', () => {
        transcriptElement.value = '';  // Clear the previous results
        statusElement.textContent = 'Listening...';  // Update the status
        recognition.start();  // Start speech recognition
    });

    // Update the transcript in real-time as the user speaks
    recognition.addEventListener('result', (event) => {
        const interimTranscript = Array.from(event.results)
            .map(result => result[0].transcript)
            .join('');
        transcriptElement.value = interimTranscript;  // Display the transcribed text
    });

    // When speech recognition ends, update the status
    recognition.addEventListener('end', () => {
        statusElement.textContent = 'You can now copy the prompt.';
    });

    // Handle any errors in speech recognition
    recognition.addEventListener('error', (event) => {
        statusElement.textContent = `Error occurred in recognition: ${event.error}`;
    });
}

// Copy the content of the transcript textarea to the clipboard
copyButton.addEventListener('click', () => {
    transcriptElement.select();  // Select the text inside the textarea
    document.execCommand('copy');  // Copy the selected text to the clipboard
    statusElement.textContent = 'Copied to clipboard!';  // Update the status
});

// Close the popup window when the close button is clicked
closeButton.addEventListener('click', () => {
    window.close();  // Close the popup
});
