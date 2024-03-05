package models

import (
	"time"
)

type MenuItem struct {
	ID uint `gorm:"column:id;primaryKey;autoIncrement"`
	Name string `gorm:"column:name:unique;not null"`
	Description string `gorm:"column:decription"`
	Price uint `gorm:"column:price;not null"`
	Quantity uint `gorm:"column:quantity:default:0"`
	ImageUrl string `gorm:"column:image_url;not null"`
	CreatedAt time.Time 
	UpdatedAt time.Time
}