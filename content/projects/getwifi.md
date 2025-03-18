+++
date = "2025-03-17"
title = "GetWiFi"
+++

GetWiFi is a small [Preact](https://preactjs.com) website that generates QR codes to connect to WiFi in the browser.
It is currently hosted at [getwifi.link](https://getwifi.link).

Unlike some similar websites, the QR codes are entirely generated in the browser.

Primarily the website was intended as a learning experience. Not only for building certain features and to become familiar with some `npm` packages, but also to keep bundle sizes as small as possible.

## Features

* In-browser WiFi QR code generation
* Dark mode (including toggling)
* Translations available for 20 of the most common languages
* Download to SVG or PNG
* One-click printing for the QR code

## Screenshot

![GetWiFi Screenshot](getwifi-screenshot.png)

## Development

Currently the feature set is stable and there is no intention to add any features.

The site is maintained and developed on [GitHub](https://github.com/sjp/getwifi-web)

## Tools and Libraries

This application was primarily built using the following:

* [Preact](https://preactjs.com/)
* [Vite](https://vite.dev/)
* [Pico CSS](https://picocss.com/)
* [qrcode.react](https://github.com/zpao/qrcode.react)
* [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n)
* [Biome](https://biomejs.dev/)

The choice of many of these libraries was to minimise the bundle size as much as possible.

Additionally the application is pre-rendered for fast initial page loads.
