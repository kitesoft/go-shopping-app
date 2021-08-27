package main

import (
	"fmt"
	"github.com/joho/godotenv"
	"log"
	"os"
	"shop/src/database"
	"shop/src/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

// @title API
// @version 1.0
// @description Ambassondar app swagger documentation.
// @contact.name API Support
// @contact.email titusdishon@gmail.com
// @license.name Apache 2.0
// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name Authorization
// @BasePath /api

func main() {
	err:=godotenv.Load(".env")
	if err!=nil {
		log.Fatalf("error loading .env file")
	}
    cloudinaryApi := os.Getenv("CLOUDINARY_API")
	fmt.Println(cloudinaryApi)
	database.Connect()
	database.AutoMigrate()
	database.SetupRedis()
	database.SetupCacheChannel()
	app := fiber.New()
	routes.SwaggerRoute(app)
	app.Use(cors.New(cors.Config{
		AllowCredentials: true,
	}))
	routes.Setup(app)
	app.Listen(":9000")

}
