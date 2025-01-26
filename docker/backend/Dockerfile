FROM php:8.1-fpm

# Install dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    libonig-dev \
    zip \
    libzip-dev \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl && \
    pecl install xdebug-3.2.1 && \
    docker-php-ext-enable xdebug && \
    docker-php-ext-install pdo_mysql mbstring zip exif pcntl && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd && \
    curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    # Clear cache
    apt-get clean && rm -rf /var/lib/apt/lists/*


# Install Composer
RUN curl -sS https://getcomposer.org/installer -o composer-setup.php && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer && \
    chmod +x /usr/local/bin/composer && \
    rm composer-setup.php && \
    /usr/local/bin/composer --version
  
# Add user for Laravel application
RUN groupadd -g 1000 www && useradd -u 1000 -ms /bin/bash -g www www

# Set working directory
WORKDIR /var/www
RUN chmod -R 775 /var/www

# Copy application files
#COPY . /var/www/
ADD . /var/www

# Change current user to www
USER www

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]
