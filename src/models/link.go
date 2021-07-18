package models

type Link struct {
	Model
	Code     string    `json:"code"`
	UserId   string    `json:"user_id"`
	User     User      `json:"user" gorm:"foreignKey:UserId"`
	Products []Product `json:"products" gorm:"many2many:limk_products"`
	Orders   []Order   `json:"order" gorm:"-"`
}
