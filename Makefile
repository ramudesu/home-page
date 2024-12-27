# ifeq (,$(wildcard .env))
# $(shell cp .env.example .env)
# endif

# include .env

devrun:
	bun run dev

devinstall:
	bun install

devbuild:
	bun build

devclean:
	rm -rf node_modules

lint-web:
	cd web && yarn lint --fix

lint-api:
	cd api && yarn lint --fix