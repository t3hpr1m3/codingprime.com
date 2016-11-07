---
title: Findable plugin
date: 2010-08-13
author: Josh Williams
layout: post.pug
---
Probably the strangest first blog post ever, but here goes.  I'm migrating a
product from Classic ASP to Rails.  The bulk of its data is accessed via a
TCP service, which accepts/responds with XML.  Unfortunately, it's a custom
protocol, so I'm forced to do all the packet building/transport myself.  No big
deal.

The top level resource is a list of accounts.  These accounts don't change over
the course of a session, so I'm caching them to avoid the round trip.  This
list of accounts is referenced in some way on every page, so fast access to a
particular account is important.  I started out by writing a custom `find`
method, which took a hash of arguments.  This works, but looks weird next to
all the other ActiveRecord goodness in the app.  Enter:
[Findable](http://www.github.com/t3hpr1m3/findable).

<!--more-->
My Account model looks similar to this:

```ruby
require 'builder'
require 'nokogiri'

class Account
  attr_accessor :account_id
  attr_accessor :account_type
  attr_accessor :description
  attr_accessor :balance

  self.build_request
    xml_text = ""
    Builder::XmlMarkup.new( :target => xml_text ) { |x|
      x.instruct!
      x.getaccounts { |g| g.context( Config.context ) }
    }
    xml_text
  end

  self.from_xml(n)
    a = Account.new
    a.account_id = n.at_xpath("id").text.to_i
    a.account_type = n.at_xpath("type").text
    a.description = n.at_xpath("description").text
    a.balance = n.at_xpath("balance").text.to_f
    a
  end

  self.accounts
    Rails.cache.fetch( "accounts" ) {
      req = self.build_request
      resp = send_and_receive(req) # custom library function
      Nokogiri::XML(resp).xpath("accounts/account").collect do |account|
        from_xml(account)
      end
    }
  end

  self.find( options = {} )
    if accounts.nil?
      nil
    else
      if options.keys.length == 0
        accounts
      else
        accounts.select { |a|
          is_match = true
          options.each { |key, value|
            if a.instance_variable_get( "@#{key}" ) != value
              is_match = false
              break
            end
          }
          is_match
        }
      end
    end
  end
end
```

I've stripped this down to bare bones for clarity, leaving out all the sanity
checking.  You can probably guess what a call to `find` looks like:

```ruby
@account = Account.find( { :account_id => 34529 } )
```

This works just fine, but it obviously needs some work.  First of all, there's
no way for me to request just 1 account.  `@account` here would always be an
array, and I'd always be referencing `@account[0]`.  I've also got several
other models that work similarly, so I need a way to generically apply this
`finder` logic to several models.  There's probably a way to do this that I'm
not aware of, and if anyone ever actually reads this post, I'll probably be
ridiculed horribly, but since I couldn't find anything, I decided to write
[Findable](http://www.github.com/t3hpr1m3/findable).

Basically, it throws a bunch of ActiveRecord-ish finders onto your model, so
you can treat it as if it were an ActiveRecord for the purposes of filtering.
Implementing Finder is pretty easy:

* include `Findable`
* Replace `attr_accessor` with `findable_attribute`
* Call `findable_method`, passing it your method for retrieving data

World domination. Taking the account model:

```ruby
class Account  include Findable
  findable_attribute :account_id
  findable_attribute :account_type
  findable_attribute :description
  findable_attribute :balance
  findable_method :accounts

  self.build_request
    # ...
  end

  self.from_xml(n)
    # ...
  end

  self.accounts
    # ...
  end
end
```

The find method disappears entirely, replaced by brand new magic finders:

```ruby
Account.find(:first, :account_type => 'checking')
Account.find_by_account_type('checking')
Account.find(:last)
Account.all
```

And so on.  If you have an attribute that you'd like to use as a resource ID
for a restful route, just pass `true` as the second argument to
`findable_attribute`:

```ruby
class Account
  # ...
  findable_attribute :account_id, true
  # ...
end
```

and now in your controller:

```ruby
@account = Account.find(params[:id])
```

works!  If your `findable_method` would somehow benefit from having the
`options` hash passed in (possibly using it to filter the results before
they're actually received), just pass `true` in your call to `findable_method`.

```ruby
class Account
  findable_method :accounts, true

  def build_request(options)
    xml_text = ""
    Builder::XmlMarkup.new( :target => xml_text ) { |x|
      x.instruct!
      x.getaccounts { |g|
        g.context(Config.context)
        g.account_type(options[:account_type]) if options.keys.include?(:account_type)
      }
    }
    xml_text
  end

  def accounts(options)
    req = self.build_request(options)
    resp = send_and_receive(req) # custom library function
    Nokogiri::XML(resp).xpath("accounts/account").collect do |account|
      from_xml(account)
    end
  end
end
```

This is my first plugin, and it's probably redundant, but if anyone finds it
useful, or wants to point me in the direction of the pre-existing solution to
the problem, let me know.
