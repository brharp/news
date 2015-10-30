#ifndef _LINE_H_INCLUDED_
#define _LINE_H_INCLUDED_

typedef char *	Line;
typedef Line *	Lines;

char *	line_text(Line);
Line	lines_line_at(Lines, int);

#endif

