

void
redisplay(view, doc)
{
	lines;

	while (y < view->height) {

	/*
	 * Allocate and array of line structures.
	 */
	if (!view->lines) {
		lines = malloc(sizeof(lines[0],10));
	}

	/*
	 * Accumulate characters into buffer up to the
	 * first newline or end of document.
	 */
	c = buffer_at(doc->buf, pos);
	while (c != EOF && c != NEWLINE && line_width < view_width) {
		/* Measure character and add to line width. */
		line_width += char_width(ft, c);
		line_buffer[line_length++] = c;
	}

	/*
	 * Display the line.
	 */
	show_line(line);
	}

}

