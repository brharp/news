#ifndef _VIEW_H_INCLUDED_
#define _VIEW_H_INCLUDED_

#include "Point.h"
#include "Document.h"

Point model_to_view(Document doc, int pos, int line_height);

#endif

