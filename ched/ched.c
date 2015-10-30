#include <stdio.h>
#include <math.h>
#include "Document.h"
#include "Font.h"
#include "Line.h"

#define MENUHIT_TAG 1

void js_beginpaint()
{
	fputs("displaylist = function (context) {", stdout);
}

void js_endpaint()
{
	puts("}; chedWindow.paint();");
}

void js_setfont(char *fontdesc)
{
	fprintf(stdout, "context.font = '%s';", fontdesc);
}

void js_stroketext(char *text, float x, float y)
{
	fprintf(stdout, "context.strokeText('%s', %f, %f);", text, x, y);
}

int js_menuhit(int *index)
{
	int tag;
	char fmt[80];
	sprintf(fmt, "%d", MENUHIT_TAG);
	if (fscanf(stdin, fmt, &tag)) {
		fscanf(stdin, "%d", index);
	}
	return tag;
}


int main(int argc, char *argv[])
{
	int i, index;
	Document d;
	Lines lines = document_lines(d);
	int line_count = document_line_count(d);
	Font f = document_font(d);
	int line_height = font_line_height(f);
	float x = 0, y = line_height;

	setbuf(stdin, 0);
	setbuf(stdout, 0);

	for (;;) {

		js_beginpaint();
		js_setfont("16px serif");
		for (i = 0; i < line_count; i++) {
			js_stroketext(line_text(lines_line_at(lines, i)), x, y);
			y += line_height;
		}
		js_endpaint();

		scanf("%d", &index);
	}
}

