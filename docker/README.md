# Docker Setup for Finance Control

This directory contains the Docker configuration for running the PostgreSQL database in development.

## Prerequisites

- Docker
- Docker Compose

## Configuration

The Docker Compose file sets up a PostgreSQL 16 database with the following configuration:

- Database name: `finance_db`
- Username: `postgres`
- Password: `postgres`
- Port: `5432`

## Starting the Database

To start the database, run:

```bash
docker-compose up -d
```

## Stopping the Database

To stop the database, run:

```bash
docker-compose down
```

## Checking Database Status

To check if the database is running:

```bash
docker-compose ps
```

## Accessing the Database

You can connect to the database using any PostgreSQL client with the following connection details:

- Host: `localhost`
- Port: `5432`
- Database: `finance_db`
- Username: `postgres`
- Password: `postgres`

## Development Configuration

The application's `application-dev.properties` file is already configured to use these database settings. No additional configuration is needed.

## Data Persistence

The database data is persisted in a Docker volume named `postgres_data`. This means your data will survive container restarts and recreations.

To completely remove the database and its data:

```bash
docker-compose down -v
``` 