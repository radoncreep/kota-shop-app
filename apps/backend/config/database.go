package config

import (
	"fmt"
	"log"
	"os"

	"github.com/radoncreep/apps/kota-backend/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectAndMigrateDB() {
	var error error

	// env included in repository so you dont need to setup yourself
	dbName := os.Getenv("KOTA_DB_NAME")
    conn_url := fmt.Sprintf("user=%s password=%s host=%s port=%s sslmode=disable",
        os.Getenv("KOTA_DB_USER"),
        os.Getenv("KOTA_DB_PASSWORD"),
		os.Getenv("KOTA_DB_HOST"),
        os.Getenv("KOTA_DB_PORT"),
    )

    conn_db_url := fmt.Sprintf("%s dbname=%s", conn_url, dbName)
    DB, _ = gorm.Open(postgres.Open(conn_url), &gorm.Config{})
    count  := 0
    DB.Raw("SELECT count(*) FROM pg_database WHERE datname = ?", dbName).Scan(&count)
    if count == 0 {
        sql :=fmt.Sprintf("CREATE DATABASE %s", dbName)
        result := DB.Exec(sql) 
		fmt.Print(result.Error)
    } else {
		fmt.Printf("Database %v already exists", dbName)
	}

    DB, error = gorm.Open(postgres.Open(conn_db_url), &gorm.Config{})
	
	if error != nil {
		log.Fatalf("Error connecting to database %v: %v", dbName, error)
	}

	DB.AutoMigrate(&models.Chef{}, &models.MenuItem{})
}
