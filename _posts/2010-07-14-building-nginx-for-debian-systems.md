---
layout: posts
title: Building nginx for Debian systems
category: posts
---

I was recently asked by [a friend](http://steelsky.co.nz/) to add a module to the [nginx](http://www.nginx.org/) web server that is serving both of our websites. Due to the fact that nginx statically links all of its modules into one binary, we cannot accomplish this in the typical Debian manner, i.e. something like `apt-get install nginx-modulename`. Because Debian doesn't provide builds that have the module he wanted, I had to apply the following solution, which required compiling my own nginx binary with the module he wanted.

The following instructions are going to be assuming that Debian Squeeze is being used (though it should work with any Debian-based distro), and that we going to be building nginx with the [H264 Streaming Module for Nginx (version 2)](http://h264.code-shop.com/trac/wiki/Mod-H264-Streaming-Nginx-Version2).

To build your own version of nginx, we will first create a temporary directory and navigate to it.

{% highlight console %}
$ mkdir custom-nginx
$ cd custom-nginx
{% endhighlight %}

Now we need to grab the source code for nginx, in Debian systems this is easy enough to do.

{% highlight console %}
$ apt-get source nginx
{% endhighlight %}

This will place 3 files and a folder in your current directory, you should see something like the following:

{% highlight console %}
$ ls
nginx-0.7.67                  nginx_0.7.67-3.dsc
nginx_0.7.67-3.debian.tar.gz  nginx_0.7.67.orig.tar.gz
{% endhighlight %}

As `nginx-0.7.67` is the folder containing our source code, navigate to it.

{% highlight console %}
$ cd nginx-0.7.67
{% endhighlight %}

If you wish to add a custom module not provided by nginx, download the source to the `modules` folder. A good list of third party modules is listed on the [nginx wiki](http://wiki.nginx.org/Nginx3rdPartyModules). I'll be providing instructions for the H264 Streaming Module.

{% highlight console %}
$ cd modules
$ wget http://h264.code-shop.com/download/nginx_mod_h264_streaming-2.2.7.tar.gz
$ tar -zxvf nginx_mod_h264_streaming-2.2.7.tar.gz
$ rm nginx_mod_h264_streaming-2.2.7.tar.gz
{% endhighlight %}

This should be sufficient for most modules, however this particular module doesn't compile without a small change to its source code.

{% highlight console %}
$ cd nginx_mod_h264_streaming-2.2.7/src
$ vim ngx_http_streaming_module.c
{% endhighlight %}

You'll need to comment out the following code, it's found around line 157.

{% highlight c %}
/* TODO: Win32 */
if (r->zero_in_uri)
{
    return NGX_DECLINED;
}
{% endhighlight %}

You should end up with something that looks something like this:

{% highlight c %}
/* TODO: Win32
if (r->zero_in_uri)
{
    return NGX_DECLINED;
}
*/
{% endhighlight %}

Save the file and quit `vim`. Now we need to modify the parameters that are passed to the `configure` script. To do this, you will need to navigate to the `debian` directory found in your `nginx-0.7.67` directory. We'll need to modify the `rules` file to pass in the configuration options we want when building nginx.

{% highlight console %}
$ vim rules
{% endhighlight %}

Scroll down the `rules` file until you reach roughly line 24. Here you'll see all of the configuration options that are going to be used when compiling nginx. If you wish to enable or disable modules that are distributed with nginx have a look through [a reference on the nginx wiki](http://wiki.nginx.org/NginxModules). These are reasonably easy to use, just add a line to the `rules` file as given by a couple of examples below.

{% highlight bash %}
--without-http_empty_gif_module \
--with-google_perftools_module \
{% endhighlight %}

Here we are ensuring that nginx compiles with the Google Perftools module, while the Empty GIF module is going to be excluded. Of note is the `\` at the end of the line, make sure that this is included.

The previous examples only covered modules that are provided by nginx, we want to include the H264 Streaming Module, this can be done by adding the following snippet:

{% highlight bash %}
--add-module=$(CURDIR)/modules/nginx_mod_h264_streaming-2.2.7 \
{% endhighlight %}

Once you have provided all of the configuration options you think you'll need for nginx, save the `rules` file. Nginx has now been prepared, ready to be compiled. We now need to get all of the software and libraries needed for nginx to be built. Fortunately this is quite simple on a Debian system (Note: you will need to be root for this step):

{% highlight console %}
# apt-get build-dep nginx
{% endhighlight %}

Now the package can be built, all we need to do now is to navigate to the `nginx-0.7.67` directory and then run the following command:

{% highlight console %}
$ dpkg-buildpackage
{% endhighlight %}

Your custom nginx Debian package (hopefully) will have been built, it will be located in the directory above your nginx source directory, in my case it's located in the directory named `custom-nginx`. Installing the package is simple enough, though it does require superuser privileges. To install your new nginx package and run nginx, you only have two more steps:

{% highlight console %}
# dpkg -i nginx_0.7.67-3_amd64.deb
# /etc/init.d/nginx start
{% endhighlight %}

Hopefully these instructions have been helpful to somebody. For those who are interested, I'm making my binary available for download, [nginx_0.7.67-3_amd64.deb](/files/nginx_0.7.67-3_amd64.deb). The only extra module that this has over the default Debian Squeeze binary is the H264 Streaming Module.

