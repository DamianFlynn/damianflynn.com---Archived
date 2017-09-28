docker run --rm -it -p 4000:4000 -v c:/cloud/Dropbox/code/blog/damianflynn.com:/srv/jekyll -e "JEKYLL_ENV=production" jekyll/jekyll:3.5.2 bash -c "bundle install && jekyll serve --incremental"

