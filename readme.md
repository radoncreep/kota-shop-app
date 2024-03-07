# Kota app

Nice to meet you, I'm Victor! This application provides a platform that enables chef(s) to manage their Kota (a sandwich popular in South Africa, Singapore and so on) shop. This app provides basic features.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Improvements](#improvements)

## Introduction

This is a full stack application with concise CRUD functionalities.

## Features

- Authentication (short lived using access tokens)
- Authorization
- Read and Write Operations on Menu Items
- Menu Item Image upload

## Technologies Used

- React
- React Query (to preserve server state and development speed for the timeline of this project)
- Chakra UI
- Go
- Gorm
- Gin
- Docker Compose

## Installation Requirement

- You have docker installed on your machine that's all.

## Setup and Installation

1. Clone the repository.
2. Set up environment variables using the env template in the root dir and each project level layer.
3. Build and run the application using Docker Compose.

## Usage

You should have 3 containers running for the frontend, backend and database.

## Improvements

- Proper payload validation for routes on the backend
- the use of refresh tokens for long lived sessions
- integrate an in-memory database like redis to cache refresh tokens. Probably not responses, not a lot of traffic for this use case
- use multi-stage build to reduce image size
- use a cloud storage like s3 to manage images instead of using the app server's file system
- use charts for more insightful data on the frontend
- utilize clean architecture

These might all sound like an overkill but it would be a starter approach for a production ready application
