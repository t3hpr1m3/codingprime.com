---
title: RSpec, Autotest, Rails3, and Engines
date: 2010-12-06 18:19
author: Josh Williams
layout: post.pug
---
I've got an app I'm building that is comprised of several engines running in
*vendor/nsweb*.  I want each engine to have its own specs, without cluttering
up the main app's *spec* folder.  I also want to be able to run tests for ALL
engines at once, both using rake and through autotest.  To accomplish the first
task, I added the following:

```ruby
# lib/tasks/rspec.rake
RSpec::Core::RakeTask.module_eval do
  def pattern
    extras = []
    Dir[File.join( File.expand_path( 'vendor' ), 'nsweb', '*' )].flatten.each do |dir|
      if File.directory?( dir )
        extras += File.join( dir, 'spec', '**', '*_spec.rb' ).to_s
      end
    end
    [@pattern] | extras
  end
end
```

<!--more-->

Now, if I run

```shell
# rake spec
```

the specs from my engines will be run as well.

For autotest, I added this:

```ruby
# .autotest

Autotest.add_hook :initialize do |autotest|
  autotest.add_mapping( %r%^vendor/nsweb/(.*)/app/controllers/(.*)\.rb$% ) do |_, m|
    ["vendor/nsweb/#{m[1]}/spec/controllers/#{m[2]}_spec.rb"]
  end

  autotest.add_mapping( %r%^vendor/nsweb/(.*)/app/models/(.*)\.rb$% ) do |_, m|
    ["vendor/nsweb/#{m[1]}/spec/models/#{m[2]}_spec.rb"]
  end

  autotest.add_mapping( %r%^vendor/nsweb/(.*)/lib/(.*)\.rb$% ) do |_, m|
    ["vendor/nsweb/#{m[1]}/spec/lib/#{m[2]}_spec.rb"]
  end
end
```

There is probably a much more elegant way to do both of these things, but this
worked for me.
