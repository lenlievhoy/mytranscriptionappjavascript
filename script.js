// Function to initialize the default audio player
function initDefaultAudioPlayer() {
    const defaultAudio = document.getElementById('media-player');
    defaultAudio.src = ''; // Reset source
    defaultAudio.style.display = 'block'; // Display the audio player
}

// Initialize default audio player
initDefaultAudioPlayer();

document.getElementById('import-btn').addEventListener('click', function() {
    document.getElementById('file-input').click();
});

document.getElementById('file-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const mediaContainer = document.getElementById('media-container');

    // Check if file is selected
    if (file) {
        const fileType = file.type.split('/')[0]; // Get the type of file (audio/video)
        
        // Remove previous media player
        mediaContainer.innerHTML = '';

        if (fileType === 'audio') {
            // Create audio element
            const audio = document.createElement('audio');
            audio.controls = true;
            audio.src = URL.createObjectURL(file);
            mediaContainer.appendChild(audio);

            audio.addEventListener('pause', function() {
                skipBackward();
            });

        } else if (fileType === 'video') {
            // Create video element
            const video = document.createElement('video');
            video.controls = true;
            video.src = URL.createObjectURL(file);
            video.style.width = '50%'; // Ensure full width
            video.style.maxWidth = '50%'; // Prevent exceeding container width
            video.style.height = 'auto'; // Maintain aspect ratio
            video.style.resize = 'both'; // Allow resizing
            video.style.overflow = 'hidden'; // Hide overflow
            mediaContainer.appendChild(video);

            video.addEventListener('pause', function() {
                skipBackward();
            });

        } else {
            alert('Please select a valid audio or video file.');
            // Re-initialize default audio player
            initDefaultAudioPlayer();
        }
    }
});

// Play/Pause button functionality
document.getElementById('play-pause-btn').addEventListener('click', function() {
    togglePlayPause();
});

// Stop button functionality
document.getElementById('stop-btn').addEventListener('click', function() {
    stopMedia();
});

// Skip Backward button functionality
document.getElementById('skip-backward-btn').addEventListener('click', function() {
    skipBackward();
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    const keyCode = event.keyCode;
    const isAltPressed = event.altKey;

    // Alt+C or Spacebar for play/pause
    if (keyCode === 67 && isAltPressed || keyCode === 27) {
        togglePlayPause();
    }

    // Alt+Z for skip backwards
    if (keyCode === 90 && isAltPressed) {
        skipBackward();
    }
});

// Function to toggle play/pause
function togglePlayPause() {
    const media = document.querySelector('audio, video');
    if (media.paused) {
        media.play();
    } else {
        media.pause();
    }
}

// Function to stop media playback
function stopMedia() {
    const media = document.querySelector('audio, video');
    media.pause();
    media.currentTime = 0;
}

// Function to skip backward by 2 seconds
function skipBackward() {
    const media = document.querySelector('audio, video');
    media.currentTime -= 2; // Skip backward by 2 seconds
}

