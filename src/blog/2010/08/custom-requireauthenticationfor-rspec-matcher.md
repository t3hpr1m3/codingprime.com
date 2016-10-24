---
title: 'Custom RSpec matcher:  require_authentication_for'
date: 2010-08-22 19:00
author: Josh Williams
layout: post.pug
---
Like everyone, I have a bunch of controller actions that need to be protected
from unauthorized users.  I've got RSpec tests around these methods that look
like this:

```ruby
describe UsersController, 'as guest' do
  before( :each ) do
    controller.stubs( :current_user ).returns( nil )
  end

  describe 'index' do
    it 'should prevent access' do
      lambda { get :index }.should
        raise_error( Exceptions::PermissionDenied )
    end
  end

  describe 'edit' do
    it 'should prevent access' do
      lambda { get :edit, :id => 1 }.should
        raise_error( Exceptions::PermissionDenied )
    end
  end

  describe 'create' do
    it 'should prevent access' do
      lambda { post :create, :id => 1 }.should
        raise_error( Exceptions::PermissionDenied )
    end
  end
end
```

<!--more-->

Does exactly what I want it to do.  If I ever screw up and remove `index` from
the `before_filter :authenticate`, I'll know it when I re-run the tests.  But
I've got lots and lots of methods like this, and wanted a more concise way to
specify this behavior.

I did some searching and found quite a few different approaches (most notably
[this](http://railscasts.com/episodes/157-rspec-matchers-macros) from Ryan
Bates, and [this](http://github.com/nbibler/should_require_login) plugin),
but none of them, I felt, were enough.  And so, because I'm a stupid fuck who
writes too much code, I threw together this custom RSpec matcher.

```ruby
# spec/support/matchers/require_authentication_for.rb
module CustomControllerMatchers
  def require_authentication_for( action, *args )
    options = args.extract_options!
    method = args.first.is_a?( Symbol ) ? args.first : :get
    RequireAuthenticationMatcher.new( method, action, options, self )
  end

  class RequireAuthenticationMatcher
    def initialize( method, action, args, context )
      @method = method
      @action = action
      @args = args
      @context = context
      @actual_exception = nil
    end

    def matches?( controller )
      @raised_permission_denied = false
      begin
        @context.send( @method, @action, @args )
      rescue Exceptions::PermissionDenied => @actual_exception
        @raised_permission_denied = true
      rescue Exception => @actual_exception
        foo = 'bar'
      end

      @raised_permission_denied
    end

    def failure_message_for_should
      if @actual_exception.nil?
        "Expected PermissionDenied, but nothing was raised"
      else
        "Expected PermissionDenied, got #{@actual_exception.inspect}"
      end
    end

    def failure_message_for_should_not
      if @actual_exception.nil?
        'Not sure what happened'
      else
        "Expected the call to succeed, but #{@actual_exception.message} was raised"
      end
    end

    def description
      "require authentication for #{@action}"
    end
  end
end
```

My controller specs can now look like this:

```ruby
describe UsersController, 'as guest' do
  before( :each ) do
    controller.stubs( :current_user ).returns( nil )
  end

  it { should require_authentication_for( :index ) }
  it { should require_authentication_for( :edit, :id => 1 ) }
  it { should require_authentication_for( :update, :post, :id => 1 ) }
end
```

It accomplishes the same thing, I know, but to me this is just more readable.
