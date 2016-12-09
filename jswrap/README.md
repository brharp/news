# About jswrap
jswrap provides a natural way to write JavaScript code fragments that can be called from C applications. 
These code fragments are called wraps.
A wrap consists of a C definition and a JavaScript body.
Here's how it works:
- You write the JavaScript wraps required by your application.
- jswrap converts these into callable procedures.
- You compile your application along with the generated code.
- Your application calls the wrapped procedures to send JavaScript to the interpreter, and receive results.

# Using jswrap
```
jswrap [-o OUTPUT] [-h HEADER] [INPUT]
```

# Writing a wrap

**Example 1** *sample wrap definition*

*Wrap definition:*
```
defjs jsgreencircle()
  var svgns = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(svgns, "svg");
  var circle = document.createElementNS(svgns, "circle");
  circle.setAttributeNS(null, "cx", 25);
  circle.setAttributeNS(null, "cy", 25);
  circle.setAttributeNS(null, "r",  20);
  circle.setAttributeNS(null, "fill", "green"); 
  svg.appendChild(circle);
  document.body.appendChild(svg);
endjs
```

*Procedure call:*
```
jsgreencircle();
```

*JavaScript equivalent:*
```
var svgns = "http://www.w3.org/2000/svg";
var svg = document.createElementNS(svgns, "svg");
var circle = document.createElementNS(svgns, "circle");
circle.setAttributeNS(null, "cx", 25);
circle.setAttributeNS(null, "cy", 25);
circle.setAttributeNS(null, "r",  20);
circle.setAttributeNS(null, "fill", "green"); 
svg.appendChild(circle);
document.body.appendChild(svg);
```

# Arguments

#
**Example 1** *sample wrap definition*

*Wrap definition:*
```
defjs jsgreencircle()
  var svgns = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(svgns, "svg");
  var circle = document.createElementNS(svgns, "circle");
  circle.setAttributeNS(null, "cx", 25);
  circle.setAttributeNS(null, "cy", 25);
  circle.setAttributeNS(null, "r",  20);
  circle.setAttributeNS(null, "fill", "green"); 
  svg.appendChild(circle);
  document.body.appendChild(svg);
endjs
```

*Procedure call:*
```
jsgreencircle();
```

*JavaScript equivalent:*
```
var svgns = "http://www.w3.org/2000/svg";
var svg = document.createElementNS(svgns, "svg");
var circle = document.createElementNS(svgns, "circle");
circle.setAttributeNS(null, "cx", 25);
circle.setAttributeNS(null, "cy", 25);
circle.setAttributeNS(null, "r",  20);
circle.setAttributeNS(null, "fill", "green"); 
svg.appendChild(circle);
document.body.appendChild(svg);
```
