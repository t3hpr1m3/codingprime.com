---
title: Adapting to Mac
date: 2014-02-23
author: Josh Williams
layout: post.pug
---
I am a Linux guy.  Ever since my first install of RedHat 5.1, I've been hooked.
My home router/firewall is a [Gentoo box](http://www.gentoo.org), ffs.  For
servers, I've migrated from [VPSLink](http://vpslink.com) to
[Linode](https://www.linode.com), with a few one off droplets on
[DigitalOcean](http://www.digitalocean.com).  There isn't a machine in my
house that doesn't at least dual-boot Linux.  In fact, I inherited a Mac Mini
when one of the startups I joined closed its doors, and even it runs Linux.

For the last few years, my primary dev box has been my [ASUS behemoth](http://www.asus.com/ROG_ROG/G74SX/).
It's nowhere near an ultrabook, but it was mine.  Mine in the sense that it 
has become an extension of my hands.  It's heavy, it's massive, and I love it.

<!--more-->

The shop I just joined is pretty much Apple-happy.  Cinema displays, Powerbooks,
Time Capsules, the whole shebang.  On day 1, I was handed a [13" MacBook Air](http://support.apple.com/kb/SP670).
This thing is everything my ASUS isn't; small, lightweight, possibly even delicate.
Given that I've been using a split keyboard for the last 10 years or so, typing
on this keyboard feels...weird.

### When in Rome

Given all of the above, I figure the only solution to the problem is to just
go all in, using the MacBook exclusively for everything.  I'm not even going to
use a keyboard or mouse.  I'm just going to use a secondary cinema display for
increased desktop space while in the office.  I want to make sure I give this
machine a fair shake, without going all fanboi with a Magic Mouse and bluetooth
keyboard.

### Same, but different

A few of the features I've come to rely on (Exposé, multiple desktops, quick
application launch) are thankfully present.  iTerm is a decent terminal, and
[Solarized](http://ethanschoonover.com/solarized) works flawlessly.

There are a few oddities, though.  The backspace key is labeled "delete", and there
is no delete key (_fn_ + delete seems to work).  Also, the _control_, _option_,
and _command_ keys are kind of insane.  I'm still not entirely sure what they do,
but I know that _command_ takes the place of _ctrl_ in many operations (cut, copy, etc).

The dock is also a little strange.  Closing windows doesn't seem to "exit" the
application (it still shows up in the window list when alt+tabbing).

The ssh-agent also seems to be fairly unpredictable.  After a restart, I'm never sure
if it's active, and I usually don't find out until I'm trying to commit code
on some remote server.

[Homebrew](http://brew.sh) has helped tremendously.  For someone coming from the
world of package managers, installing from the CLI makes things seem familiar.  I'm
having a hard time resisting the urge to install Gentoo in a VM and do all my
development there.

### Work in progress

I plan on giving this at least a month before giving up.  Currently, my biggest
issue is that I actually have to think about what I'm trying to do, which sort
of prevents me from ever getting in the zone.  I'm sure that will get better
with time, so stay tuned.
