package config

import (
	"fmt"
	"os"

	"github.com/radoncreep/apps/kota-backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectAndMigrateDB() {
	var error error

    // dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s sslmode=disable", 
	// 	os.Getenv("KOTA_DB_HOST"), 
	// 	os.Getenv("KOTA_DB_PORT"), 
	// 	os.Getenv("KOTA_DB_USER"), 
	// 	os.Getenv("KOTA_DB_PASSWORD"), 
	// )	
	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", 
		"localhost", 
		os.Getenv("KOTA_DB_PORT"), 
		"mac", 
		os.Getenv("KOTA_DB_PASSWORD"), 
		os.Getenv("KOTA_DB_NAME"),
	)	
	DB, error = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if error != nil || DB == nil {
		fmt.Println("Failed to connect to database")
	} 

	// DB_NAME := os.Getenv("KOTA_DB_NAME")
    // if err := DB.Exec(fmt.Sprintf("CREATE DATABASE %s", DB_NAME + ";")).Error; err != nil {
    //     fmt.Println("Failed to create database:", err)
    //     return
    // }

	DB.AutoMigrate(&models.Chef{}, &models.MenuItem{})
}
