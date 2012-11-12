KnockoutKendoIssue
==================

knockout-kendo issue example

An error ("Array length must be a finite positive integer") is thrown after rendering a bar chart, if both the knockout-kendo JS library 
and the knockout.mapping JS library are included on a page.

The bar chart still looks correct and seems to behave normally.  Any subsequent chart does not render.

To view the error - open 'ChartTest_Binding.html' and watch the console.

You can then edit the html file and take out the script tag for scripts/knockout.mapping-latest.js.  If you refresh the html page the error goes away and both charts will load.