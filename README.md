# BYOB-server [![Build Status](https://travis-ci.org/michaelyons/BYOB-server.svg?branch=master)](https://travis-ci.org/michaelyons/BYOB-server)

### Endpoints
___

#####  Group - Vineyards 


* GET - All Vineyards - ```/api/v1/vineyards```

Hitting this endpoint will return an array of 44 individual vineyard objects

###### Example Response

`[ {
id: 1, name: 'Camus Winery', 
location: 'Yountville, CA', 
date_established: 1968, 
harvest: TRUE
},`

`{
id: 2, name: 'Beckman Vineyards', 
location: 'San Ynez, CA', 
date_established: 1988, 
harvest: TRUE
},`

etc. 

* GET - Specific Vineyard - ```/api/v1/vineyards/:vineyard_id```

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
