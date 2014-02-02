---
layout: default
title: TimingManager
category: projects
---

The TimingManager library is a tool written in JavaScript used to
apply animations in a web browser. It is not concerned with creation
or modification of animations, it delegates those tasks to
[R](http://www.r-project.org/) via the {% ghr pmur002 animaker animaker %} package.
Primarily TimingManager is focused on assigning
actions to existing animations, then playing animation sequences using
either a declarative or frame-based approach. In other words, use
animaker to *describe* animations, then use TimingManager to assign
actions and play them.

TimingManager depends on the [Underscore](http://underscorejs.org/)
JavaScript library for utility functions and ensuring adequate support
in multiple browsers.

Development occurs on GitHub in the {% ghr sjp TimingManager TimingManager %} repository.

## Download

* [Development version](https://raw.github.com/sjp/TimingManager/master/timing.js) (*4.99kB*, uncompressed and commented)
* [Production version](/projects/timing-manager/timing.min.js) (*600B*, minified and gzipped)

## Documentation

The documentation for using TimingManager in JavaScript is available
in two forms. The first of which is [API
documentation](/projects/timing-manager/docs/). The second is a
[technical report](/projects/timing-manager/timing-manager.html) which
demonstrates the steps necessary to use TimingManager correctly.

In addition, the use of animaker is required for using TimingManager
correctly. For more information about animaker, a [technical
report](https://www.stat.auckland.ac.nz/~paul/Reports/animaker/animaker.html)
is available.

## Example

A complete example is available in a [technical
report](/projects/timing-manager/timing-manager.html) on
TimingManager. It also describes how to use animaker for usage in
conjunction with TimingManager.
