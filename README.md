# 🍷 Vitis Vinifera API [![Build Status](https://travis-ci.org/michaelyons/BYOB-server.svg?branch=master)](https://travis-ci.org/michaelyons/BYOB-server)

### Table of Contents
* [Vineyards](https://github.com/michaelyons/BYOB-server/blob/master/README.md#-vineyards)
* [Wines](https://github.com/michaelyons/BYOB-server/blob/master/README.md#-wines)
___

#####  Vineyards 


* GET - 🏘 All Vineyards - ```/api/v1/vineyards```

Hitting this endpoint will return an array of 44 individual vineyard objects

###### Example Response

```
[ {
id: 1, name: 'Camus Winery', 
location: 'Yountville, CA', 
date_established: 1968, 
harvest: TRUE
},

{
id: 2, name: 'Beckman Vineyards', 
location: 'San Ynez, CA', 
date_established: 1988, 
harvest: TRUE
},
```

etc. 

* GET - 🏠 Specific Vineyard - ```/api/v1/vineyards/:vineyard_id```

This endpoint will return a specific vineyard object. To do so, you need to add to the request url to include a vineyard_id integer

###### Example URL

`https://ml-tk-vitis-vinifera.herokuapp.com/api/v1/vineyards/1`

###### Example Response

`{
id: 1, name: 'Camus Winery', 
location: 'Yountville, CA', 
date_established: 1968, 
harvest: TRUE
}`

* POST - Add  1 New Vineyard - ```/api/v1/vineyards```

Sending a request to this end point creates a new vineyard in the database. To successfully add a new vineyard, a correct request object needs to be sent with all parameters correctly filled in. An affirmative message is sent to indicate when a vineyard has been successfully added

###### Example Request Object

`{name: 'mike vineyard', location: 'Santa Barbara, CA', date_established: 1991, harvest: TRUE}`

###### Example Response for Correct Database addition

`Vineyards successfully added!`


* PUT - Edit specific existing vineyard data in database - ```/api/vineyards/:vineyard_id```




#####  Wines 

