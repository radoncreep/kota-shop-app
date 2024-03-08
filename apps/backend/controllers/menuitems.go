package controllers

import (
	"net/http"
	"path/filepath"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/radoncreep/apps/kota-backend/config"
	"github.com/radoncreep/apps/kota-backend/models"
)

func CreateMenu(ctx *gin.Context) {
	chef, exists := ctx.Get("chef")
	if !exists {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "Invalid chef" })
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

	if err := ctx.SaveUploadedFile(image, filename); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to save image from payload",
		})
		return
	}

	chefInstance, ok := chef.(*models.Chef) 
	if !ok {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "couldn't find chef",
		})
		return
	}
	newMenuItem := models.MenuItem {
		Name: Name,
		Description: Description,
		Price: uint(price),
		Quantity: uint(quantity),
		ImageUrl: filename,
		ChefID: chefInstance.ID,
	}

	result := config.DB.Create(&newMenuItem)

	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to create menu item",
		})
		return 
	}

	var menuItems []models.MenuItem
	res := config.DB.Preload("Chef").Find(&menuItems)

	if res.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to retrieve menu items",
		})
		return 
	}

	ctx.JSON(http.StatusCreated, &menuItems)
}

func UpdateMenu(ctx *gin.Context) {
	chef, exists := ctx.Get("chef")
    if !exists {
        ctx.JSON(http.StatusForbidden, gin.H{"error": "Invalid chef"})
        return
    }

	chefInstance, ok := chef.(*models.Chef)
    if !ok {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid chef"})
        return
    }

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

	if menuItem.ChefID != chefInstance.ID {
        ctx.JSON(http.StatusForbidden, gin.H{"error": "Menu item does not belong to the chef"})
        return
    }

	updatedName := ctx.PostForm("name")
	updatedDescription := ctx.PostForm("description")
	updatedPrice := ctx.PostForm("price")
	updatedQuantity := ctx.PostForm("quantity")

	price, err1 := strconv.ParseUint(updatedPrice, 10, 64)
	quantity, err2 := strconv.ParseUint(updatedQuantity, 10, 64)
	
	if err1 != nil || err2 != nil {
		ctx.JSON(500, gin.H{"error": err1, "erro2": err2})
		return
	}

	image, err := ctx.FormFile("image")
	if err != nil {
		ctx.JSON(400, gin.H{"error": err.Error()})
		return
	}

	updatedImage := filepath.Join("images/menuitem", image.Filename)

	menuItem.Name = updatedName
	menuItem.Description = updatedDescription
	menuItem.ImageUrl =  updatedImage
	menuItem.Price = uint(price)
	menuItem.Quantity = uint(quantity)

    if err := config.DB.Save(&menuItem).Error; err != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update item"})
        return
    }

    ctx.JSON(http.StatusOK, menuItem)
}

func GetOne(ctx *gin.Context) {
	chef, exists := ctx.Get("chef")
	if !exists {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "Invalid chef" })
	}
	
	chefInstance, ok := chef.(*models.Chef)
	if !ok {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid chef"})
	}

	menuItemidParam := ctx.Param("id")
    menuItemId, err := strconv.Atoi(menuItemidParam)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID"})
        return
    }

    var menuItem models.MenuItem
	result := config.DB.Preload("Chef").First(&menuItem, menuItemId)
	if result.Error != nil {
        ctx.JSON(http.StatusNotFound, gin.H{"error": "Menu item not found"})
        return
    }
	if menuItem.ChefID != chefInstance.ID {
        ctx.JSON(http.StatusForbidden, gin.H{"error": "Menu item does not belong to the chef"})
        return
    }

    ctx.JSON(http.StatusOK, menuItem)
}

func GetMany(ctx *gin.Context) {
	chef, exists := ctx.Get("chef")
	if !exists {
		ctx.JSON(http.StatusForbidden, gin.H{"error": "Invalid chef" })
	}
	
	chefInstance, ok := chef.(*models.Chef)
	if !ok {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid chef"})
	}
	var menuItems []models.MenuItem
	result := config.DB.Preload("Chef").Where("chef_id = ?", chefInstance.ID).Find(&menuItems)
    if result.Error != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "No menu items associated to chef"})
        return
    }

	ctx.JSON(http.StatusOK, &menuItems)
}

func DeletOne(ctx *gin.Context) {
	chef, exists := ctx.Get("chef")
    if !exists {
        ctx.JSON(http.StatusForbidden, gin.H{"error": "Invalid chef"})
        return
    }

    chefInstance, ok := chef.(*models.Chef)
    if !ok {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid chef"})
        return
    }

    menuItemIDParam := ctx.Param("id")
    menuItemID, err := strconv.Atoi(menuItemIDParam)
    if err != nil {
        ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid menu item id"})
        return
    }

    var menuItem models.MenuItem
    result := config.DB.First(&menuItem, menuItemID)
    if result.Error != nil {
        ctx.JSON(http.StatusNotFound, gin.H{"error": "Menu item not found"})
        return
    }

    if menuItem.ChefID != chefInstance.ID {
        ctx.JSON(http.StatusForbidden, gin.H{"error": "Menu item does not belong to the chef"})
        return
    }

    result = config.DB.Delete(&menuItem, menuItemID)
    if result.Error != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete menu item"})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"message": "success"})
}