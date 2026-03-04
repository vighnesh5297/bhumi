document.addEventListener('DOMContentLoaded', () => {
    // Elements - Entry Section
    const entrySection = document.getElementById('entrySection');
    const inputField = document.getElementById('nameInput');
    const submitBtn = document.getElementById('submitBtn');
    const errorMessage = document.getElementById('errorMessage');

    // Elements - Question Section
    const questionSection = document.getElementById('questionSection');
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');

    // Elements - Verification Section
    const verificationSection = document.getElementById('verificationSection');
    const verificationTitle = document.getElementById('verificationTitle');
    const dynamicBiodata = document.getElementById('dynamicBiodata');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    // Helper to transition between sections
    function transitionTo(hideSection, showSection) {
        hideSection.classList.add('fade-out');
        setTimeout(() => {
            hideSection.classList.add('hidden');
            hideSection.classList.remove('fade-out');
            
            showSection.classList.remove('hidden');
            showSection.classList.add('fade-in');
        }, 400); // Wait for fade out to finish
    }

    // Sequence Data
    const sequenceItems = [
         { type: 'photo', content: 'Photo Space' },
        { type: 'text', label: 'Name', value: 'Bhumi Gupta' },
        { type: 'text', label: 'Age', value: '21' },
        { type: 'text', label: 'Identity', value: 'Miss Gundi' },
        { type: 'text', label: 'Relation', value: 'Best Friend' },
        { type: 'text', label: 'Personality', value: 'Amazinggggggg' },
        { type: 'text', label: 'Status', value: 'Single But Ready To Mingle' },
        { type: 'text', label: 'Fav Food', value: 'Dosa, Golgappe, Momo, Pasta' },
        { type: 'text', label: 'Fav Item', value: 'Bangle, Payal, Kamarbandh, Jhumke' },
        { type: 'text', label: 'Fav Quote', value: 'Shut Up Yrr'},
        { type: 'text', label: 'Fav Actor', value: 'Seon Kim'},
        { type: 'text', label: 'Fav Singer', value: 'Talwinder'},
        { type: 'text', label: 'Paglu', value: 'SeonPaglu and TalwinderPaglu'},
        { type: 'text', label: 'Fav Place', value: 'Finland, Korea, Japan'},
        { type: 'text', label: 'Fav Thing', value: 'Northern Lights'},
        { type: 'text', label: 'Hobby', value: 'Eating, Sleeping, Being Confused'},
        { type: 'text', label: 'Nature', value: 'Green Forest'},
        { type: 'text', label: 'Most Hated Thing', value: 'Doglapanti'},
        { type: 'text', label: 'Fav Activity', value: 'Bathing'}
        ];

    function startVerificationSequence() {
        dynamicBiodata.innerHTML = ''; // Clear container
        document.getElementById('photoContainer').innerHTML = ''; // Clear photo
        let currentStep = 0;
        const totalSteps = sequenceItems.length;

        function showNextItem() {
            if (currentStep >= totalSteps) {
                // Done loading
                verificationTitle.textContent = "WHAT WE FOUND";
                
                // Hide progress elements, show confirm button
                document.getElementById('progressContainer').style.display = 'none';
                document.getElementById('progressText').style.display = 'none';
                
                const btnConfirm = document.getElementById('btnConfirm');
                btnConfirm.classList.remove('hidden');
                btnConfirm.classList.add('fade-in');
                
                // Add listener to go to new page
                btnConfirm.addEventListener('click', () => {
                    window.location.href = "question.html";
                });
                
                return;
            }

            const itemData = sequenceItems[currentStep];
            let element;

            if (itemData.type === 'photo') {
                element = document.createElement('div');
                element.className = 'photo-placeholder';
                // Override margin bottom because it's now in its own container
                element.style.marginBottom = '0';
                // Add the image tag for pic2.jpeg
                element.innerHTML = `<img src="pic2.jpeg" alt="Bhumi" style="width:100%; height:100%; object-fit: cover; border-radius:50%;" />`;
                
                document.getElementById('photoContainer').appendChild(element);
            } else {
                element = document.createElement('p');
                element.className = 'dynamic-item';
                element.innerHTML = `<strong>${itemData.label}:</strong> ${itemData.value}`;
                
                dynamicBiodata.appendChild(element);
                
                // Auto scroll to latest item
                setTimeout(() => {
                    dynamicBiodata.scrollTop = dynamicBiodata.scrollHeight;
                }, 100);
            }

            // Force reflow and add show class for animation
            setTimeout(() => {
                element.classList.add('show');
            }, 50);

            // Update Progress Bar
            currentStep++;
            const progressPercentage = (currentStep / totalSteps) * 100;
            progressBar.style.width = `${progressPercentage}%`;
            progressText.textContent = `${currentStep} / ${totalSteps} loaded`;

            // Wait then show next
            setTimeout(showNextItem, 1200); // 1.2s delay between each item
        }

        // Start the sequence
        setTimeout(showNextItem, 800); // Initial delay before starting
    }

    // Process Name Input Check
    function processInput() {
        const enteredName = inputField.value.trim().toLowerCase();

        // Valid variants entered by user
        if (enteredName === "bhumi gupta") {
            // Correct name, show Question Section
            transitionTo(entrySection, questionSection);
        } else {
            // Incorrect, show error message
            errorMessage.textContent = "Access Denied";
            errorMessage.classList.add('show');
            
            // Trigger shake animation
            inputField.classList.remove('shake-animation');
            // Force browser reflow to restart animation
            void inputField.offsetWidth; 
            inputField.classList.add('shake-animation');

            // Hide the error text after a few seconds
            setTimeout(() => {
                errorMessage.classList.remove('show');
                errorMessage.textContent = "";
            }, 3000);
        }
    }

    // Listeners for Entry Section
    if (submitBtn) {
        submitBtn.addEventListener('click', processInput);
    }

    if (inputField) {
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                processInput();
            }
        });
    }

    // Listeners for Question Section
    if (btnYes) {
        btnYes.addEventListener('click', () => {
            // Start verification sequence
            transitionTo(questionSection, verificationSection);
            startVerificationSequence();
        });
    }

    if (btnNo) {
        btnNo.addEventListener('click', () => {
            // Kick them out back to entry
            inputField.value = "";
            transitionTo(questionSection, entrySection);
            
            setTimeout(() => {
                errorMessage.textContent = "Imposter Detected";
                errorMessage.classList.add('show');
                setTimeout(() => {
                    errorMessage.classList.remove('show');
                    errorMessage.textContent = "";
                }, 3000);
            }, 450);
        });
    }
});
