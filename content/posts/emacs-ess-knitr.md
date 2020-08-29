+++
date = "2012-05-22"
title = "knitr Support in Emacs (via ESS)"
+++

{{< important >}}The latest version of ESS now includes support for `knitr`. This script is no longer necessary.{{< /important >}}

During my recent switch from vim to Emacs I discovered what a wonderful tool [ESS](http://ess.r-project.org/) is. It was fantastic for writing `Rnw` documents using `Sweave`, but seeing as I'm currently attempting another switch, from `Sweave` to [`knitr`](http://yihui.name/knitr/), I wanted support for that.

After a quick look at the ESS source code, I was able to write a quick script that gives ESS support for `knitr`.

## Installation

* Download the Emacs lisp script below.
* Store it in a useful location, I stored it in the following path: `~/.emacs.d/ess-knitr/ess-knitr.el`
* Import the script in your `.emacs` file. My configuration is the following:

{{< highlight cl >}}
;; Add support for knit and purl
(add-to-list 'load-path "~/.emacs.d/ess-knitr/")
(require 'ess-knitr)
{{< /highlight >}}

**Note:** This snippet should be included *after* the code that loads ESS.

## Usage

* `M-n r` "knit" an `Rnw` document.
* `M-n u` "purl" an `Rnw` document.

## Download

* [`knitr` support in ESS](/files/ess-knitr.el)
