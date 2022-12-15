# bipi-test
part of bipi technical test

# access link
### base api
https://bipi-test.atkev.site/api

### get merchants
https://bipi-test.atkev.site/api/merchants

### base graphql
https://bipi-test.atkev.site/graphql

### get merchants query
https://bipi-test.atkev.site/graphql?query=%7B%0A%20%20getMerchants(name%3A%20ASC%2C%20per_page%3A%203)%20%7B%0A%20%20%20%20total%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20is_active%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A

### toggle bulk is active query
https://bipi-test.atkev.site/graphql?query=mutation%20%7B%0A%20%20toggleMerchantsIsActive(ids%3A%20%5B1%2C%202%2C%203%2C%204%2C%205%5D)%20%7B%0A%20%20%20%20nodes%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20name%0A%20%20%20%20%20%20is_active%0A%20%20%20%20%7D%0A%20%20%20%20error%20%7B%0A%20%20%20%20%20%20message%0A%20%20%20%20%20%20code%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A
