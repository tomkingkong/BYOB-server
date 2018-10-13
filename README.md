# 🍷 Vitis Vinifera API [![Build Status](https://travis-ci.org/michaelyons/BYOB-server.svg?branch=master)](https://travis-ci.org/michaelyons/BYOB-server)

## Table of Contents
* [Vineyards](#vineyards)
* [Wines](#wines)
___

###   <img src="https://www.shareicon.net/data/128x128/2016/09/16/829671_nature_512x512.png" width="30" height="30" /> Vineyards


* GET - All Vineyards - ```/api/v1/vineyards```

Hitting this endpoint will return an array of vineyard objects

##### Example Response

`
[{
id: 2,
name: "LAW FAMILY VINEYARD",
location: "somewhere",
date_established: 2008,
harvest: true,
created_at: "2018-10-13T19:40:20.558Z",
updated_at: "2018-10-13T19:40:20.558Z"
},
{
id: 3,
name: "HALTER RANCH VINEYARD",
location: "somewhere",
date_established: 0,
harvest: true,
created_at: "2018-10-13T19:40:20.564Z",
updated_at: "2018-10-13T19:40:20.564Z"
},
` 

* GET - Specific Vineyard - ```/api/v1/vineyards/:vineyard_id```

Include a vineyard_id in request URL

##### Example URL

`https://ml-tk-vitis-vinifera.herokuapp.com/api/v1/vineyards/41`

##### Example Response

`{
id: 41,
name: "DRY STACK",
location: "somewhere",
date_established: 0,
harvest: true,
created_at: "2018-10-13T19:40:20.683Z",
updated_at: "2018-10-13T19:40:20.683Z"
},`

~~

* POST - Add New Vineyard - ```/api/v1/vineyards```

A correct request object needs to be sent with all parameters correctly filled in 

##### Example Request Object

`{
name: "DRY STACK",
location: "somewhere",
date_established: 0,
harvest: true,
created_at: "2018-10-13T19:40:20.683Z",
updated_at: "2018-10-13T19:40:20.683Z"
},`

* PUT - Edit existing vineyard data in database - ```/api/v1/vineyards/:vineyard_id```

Send a complete vineyard object to edit information for a specific vineyard 

##### Example Request Object (using GET vineyard response example from above)

`{
id: 41,
name: "GREEN STACK",
location: "somewhere",
date_established: 0,
harvest: true,
created_at: "2018-10-13T19:40:20.683Z",
updated_at: "2018-10-13T19:40:20.683Z"
},`

* DELETE - Remove a Vineyard from database - `api/v1/vineyards/:vineyard_id'`

###  🍇 Wines

* GET - All Wines - `/api/v1/wines`

Hitting this endpoint will return to you an array of wine objects

`{
id: 1,
name: "Law Estate Wines - Intrepid",
grape_type: "N/A",
color: "N/A",
production_year: 2011,
score: 92,
price: "$67",
vineyard_id: 2,
created_at: "2018-10-13T19:40:21.652Z",
updated_at: "2018-10-13T19:40:21.652Z"
},
{
id: 2,
name: "Law Estate Wines - The Nines",
grape_type: "N/A",
color: "N/A",
production_year: 2011,
score: 95,
price: "$85",
vineyard_id: 2,
created_at: "2018-10-13T19:40:21.654Z",
updated_at: "2018-10-13T19:40:21.654Z"
},
`

* GET - Specific Winery - `api/v1/wines/:wine_id`

Include a wine_id in request URL

##### Example URL

`https://ml-tk-vitis-vinifera.herokuapp.com/api/v1/wines/17`

##### Example Response

`{
id: 17,
name: "Nebbiolo",
grape_type: "N/A",
color: "N/A",
production_year: 2009,
score: 0,
price: "$28",
vineyard_id: 6,
created_at: "2018-10-13T19:40:21.670Z",
updated_at: "2018-10-13T19:40:21.670Z"
}`

* POST - Add New Winery - ```/api/v1/wineyards```

A correct request object needs to be sent with all parameters correctly filled in 

##### Example Request Object

`{
name: "DRY STACK",
location: "somewhere",
date_established: 0,
harvest: true,
created_at: "2018-10-13T19:40:20.683Z",
updated_at: "2018-10-13T19:40:20.683Z"
},`

* PUT - Edit existing wines data in database - ```/api/v1/wines/:wine_id```

Send a complete wine object to edit information for a specific wine 

##### Example Request Object (using GET wine response example from above)

`{
id: 17,
name: "Nebbiolo Supreme",
grape_type: "Nebbiolo",
color: "Red",
production_year: 2009,
score: 90,
price: "$48",
vineyard_id: 6,
created_at: "2018-10-13T19:40:21.670Z",
updated_at: "2018-10-13T19:40:21.670Z"
}`

* DELETE - Remove a Winery from database - `/api/v1/wines/:wine_id`

fin
