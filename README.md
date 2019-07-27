# Robohash SVG

SVG+JS Identicons based on [Robohash](https://robohash.org). 
The original library is designed to run on a server while _Robohash SVG_ is designed to run in browsers. 

1.8K of JS + 94K of SVG = **10,000,000** unique robots.

![Robohash](./robohash-1.png)

This was an open source contribution by [Nimiq - the browser-based blockchain](https://nimiq.com)

It has been revived and cleaned up by Elvis Wolcott.

## Usage
 1. Import the module 
    ```
    import Robohash from '/path/to/robohash.min.js'
    ```
 1. Configure
    ```
    const rh = new Robohash(options);
    ```
 1. Render
    ```
    rh.render(text, el);
    ```
## Options

* `path`: The path to the spritesheet.

  default: `''`

* `background`: An array of **10** background colors to use.

  default: `[ '#58DDB1', '#58DDB1', '#EB8DFF', '#FF9E80', '#FF8A80', '#FFD869', '#FF8A80', '#8c9eff', '#FF9E80' ]`

* `foreground`: An array of **10** foreground colors to use.

  default: `['#ff9800', '#E53935', '#FDD835', '#2745C4', '#03a9f4', '#9c27b0', '#11A387', '#EA2D75', '#82C11F', '#913C29' ]`

* `matchColors`: Wether to use the same index for foreground and background color. 
Enabling allows you to choose color combinations you like but reduces the number of combinations by a power of 10

  default: `true`

## Demo
Clone the repository and open `index.html`.

## Build

`npm run build`

Optimizes the svg in `src` into a spritesheet and transpiles the JS to ES5.

## Bonus: generate as images (CLI)

```bash
node render-batch.js
```

### Options

* `-count`: How many robohashes to generate.

  default: `10`

* `-format`: The file type to save as. `png | jpeg`

  default: `png`

* `-out`: The output directory.

  default: `./`

* `-size`: The size (in pixels) of the images.

  size: `256`

* `-base`: The base URI where `render.html` is served. Use `npx http-server` if you don't have a local server.

  default: `http://127.0.0.1:8080`
  
![Robohash](./footer.png)