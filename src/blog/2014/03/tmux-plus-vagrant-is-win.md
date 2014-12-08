---
title: Tmux + Vagrant = win!
date: 2014-03-16 16:33
author: Josh Williams
template: post.jade
---
In my quest to [become one with my Air](../adapting-to-mac/), I've been in
search of the best tooling to keep my workflow smooth.  I did some playing
around with MacVim, running rbenv in OSX, and various IRC clients.  After
a lot of hand-wringing and head-scratching, I think I've come up with the
best solution.

### Cheaters always win!

My fix is to give up and give in.  [Vagrant](https://www.vagrantup.com/) to
the rescue!  In all fairness, the choice to use Vagrant was sort of a team
decision.  We have quite a few devs, and find a way for them to work
consistently seems like the perfect use case for Vagrant.  So for
day-to-day work, I spin up the project specific VM using the Vagrantfile in
the repo, then just pull in [my dotfiles](https://github.com/t3hpr1m3/dotfiles)
using [homeshick](https://github.com/andsens/homeshick).  This workflow
allows me to always work in a consistent environment, no matter where I'm
working from (even from a Putty session).

<!--more-->

### GUI Gotta Go!

In my quest to find the ultimate dev environment, I decided that, optimally,
I should only need 2 windows open at any given time: a terminal and a browser.
In order to accomplish this, I had to find console based replacements for
everything I currently had gui apps for.  This list included:

* Colloquy (IRC)
* Mail (duh)
* Pandora (yeah, I'm one of those people)

[Irssi](http://irssi.org/) filled the first need nicely, as I've used it
extensively in the past.  I should have been using it anyway.

[Mutt](http://www.mutt.org/) took care of mail.  I still have Gmail running
in a browser window for complicated attachments and alternate accounts, but
Mutt is my primary mail reader, and it works great.

Pandora was a little harder, but I was finally able to get
[pianobar](http://6xq.net/projects/pianobar/) working, and working well.  I was
finally ready to commit to using the terminal to handle everything.  The
problem was visibility.  Constantly switching tabs to check email or skip a
song was becoming a huge chore.  There had to be a better way.  Then I remembered
multiplexers.

### Tmux is the new screen

I've been using [screen](http://www.gnu.org/software/screen/) for years to
crank up long-running processes on servers, so my terminal wasn't tied up 
waiting for some 12 hour database rebuild to finish, only for the connection
to drop at 99.7%, forcing me to start the whole thing over again.  I had also
used it to do some quick and dirty pair programming, but nothing fancy.

I rediscovered [tmux](http://tmux.sourceforge.net/), pushed through the initial
pain of learning something new, and found the awesomeness that is true
multiplexing.

![Tmux is AWESOME!](http://i.imgur.com/4helvtT.png)

It took some getting used to, and my setup would require a post all on its own,
but I'm back to being productive again.
