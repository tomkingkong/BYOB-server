# 🍷 Vitis Vinifera API 

[![Build Status](https://travis-ci.org/michaelyons/BYOB-server.svg?branch=master)](https://travis-ci.org/michaelyons/BYOB-server)

### Table of Contents
* [Vineyards](#-vineyards)
* [Wines](#-wines)

##   <img src="https://www.shareicon.net/data/128x128/2016/09/16/829671_nature_512x512.png" width="30" height="30" /> Vineyards

* GET - All Vineyards - ```/api/v1/vineyards```

Hitting this endpoint will return an array of vineyard objects

##### Example Response

```
[
  {
    id: 2,
    name: "LAW FAMILY VINEYARD",
    location: "somewhere",
    date_established: 2008,
    harvest: true
  },
  {
    id: 3,
    name: "HALTER RANCH VINEYARD",
    location: "somewhere",
    date_established: 0,
    harvest: true
  },
  ...
]
```
***
* GET - Specific Vineyard - ```/api/v1/vineyards/:vineyard_id```

Include a vineyard_id in request URL

##### Example URL

`https://ml-tk-vitis-vinifera.herokuapp.com/api/v1/vineyards/41`

##### Example Response

```
{   
  id: 41,
  name: "DRY STACK",
  location: "somewhere",
  date_established: 0,
  harvest: true
}
```

***
* POST - Add New Vineyard - ```/api/v1/vineyards```

A correct request object needs to be sent with all parameters correctly filled in 

##### Example Request Object

```
{
  name: "DRY STACK",
  location: "somewhere",
  date_established: 0,
  harvest: true
}
```
***
* PUT - Edit existing vineyard data in database - ```/api/v1/vineyards/:vineyard_id```

Send a complete vineyard object to edit information for a specific vineyard 

##### Example URL

`https://ml-tk-vitis-vinifera.herokuapp.com/api/v1/vineyards/41`

##### Example Request Object (using GET vineyard response example from above)

```
{
  name: "GREEN STACK",
  location: "CA",
  date_established: 2018,
  harvest: false
}
```
***
* DELETE - Remove a Vineyard from database - `api/v1/vineyards/:vineyard_id'`

##### Example URL

`https://ml-tk-vitis-vinifera.herokuapp.com/api/v1/vineyards/41`

##  🍇 Wines

* GET - All Wines - `/api/v1/wines`

Hitting this endpoint will return to you an array of wine objects

```
[
  {
    id: 1,
    name: "Law Estate Wines - Intrepid",
    grape_type: "N/A",
    color: "N/A",
    production_year: 2011,
    score: 92,
    price: "$67",
    vineyard_id: 2
  },
  {
    id: 2,
    name: "Law Estate Wines - The Nines",
    grape_type: "N/A",
    color: "N/A",
    production_year: 2011,
    score: 95,
    price: "$85",
    vineyard_id: 2
  },
  ...
]
```
***
* GET - Specific Wine - `api/v1/wines/:wine_id`

Include a wine_id in request URL

##### Example URL

`https://ml-tk-vitis-vinifera.herokuapp.com/api/v1/wines/17`

##### Example Response

```
{
  id: 17,
  name: "Nebbiolo",
  grape_type: "N/A",
  color: "N/A",
  production_year: 2009,
  score: 0,
  price: "$28",
  vineyard_id: 6
}
```
***
* POST - Add New Wine - ```/api/v1/:vineyard_id/wines```

A correct request object needs to be sent with all parameters correctly filled in 

##### Example URL

`https://ml-tk-vitis-vinifera.herokuapp.com/api/v1/6/wines`

##### Example Request Object

```
{
  name: "Nebbiolo",
  grape_type: "Pinot Gris",
  color: "white",
  production_year: 2009,
  score: 90,
  price: "$28"
}
```
***
* PUT - Edit existing wines data in database - ```/api/v1/wines/:wine_id```

Send a complete wine object to edit information for a specific wine 

##### Example URL

`https://ml-tk-vitis-vinifera.herokuapp.com/api/v1/wines/17`

##### Example Request Object (using GET wine response example from above)

```
{
  name: "Nebbiolo Supreme",
  grape_type: "Nebbiolo",
  color: "Red",
  production_year: 2009,
  score: 90,
  price: "$48",
  vineyard_id: 6
}
```
***
* DELETE - Remove a Winery from database - `/api/v1/wines/:wine_id`

##### Example URL

`https://ml-tk-vitis-vinifera.herokuapp.com/api/v1/wines/6`
