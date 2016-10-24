---
title: Evolution of a Dev (Part 1)
date: 2014-01-19 08:25
author: Josh Williams
layout: post.pug
---
I am a career developer.  That makes me extremely lucky, since I get to earn
a living doing the kind of things I'd be doing anyway.   Basically, I have
the coolest hobby in the world, and I get paid for it.

I've changed jobs many, many times in my career, and it's hardly ever been for
the same reasons.  Sometimes (usually), there has been an increase in salary
involved.  Others, it was an opportunity to move into a different environment,
be that technology used, ethos, or a new role to try out.  A few times, it
wasn't even a choice (early termination due to philosophical differences would
be a kind way of putting it).

Tomorrow, a new challenge awaits, in a new place, with a lot of new faces.
Starting a new job always triggers a bit of reflection (probably because
the process involves reviewing your resume), and this time is no exception.
I know I'm not unique, but that's kind of the point.  I've been around a lot
of devs throughout the course of my career, and (for the most part) it's fairly
easy to tell where they are in their evolution.

<!--more-->

### Prologue
My own journey really began back in the 80's, hacking away on the family's
[Commodore VIC-20](http://en.wikipedia.org/wiki/Commodore_VIC-20).  I had almost
no idea what I was doing, but something about making a machine interact with
you, even though it was entirely scripted, blew my mind.

```basic
10 INPUT "What is your name?", NAME$
20 PRINT "Hello, "; NAME$
30 END
```

I upgraded to an IBM 8088 my Dad "borrowed" from the government, and started
writing things that were a bit more complicated, using dBase to build address
books and accounting registers.  Nothing worth sharing, but cool enough to
show me, even then, that a computer guy (I didn't even know what they were
called back then) was what I wanted to be when I grew up.

### career.engage()
My first real job in computers came in 1995, when I got a job as an operator
in the Data Processing Department for the local county government (as an aside,
I was working as a jailor across the street when I accepted the job).  The
shop consisted of an [IBM System/36](http://en.wikipedia.org/wiki/IBM_System/36),
[AS/400](http://en.wikipedia.org/wiki/IBM_System_i), and a really, really
shitty PC running [Novell Netware](http://en.wikipedia.org/wiki/NetWare).  By day,
I took care of a number of fairly mundane non-programming tasks.

* changing tapes and catalogging their use
* making and replacing twinaxial, coaxial, and cat3 cables
* troubleshooting issues on the few actual PC's that existed
* babysitting the Netware server (seriously, it was shit)

By night (and during dead times during the day), I taught myself as much
[OCL](http://en.wikipedia.org/wiki/Operational_Control_Language),
[CL](http://en.wikipedia.org/wiki/IBM_i_Control_Language),
[RPGII](http://en.wikipedia.org/wiki/IBM_RPG_II),
and [DOS](http://en.wikipedia.org/wiki/Batch_file) as I possibly could.  I
wrote programs to track inventory, automated the backup process as much as
possible, and just generally soaked it all in.  I knew absolutely nothing
about best practices, memory optimization, or even computer architecture.
I just wrote code.

I was beginning to start a family, so my expenses (as well as my thirst for
knowledge) were beginning to outgrow the job.  I moved on to a sort of _super-operator_
position with a [Fortune 100 company](https://www.internationalpaper.com/), where
about half of my job consisted of ops work and simple automation type
programming tasks.  It was all still CL and RPG, but I was developing.  It was
this period in my career that I was introduced to 2 technologies that would
shape the remainder of my career: [Java](http://www.java.com/en/) and
[Linux](https://www.kernel.org/).

### Java: love at first sight
The guy I shared a cubical with was about 60, and loved his Range Rover.  I mean
really loved it.  I'd say 20-30% of his day was spent relaying stories about
how he tracked down parts, or what clubs he belonged to, or how everyone should
own one, or how awesome it was to have sex with it.  I'd like to say he made up
for this by being a fountain of technical knowledge, but alas, he was a
converted stock broker or something (I was young and didn't really understand...I
know it had something to do with money).  He hunted and pecked on his keyboard
with these sausage fingers, and took *forever* to do anything.  I didn't hate him,
I just never fully understood why he was there.  It wasn't his passion, obviously.

One day, however, he revealed to me that he had been trying out this new thing called
Java.  With it, he had created a calculator or something equally boring.  He
tried to explain how it worked, but
1. He was about as captivating as an oak sapling, and
2. I don't think he really understood wtf he was doing.

I did pick up on the important points, though.  First, this was programming I
could do *ON MY OWN*.  No [midrange](http://en.wikipedia.org/wiki/Midrange_computer)
required.  Have PC, will travel.  I don't want to over-dramatize the moment, but
it really was life changing.

Secondly, I realized if this guy could "get it", surely I could figure it out.
All I needed was a decent resource to help guide me through the learning
process.  I honestly don't remember where I got it, but I acquired a Core Java
book, and tore through it like I was going to be tested on the entire thing.
I wasn't very good, but I was writing a prolific amount of really bad code.
It was awesome.  For the first time, I could actually write a program and show
people I know the results.  I consider this the point where I really decided
programming was what I wanted to do.

### Linus is my hero
At the other end of the spectrum, there was David (I really, really, really
wish I could remember David's last name, because he changed my life).  David
worked with me on the ops side of things, working to keep the mix of AS/400,
AIX, and Mainframe systems running.  We had a good time finding better ways
to perform otherwise mundane tasks (using programming, of course), but our
tinkering was limited to work hours.  Then, one day, the company acquired a
competitor, and we were tasked with assimilating their fleet of HP/UX machines
into our datacenter.  On the outside, these systems looked almost the same
as the rest of the lot.  But once we were at the terminal, the landscape
was entirely different.  Instead of the very single purpose languages of
the other systems, these Unix machines felt almost limitless.  The systems
were malleable.  This was also my first experience with both Bash and C, both
of which felt amazing.  But I was still only able to monkey around with things
as long as I was in the office.

Then, one day, David walked up to me with a CD he had obviously burned.  Written
in Sharpie across the front was the label "RedHat 5.1".

        Me: "What is it?"
        David: "Linux."
        Me: "What's 'Linux'?"
        David: "It's Unix that you can install on your PC."
        Me: (I was already running for my laptop)

Overnight, I had an entire operating system I could decipher, from the bowels of
the kernel all the way up to the `ls` command.  On the one hand, this was
like being reborn.  On the other, I started to realize that this world of
programming had been right in front of me for years while I was stuck in the
Windows world.  I did my best to make up for time, tinkering with the
kernel (my first real foray was writing a USB camera driver), writing socket
libraries, and just diving head-first into being a true developer.

This was also my first introduction to Open Source in general; millions of
developers all putting their efforts into developing software solely for the
joy of it (yes, I was a bit naive on that point, and blind to the politics of OSS).

Toward the end of this period, I was a horrible developer.  I had no concept of the
rules, or what role business played in all this.  I just wanted to code.  About the
only thing I did have going for me was unwavering determination to solve any
problem, no matter how much reading, searching (Google still hadn't supplanted
DogPile as my SE of choice), and trial and error it took.  That would be important,
since the next phase would not be quite so happy-go-lucky.

Next up, [the real world comes knocking](/blog/2014/01/evolution-of-a-dev-part-2/).
The second magical moment came when a co-worker handed me a homemade CD...


