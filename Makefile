# ifeq (,$(wildcard .env))
# $(shell cp .env.example .env)
# endif

# include .env

devrun:
	bun run dev

lint-web:
	cd web && yarn lint --fix

lint-api:
	cd api && yarn lint --fix