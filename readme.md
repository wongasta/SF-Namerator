#SF Namerator

###Description
Coded back in 2012

This is part II of the corporate project where user can browse/encode/decode business acronyms.

Part I is done in Datastage 8.1, where the Datastage will extract data from corporate Oracle data warehouse and push it to a xml file.

This application parses the XML file and let users generate their business response or decode a business response provided (utilizing regex).

###Example
[http://www.yixinxia.com/old/usaa/sf](http://www.yixinxia.com/old/usaa/sf)

###Regex Used
```
var userREGEX = /([a-z_0-9]{2,4})[|]([a-z_0-9]{2,4})[|]([a-z_0-9]{2,3})[|]([a-z_0-9]{2,3})[|]([a-z_0-9]{2,3})[|]([a-z_0-9]{2,3})[|]([^|\s]{1,25})[|]([^|]{1,25})[^|\s]/;
```