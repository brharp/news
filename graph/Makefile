
htdocs=/var/www/htdocs/news/graph

all:
	cp *.html *.js $(htdocs)/
	cc -lm -o graph graph.c

run: all
	websocketd --port=8080 ./graph

