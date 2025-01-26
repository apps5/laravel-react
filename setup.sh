#!/bin/bash

set -e  # Exit on error

echo "Starting setup script..."
echo "Current directory: $(pwd)"
echo "Contents of /var/www:"
ls -al /var/www

# Ensure we are in the correct directory
cd /var/www

# Check if composer.json exists
if [ ! -f composer.json ]; then
    echo "Error: composer.json not found in /var/www"
    exit 1
fi

# Check if vendor directory exists
if [ ! -d vendor ]; then
    echo "Vendor directory not found. Running composer install..."
    composer install --no-dev --no-scripts --no-interaction --prefer-dist --verbose
else
    echo "Vendor directory exists. Running composer update..."
    composer update --no-dev --no-scripts --no-interaction --prefer-dist --verbose
fi

echo "Setup script completed successfully."
