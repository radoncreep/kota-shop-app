package controllers

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"github.com/radoncreep/apps/kota-backend/config"
	"github.com/radoncreep/apps/kota-backend/models"
	"golang.org/x/crypto/bcrypt"
)

func RegisterChef(ctx *gin.Context) {
	var payload struct {
		Email string
		Password string
		FirstName string
		LastName string
	}

	if err := ctx.Bind(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request payload"})
		return 
	}

	hash, err := bcrypt.GenerateFromPassword([]byte(payload.Password), 10)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed",
			"error": "Internal server error: Failed to hash user",
		})
		return 
	}

	newChef := models.Chef{
		FirstName: payload.FirstName, 
		LastName: payload.LastName, 
		Email: payload.Email,
		PasswordHash: string(hash),
	}

	result := config.DB.Create(&newChef) 

	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed",
			"error": result.Error,
		})
		return 
	}

	ctx.JSON(http.StatusCreated, gin.H{"message": "success"})

}

func LoginChef(ctx *gin.Context) {
	var payload struct {
		Email string
		Password string
	}

	if err := ctx.Bind(&payload); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": "Invalid request payload"})
		return 
	}

	var chef models.Chef
	// result := config.DB.First(&chef, "email = ?", payload.Email)
	result := config.DB.Where("email = ?", payload.Email).First(&chef)

	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"message": "failed",
			"error": "Invalid credentials",
		})
		return 
	}

	err := bcrypt.CompareHashAndPassword([]byte(chef.PasswordHash), []byte(payload.Password))

	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"message": "failed",
			"error": "Invalid credentials",
		})
		return 
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": chef.ID,
		"exp": time.Now().Add(time.Hour * 24).Unix(),
	})

	accessToken, err := token.SignedString([]byte(os.Getenv("JWT_SECRET")))
	fmt.Printf("ERROR %v", err)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "failed",
			"error": err,
		})
		return 
	}

	ctx.SetSameSite(http.SameSiteLaxMode)
	domain := os.Getenv("DOMAIN")
	ctx.SetCookie("Authorization", accessToken, 3600 * 24, "/", domain, false, false)

	ctx.JSON(http.StatusOK, gin.H{ "message": "success" })
}
