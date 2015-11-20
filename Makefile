
htdocs=/var/www/htdocs/news

install:
	mkdir -p $(htdocs)
	cp *.html *.js $(htdocs)


