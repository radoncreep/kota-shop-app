package routes

import (
	"github.com/radoncreep/apps/kota-backend/controllers"

	"github.com/gin-gonic/gin"
)


func ChefRoutes(router *gin.Engine) {
	group := router.Group("/chef")
	{
		group.POST("/register", controllers.RegisterChef)
		group.POST("/login", controllers.LoginChef)
		// group.GET("", controllers.)
		// group.GET("/:id", controllers.GetOne)
		// group.PUT("/:id", controllers.UpdateMenu)
		// group.DELETE("/:id", controllers.DeletOne)
	}
}