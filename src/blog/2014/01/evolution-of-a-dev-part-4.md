---
title: Evolution of a Dev (Part 4)
date: 2014-01-19 16:23
author: Josh Williams
layout: post.pug
---
My most recent career stop was also my longest.  With the collapse of my startup dreams,

I had to find employment back in the real world.  I took a position with a local company
that wrote Credit Union software in Delphi (basically Pascal).  The only Delphi I had
ever used was in writing [InnoSetup](http://www.jrsoftware.org/isinfo.php) scripts,
so I really had no idea what to expect.  Thankfully, I found out my first day that:

1. They had some server components written in C++, and
2. They also had a "web" department, which allegedly did internet stuff.

Rather than summarize what I actually DID during my time there, I'll instead
highlight some of the issues I encountered, my attempts to solve their problems,
and the ultimate reason for my departure.  I won't address the fact they were
still using Microsoft's Visual SourceSafe for version control.  I think it speaks for
itself.

<!--more-->

### Propietary much?

Ok, so this was rampant.  This place seriously suffered from [NIV](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0CB4QFjAA&url=http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FNot_invented_here&ei=JNCEVODoG8qgNsC8gIgO&usg=AFQjCNE0yQm5D4-SULmI8By1wQVTN3k-sg&bvm=bv.80642063,d.eXY)
syndrome.  First of all, they were still using this really strangely concocted
pseudo ORM to abstract SQL.  I say strangely concocted because it was not really an ORM, nor
was it really a query builder.  It was this sort of abomination that made little
sense to anyone but the guy who created it (who, coincidentally, gave birth to a few of
the other monstosities I'll cover later).  About its only redeeming quality was that
it was written in C++, so I could almost understand what it was doing.

They also had a sort of network API for communicating with the core system.  Problem was,
it didn't use any sort of standard mechanism of communication (HTTP, SOAP, XML-RPC, etc).
It was this really limited and fragile service that needed constant tweaking to stay
in sync with the core, and for which no even semi-standard tools existed for interfacing
with it.

### Standards?  I don't understand.

Then there was the web department.  First of all, there wasn't a single employee on 
staff that had any professional experience developing web apps, yet they were offering,
as one of their cornerstone products, an online banking solution.  When I joined the team,
I joined a converted graphical artist (read: ad designer) and recovering DBA.  Seriously.
These guys were trying to kludge together a cohesive **banking** application, in Classic
ASP, with no real understanding of web technology.  I could immediately tell that
almost all the Javascript and CSS was copypasta, and simple things like includes weren't
being used anywhere.  It was horrible.

But the biggest issue was the apparent distaste for anything Open Source.  After I got
the current web offerings under control (within reason), I set about finding a more 
modern environment to start building in.  Since they were a self-proclaimed Microsoft
Shop (seriously?  In the 21st century, how can that still be a thing?), I tried
to get ASP.NET MVC to work, but at that time it was just too immature to be viable.
I proposed moving to Linux as a platform and Rails as a framework for building the
new version of the app.  I was immediately labeled a heretic and sent to my room.

### Let's do this.

Luckily, being the only person qualified to have an opinion, and based on several
conversations I had with the President/CEO (who is actually [extremely knowledgeable](https://www.linkedin.com/vsearch/p?firstName=Daryl&lastName=Tanner&orig=SEO_SN&trk=SEO_SN&domainCountryName=&csrfToken=ajax%3A5966742831050947461),
and highly [respected](http://www.cutimes.com/2012/12/11/daryl-tanner-retiring-from-share-one-at-years-end),
it was decided that I be given some leeway to pursue the Rails course.

In the course of this decision, I was given my own department (management again?), and,
as far as the rest of the management team was concerned, just enough rope to hang myself.
I hired a [really good dev](http://joshwlewis.com/), recruited another [from within](https://www.linkedin.com/pub/joshua-bryant/40/a65/401),
and even roped in [my brother](http://www.linkedin.com/pub/jacob-williams/80/b08/436) to handle
PM stuff.

A short list of the technologies we used:
* [JIRA](https://www.atlassian.com/software/jira)
* [Bamboo](https://www.atlassian.com/software/bamboo)
* [Campfire](https://campfirenow.com/)
* [Basecamp](https://basecamp.com/)
* [Github](https://github.com/) (obviously)

And these are just the administrative type bits.  The stack was typical Rails (MySQL, Memcache, Redis, etc).
It was beautiful.  We were effecient.  TDD worked.  In essence, we manged to write >100k lines
of production quality code in < 12 months.  At the time I turned in my notice, JIRA contained a
whopping total of 2 bugs, and 1 of those was actually due to an issue one of our partners had
with their web service.  Considering, for most of us, it was our first real foray into
full-on agile, I'm extremely proud of our accomplishments.

### We are not impressed.

So after all of that, you'd think that the powers that be would be overjoyed at the
success of the "experiment", right?  Well, no.  As expected, the status quo is 
difficult to upset.  And we punched it in the face.  Most of the management team (the CTO
in particular) took even the smallest opportunities to undermine our progress.

However, it wasn't all bad.  Quietly, certain other groups within the organization
borrowed some of our methods.  Educational services started using Camtasia to put together
tutorials, instead of putting on giant webinars, multiple times, to explain new features.

The other development teams migrated away from VSS to Subversion, and started implementing
unit tests in their code.  The manager even tried implementing Scrum (short lived, but A for effort).

Since my departure, I've found that the plan is to dismantle everything we accomplished, and
migrate back to VisualSourcesafe, with the original ASP code being migrated to ASP.NET (again,
by non-web people).  Sigh.

### There's always a silver lining

It hasn't been a total loss.  I learned a lot about mentoring, and about when to stand
your ground.  There was a point where I threw down the gauntlet, and could just as easily
have been unemployed again.  The difference this time was that, unlike before, I
never made it personal.  I merely let the facts speak for themselves, and offered
up my job as collateral.  Maybe it was maturity.  Or I just liked the people I worked with.
Whatever the reason, I tried something, and in my opinion, the record will record it
as a success.

I also, however, learned even more about the relationship between development and 
business.  Especially in a product-focused company.  Every minute I spend at work has
to be financed by someone.  If we're not turning a profit on the product, or the time
I'm spending won't directly raise the bottom line, I'm wasting both time and money,
and that's a no-no.  In short, you can experiment all you want, so long as there's
a profitable product at the end.

### The next chapter

I'm moving on to a new opportunity, but on much unlike my last.  As a self-proclaimed
[skunkworks](http://www.webopedia.com/TERM/S/skunkworks.html), I don't expect to 
be required to justify my actions quite as much, and there probably won't be as
many rediculous practices in place that need fixing.

I'm also entering with that "Senior" title I coveted so long ago, but it has a much
different meaning for me now.  Most of my new team is younger (quite younger), but eager
to learn.  Mentoring is something I've grown quite fond of.  Not because I think I know it
all, but because I understand the value of someone helping you learn the right way to
approach a problem, which is an intangible that usually takes years of trial and error.

More than anything, I'm excited to be moving into an environment where its mostly about
the code, which is where my heart still truly lies.
