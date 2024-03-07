package routes

import (
	"github.com/radoncreep/apps/kota-backend/controllers"

	"github.com/gin-gonic/gin"
)


func ChefRoutes(router *gin.Engine) {
	group := router.Group("/auth")
	{
		group.POST("/register", controllers.RegisterChef)
		group.POST("/login", controllers.LoginChef)
	}
}