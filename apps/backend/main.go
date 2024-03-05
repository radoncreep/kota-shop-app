package main

import (
	"fmt"
	"os"

	"github.com/gin-gonic/gin"
)


func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}
	router := gin.Default()

	router.GET("/", func(ctx *gin.Context) {
		ctx.JSON(200, gin.H{"msg": "Welcome to our Kota Shop"})
	})

	fmt.Printf("running on port %v", port)
	router.Run(":" + port)
}