package controllers

import (
	"fmt"
	"shop/src/database"
	"shop/src/middlewares"
	"shop/src/models"
	"strconv"

	"github.com/bxcodec/faker/v3"
	"github.com/gofiber/fiber/v2"
)

// Register func get all the links for an User.
// @Description  get all the links.
// @Summary  get all the links.
// @Tags User
// @Accept json
// @Produce json
// @Param id path string true "Link code"
// @Success 200 {object} models.Link
// @Router /admin/users/{id}/links [get]
func Link(c *fiber.Ctx) error {
	id, _ := strconv.Atoi(c.Params("id"))
	var links []models.Link
	database.DB.Where("user_id=?", id).Find(&links)
	for i, link := range links {
		var orders []models.Order
		database.DB.Where("code=? and complete=true", link.Code).Find(&orders)
		links[i].Orders = orders
	}
	return c.JSON(links)
}

type CreateLinkRequest struct {
	Products []int
}

// Register func crete link for a Ambassador.
// @Description  crete link.
// @Summary  create link the stats.
// @Tags Ambassador
// @Accept json
// @Produce json
// @Param link body models.Link true "Link attributes"
// @Success 200 {object} models.Link
// @Router /ambassador/stats [post]
func CreateLink(c *fiber.Ctx) error {
	var request CreateLinkRequest
	if err := c.BodyParser(&request); err != nil {
		return err
	}
	id, _ := middlewares.GetUserId(c)
	link := models.Link{
		UserId: id,
		Code:   faker.Username(),
	}
	fmt.Println(id)
	for _, productId := range request.Products {
		product := models.Product{}
		product.Id = uint(productId)
		link.Products = append(link.Products, product)
	}
	database.DB.Create(&link)
	return c.JSON(link)
}

// Register func get all the stats for a user.
// @Description  get all the stats.
// @Summary  get all the stats.
// @Tags Ambassador
// @Accept json
// @Produce json
// @Success 200 {object} models.Order
// @Router /ambassador/stats [get]
func Stats(c *fiber.Ctx) error {
	id, _ := middlewares.GetUserId(c)
	var links []models.Link
	database.DB.Find(&links, models.Link{
		UserId: id,
	})
	var result []interface{}
	var orders []models.Order

	for _, link := range links {
		database.DB.Preload("OrderItems").Find(&orders, models.Order{
			Code:     link.Code,
			Complete: true,
		})
		revenue := 0.0
		for _, order := range orders {
			revenue += order.TotalAmount()
		}
		result = append(result, fiber.Map{
			"code":    link.Code,
			"count":   len(link.Orders),
			"revenue": revenue,
		})
	}
	return c.JSON(result)
}

// Register func get all the links for an ambassador.
// @Description  get all the links.
// @Summary  get all the links.
// @Tags Checkout
// @Accept json
// @Produce json
// @Param code path string true "Link code"
// @Success 200 {object} models.Link
// @Router /checkout/links/{code} [get]
func GetLinks(c *fiber.Ctx) error {
	code := c.Params("code")
	link := models.Link{
		Code: code,
	}

	database.DB.Preload("users").Preload("Products").First(&link)

	return c.JSON(link)
}
