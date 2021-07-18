package main

import (
	"ambassodor/src/database"
	"ambassodor/src/models"

	"github.com/bxcodec/faker/v3"
)

func main() {
	database.Connect()
	for i := 0; i < 30; i++ {
		ambassadors := models.User{
			FirstName:    faker.FirstName(),
			LastName:     faker.LastName(),
			Email:        faker.Email(),
			IsAmbassador: true,
		}
		ambassadors.SetPassword("1234")
		database.DB.Create(&ambassadors)
	}
}
