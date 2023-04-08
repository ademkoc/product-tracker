# Product Tracker

As a hobby project, I want to be notified when the products I like are on sale. The application currently supports the websites of Mavi and Colins. I will expand support based on the products I need.

## Installation

```shell
docker build -t product-tracker .
```

```shell
docker run -i -t \
    -e DATABASE_URL='file:/home/node/app/prisma/sample.db' \
    -e NOTIFICATION_TOPIC='product_tracker' \
    -e NOTIFICATION_SERVICE_URL='https://ntfy.sh' \
    -p 3000:3000 \
    -v tracker_db:/home/node/app/prisma \
    product-tracker
```

## Usage

The application offers the Rest API interface. The product to be tracked is saved as Product with the POST request. The application will check the current price of the products at 10-minute intervals and will send a notification if there is a decrease in the price.

The ntfy.sh service is used for sending notifications. Notifications according to the `NOTIFICATION_TOPIC` definition can be followed via the web and mobile application.

You can find the Swagger documentation [here](http://localhost:3000/documentation).

### Create Product

```bash
curl --request POST \
  --url http://localhost:3000/products \
  --header 'Content-Type: application/json' \
  --data '{
  "url": "https://www.colins.com.tr/p/regular-fit-dugmeli-cepli-bej-erkek-mont-39024"
}'
```

```json
{
	"data": {
		"id": 1,
		"url": "https://www.colins.com.tr/p/regular-fit-dugmeli-cepli-bej-erkek-mont-39024",
		"title": "Regular Fit Düğmeli Cepli Bej Erkek Mont",
		"amount": "999.95",
		"currency": "TL",
		"lastCheckedAt": "2023-04-07T13:03:16.143Z",
		"createdAt": "2023-04-07T13:03:16.145Z",
		"updatedAt": "2023-04-07T13:03:16.145Z"
	}
}
```
