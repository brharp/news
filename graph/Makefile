
all:
	cp *.html *.js /var/www/htdocs/news/
	cc -lm -o graph graph.c

run: all
	websocketd --port=8080 ./graph

