# RESTFUL API for PenghitungSembako

Ini adalah API yang dibuat untuk mensupport projek PenghitungSembako untuk Assessmen 3 Mata Kuliah Pemrograman untuk Perangkat Bergerak 1.

# Development

Install [Bun](https://bun.sh), then install dependencies and start the development server:

```bash
bun install
bun run dev
```

Copy `.env.example` to `.env` and adjust the values for a local MySQL and MinIO
installation.

# Docker Compose

Start the API together with MySQL and MinIO:

```bash
docker compose up --build
```

The API is available at `http://localhost:3000`, MinIO at
`http://localhost:9000`, and the MinIO console at `http://localhost:9001`.
Persistent data is stored in the `mysql_data` and `minio_data` volumes.

# Documentation

[Here](https://sembako.sendiko.dev/) is the documentation

# Credit

Made by: Sendiko
