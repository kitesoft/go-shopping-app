package routes

import (
	"shop/src/controllers"
	"shop/src/middlewares"

	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {
	api := app.Group("api")
	admin := api.Group("admin")
	admin.Post("register", controllers.Register)
	admin.Post("login", controllers.Login)
	adminAuthenticated := admin.Use(middlewares.IsAuthenticated)
	adminAuthenticated.Get("user", controllers.User)
	adminAuthenticated.Post("logout", controllers.Logout)
	adminAuthenticated.Put("update", controllers.UpdateProfile)
	adminAuthenticated.Put("update-password", controllers.UpdatePassword)
	adminAuthenticated.Get("ambassadors", controllers.Ambassadors)
	adminAuthenticated.Get("products", controllers.Products)
	adminAuthenticated.Post("product", controllers.CreateProduct)
	adminAuthenticated.Get("product/:id", controllers.GetProduct)
	adminAuthenticated.Delete("product/:id", controllers.DeleteAProduct)
	adminAuthenticated.Put("product/:id", controllers.UpdateProduct)
	adminAuthenticated.Get("users/:id/links", controllers.Link)
	adminAuthenticated.Get("orders", controllers.Orders)

	ambassador := api.Group("ambassador")
	ambassador.Post("register", controllers.Register)
	ambassador.Post("login", controllers.Login)
	ambassador.Get("products/frontend", controllers.ProductFrontend)
	ambassadorAuthenticated := ambassador.Use(middlewares.IsAuthenticated)
	ambassadorAuthenticated.Get("user", controllers.User)
	ambassadorAuthenticated.Post("logout", controllers.Logout)
	ambassadorAuthenticated.Put("users/info", controllers.UpdateProfile)
	ambassadorAuthenticated.Put("users/password", controllers.UpdatePassword)
	//TODO:
	//products/frontend
	//products/backend
	//links
	//stats
	//ranks
}
