// Sample news stories database
const newsDatabase = {
    real: [
        {
            title: "Climate Scientists Confirm Global Temperature Rise",
            content: "New peer-reviewed study from NASA and NOAA confirms global average temperature has risen 1.1°C since pre-industrial times. Multiple independent research institutions have verified these findings.",
            sources: "NASA, NOAA, Nature Journal, IPCC Report",
            date: "2024"
        },
        {
            title: "COVID-19 Vaccines Reduce Severe Illness Risk by 90%",
            content: "Large-scale studies from CDC and WHO show vaccinated individuals have significantly lower hospitalization rates. Data collected from over 100 million doses across multiple countries.",
            sources: "CDC, WHO, Lancet Medical Journal, UK Health Security Agency",
            date: "2024"
        },
        {
            title: "New Cancer Treatment Shows Promise in Clinical Trials",
            content: "A revolutionary immunotherapy has completed Phase 2 trials with 65% remission rates. Results have been peer-reviewed and published in multiple medical journals.",
            sources: "Mayo Clinic, Stanford Medicine, The New England Journal of Medicine",
            date: "2024"
        },
        {
            title: "Renewable Energy Now Exceeds 30% of Global Electricity",
            content: "According to the International Energy Agency, renewable sources generated a record 30% of world electricity in 2023, with investments growing annually.",
            sources: "IEA, IRENA, World Bank Energy Data",
            date: "2024"
        },
        {
            title: "New Species Discovered in Amazon Rainforest",
            content: "Scientists have identified 430 new species in the Amazon during an expedition. Discoveries have been catalogued and verified by the Smithsonian Institution.",
            sources: "Smithsonian Institution, National Geographic, Conservation International",
            date: "2024"
        },
        {
            title: "AI Breakthrough Achieves Medical Imaging Accuracy",
            content: "New AI system matches or exceeds expert radiologists in detecting lung cancer. Study involved 10,000 patient cases and was published in a top-tier medical journal.",
            sources: "MIT, Harvard Medical School, Journal of Medical Imaging",
            date: "2024"
        }
    ],
    misinformation: [
        {
            title: "5G Towers Cause COVID-19 Pandemic",
            content: "FAKE: Claims that 5G technology spreads COVID-19. This is physically impossible as viruses cannot travel on radio waves.",
            redFlags: "No credible scientific sources. Ignores basic virology. 5G was not deployed in countries where COVID-19 appeared first.",
            date: "Debunked"
        },
        {
            title: "Vaccines Contain Microchips for Mind Control",
            content: "FALSE: Claims vaccines contain tracking devices. Medical syringes are 0.7mm diameter; microchips are much larger and would be visible.",
            redFlags: "No peer review. Contradicts basic physics. No evidence of microchip technology.",
            date: "Debunked"
        },
        {
            title: "The Moon Landing Was Faked by Hollywood",
            content: "HOAX: Claims the Apollo 11 moon landing was filmed in a studio. Contradicted by thousands of photos, moon rocks, and independent verification.",
            redFlags: "Technology in 1969 couldn't fake the footage. Soviet Union verified landing (they were competitors). Retro-analysis by modern experts proves authenticity.",
            date: "Debunked"
        },
        {
            title: "Flat Earth Theory is Scientific Fact",
            content: "FALSE: Claims Earth is flat. Contradicted by centuries of observations, satellite imagery, physics, and circumnavigation.",
            redFlags: "Ignores gravity, orbital mechanics, and direct observation. No credible scientists support this.",
            date: "Debunked"
        },
        {
            title: "Drinking Bleach Cures All Diseases",
            content: "DANGEROUS HOAX: Bleach is highly toxic. This claim has caused deaths and severe poisonings. DO NOT CONSUME BLEACH.",
            redFlags: "Causes immediate poisoning. No scientific basis. Promoted only on unverified social media.",
            date: "Debunked - DANGEROUS"
        },
        {
            title: "Humans Only Use 10% of Their Brain",
            content: "FALSE: Neuroscience has proven humans use virtually all their brain tissue. Brain imaging shows activity in all regions, even during sleep.",
            redFlags: "Refuted by modern neuroscience. Brain scans show constant activity. No credible neuroscientist supports this myth.",
            date: "Debunked"
        }
    ]
};

