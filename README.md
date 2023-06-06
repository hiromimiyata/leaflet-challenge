# leaflet-challenge
Earthquake Visualization
This project focuses on visualizing earthquake data using Leaflet.js library. The dataset used is provided by the USGS (United States Geological Survey) and is updated every 5 minutes. The earthquakes are plotted on a map based on their latitude and longitude coordinates, with markers representing the magnitude and depth of each earthquake.

## Instructions
Part 1: Create the Earthquake Visualization
Get the dataset: Visit the USGS GeoJSON Feed page and choose a dataset to visualize. The dataset provides earthquake data in GeoJSON format, and you can select a specific dataset such as "All Earthquakes from the Past 7 Days".

Import and visualize the data: Using Leaflet.js and D3.js libraries, follow the steps below:

Use the URL of the selected dataset's JSON representation to fetch the earthquake data for visualization.
Create a map using Leaflet.js that plots all the earthquakes on the map based on their latitude and longitude coordinates.
Customize the data markers to reflect the magnitude of each earthquake through their size and the depth through their color. Larger markers represent higher magnitudes, and darker colors represent greater depths.
Include popups for each marker that provide additional information about the earthquake when clicked.
Create a legend that provides context for the map data, indicating the magnitude and depth ranges with corresponding marker sizes and colors.
Visualize the earthquakes: Your visualization should resemble the example map provided.

## Dependencies
This project relies on the following libraries and resources:

Leaflet.js: A JavaScript library for interactive maps.
D3.js: A JavaScript library for data visualization.
USGS GeoJSON Feed: The dataset used for earthquake data, updated every 5 minutes.
Make sure to include the necessary library files and have an internet connection to access the USGS GeoJSON Feed.

## Usage
To run the project, follow these steps:

Clone the repository or download the project files to your local machine.

Open the HTML file (index.html) in a web browser.

The map will be displayed, showing the earthquake visualization based on the selected dataset.

Interact with the map by clicking on the markers to view additional information about each earthquake.
