#ifndef _DOCUMENT_H_INCLUDED_
#define _DOCUMENT_H_INCLUDED_

#include "Line.h"
#include "Font.h"

typedef void *	Document;

Line* document_lines(Document d);

int document_line_count(Document d);

Font document_font(Document d);

#endif

