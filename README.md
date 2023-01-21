# Image to Character Grid

[![Try the demo](https://img.shields.io/badge/Try-Demo-blue.svg)](https://demos.apikridas.com/image-to-character-grid)

This project is a simple JavaScript application that allows you to convert an image into a character grid. The application works by downsampling the image, which allows it to determine the average brightness and color of each character in the grid.

## Demo 

Check out the live demo of the project [here](https://demos.apikridas.com/image-to-character-grid)

![Project screenshot inside a browser](/img/demo.png)

## How to Use

1. Choose an image from your computer or use your computer camera to see the live image
2. Customize your options (Optional):
    - Turn on/off output image dark background
    - Turn on/off the character color
    - You could also try changing the character set

## How It Works

[Downsampling](https://en.wikipedia.org/wiki/Downsampling_(signal_processing)) is the process a reducing the resolution of a data input, by taking the average of a group of data points, and representing them with a single data point. In our case, the image is split into a grid of areas. Every area will be displayed as a single character of the output.

![Project screenshot inside a browser](/img/downsampling.png)

For every area, both the average brightness and the average color are computed. The average brightness gives the output character (based on a character set ordered by size/density). The average color give the color of that character.

## Local Installation

This is a simple static HTML/JS project. Using a simple local server is preferred as modern browsers may have security restrictions in place that prevent certain features from being used when running from a local file URL.

1. Clone or download the project
2. Host on your local server
3. Based on your browser you may need to toggle some settings to allow camera access permission from localhost