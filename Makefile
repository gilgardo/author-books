.PHONY: enter up down prisma-init
enter:
	docker exec -it author-books-backend-1 sh
up:
	docker compose up -d
down:
	docker compose down
prisma-init:
	docker exec -it author-books-backend-1 "npx prisma db push"
