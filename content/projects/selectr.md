+++
date = "2012-12-24"
title = "selectr"
+++

The selectr package for [R](https://www.r-project.org/) parses [CSS3
Selectors](https://www.w3.org/TR/css3-selectors/) and translates them
to [XPath 1.0](https://www.w3.org/TR/xpath/) expressions. It is an R
port of the [cssselect](https://pythonhosted.org/cssselect/) package
for Python. Development occurs on GitHub in the [selectr](https://github.com/sjp/selectr)
repository.

The main purpose of this package is to make working with (X)HTML and
XML documents easier within R. The [XML](http://www.omegahat.org/RSXML/)
and [xml2](https://github.com/hadley/xml2) packages are typically used
when working with these documents, but they can only select content based
on XPath expressions. By translating CSS selectors to XPath, we can use
the more familiar CSS selectors instead of XPath.

## Download

To use selectr, all that is necessary is to run the following command
as selectr is available on
[CRAN](https://cran.r-project.org/package=selectr):

{{< highlight r >}}
install.packages("selectr")
{{< /highlight >}}

## Usage

The most basic and flexible function provided by selectr is
`css_to_xpath()`. It simply translates a vector of CSS Selectors to
their equivalent XPath expressions.

{{< highlight r >}}
> library(selectr)
> css_to_xpath("div > a")
[1] "descendant-or-self::div/a"
> css_to_xpath("div:nth-child(2) > a")
[1] "descendant-or-self::div[count(preceding-sibling::*) = 1]/a"
{{< /highlight >}}

A common task is to search for matching nodes within a
document. selectr makes this task easier by mimicking the behaviour of
DOM methods present in JavaScript
([`querySelector()`](https://developer.mozilla.org/en-US/docs/DOM/Document.querySelector)
and
[`querySelectorAll()`](https://developer.mozilla.org/en-US/docs/DOM/Document.querySelectorAll)).

{{< highlight r >}}
> fileName <- system.file("exampleData", "test.xml", package="XML")
> mydoc <- xmlParse(fileName)
> querySelector(mydoc, "a")
<a>
  <!-- A comment -->
  <b> 
    %extEnt;
  </b>
</a> 
> querySelectorAll(mydoc, "code")
[[1]]
<code>
xmlTreeParse("test.xml", replaceEntities = TRUE)
</code> 

[[2]]
<code>
xmlTreeParse("test.xml")
</code> 

attr(,"class")
[1] "XMLNodeSet"
{{< /highlight >}}

## Further Information

A [technical report](/projects/selectr/selectr.html)
has been created that describes this package in more detail. It also
contains examples on how you would use selectr.

The package documentation also goes into more detail on the usage of
each particular function.
