---
layout: posts
title: Building a Fileserver (or How I Learned to Stop Worrying and Love ZFS)
category: posts
published: false
---

I have built a fileserver to solve a growing data storage problem I had. In order to avoid any data loss, I was purchasing two hard drives whenever I wanted more storage, one as a master drive and one as a backup. To perform the backups I was simply using `rsync` to automatically mirror content from the master drives onto the backup drives. This needed to be done for my 1TB drives, 1.5TB drives and 3TB drives.

When I came across a post on [building a fileserver](https://mocko.org.uk/b/2012/06/17/how-i-store-my-1s-and-0s-zfs-bargain-hp-microserver-joy/) I realised I could also get an HP Proliant Microserver to do the same thing. I had been on the lookout for that form-factor for a while, which is perfect for my needs.

## FreeBSD, Installing & configuring

## Setting up ZFS & migration
### both wd15s easy, add to pool, mount ntfs, cp -R, resilver
### GPT bro
### wd3 add to pool, copy over network, add to pool, resilver
### Pool to mirrored pool
### Share NFS

https://docs.oracle.com/cd/E19082-01/817-2271/gcfhe/index.html

## Setting up AutoFS
### put up configs, but most importantly auto.fileserver
