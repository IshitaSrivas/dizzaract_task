IMAGE  := dizzaract-task
PORT   := 3005

.PHONY: help build up down clean run install lint

help:
	@echo ""
	@echo "  dizzaract-task — available make commands"
	@echo "  ─────────────────────────────────────────────────────────────────"
	@echo "  make install   install npm dependencies (npm ci)"
	@echo "  make build     type-check + production build into dist/"
	@echo "  make lint      run ESLint across the source"
	@echo "  make run       start the Vite dev server locally (no Docker)"
	@echo "  make up        build Docker image and start container on port $(PORT)"
	@echo "  make down      stop and remove the running container"
	@echo "  make clean     down + remove Docker image + delete dist/"
	@echo "  make help      show this message"
	@echo ""

install:
	npm ci

build: install
	npm run build

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

lint:
	npm run lint

run: install
	npm run dev
