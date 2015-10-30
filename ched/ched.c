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

int main(int argc, char *argv[])
{
	int i, index;
	Document d;
	Lines lines = document_lines(d);
	int line_count = document_line_count(d);
	Font f = document_font(d);
	int line_height = font_line_height(f);
	float x = 0, y = line_height;
	char fontdesc[32];

	setbuf(stdin, 0);
	setbuf(stdout, 0);

	for (;;) {

		x = 0;
		y = line_height;

		js_beginpaint();
		sprintf(fontdesc, "%dpx serif", line_height);
		js_setfont(fontdesc);
		for (i = 0; i < line_count; i++) {
			js_stroketext(line_text(lines_line_at(lines, i)), x, y);
			y += line_height;
		}
		js_endpaint();

		scanf("%d", &index);
		switch (index) {
		case 0: line_height = 10; break;
		case 1: line_height = 12; break;
		case 2: line_height = 14; break;
		case 3: line_height = 16; break;
		}
	}
}

