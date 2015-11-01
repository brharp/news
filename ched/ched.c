#include <stdio.h>
#include <math.h>
#include "Document.h"
#include "Font.h"
#include "Line.h"
#include "Point.h"
#include "View.h"

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

void js_strokerect(float x, float y, float w, float h)
{
	fprintf(stdout, "context.strokeRect(%f, %f, %f, %f);", x, y, w, y);
}

int main(int argc, char *argv[])
{
	int i, index;
	Document doc;
	Lines lines = document_lines(doc);
	int line_count = document_line_count(doc);
	Font f = document_font(doc);
	int line_height = font_line_height(f);
	float x = 0, y = line_height;
	char fontdesc[32];
	int cur;	/* Cursor position in document. */
	Point curpos; 	/* Cursor position in view. */

	setbuf(stdin, 0);
	setbuf(stdout, 0);

	for (;;) {

		x = 0;
		y = line_height;

		js_beginpaint();

			/* Set current font selection. */

		sprintf(fontdesc, "%dpx serif", line_height);
		js_setfont(fontdesc);

		/* Draw each line of text. */

		for (i = 0; i < line_count; i++) {
			js_stroketext(line_text(lines_line_at(lines, i)), x, y);
			y += line_height;
		}

		/* Draw cursor. */
		curpos = model_to_view(doc, cur, line_height);
		js_strokerect(10, 10, 100, 100);

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

