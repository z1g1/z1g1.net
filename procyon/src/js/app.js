/**
 * Procyon Sector Navigation Console
 * Main application JavaScript file
 */

// Wait for the DOM and all resources to be fully loaded
window.addEventListener('load', function() {
    // Global variables
    let objectsData = null;  // Will store the loaded objects data
    let panzoomInstance = null;  // Will store the panzoom instance

    // DOM Elements
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');
    const mapContainer = document.getElementById('map-container');

    /**
     * Loads and parses the objects data from the JSON file
     * This data contains information about systems, planets, and notable locations
     */
    fetch('assets/data/objects.json')
        .then(response => response.json())
        .then(data => {
            objectsData = data;
            console.log('Objects data loaded successfully');
        })
        .catch(error => {
            console.error('Error loading objects data:', error);
        });

    /**
     * Displays object data in the modal
     * @param {string} id - The ID of the object to display
     */
    function showObjectData(id) {
        if (!objectsData || !objectsData[id]) {
            console.warn(`No data found for object with ID: ${id}`);
            return;
        }
        
        const object = objectsData[id];
        modalTitle.textContent = object.name;
        
        // Build the content HTML
        let content = `<p>${object.description}</p>`;
        
        // Add notable places for systems
        if (object.type === 'system' && object.notable_places) {
            content += '<h3>Notable Places</h3>';
            for (const [placeId, place] of Object.entries(object.notable_places)) {
                content += `<p><strong>${place.name}:</strong> ${place.description}</p>`;
            }
        }
        
        // Add notable figures if they exist
        if (object.notables) {
            content += '<h3>Notable Figures</h3>';
            for (const [notableId, notable] of Object.entries(object.notables)) {
                content += `<p><strong>${notable.name}:</strong> ${notable.description}</p>`;
            }
        }
        
        modalContent.innerHTML = content;
        modalOverlay.classList.add('active');
    }

    // Modal event listeners
    modalClose.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
        }
    });

    /**
     * Loads and initializes the SVG map
     */
    fetch('assets/images/procyon-sector-map.svg')
        .then(response => response.text())
        .then(svgText => {
            mapContainer.innerHTML = svgText;
            
            // Get the SVG element
            const svg = mapContainer.querySelector('svg');
            
            // Calculate initial scale to fit the container
            const bbox = svg.getBBox();
            const containerWidth = mapContainer.clientWidth;
            const containerHeight = mapContainer.clientHeight;
            
            // Calculate scale to fill container while maintaining aspect ratio
            const scaleX = containerWidth / bbox.width;
            const scaleY = containerHeight / bbox.height;
            const initialScale = Math.max(scaleX, scaleY) * 1.1; // Add 10% padding
            
            // Initialize panzoom with configuration
            panzoomInstance = panzoom(svg, {
                maxZoom: 8,
                minZoom: initialScale, // Prevent zooming out beyond initial scale
                bounds: true,
                boundsPadding: 0.1,
                zoomDoubleClickSpeed: 1,
                smoothScroll: false,
                zoomDoubleClick: true, // Enable double-click to zoom
                zoomDoubleClickSpeed: 1.5 // Zoom factor for double-click
            });

            // Add touch event handlers
            mapContainer.addEventListener('touchstart', panzoomInstance.handleTouchStart);
            mapContainer.addEventListener('touchmove', panzoomInstance.handleTouchMove);
            mapContainer.addEventListener('touchend', panzoomInstance.handleTouchEnd);

            // Add mouse wheel handler
            mapContainer.addEventListener('wheel', panzoomInstance.zoomWithWheel);

            // Add click handlers to interactive regions
            svg.querySelectorAll('rect[id]').forEach(rect => {
                // Style the interactive regions
                rect.style.fill = 'rgba(255, 255, 0, 0.1)';
                rect.style.cursor = 'pointer';
                
                // Add click handler
                rect.addEventListener('click', function(event) {
                    const id = this.getAttribute('id');
                    showObjectData(id);
                    event.stopPropagation(); // Prevent zoom on click
                });

                // Add touch handler for mobile
                rect.addEventListener('touchend', function(event) {
                    const id = this.getAttribute('id');
                    showObjectData(id);
                    event.stopPropagation(); // Prevent zoom on touch
                });
            });

            // Center the map in the viewport
            const centerX = (containerWidth - bbox.width * initialScale) / 2;
            const centerY = (containerHeight - bbox.height * initialScale) / 2;
            
            // Set initial transform
            panzoomInstance.transform({
                scale: initialScale,
                x: centerX,
                y: centerY
            });

            console.log('Map initialized successfully');
        })
        .catch(error => {
            console.error('Error loading SVG map:', error);
        });
});
