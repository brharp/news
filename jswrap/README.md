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

# Input Arguments

**Example** *wrap with input arguments*

*Wrap definition:*
```
defjs jsgreencircle(char *svgid; float x, y, radius)
  var svg = document.getElementById("svgid");
  var circle = document.createElementNS(svg.namespaceURI, "circle");
  circle.setAttributeNS(null, "cx", x);
  circle.setAttributeNS(null, "cy", y);
  circle.setAttributeNS(null, "r",  radius);
  circle.setAttributeNS(null, "fill", "green"); 
  svg.appendChild(circle);
endjs
```

*Procedure call:*
```
jsgreencircle("svg", 25.4, 17.7, 40.0);
```

*JavaScript equivalent:*
```
var svg = document.getElementById("svg");
var circle = document.createElementNS(svg.namespaceURI, "circle");
circle.setAttributeNS(null, "cx", 25.4);
circle.setAttributeNS(null, "cy", 17.7);
circle.setAttributeNS(null, "r",  40.0);
circle.setAttributeNS(null, "fill", "green"); 
svg.appendChild(circle);
```

# Output Arguments

*Wrap definition:*
```
defjs jsgetradius(char *circleid, float *radius)
  var circle = document.getElementById("circleid");
  *radius = circle.radius;
endjs
```

*Procedure call:*
```
float radius;
jsgetradius(&radius);
```
