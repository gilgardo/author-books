.PHONY: enter up down
enter:
	docker exec -it docker-next sh
up:
	docker compose up -d
down:
	docker compose down
