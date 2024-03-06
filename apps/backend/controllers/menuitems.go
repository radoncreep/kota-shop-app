package controllers

import (
	"fmt"
	"net/http"
	"path/filepath"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/radoncreep/apps/kota-backend/config"
	"github.com/radoncreep/apps/kota-backend/models"
)

func CreateMenu(ctx *gin.Context) {
	_, exists := ctx.Get("chef")
	
	if !exists {
		ctx.JSON(http.StatusForbidden, gin.H{"message": "failed", "error": "Invalid user" })
	}

	Name := ctx.PostForm("name")
	Description := ctx.PostForm("description")
	Price := ctx.PostForm("price")
	Quantity := ctx.PostForm("quantity")

	fmt.Printf("price %v and quantity %v", Price, Quantity)

	price, err1 := strconv.ParseUint(Price, 10, 64)
	quantity, err2 := strconv.ParseUint(Quantity, 10, 64)
	
	if err1 != nil || err2 != nil {
		ctx.JSON(500, gin.H{"error": err1, "erro2": err2})
		return
	}

	image, err := ctx.FormFile("image")
	if err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	filename := filepath.Join("images/menuitem", image.Filename)

	if err := ctx.SaveUploadedFile(image, filename); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "Failed",
			"error": "Failed to save image from payload",
		})
		return
	}

	newMenuItem := models.MenuItem {
		Name: Name,
		Description: Description,
		Price: uint(price),
		Quantity: uint(quantity),
		ImageUrl: filename,
	}

	result := config.DB.Create(&newMenuItem)

	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed",
			"error": "Failed to create menu item",
		})
		return 
	}

	//TODO: find all that belongs to chef 
	var menuItems []models.MenuItem
	res := config.DB.Find(&menuItems)

	if res.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed",
			"error": "Failed to retrieve menu items",
		})
		return 
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "success", "menuItem": &menuItems})
}

func UpdateMenu(ctx *gin.Context) {
	menuItemidParam := ctx.Param("id")
    menuItemId, err := strconv.Atoi(menuItemidParam)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid menu item id"})
        return
    }

    var menuItem models.MenuItem
    if err := config.DB.First(&menuItem, menuItemId).Error; err != nil {
        ctx.JSON(http.StatusNotFound, gin.H{"error": "menu item not found"})
        return
    }

	Name := ctx.PostForm("name")
	Description := ctx.PostForm("description")
	Price := ctx.PostForm("price")
	Quantity := ctx.PostForm("quantity")

	price, err1 := strconv.ParseUint(Price, 10, 64)
	quantity, err2 := strconv.ParseUint(Quantity, 10, 64)
	
	if err1 != nil || err2 != nil {
		ctx.JSON(500, gin.H{"error": err1, "erro2": err2})
		return
	}

	image, err := ctx.FormFile("image")
	if err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	filename := filepath.Join("images/menuitem", image.Filename)

	updatedMenuItem := models.MenuItem {
		ID: menuItem.ID,
		Name: Name,
		Description: Description,
		Price: uint(price),
		Quantity: uint(quantity),
		ImageUrl: filename,
	}

    if err := config.DB.Save(&updatedMenuItem).Error; err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update item"})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"data": updatedMenuItem})
}

func GetOne(ctx *gin.Context) {
	menuItemidParam := ctx.Param("id")
    menuItemId, err := strconv.Atoi(menuItemidParam)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    var menuItem models.MenuItem
    if err := config.DB.First(&menuItem, menuItemId).Error; err != nil {
        ctx.JSON(http.StatusNotFound, gin.H{"error": "Menu item not found"})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"menuItem": menuItem})
}

func GetMany(ctx *gin.Context) {
	var menuItems []models.MenuItem
	res := config.DB.Find(&menuItems)

	if res.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed",
			"error": "Failed to retrieve menu items",
		})
		return 
	}

	ctx.JSON(http.StatusOK, gin.H{"message": "success", "menuItem": &menuItems})
}

func DeletOne(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{"menuItem": ""})
}