// Initialize the page
function initializePage() {
    loadStories();
    updateLastUpdate();
}

// Load stories into the page
function loadStories() {
    const realContainer = document.getElementById('realStories');
    const misinformationContainer = document.getElementById('misinformationStories');

    // Clear containers
    realContainer.innerHTML = '';
    misinformationContainer.innerHTML = '';

    // Load real stories
    newsDatabase.real.forEach(story => {
        realContainer.appendChild(createStoryCard(story, 'real'));
    });

    // Load misinformation
    newsDatabase.misinformation.forEach(story => {
        misinformationContainer.appendChild(createStoryCard(story, 'misinformation'));
    });
}

// Create a story card
function createStoryCard(story, type) {
    const card = document.createElement('div');
    card.className = `story-card ${type}`;

    if (type === 'real') {
        card.innerHTML = `
            <div class="story-header">✓ VERIFIED REAL</div>
            <h3>${story.title}</h3>
            <p>${story.content}</p>
            <div class="sources"><strong>Sources:</strong> ${story.sources}</div>
            <div class="sources"><strong>Date:</strong> ${story.date}</div>
        `;
    } else {
        card.innerHTML = `
            <div class="story-header">✗ MISINFORMATION</div>
            <h3>${story.title}</h3>
            <p>${story.content}</p>
            <div class="red-flags"><strong>🚩 Red Flags:</strong> ${story.redFlags}</div>
            <div class="red-flags"><strong>Status:</strong> ${story.date}</div>
        `;
    }

    return card;
}

// Switch between tabs
function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName).classList.add('active');

    // Add active class to clicked button
    event.target.classList.add('active');
}

// Verify a story
function verifyStory() {
    const input = document.getElementById('verifyInput').value.toLowerCase().trim();
    const resultDiv = document.getElementById('verifyResult');

    if (!input) {
        resultDiv.innerHTML = '<p>Please enter a story to verify.</p>';
        resultDiv.className = 'verify-result show result-unknown';
        return;
    }

    let result = null;
    let type = 'unknown';

    // Check against real stories
    for (let story of newsDatabase.real) {
        if (story.title.toLowerCase().includes(input) || story.content.toLowerCase().includes(input)) {
            result = `<strong>✓ VERIFIED REAL:</strong> "${story.title}"<br><br>${story.content}<br><br><strong>Sources:</strong> ${story.sources}`;
            type = 'real';
            break;
        }
    }

    // Check against misinformation
    if (!result) {
        for (let story of newsDatabase.misinformation) {
            if (story.title.toLowerCase().includes(input) || story.content.toLowerCase().includes(input)) {
                result = `<strong>✗ MISINFORMATION DETECTED:</strong> "${story.title}"<br><br>${story.content}<br><br><strong>Red Flags:</strong> ${story.redFlags}`;
                type = 'fake';
                break;
            }
        }
    }

    // No match found
    if (!result) {
        result = `<strong>❓ STORY NOT FOUND</strong><br><br>We don't have information about this story in our database. When verifying stories:<br>• Check multiple reliable sources<br>• Look for author credentials<br>• Verify the date and context<br>• Use fact-checking websites like Snopes, FactCheck.org, or PolitiFact`;
        type = 'unknown';
    }

    resultDiv.innerHTML = result;
    resultDiv.className = `verify-result show result-${type}`;
}

// Update last update timestamp
function updateLastUpdate() {
    const now = new Date();
    const dateString = now.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById('lastUpdate').textContent = dateString;
}

// Allow Enter key to verify
document.addEventListener('DOMContentLoaded', function() {
    const verifyInput = document.getElementById('verifyInput');
    if (verifyInput) {
        verifyInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                verifyStory();
            }
        });
    }
    initializePage();
});