
name=ched
htdocs=/var/www/htdocs/news/$(name)
objects=Line.o Document.o Font.o

all: $(objects)
	mkdir -p $(htdocs)
	cp *.html *.js $(htdocs)/
	cc -g -lm -o $(name) $(name).c $(objects)

run: all
	websocketd --port=8080 ./$(name)

