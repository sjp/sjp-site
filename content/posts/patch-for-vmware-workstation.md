+++
date = "2011-09-18"
title = "Patch for VMware Workstation"
+++

Upon returning back to my desktop after a small period of absence I needed to boot into my Windows VM via VMware Workstation (7.1.4 build-385536). Due to recent kernel updates in Debian Testing (to kernel version 3.0), VMware modules broke. Unfortunately any attempt to build these modules was unsuccessful.

VMware should be able to provide point releases or at least patches to allow for compilation on newer kernels but do not do so. Presumably this is because they wish to test releases of the kernel heavily before pushing out updates.

Fortunately I was able to Google myself onto [a blog post](http://weltall.heliohost.org/wordpress/2011/05/14/running-vmware-workstation-player-on-linux-2-6-39-updated/) that provided a patch suitable for Linux kernel 2.6.39. This patch failed to apply on my installation. Not quite sure why this is the case because the VMware installation should largely be the same regardless of the host's distribution of Linux.

I was able to modify the patch to be able to successfully patch all of the module sources. This allowed me to build VMware modules and run VMware Workstation without any issues.

I am providing the patch and modified installation script below:

* [Module installation script](/files/patch-modules-3.0.sh)
* [VMware module patch for Linux kernel 3.0](/files/vmware-3.0-modules.patch)
