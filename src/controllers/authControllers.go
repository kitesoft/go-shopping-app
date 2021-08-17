package controllers

import (
	"shop/src/database"
	"shop/src/middlewares"
	"shop/src/models"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

// Register func creates a new user.
// @Description create a new user.
// @Summary create a user
// @Tags User, Ambassador
// @Accept json
// @Produce json
// @Param user_attrs body models.UserRegister true "User attributes"
// @Success 200 {object} models.UserRegister
// @Router /admin/register [post]
func Register(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	if data["password"] != data["confirm_password"] {
		c.Status(400)
		return c.JSON(
			fiber.Map{
				"message": "passwords do not match",
			})
	}

	user := models.User{
		FirstName:    data["first_name"],
		LastName:     data["last_name"],
		Email:        data["email"],
		IsAmbassador: strings.Contains(c.Path(), "/api/ambassador"),
	}
	user.SetPassword(data["password"])
	database.DB.Create(&user)
	return c.JSON(user)
}

// Register func logs in a user
// @Description login user.
// @Summary login to your account
// @Tags User, Ambassador
// @Accept json
// @Produce json
// @Param user_login_attrs body models.UserLogin true "User login credentials"
// @Success 200 {object} models.UserLogin
// @Router /admin/login [post]
func Login(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}

	var user models.User
	database.DB.Where("emaiL= ?", data["email"]).First(&user)
	if user.Id == 0 {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(
			fiber.Map{
				"message": "User not found",
			})
	}
	if err := user.ComparePassword(data["password"]); err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Wrong password",
		})
	}
	isAmbassodar := strings.Contains(c.Path(), "/api/ambassador")
	var scope string
	if isAmbassodar {
		scope = "ambassador"
	} else {
		scope = "admin"
	}

	if !isAmbassodar && user.IsAmbassador {
		return c.JSON(
			fiber.Map{
				"message": "unauthorized",
			})
	}
	token, err := middlewares.GenerateJWT(user.Id, scope)

	if err != nil {
		c.Status(fiber.StatusBadRequest)
		return c.JSON(fiber.Map{
			"message": "Invalid credentials",
		})
	}
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "success",
		"user":    user,
	})
}

// Register func get user details
// @Description Get user profile details.
// @Summary Get your profile details
// @Tags User, Ambassador
// @Accept json
// @Produce json
// @Success 200 {object} models.User
// @Router /admin/user [get]
func User(c *fiber.Ctx) error {
	id, _ := middlewares.GetUserId(c)
	var user models.User
	//get user from the database
	database.DB.Where("id = ?", id).First(&user)
	//calculate the user revenue based on the type of the user
	if strings.Contains(c.Path(), "/api/ambassador") {
		ambassador := models.Ambassador(user)
		ambassador.CalculateRevenue(database.DB)
		return c.JSON(ambassador)
	}
	database.DB.Where("id=?", id).First(&user)
	return c.JSON(user)
}

// Register funclogout user
// @Description logout from your account.
// @Summary Logout when done, you do not need to send any data
// @Tags User, Ambassador
// @Accept json
// @Produce json
// @Success 200 {object} models.Success
// @Router /admin/logout [post]
func Logout(c *fiber.Ctx) error {
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}

// Register func update profile.
// @Description update profile.
// @Summary Update profile
// @Tags User, Ambassador
// @Accept json
// @Produce json
// @Param user_attrs body models.User true "User profile attributes"
// @Success 200 {object} models.User
// @Router /admin/update [put]
func UpdateProfile(c *fiber.Ctx) error {
	var data map[string]string

	if err := c.BodyParser(&data); err != nil {
		return err
	}
	id, _ := middlewares.GetUserId(c)
	user := models.User{
		FirstName: data["first_name"],
		LastName:  data["last_name"],
		Email:     data["email"],
	}
	user.Id = id

	database.DB.Model(&user).Updates(&user)
	return c.JSON(user)

}

// Register func update password.
// @Description update password.
// @Summary Update password
// @Tags User, Ambassador
// @Accept json
// @Produce json
// @Param user_attrs body models.ChangePasswordRequest true "Password attributes"
// @Success 200 {object} models.ChangePasswordRequest
// @Router /admin/update-password [put]
func UpdatePassword(c *fiber.Ctx) error {
	var data map[string]string
	if err := c.BodyParser(&data); err != nil {
		return err
	}
	if data["password"] != data["confirm_password"] {
		c.Status(400)
		return c.JSON(
			fiber.Map{
				"message": "passwords do not match",
			})
	}

	id, _ := middlewares.GetUserId(c)
	user := models.User{}
	user.Id = id
	user.SetPassword(data["password"])
	database.DB.Model(&user).Updates(&user)
	return c.JSON(fiber.Map{
		"message": "success",
	})
}
