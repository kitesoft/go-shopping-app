package main

import (
	"context"
	"shop/src/database"
	"shop/src/models"

	"github.com/go-redis/redis/v8"
)

func main() {
	database.Connect()
	database.SetupRedis()

	ctx := context.Background()

	var users []models.User

	database.DB.Find(&users, models.User{
		IsAmbassador: true,
	})

	for _, user := range users {
		ambassodar := models.Ambassador(user)
		ambassodar.CalculateRevenue(database.DB)
		database.Cache.ZAdd(ctx, "rankings", &redis.Z{
			Score:  *ambassodar.Revenue,
			Member: user.Name(),
		})
	}
}
