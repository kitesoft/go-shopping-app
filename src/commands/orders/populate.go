package main

import (
	"math/rand"
	"shop/src/database"
	"shop/src/models"

	"github.com/bxcodec/faker/v3"
)

func main() {
	database.Connect()
	for i := 0; i < 30; i++ {
		var orderItems []models.OrderItem
		for i := 0; i < rand.Intn(5); i++ {
			price := float64(rand.Intn(90) + 10)
			quantity := uint(rand.Intn(90) + 10)
			orderItems = append(orderItems, models.OrderItem{
				ProductTitle:      faker.Word(),
				Price:             price,
				Quantity:          quantity,
				AdminRevenue:      0.9 * price * float64(quantity),
				AmbassadorRevenue: 0.9 * price * float64(quantity),
			})
		}
		database.DB.Create(&models.Order{
			UserId:          uint(rand.Intn(30) + 1),
			Code:            faker.Username(),
			Email:           faker.Email(),
			AmbassadorEmail: faker.Email(),
			FirstName:       faker.FirstName(),
			LastName:        faker.LastName(),
			Country:         faker.Username(),
			City:            faker.Username(),
			Zip:             faker.Username(),
			Complete:        true,
			OrderItems:      orderItems,
		})
	}
}
