+++
date = "2010-03-02"
title = "NormalLaplace"
+++

I was fortunate to undertake a summer studentship with the University of Auckland's [Department of Statistics](https://www.stat.auckland.ac.nz/) over the summer of 2010--2011. My project was entitled "Software for the Normal Laplace Distribution". The purpose of this project was to improve upon the functionality present in the NormalLaplace package that was available via the [Rmetrics group on R-Forge](https://r-forge.r-project.org/R/?group_id=156). What was present prior to my involvement were functions that calculated theoretical means, variance, skewness and kurtosis in a Normal Laplace (NL) distribution. The standard "dpqr" functions were also present, these are the density, cumulative distribution, quantile and random number generating functions respectively.

A parameter checking function was created in order to validate NL parameters, along with a fitting function that included appropriate S3 methods on the fitted object (e.g. `plot`, `coef`, `summary`).

The NormalLaplace package was then extended to include functions for the Generalised Normal Laplace (GNL) distribution. The same functionality that was implemented for the NL distribution was also implemented for the GNL distribution. The GNL distribution adds an additional parameter, rho, on top of the existing NL parameters and acts as a scaling parameter. Complications arose when implementing the density and cumulative distribution functions for the GNL distribution as they required inversion of the GNL characteristic function and numerical evalution of integrals. This was necessary due to the lack of closed form expressions for these functions. A consequence of this is that calculation is both slow and somewhat inaccurate. On top of this, the characteristic function returns complex numbers and R's `integrate` function only works over one dimension. This means that the characteristic function required modification for both the density and cumulative distribution functions in order to return real numbers and allow numerical evalution using the `integrate` function.

Definitions of the density, cumulative distribution function and random number generating functions are provided below.

<div>$$\phi(s)=\left(\frac{\alpha \beta e^{-\sigma^2s^2/2}}{(\alpha - is)(\beta + is)}\right)^{\rho}$$</div>

<span>$r(s)$</span> and <span>$\theta(s)$</span> are defined as the modulus and argument of the complex number returned from the characteristic function.

<div>$$f(x - \mu)=\frac{1}{\pi} \int_0^\infty r(s)cos(\theta(s) - sy)ds$$</div>

<div>$$F(x - \mu)=\frac{1}{2} + \frac{1}{\pi} \int_0^\infty \frac{r(s)}{s} sin(sx - \theta(s))ds$$</div>

Generation of random observations from the GNL distribution is based upon the composition of three random variables, <span>$Z$</span>, <span>$G_1$</span> and <span>$G_2$</span>. These are independent with <span>$Z \sim N(0, 1)$</span> and <span>$G_1$</span>, <span>$G_2$</span> being gamma random variables with a scale of 1 and a shape of <span>$\rho$</span>.

A GNL random variable, $X \sim \textrm{GNL}(\mu, \sigma, \alpha, \beta, \rho)$ can be represented as:

<div>$$X = \rho\mu + \sigma\sqrt{\rho}Z + \frac{1}{\alpha}G_1 - \frac{1}{\beta}G_2$$</div>

Mean, variance, skewness and kurtosis functions were implemented for the GNL distribution and are defined below:

<div>$$\textrm{E}(X)= \rho\left(\mu + \frac{1}{\alpha} - \frac{1}{\beta}\right)$$</div>

<div>$$\textrm{Var}(X)= \rho\left(\sigma^2 + \frac{1}{\alpha^2} + \frac{1}{\beta^2}\right)$$</div>

<div>$$\Upsilon = \frac{k_3}{k_2^{\frac{3}{2}}} = \frac{2(\beta^3 - \alpha^3)}{\rho^{\frac{1}{2}}(\sigma^2\alpha^2\beta^2 + \alpha^2 + \beta^2)^2}$$</div>

<div>$$\Gamma = \frac{k_4}{k_2^2} = \frac{6(\alpha^4 + \beta^4)}{\rho(\sigma^2\alpha^2\beta^2 + \alpha^2 + \beta^2)^2}$$</div>

<script async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML">
    MathJax.Hub.Config({
        extensions: ["tex2jax.js"],
        jax: ["input/TeX","output/HTML-CSS"],
        tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]}
    });
</script>