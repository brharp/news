#include <stdio.h>
#include <math.h>
#include "Document.h"
#include "Font.h"
#include "Line.h"
#include "Point.h"
#include "View.h"

#define MENUHIT_TAG 1
#define WIDTH	300
#define HEIGHT	500

char *ipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce lacus mauris, aliquam auctor iaculis ac, malesuada sit amet dui. Aliquam congue porta nunc sed euismod. Phasellus fringilla erat ut tellus porta, et ullamcorper mauris commodo. Maecenas elementum ex in tempus suscipit. Cras lacinia vel metus ac volutpat. In tincidunt lectus a molestie rutrum. Aenean nec vehicula odio. Nunc a neque libero. Nunc nulla velit, dapibus laoreet ante vel, dictum scelerisque libero. In pellentesque, quam non mattis finibus, libero erat interdum est, vel suscipit augue velit imperdiet metus."
	"Vestibulum semper suscipit vestibulum. Maecenas vestibulum odio nec nunc maximus dapibus. Proin ac est non dolor eleifend ultrices sed quis neque. Curabitur rhoncus mollis eros, sed ullamcorper enim eleifend quis. Sed at est elit. Nam ac nisl sed sapien blandit convallis. Cras mollis lectus a purus dapibus luctus. Pellentesque nulla quam, pulvinar ultrices velit in, pellentesque eleifend quam. Integer feugiat mi non justo lacinia ornare. Praesent aliquet est at lacus suscipit suscipit. Sed vel mollis sapien. Aliquam congue luctus ipsum, ac finibus eros malesuada et."
	"Integer et vulputate mauris. Curabitur rhoncus pulvinar elementum. Proin eget nulla congue, bibendum nisl nec, volutpat mi. Fusce mattis finibus commodo. Donec tincidunt volutpat lorem, et dignissim sapien tempus eget. Phasellus ac nisi quis nunc semper iaculis non ut tellus. Donec molestie nisi vitae sem bibendum mattis. Aliquam malesuada, nulla in accumsan efficitur, odio purus fringilla lectus, convallis dictum risus ante ut quam. Etiam rhoncus ligula diam, vitae laoreet nisi finibus sit amet. Ut vitae semper enim. Fusce neque tellus, pharetra non aliquet nec, scelerisque at neque. Suspendisse sed malesuada mi. Cras vestibulum lectus nec molestie malesuada. Proin efficitur pharetra ex eu pellentesque. Nulla mattis scelerisque turpis vel elementum. Curabitur vitae tellus magna."
	"Etiam luctus turpis ac dui rutrum, rutrum pretium felis malesuada. Duis vehicula nulla erat, ac viverra justo ullamcorper eu. Quisque ultricies pulvinar risus, eu vehicula tellus. Praesent aliquam cursus finibus. Donec sed fermentum nisl. Nulla sagittis odio a suscipit hendrerit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce placerat ipsum eu aliquet venenatis. Vestibulum finibus maximus arcu at sollicitudin. Ut non risus facilisis, pretium sem at, dictum massa. Donec hendrerit venenatis fermentum. Donec ac venenatis ligula, sit amet pulvinar leo. Integer felis massa, varius vitae feugiat sit amet, aliquam ut neque. Maecenas nibh est, laoreet ac dolor tempus, sollicitudin viverra eros. Phasellus ligula justo, fringilla sit amet pharetra rhoncus, pulvinar sit amet justo. Duis finibus, eros at ullamcorper varius, sem justo pretium lacus, ut sodales justo quam quis urna."
	"Curabitur eu dui at nibh efficitur scelerisque quis id orci. Proin quis nisl quis metus sollicitudin pulvinar vel et purus. Nam eget enim venenatis quam vestibulum pulvinar. Aliquam velit odio, rutrum at pellentesque ac, sollicitudin sit amet lorem. Sed a diam eget tellus hendrerit aliquam. Donec sollicitudin, dolor nec accumsan lacinia, ex nisl aliquam metus, et ullamcorper tortor lectus at sapien. Donec sed faucibus sapien, nec aliquam dui. Sed cursus suscipit elementum. Duis viverra a leo ut imperdiet. Nulla placerat neque nec diam lobortis, a ullamcorper mi convallis. Fusce dapibus dui eget quam imperdiet cursus. Morbi ut viverra magna. Ut a lorem a sem maximus lobortis. ";

void js_init()
{
	fprintf(stdout, "chedWindow = new ChedWindow(%d, %d);\n", WIDTH, HEIGHT);
	fprintf(stdout, "chedWindow.show();\n");
}

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


/*
 * fmtline - formats a line
 */
char *fmtline(char *s, int y)
{
	char buf[300];
	char *ptr = buf;
	int  gap = WIDTH;	/* view width */

	while (*s && *s != '\n' && gap > 0) {
		gap -= 16;	/* Add character width to line width. */
		*ptr++ = *s++;	/* Add char to buffer. */
	}

	/* null terminate buffer */
	*ptr = '\0';

	/* draw line */
	js_stroketext(buf, 0, y);

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

		for (i = 0; i < line_count; i++) {
			ptr = fmtline(ptr, y);
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

