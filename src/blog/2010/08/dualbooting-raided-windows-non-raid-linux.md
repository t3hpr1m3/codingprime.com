---
title: Dual-booting Raided Windows/Non-Raid Linux
date: 2010-08-21 18:12
author: Josh Williams
layout: post.pug
---
If you're following along at home, I got my Gentoo install
[extracted](/blog/2010/08/moving-from-virtualbox-to-physical-disk) and running on physical
disk.  Now I have a problem to solve: Dual booting with Windows.  This is
only a problem because my Windows install is on a RAID0 array using an Intel
fakeraid controller.  I found all kinds of info on dual-booting Windows/Linux
while both are installed in the raid array, but nothing to help with my
situation.  So here we go.

### Attempt #1 :: GRUB on the Linux drive

My first attempt was to setup GRUB on the Linux drive, and tell the BIOS to
boot off that.  I knew I should add an entry to `grub.conf` to reference the
Windows drive and call `chainloader+`, but as I was typing it out I realized
that I didn't have a way to reference it.  My Spidey Sense&#0153; was telling
me I'd need an initrd with all the raid info in it, so GRUB would know how to
talk to the entire RAID drive.  That sounds like work.  Moving on.

<!--more-->

### Attempt #2 :: GRUB loaded from Windows boot.ini

Next, I tried [this](http://www.linux.com/archive/feature/113945) trick, which
has worked for me in the past.  This basically involves saving GRUB's MBR into
a file, and loading it up from Windows' boot.ini, so it shows up as a bootable
entry on startup.  So I created a grub.bin from my Linux drive, copied it over,
and added the entry to boot.ini.  After a reboot, I received the dreaded
`GRUB Error 21` (which, by the way, is the most frustrating error ever
conceived by man).  Strike 2.

### Attempt #3 :: GRUB on Windows MBR (Success!)

Once I thought about what I was trying to do, I realized the solution was to
just install GRUB in the MBR of the Windows RAID0 array.  This was a little
more involved, but much less painful than creating a hacky `initrd`.  So here
goes.

#### Install dmraid and generate your device mappings

You're going to need `dmraid` to allow Linux to see your RAID0
drives/partitions for what they are.  On Gentoo:

```bash
$ sudo emerge dmraid
```

A full explanation of dmraid is outside the scope of this post, and an exercise
I leave to the reader.  In a nutshell, it creates device nodes in `/dev/mapper`
that reverence your RAID drives/partitions.  On my system:

```bash
$ sudo dmraid -ay
$ ls /dev/mapper
control  isw_bbgfjaijea_Volume0  isw_bbgfjaijea_Volume01  isw_bbgfjaijea_Volume02
```

`isw_bbgfjaijea_Volume0` is the entire RAID array and
`isw_bbgfjaijea_Volume01/isw_bbgfjaijea_Volume02` are my Windows partitions.

#### Copy GRUB's MBR to Windows MBR + DOMINATE!

Rather than go to all the trouble of setting up GRUB's device mappings to get
the setup process to run, I took a shortcut.  I installed GRUB to the boot
partition on my Linux install (/dev/sdc1 in this case), and used `dd` to copy
that to the Windows MBR.

```bash
$ sudo grub
grub> root(hd2,0)
grub> setup(hd2,0)
grub> quit
$ sudo dd if=/dev/sdc1 of=/dev/mapper/isw_bbgfjaijea_Volume0 bs=512 count=1
1+0 records in
1+0 records out
512 bytes (512 B) copied, 3.8321e-05 s, 13.4 MB/s
```

At this point I shut down the machine, switched the BIOS to boot from the RAID
array as the primary boot device, and crossed my fingers.

Of course it didn't work!  I forgot to adjust the `grub.conf` to account for
the Linux drive being moved to the third physical slot (hd2 vs hd0) after I
plugged the Windows drives back in.  While I was fixing that, I also changed
the `fstab` file accordingly.  One more reboot, and SHAZAM!  It works.  It's
worth noting that my first attempt at doing to GRUB install/switcheroo
failed.  I installed it to the MBR of the entire drive (sdc), and after doing
the `dd` dance, the entire system refused to boot.  I'm not sure why, and
somebody is probably going to berate me for not knowing.  It works now,
so I'm finished.
