+++
date = "2010-02-23"
title = "GeneralizedHyperbolic"
+++

Over the summer of 2009--2010 I undertook a summer studentship at the University of Auckland [Department of Statistics](https://www.stat.auckland.ac.nz/). The project I undertook was to create a new package called GeneralizedHyperbolic based on [David Scott's](https://www.stat.auckland.ac.nz/~dscott/) [HyperbolicDist](https://cran.r-project.org/package=HyperbolicDist) package.

What the GeneralizedHyperbolic package does is it provides functions for use with the [generalised hyperbolic distribution](https://en.wikipedia.org/wiki/Generalised_hyperbolic_distribution) and related distributions. These functions include probability, density, quantile, fitting, checking and random observation generating functions.

The result of my work has been posted up on [GeneralizedHyperbolic](https://github.com/sjp/GeneralizedHyperbolic). Since undertaking this work GeneralizedHyperbolic has become available on [CRAN](https://cran.r-project.org/package=GeneralizedHyperbolic). To install the package run the following command within R: `install.packages("GeneralizedHyperbolic")`.

Once the package has been installed, using it is as simple as running R, then loading the package using `library(GeneralizedHyperbolic)`. Example usage is as follows:

{{< highlight r >}}
> library(GeneralizedHyperbolic)
> dghyp(2)
[1] 0.08878272
> dghyp(0)
[1] 0.3055948
> dghyp(3, mu = 4)
[1] 0.2019553
> dghyp(3, mu = 4, alpha = 3)
[1] 0.1789202
> ghypdata <- rghyp(1000)
> fitteddata <- hyperbFit(ghypdata, hessian = TRUE)
> summary(fitteddata) # Printing fitted parameters & std errors

Data:      ghypdata
Parameter estimates:
       mu        delta       alpha        beta
   -0.02921     0.57314     0.94262    -0.03066 
  ( 0.08689)  ( 0.19332)  ( 0.05222)  ( 0.03881)
Likelihood:         -1852.273
Method:             Nelder-Mead
Convergence code:   0
Iterations:         169
{{< /highlight >}}

I have created some extra code to go with this package that allows visualisation of the generalised hyperbolic distribution. Note, the slider tool was sourced from the [fBasics](https://cran.r-project.org/package=fBasics) package. With this tool, you can modify each parameter by moving a slider and noting the effects that this has. You can grab the code to do this at my [GHyp Slider gist](https://gist.github.com/311889).

Here is an example of the visualisation:

![Generalised hyperbolic distribution visualisation](images/ss-ghyp-slider.png)
