package routes

import (
	"ambassodor/src/controllers"
	"ambassodor/src/middlewares"

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
}
