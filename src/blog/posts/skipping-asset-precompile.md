---
title: Skipping asset precompile
date: 2012-07-12 17:20:00
author: Josh Williams
layout: post.pug
---
Waiting on asset precompilation is a PITA, especially if no assets have been
changed.  Thankfully,
[Ben Curtis](http://www.bencurtis.com/2011/12/skipping-asset-compilation-with-capistrano/)
came up with a workable solution.  Except...

Ben's method fails on the initial deployment, because *current_revision* tries to
read */path/to/app/current/REVISION*, which won't exist yet.  After trying several
approaches, I have arrived at one which works for me.  There are probably other,
more elegant approaches, but this one seems clear enough for my purposes.
Posting it here for posterity.

<!--more-->

```ruby
namespace :deploy do
  namespace :assets do
    task :precompile, roles: :web, except: {no_release: true} do
      from = source.next_revision(current_revision) if capture("[ -f #{File.join(current_path, 'REVISION')} ] || echo '1'").empty?
      if from.nil? || capture("cd #{latest_release} && #{source.local.log(from)} vendor/assets app/assets lib/assets | wc -l").to_i > 0
        run %Q{cd #{latest_release} && #{rake} RAILS_ENV=#{rails_env} #{asset_env} assets:precompile}
      else
        logger.info "Skipping asset pre-compilation because there were no asset changes."
      end
    end
  end
end
```
