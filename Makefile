export NOW=$(shell date +"%Y/%m/%d")

configure:
	@echo "${NOW} === CONFIGURING ENV ==="
	@yarn install
	@echo "${NOW} === DONE ==="

migrate:
	@echo "${NOW} === MIGRATING ==="
	@knex migrate:latest --env development
	@echo "${NOW} === DONE ==="

seed:
	@echo "${NOW} === SEEDING ==="
	@knex seed:run
	@echo "${NOW} === DONE ==="

rollback:
	@echo "${NOW} === ROLLBACK MIGRATION ==="
	@knex migrate:rollback --all --env development
	@echo "${NOW} === DONE ==="

.PHONY: dev
dev:
	@echo "${NOW} === RUNNING DEVELOPMENT ENV ==="
	@yarn install
	@docker-compose up -d
	@echo "click this link to open the backend http://localhost:4100"
	@echo "${NOW} === DONE ==="

copies:
	@echo "${NOW} === COPYING NON TS FILES ==="
	@copyfiles -u 1 src/**/*.js lib
	@echo "${NOW} === DONE ==="

down:
	@echo "${NOW} === STOPPING ALL SERVICES ==="
	@docker-compose down

clean:
	@echo "${NOW} === CLEANING TEMPORARY FILES ==="
	@docker rmi -f bipi-test-be
	@rm -rf ./out
	@rm -rf ./node_modules
	@echo "${NOW} === DONE ==="
