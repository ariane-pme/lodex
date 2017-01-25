.PHONY: build test help
.DEFAULT_GOAL := help

NODE_ENV ?= development

help:
	grep -P '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

# If the first argument is one of the supported commands...
SUPPORTED_COMMANDS := npm restore-db-dev _restore_db_dev restore-db-prod _restore_db_prod build import_units import_users import_sections import_unit_sections
SUPPORTS_MAKE_ARGS := $(findstring $(firstword $(MAKECMDGOALS)), $(SUPPORTED_COMMANDS))
ifneq "$(SUPPORTS_MAKE_ARGS)" ""
    # use the rest as arguments for the command
    COMMAND_ARGS := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))
    # ...and turn them into do-nothing targets
    $(eval $(COMMAND_ARGS):;@:)
endif

# Initialization ===============================================================
copy-conf: ## Initialize the configuration files by copying the *''-dist" versions (does not override existing config)
	-cp -n ./config/${NODE_ENV}-dist.js ./config/${NODE_ENV}.js
ifeq ($(NODE_ENV), development)
	-cp -n ./config/test-dist.js ./config/test.js
endif

install-npm-dependencies:
	echo "Installing Node dependencies for environment $(NODE_ENV)"
	npm install $(if $(filter production staging,$(NODE_ENV)),--production,)
ifeq ($(NODE_ENV), development)
	make install-selenium
endif

install-selenium:
	echo "Installing Selenium server"
	./node_modules/.bin/selenium-standalone install --version=2.50.1 --drivers.chrome.version=2.24

install: copy-conf install-npm-dependencies install-selenium ## Install npm dependencies for the api, admin, and frontend apps

# Development ==================================================================

run-frontend: ## Run the frontend application
	NODE_ENV=${NODE_ENV} BABEL_ENV=browser ./node_modules/.bin/webpack-dev-server --config=./src/app/webpack.config.babel.js --port=8080

docker-run-dev: ## run node server with pm2 for development and webpack-dev-server
	docker-compose up --force-recreate

# Build ==================================================================

build-frontend: ## Build the frontend application
	NODE_ENV=${NODE_ENV} BABEL_ENV=browser ./node_modules/.bin/webpack \
	    --config=./src/app/webpack.config.babel.js \
	    $(if $(filter production staging,$(NODE_ENV)),-p,-d) \
	    --progress

npm: ## allow to run dockerized npm command eg make npm 'install koa --save'
	docker-compose run --rm npm $(COMMAND_ARGS)

docker-run-dev: ## run node server with pm2 for development and webpack-dev-server
	docker-compose up --force-recreate

test-api-unit: ## Run the API unit tests
	NODE_ENV=test BABEL_ENV=browser ./node_modules/.bin/mocha \
		--require babel-polyfill \
    	--compilers="js:babel-core/register" \
    	"./src/api/**/*.spec.js"

test-frontend-unit: ## Run the frontend application unit tests
	NODE_ENV=test BABEL_ENV=browser ./node_modules/.bin/mocha \
		--require babel-polyfill \
		--require='./src/app/js/test.spec.js' \
		--compilers="css:./src/common/tests/webpack-null-compiler,js:babel-core/register" \
		"./src/app/js/**/*.spec.js"

test-frontend-functional: ## Run the frontend application functional tests
	NODE_ENV=test ${MAKE} build-frontend
	NODE_ENV=test SELENIUM_BROWSER_BINARY_PATH="./node_modules/selenium-standalone/.selenium/chromedriver/2.24-x64-chromedriver" \
		./node_modules/.bin/mocha \
        --require babel-polyfill \
		--compilers="js:babel-core/register" \
		--recursive \
		./src/app/e2e

test: test-frontend-unit test-api-unit test-frontend-functional
