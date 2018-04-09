docker run --rm -it -p 4000:4000 -v ${PWD}:/srv/jekyll -e "JEKYLL_ENV=production" jekyll/jekyll bash -c "bundle install && jekyll serve --incremental --watch --force_polling"

