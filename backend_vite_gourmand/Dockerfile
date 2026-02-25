FROM php:8.2-cli

# Installation des dépendances pour MySQL et MongoDB
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libzip-dev \
    zip \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    pkg-config \
    libssl-dev \
    && docker-php-ext-install intl pdo_mysql gd

# Installation de l'extension MongoDB
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Installation de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

# Installation des dépendances Symfony
RUN composer install --no-scripts --optimize-autoloader --ignore-platform-reqs

EXPOSE 8080

# Commande de démarrage
CMD ["php", "-S", "0.0.0.0:8080", "-t", "public", "public/index.php"]