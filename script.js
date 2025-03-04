document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    // Get all the elements we need
    const loadingScreen = document.getElementById('loading-screen');
    const loadingText = document.getElementById('loading-text');
    const loadingBar = document.getElementById('loading-bar');
    const loadingProgress = document.getElementById('loading-progress');
    const thiefIcon = document.getElementById('thief-icon');
    const rightLogo = document.querySelector('.right-logo');
    const copyBtn = document.getElementById('copy-btn');
    const cryptoText = document.getElementById('crypto-text');
    const cryptoAddress = "0x80862b188466908dd150e9dbd5fa6a21205b075d";
    const content = document.getElementById('content');
    const navbar = document.getElementById('navbar');
    
    // Log elements to make sure they're found
    console.log("Loading elements:", { 
        loadingScreen, 
        loadingText, 
        loadingBar, 
        loadingProgress,
        thiefIcon 
    });
    
    // Check if elements exist before using them
    if (!loadingScreen || !loadingText || !loadingBar || !loadingProgress || !thiefIcon) {
        console.error("Some loading elements are missing!");
        return;
    }
    
    // Display only a portion of the address in the UI
    function formatAddressForDisplay(address) {
        if (!address) return "";
        return address.slice(0, 6) + "..." + address.slice(-4);
    }
    
    // Set the initial displayed text
    if (cryptoText) {
        cryptoText.textContent = formatAddressForDisplay(cryptoAddress);
    }
    
    // Improved copy functionality
    if (copyBtn) {
        const originalContent = copyBtn.innerHTML;
        
        copyBtn.addEventListener("click", function () {
            navigator.clipboard.writeText(cryptoAddress)
            .then(() => {
                // Change button appearance
                copyBtn.classList.add("copied");
                
                // Update button to show success
                copyBtn.innerHTML = '<svg class="check-icon" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"></path></svg>';
                
                // Subtle animation
                copyBtn.style.transform = "scale(1.1)";
                setTimeout(() => {
                    copyBtn.style.transform = "scale(1.0)";
                }, 200);
                
                // Show tooltip
                const tooltip = document.createElement("span");
                tooltip.classList.add("copy-tooltip");
                tooltip.textContent = "Copied!";
                copyBtn.appendChild(tooltip);
                
                // Reset button after delay
                setTimeout(() => {
                    copyBtn.innerHTML = originalContent;
                    copyBtn.classList.remove("copied");
                }, 2000);
            })
            .catch(err => {
                console.error("Copy failed:", err);
                // Show error feedback
                copyBtn.classList.add("copy-error");
                setTimeout(() => {
                    copyBtn.classList.remove("copy-error");
                }, 2000);
            });
        });
    }
    
    // Check viewport width to adjust animations based on device
    let isMobile = window.innerWidth <= 768;
    let isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    
    // Hide right logo initially
    if (rightLogo) {
        rightLogo.style.display = 'none';
    }
    
    // Update loading text based on percentage
    function updateLoadingText(percentage) {
        let currentText;
        if (percentage < 30) {
            currentText = "Shiba is sneaking through the shadows...";
        } else if (percentage < 50) {
            currentText = "Avoiding security cameras...";
        } else if (percentage < 70) {
            currentText = "Shiba is picking the lock...";
        } else if (percentage < 100) {
            currentText = "Almost there... Just a little more...";
        } else {
            currentText = "Mission Accomplished: Stolen in style!";
        }
        loadingText.textContent = `${Math.floor(percentage)}% ${currentText}`;
    }
    
    // Make sure thief icon is positioned within loading bar
    if (thiefIcon && loadingBar && thiefIcon.parentElement !== loadingBar) {
        loadingBar.appendChild(thiefIcon);
        console.log("Thief icon repositioned as child of loading bar");
    }
    
    // Throttled thief position update (for smoother animation)
    function updateThiefPosition(progress) {
        if (!thiefIcon || !loadingBar) return;
        
        // Get loading bar dimensions
        const barWidth = loadingBar.offsetWidth;
        
        // Get thief dimensions
        const iconWidth = thiefIcon.offsetWidth;
        
        // Calculate where the progress bar ends
        const progressEndPosition = (progress / 100) * barWidth;
        
        // Position the thief icon so its center is at the progress end
        const thiefPosition = Math.max(0, progressEndPosition - (iconWidth / 2));
        
        // Apply the position matching the progress bar's transition
        thiefIcon.style.left = `${thiefPosition}px`;
    }

    // Update loading progress
    function updateLoadingProgress(progress) {
        if (!loadingProgress) return;
        
        // Update the progress bar width
        loadingProgress.style.width = `${progress}%`;
        
        // Update thief position
        updateThiefPosition(progress);
    }

    // Hide loading screen
    function hideLoadingScreen() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                if (content) content.style.display = 'flex';
                if (navbar) navbar.style.display = 'block';
                
                if (rightLogo) {
                    rightLogo.style.display = 'flex'; // Show logo after loading
                    setTimeout(() => {
                        rightLogo.classList.add('show'); // Add the class to trigger the transition
                    }, 100);
                }
            }, 500); // Wait for transition to finish
        }, 2000);
    }

    // Loading simulation with random increments
    function simulateLoading() {
        let progress = 0;
        
        function increment() {
            if (progress < 100) {
                // Random increment between 2-6%
                progress += Math.floor(Math.random() * 5) + 2;
                if (progress > 100) progress = 100;

                // Update loading UI
                updateLoadingProgress(progress);
                updateLoadingText(progress);

                // Random delay between increments
                const delay = Math.floor(Math.random() * 100) + 50;
                setTimeout(increment, delay);
            } else {
                // Loading complete
                hideLoadingScreen();
            }
        }
        
        // Start the loading simulation
        increment();
    }
    
    // Initialize other components after DOM is fully loaded
    const scrollingImages = document.querySelectorAll('.scrolling-image');
    const mainLogo = document.querySelector('.main-logo');
    const divider = document.querySelector('.divider');
    const About = document.getElementById('About');

    function generateGrid() {
        // Grid generation code here
        // (keeping your existing code)
        const existingGrid = document.querySelector('.grid-container');
        if (existingGrid) {
            existingGrid.remove();
        }
        
        const gridContainer = document.createElement("div");
        gridContainer.classList.add("grid-container");
        document.body.appendChild(gridContainer);
    
        // Calculate optimal line spacing based on screen size
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        
        // Calculate optimal spacing - smaller numbers = more lines
        let horizontalSpacing, verticalSpacing;
        
        if (isMobile) {
            horizontalSpacing = 8; // Fewer lines on mobile (8% of viewport)
            verticalSpacing = 8;
        } else if (isTablet) {
            horizontalSpacing = 5; // More lines on tablet (5% of viewport)
            verticalSpacing = 5;
        } else {
            horizontalSpacing = 3; // Most lines on desktop (3% of viewport)
            verticalSpacing = 3;
        }
        
        // Calculate number of lines based on percentage of viewport
        const numLinesHorizontal = Math.ceil(100 / horizontalSpacing) + 1; // Add 1 for full coverage
        const numLinesVertical = Math.ceil(100 / verticalSpacing) + 1; // Add 1 for full coverage
        
        // Create horizontal lines
        for (let i = 0; i <= numLinesHorizontal; i++) {
            let line = document.createElement("div");
            line.classList.add("grid-line", "horizontal");
            line.style.top = `${i * horizontalSpacing}vh`; // Distribute evenly across viewport height
            gridContainer.appendChild(line);
        }
        
        // Create vertical lines
        for (let i = 0; i <= numLinesVertical; i++) {
            let line = document.createElement("div");
            line.classList.add("grid-line", "vertical");
            line.style.left = `${i * verticalSpacing}vw`; // Distribute evenly across viewport width
            gridContainer.appendChild(line);
        }
    
        // Adjust animation frequency based on device
        const glowInterval = isMobile ? 2000 : (isTablet ? 1500 : 1000);
        
        // Clear any existing intervals to prevent multiple running
        if (window.glowIntervalId) {
            clearInterval(window.glowIntervalId);
        }
        
        window.glowIntervalId = setInterval(() => {
            createNeonGlow(gridContainer, numLinesHorizontal, horizontalSpacing);
        }, glowInterval);
    }
    
    function createNeonGlow(container, numLines, spacing) {
        let glow = document.createElement("div");
        glow.classList.add("neon-glow");
        
        let randomIndex = Math.floor(Math.random() * numLines);
        glow.style.top = `${randomIndex * spacing}vh`; // Use the same spacing as grid lines
        
        container.appendChild(glow);
    
        setTimeout(() => {
            glow.remove();
        }, 2000);
    }

    function createSpark() {
        // Your existing createSpark code
        if (isMobile && Math.random() > 0.3) return;
        
        const dividerElement = document.querySelector('.divider');
        if (!dividerElement) return;
        
        const spark = document.createElement('div');
        spark.classList.add('spark');
        dividerElement.appendChild(spark);

        spark.style.left = `${Math.random() * 100}%`;
        spark.style.top = `${Math.random() * 100}%`;

        setTimeout(() => {
            spark.remove();
        }, 500);
    }

    // Adjust elements for better mobile visibility
    if (isMobile) {
        if (divider) {
            divider.style.top = window.innerHeight * 0.8 + 'px';
        }
        window.sparkInterval = 150;
    } else if (isTablet) {
        if (divider) {
            divider.style.top = window.innerHeight * 0.9 + 'px';
        }
        window.sparkInterval = 100;
    } else {
        window.sparkInterval = 50; // Desktop
    }
    
    // Initialize everything
    generateGrid();
    
    // Set spark creation interval based on device
    const sparkInterval = isMobile ? 150 : (isTablet ? 100 : 50);
    setInterval(createSpark, sparkInterval);

    // Start the loading simulation - this should now work
    simulateLoading();

    // Parallax scrolling effect
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        scrollingImages.forEach(image => {
            const parallaxFactor = isMobile ? 0.1 : 0.2;
            const offset = scrollPosition * parallaxFactor;
            image.style.transform = `translateY(${offset}px)`;
        });
    });
    
    // Handle window resize for responsive adjustments
    window.addEventListener('resize', function() {
        // Update device detection
        const oldIsMobile = isMobile;
        const oldIsTablet = isTablet;
        
        // Re-evaluate device type
        isMobile = window.innerWidth <= 768;
        isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
        
        // Only regenerate grid if device type changed
        if (oldIsMobile !== isMobile || oldIsTablet !== isTablet) {
            generateGrid();
            
            // Update divider position if needed
            if (divider) {
                if (isMobile) {
                    divider.style.top = window.innerHeight * 0.8 + 'px';
                } else if (isTablet) {
                    divider.style.top = window.innerHeight * 0.9 + 'px';
                }
            }
        }
    });
    
    // Listen for orientation changes to adjust layout
    window.addEventListener('orientationchange', function() {
        // Give the browser time to update dimensions
        setTimeout(function() {
            // Regenerate grid with new dimensions
            generateGrid();
            
            // Reposition divider based on new orientation
            if (divider && (isMobile || isTablet)) {
                divider.style.top = window.innerHeight * (isMobile ? 0.8 : 0.9) + 'px';
            }
        }, 300);
    });
});
