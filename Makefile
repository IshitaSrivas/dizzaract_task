IMAGE  := dizzaract-task
PORT   := 3005

.PHONY: help build up down clean run install lint lint-fix format format-check

help:
	@echo ""
	@echo "  dizzaract-task — available make commands"
	@echo "  ─────────────────────────────────────────────────────────────────"
	@echo "  make install        install npm dependencies (npm ci)"
	@echo "  make build          type-check + production build into dist/"
	@echo "  make format         format all files with Prettier (writes in place)"
	@echo "  make format-check   check formatting without writing (CI-safe)"
	@echo "  make lint           run ESLint across the source"
	@echo "  make lint-fix       run ESLint and auto-fix fixable issues"
	@echo "  make run            start the Vite dev server locally (no Docker)"
	@echo "  make up             build Docker image and start container on port $(PORT)"
	@echo "  make down           stop and remove the running container"
	@echo "  make clean          down + remove Docker image + delete dist/"
	@echo "  make help           show this message"
	@echo ""

install:
	npm ci

build: install
	npm run build

format: install
	npm run format

format-check: install
	npm run format:check

lint: install
	npm run lint

lint-fix: install
	npm run lint:fix

up:
	docker build -t $(IMAGE) .
	docker run -d --name $(IMAGE) -p $(PORT):$(PORT) $(IMAGE)
	@echo "Running at http://localhost:$(PORT)"

down:
	docker stop $(IMAGE) || true
	docker rm   $(IMAGE) || true

clean: down
	docker rmi $(IMAGE) || true
	rm -rf dist

run: install
	npm run dev

