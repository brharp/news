
void Rectangle::draw()
{
	js_setcolor(color);
	js_strokerect(points[0].x, points[0].y, width, height);
}

