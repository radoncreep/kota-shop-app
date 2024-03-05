package routes

import (
	"github.com/radoncreep/apps/kota-backend/controllers"
	"github.com/radoncreep/apps/kota-backend/middleware"

	"github.com/gin-gonic/gin"
)


func MenuItemsRoutes(router *gin.Engine) {
	group := router.Group("/menuitems")
	group.Use(middleware.ValidateRequest)

	{
		group.GET("", controllers.GetMany)
		group.GET("/:id", controllers.GetOne)
		group.POST("/", controllers.CreateMenu)
		group.PUT("/:id", controllers.UpdateMenu)
		group.DELETE("/:id", controllers.DeletOne)
	}
}