---
layout: posts
title: knitr Support in Emacs (via ESS)
category: posts
---

During my recent switch from vim to Emacs I discovered what a wonderful tool [ESS](http://ess.r-project.org/) is. It was fantastic for writing `Rnw` documents using `Sweave`, but seeing as I'm currently attempting another switch, from `Sweave` to [`knitr`](http://yihui.name/knitr/), I wanted support for that.

After a quick look at the ESS source code, I was able to write a quick script that gives ESS support for `knitr`.

## Installation

<ul>
<li>Download the Emacs lisp script below.</li>
<li>Store it in a useful location, I stored it in the following path: <code>~/.emacs.d/ess-knitr/ess-knitr.el</code>.</li>
<li>Import the script in your <code>.emacs</code> file. My configuration is the following:
{% highlight cl %}
;; Add support for knit and purl
(add-to-list 'load-path "~/.emacs.d/ess-knitr/")
(require 'ess-knitr)
{% endhighlight %}
<strong>Note:</strong> This snippet should be included <em>after</em> the code that loads ESS.
</li>
</ul>


## Usage

* `M-n r` "knit" an `Rnw` document.
* `M-n u` "purl" an `Rnw` document.

## Download

* [`knitr` support in ESS](/files/ess-knitr.el)
