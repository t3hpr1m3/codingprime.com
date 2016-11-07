---
title: Musings on Gentoo
date: 2016-10-22
author: Josh Williams
layout: post.pug
draft: true
---
Hi.  My name is Josh, and I love [Gentoo](https://gentoo.org).
I love Gentoo.
As a software guy, I'm always thinking about new things to build, 
I'm constantly on the hunt for new 
A little over a year ago, I bought one of these little gems on sale for $99, and
immediately tried throwing Gentoo on it.  I failed miserably.  Kernel support
wasn't quite up to par, so there were a lot of bits that either didn't work
(like bluetooth and sound), or were really buggy (hibernation didn't really
work, the machine locked up constantly), so I reluctantly put it on the shelf.
Lately, I've been doing all of my development remotely, on a dev machine running
on my local [OpenStack](https://www.openstack.org/) cluster.  This means that
the local hardware I'm using is less and less important (all I really need is
terminal, browser, and slack)

<!--more-->

### Startups are still cool
When last we met, I was just starting to fall in love with my new Macbook Air,
and getting settled into my new job working for a startup again.  During my time
there (which ended in January), I built lots of apps, did quite a bit of DevOps
things, and just generally settled into the culture.  It was quite refreshing,
having spent the last few years in a very corporate environment.

### Tech is moving REALLY fast
This is exciting, but can also be extremely frustrating.  For someone like me,
who considers things like best practices to be extremely important to producing
quality product, the pace at which things tend to change at the paradigm level
is a bit unnerving.  Take isomorphic (recently relabeled as
[universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.19v96xwxh))
javascript.  On the surface, this sounded like the most amazing idea in the
history of amazing ideas (not because Javascript is good, but because isomorphic
apps have been something I've begged my genie for).  Having looked at countless
apps built using libraries like React.js, I've come to the conclusion that being
first to market has become much more important than making sure the tooling is
solid and easily testable/supportable/understandable.

### DevOps got its sexy (back?)
I still remeber the days when admins had their toolbox of system-fu they carried
with them on a usb-stick or (gasp!) CD-ROM.  It was their secret set of
preferred scripts to help automate some of the more mundane aspects of systems
administration.  Fast-forward to today, and the landscape is much more pleasing
to the eye.  Tools like Ansible and Terraform, while not perfect, make building
reproducible systems at scale seem like childs play.  Add in some Kubernetes, or
even just plain Docker, and you've got infrastructure that's almost a joy to
manage.  And monitoring?  NewRelic. Prometheus.io. DataDog.  There's a veritable
cornucopia of goodies available for building out the "system around the system".

### Simpler is still better
Even with newer toys like [Atom](https://atom.io/) making an appearance, I
still feel like tried and tested tools, like vim and tmux, make for the best,
most universally available development environment around.  A buddy recently
showed me a screenshot of tmux+vim running on his Windows desktop using Docker.
Its not something I'd ever do, but it does illustrate that ubiquity is really
important.

### The new hotness
This was a rambling post, mainly because my brain is elsewhere right now.  I've
got several things in the process of being completed, and plan on documenting
them all.  Expect more newness (and less black holes in posting) soon.
