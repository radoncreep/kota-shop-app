package main

import (
	"fmt"
	"os"

	"github.com/radoncreep/apps/kota-backend/config"
	"github.com/radoncreep/apps/kota-backend/routes"

	"github.com/gin-gonic/gin"
)

func init() {
	config.LoadEnvVariables()
	config.ConnectAndMigrateDB()
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	router := gin.Default()

	routes.MenuItemsRoutes(router)
	routes.ChefRoutes(router)

	fmt.Printf("running on port %v", port)
	router.Run(":" + port)
}