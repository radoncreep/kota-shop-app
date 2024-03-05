package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/radoncreep/apps/kota-backend/models"
)

func CreateMenu(ctx *gin.Context) {
	chef, exists := ctx.Get("chef")
	
	if !exists {
		ctx.JSON(http.StatusForbidden, gin.H{"message": "failed", "error": "Invalid user" })
	}
	chef, ok := chef.(models.Chef)
	if !ok {
		ctx.JSON(http.StatusForbidden, gin.H{"message": "failed", "error": "Invalid user" })
	}

	ctx.JSON(201, gin.H{"menuItem": ""})
}

func UpdateMenu(ctx *gin.Context) {
	ctx.JSON(201, gin.H{"menuItem": ""})
}

func GetOne(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"menuItem": ""})
}

func GetMany(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"menuItem": ""})
}

func DeletOne(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"menuItem": ""})
}