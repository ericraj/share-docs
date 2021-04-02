# Share Docs

## Backend

### Migration &middot; [Learn more about migrations](https://typeorm.io/#/migrations)

- Update your entity
- Run `cd backend && npm run build`

#### Generate migration

- Run `npx typeorm migration:generate -d src/migrations -n name-of-your-migration`

#### Run migration

- Run `npx typeorm migration:run`

#### Revert migration

- Run `npx typeorm migration:revert`
