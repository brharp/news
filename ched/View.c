#include "View.h"

/**
 * Maps a coordinate in document space to coordinates in view space.
 */
Point model_to_view(Document doc, int pos, int line_height)
{
	Point p;

	// Mock
	p.x = 1;
	p.y = line_height;
	return p;


	// Get index of line containing 'pos'.

	// Calculate Y offset of line number.

	// Get initial offset of line.

	// Measure text from beginning of line to 'pos'.

}

