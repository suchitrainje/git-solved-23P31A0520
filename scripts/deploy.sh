#!/bin/bash
set -e

# Multi-Environment Deploy Script
# Default to production if not specified
DEPLOY_ENV=${DEPLOY_ENV:-production}

echo "====================================="
echo "DevOps Simulator - Deployment"
echo "====================================="

# Pre-deployment checks
echo "Running pre-deployment checks..."
if [ ! -f "config/app-config.yaml" ]; then
    echo "Error: Configuration file not found!"
    exit 1
fi

if [ "$DEPLOY_ENV" = "production" ]; then
    echo "Mode: Production"
    DEPLOY_REGION="us-east-1"
    APP_PORT=8080
    echo "Environment: $DEPLOY_ENV"
    echo "Region: $DEPLOY_REGION"
    echo "Port: $APP_PORT"
    echo "Starting production deployment..."

    echo "Pulling latest Docker images..."
    # docker pull devops-simulator:latest

    echo "Rolling update strategy initiated..."
    # kubectl rolling-update devops-simulator

    echo "Application deployed to production successfully!"
    echo "Available at: https://app.example.com"

elif [ "$DEPLOY_ENV" = "development" ]; then
    echo "Mode: Development"
    DEPLOY_MODE="docker-compose"
    APP_PORT=3000
    echo "Environment: $DEPLOY_ENV"
    echo "Mode: $DEPLOY_MODE"
    echo "Port: $APP_PORT"

    echo "Installing dependencies..."
    npm install

    echo "Running tests..."
    npm test

    echo "Starting development server using Docker Compose..."
    docker-compose up -d

    echo "Waiting for application to be ready..."
    sleep 5

    echo "Performing health check..."
    curl -f http://localhost:$APP_PORT/health || {
        echo "Health check failed!"
        exit 1
    }

    echo "Application running locally!"
    echo "Available at: http://localhost:$APP_PORT"
    echo "Hot reload enabled – code changes will auto-refresh"

else
    echo "Error: Unknown environment '$DEPLOY_ENV'"
    exit 1
fi

echo "Deployment completed successfully!"
