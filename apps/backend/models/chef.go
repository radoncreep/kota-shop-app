package models

import "time"

type Chef struct {
	ID uint `gorm:"column:id;primaryKey;autoIncrement"`
	FirstName string `gorm:"column:first_name;not null"`
	LastName string `gorm:"column:last_name;not null"`
	Email string `gorm:"column:email;uniqueIndex;not null"`
	PasswordHash string `gorm:"column:password_hash;not null;"`
	MenuItem []MenuItem 
	CreatedAt time.Time 
	UpdatedAt time.Time
}