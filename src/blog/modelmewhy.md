---
title: ModelMe...why?
date: 2013-08-31 11:46
author: Josh Williams
template: post.jade
---
My day job consists of architecting and maintaining several Rails
applications.  Some of these must deal with custom data sources that
were architected before there were standards for inter-application
communication (SOAP, REST, XML-RPC, etc).  One in particular is is a custom TCP
server that responds to method calls (using XML as the transport mechanism).
Replacing the service is not an option (as is usually the case with any
[PITA](http://fc05.deviantart.net/fs71/f/2012/013/0/7/pain_in_the_ass_by_sk8rnerd-d4m9ag5.jpg)
legacy problem), so I have to communicate with it.

### ActiveRecord/AREL
For all of its perceived shortcomings,
{ActiveRecord](https://github.com/rails/rails/tree/master/activerecord) is an
excellent piece of software.  More importantly, [arel](https://github.com/rails/arel),
the relational library that drives it is a very well architected masterpiece.
Together, they do a lot of magic that makes interacting with SQL data sources
fairly effortless.

While arel allows for adding custom *visitors* (which allow you to customize
the "SQL" generated to perform queries/updates), both libraries are tightly
coupled to the RDBMS data store.

### DataMapper
Another wonderful little gem is [DataMapper](http://datamapper.org/).  This
thing solves the problems above by taking a different approach to modeling
data.  Instead of inferring structure from the database (as ActiveRecord
does), it puts this responsibility back in the hands of the user.  It also
delegates the job of interacting with the data store to custom "adapters",
which understand how to communicate with whatever <em>thingie</em> has the
data you want.  If you have to work in a mixed environment and can get away
with it, DataMapper is definitely the way to go.

### Stuck?
Unfortunately, I find myself stuck dealing with code that uses ActiveRecord
to deal with the local application data, but still needs to be able to access
data stored in the custom service described above.  I could use DataMapper for
just those areas of the app, but this just feels...dirty.  As a developer, I
have enough to think about.  I'd rather not have to try and remember which DSL
is used for which models.  One application, one syntax for dealing with data.
And it should just work.

### ModelMe
After several attempts to bridge the gap, and digging around the source of
several projects on Github (notably [supermodel](https://github.com/maccman/supermodel)),
I decided to just write some fucking code.  The result is *[ModelMe](https://github.com/t3hpr1m3/model_me)*.
It's basically everything from ActiveModel I could squeeze in, with a lot of
the relationship/query/association logic inspired by (read: stolen from)
ActiveRecord.  It follows the same methodology as DataMapper (explicit
attribute definition/delegation of datastore interaction) but looks, smells,
and tastes like ActiveRecord.  It's fairly stable, and is currently being used
in several mission critical applications dealing with financial data (yes, my
sphincter puckers from time to time).

Is it perfect?  Hell no.  But it's good enough to get through the day.
