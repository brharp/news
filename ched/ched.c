#include <stdio.h>
#include <math.h>
#include <string.h>
#include "Document.h"
#include "Font.h"
#include "Line.h"
#include "Point.h"
#include "View.h"

#define MENUHIT_TAG 1
#define WIDTH	800
#define HEIGHT	600

#include "ipsum.h"
char *ipsum = LOREM_IPSUM;

void js_init()
{
	//fprintf(stdout, "chedWindow = new ChedWindow(%d, %d);\n", WIDTH, HEIGHT);
	//fprintf(stdout, "chedWindow.show();\n");
	fprintf(stdout, "context = document.getElementsByTagName('canvas')[0].getContext('2d');\n");
}

void js_beginpaint()
{
	//fputs("displaylist = function (context) {", stdout);
}

void js_endpaint()
{
	//puts("}; chedWindow.paint();");
}

void js_setfont(char *fontdesc)
{
	fprintf(stdout, "context.font = '%s';\n", fontdesc);
}

void js_stroketext(char *text, float x, float y)
{
	fprintf(stdout, "context.strokeText('%s', %f, %f);\n", text, x, y);
}

void js_filltext(char *text, float x, float y)
{
	fprintf(stdout, "context.fillText('%s', %f, %f);\n", text, x, y);
}

void js_strokerect(float x, float y, float w, float h)
{
	fprintf(stdout, "context.strokeRect(%f, %f, %f, %f);\n", x, y, w, y);
}

float js_measuretext(char *s)
{
	float width;
	fprintf(stdout, "ws.send(context.measureText('%s').width);\n", s);
	fscanf(stdin, "%f", &width);
	return width;
}


/*
 * fmtline - formats a line
 */
char *fmtline(char *s, int y)
{
	char buf[300];
	char *ptr = buf;
	int  gap = WIDTH;	/* view width */
	float charwidth;

	memset(buf, 0, sizeof(buf));
	while (*s != '\n' && (*ptr = *s) && js_measuretext(buf) < WIDTH) {
		++ptr; ++s;
	}

	/* null terminate buffer */
	*ptr = '\0';

	/* draw line */
	js_filltext(buf, 0, y);

	return s;
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
	char *ptr = ipsum;

	setbuf(stdin, 0);
	setbuf(stdout, 0);

	js_init();

	for (;;) {

		x = 0;
		y = line_height;

		js_beginpaint();

			/* Set current font selection. */

		sprintf(fontdesc, "%dpx serif", line_height);
		js_setfont(fontdesc);

		/* Draw each line of text. */

		while (*ptr) {
			ptr = fmtline(ptr, y);
			y += line_height;
		}

		/* Draw cursor. */
		curpos = model_to_view(doc, cur, line_height);

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

