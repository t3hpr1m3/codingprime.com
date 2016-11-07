---
title: Site Config (config.yml) for Rails
date: 2010-08-21
author: Josh Williams
layout: post.pug
---
Over at [Railscasts](http://railscasts.com/), The Honourable Ryan Bates,
Esquire<sup>1</sup> has been churning out quality screencasts FOREVER.  And
while some of them become somewhat obsolete as Rails itself changes, they're
still a better starting point than most of what's available on the web.

One that I happened to view recently concerned
[application configuration](http://railscasts.com/episodes/85-yaml-configuration-file)
for your Rails app being stored in a `.yml` file.  This brings site
configuration in line with database, fixtures, etc.  As usual, Ryan gives you
exactly what you need to adapt things to your situation.  So I did.  This is
my ApplicationConfiguration class.<sup>2</sup>  It basically gives you a global
`::AppConfig` object, which allows you to reverence any of your configuration
settings from a single place.  It supports nested configuration,
and automatically selects the right environment (test, production, etc).

<!--more-->

```ruby
# config/initializers/_init_app_config.rb
class ApplicationConfigurationNode
  def initialize( data )
    data.each do |k,v|
      self.assign_value( k, v )
    end
  end

  def assign_value( name, val )
    if val.is_a?( Hash )
      self.instance_variable_set( "@#{name.to_s}".to_sym, ApplicationConfiguration.new( val ) )
    else
      self.instance_variable_set( "@#{name.to_s}".to_sym, val )
    end
  end

  def method_missing( name, *args )
    if name.to_s =~ /(.*)=$/
      self.assign_value( $1, args.first )
    else
      if self.instance_variable_defined?( "@#{name.to_s}".to_sym )
        self.instance_variable_get( "@#{name.to_s}".to_sym )
      else
        nil
      end
    end
  end
end

class ApplicationConfiguration < Rails::OrderedOptions
  def initialize
    config_file = "#{RAILS_ROOT}/config/config.yml"
    if File.exists?( config_file )
      config_hash = YAML.load_file( config_file )
      if config_hash.has_key?( RAILS_ENV )
        @parameters = ApplicationConfigurationNode.new( config_hash[RAILS_ENV] )
      end
    end
  end

  def method_missing( name, *args )
    @parameters.method_missing( name, args.first )
  end
end

::AppConfig = ApplicationConfiguration.new
```

I put this in `config/initializers/_init_app_config.rb`, so that it gets loaded
 before everything else, and I'm done.  Now I'm free to add whatever I want to
`config.yml` and reference it from anywhere in my app.

```ruby
# config/config.yml
test:
  harsh:
    theme: 'twilight'
production:
  harsh:
    theme: 'spacecadet'
```

```ruby
# app/views/layouts/_stylesheets.html.erb
# ...
<%= stylesheet_link_tag 'harsh/#{::AppConfig.harsh.theme}' %>
# ...
```

<sup>1</sup>All titles bestowed only by me.  Keep your attorneys to yourself.

<sup>2</sup>I know I saw someone doing something similar to this, but for the
 life of me I can't find it.  If it was you, I apologize for not giving credit.
