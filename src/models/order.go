package models

type Order struct {
	Model
	TransactionId   string      `json:"transaction_id" gorm:"null"`
	UserId          uint        `json:"user_id"`
	Code            string      `json:"code"`
	AmbassadorEmail string      `json:"ambassador_email"`
	FirstName       string      `json:"-"`
	LastName        string      `json:"-"`
	Name            string      `json:"name" gorm:"-"`
	Total           float64     `json:"total" gorm:"-"`
	Email           string      `json:"email"`
	Address         string      `json:"address" gorm:"null"`
	City            string      `json:"city" gorm:"null"`
	Country         string      `json:"country" gorm:"null"`
	Zip             string      `json:"zip" gorm:"null"`
	Complete        bool        `json:"-" gorm:"default:false"`
	OrderItems      []OrderItem `json:"order_item" gorm:"foreignKey:OrderId"`
}

type OrderItem struct {
	Model
	OrderId           uint    `json:"order_id"`
	ProductTitle      string  `json:"product_title"`
	Price             float64 `json:"price"`
	Quantity          uint    `json:"quantity"`
	AdminRevenue      float64 `json:"admin_revenue"`
	AmbassadorRevenue float64 `json:"ambassodar_revenue"`
}

func (order *Order) FullName() string {
	return order.FirstName + " " + order.LastName
}

func (order *Order) TotalAmount() float64 {
	var total float64 = 0
	for _, orderItem := range order.OrderItems {
		total += orderItem.Price * float64(orderItem.Quantity)
	}
	return total
}
