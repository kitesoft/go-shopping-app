package main

import (
	"ambassodor/routes"
	"ambassodor/src/database"

	"github.com/gofiber/fiber/v2"
)

func main() {
	database.Connect()
	database.AutoMigrate()
	app := fiber.New()
	routes.Setup(app)
	app.Listen(":9000")

}
