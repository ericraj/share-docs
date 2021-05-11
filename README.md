# Share Docs

## Description

Share-Docs is a project which is, as its suggests, a project dedicated to document sharing, Created by the first graduates of the ISSTM (Institut Supérieur des Sciences et Technologies de Mahajanga)

## Technologies

- ReactJs
- GraphQL
- NodeJs
- ExpressJs
- Typescript
- TypeORM
- Flutter
- GitHub
- Styled Components

## Coding rules

We use [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

Here is an example of a variable declaration

```javascript
// bad
superPower = new SuperPower();

// good
const superPower = new SuperPower();
```

## Run the project for dev

In the root directory

1. Install dependencies with `npm i`
2. Init database with `docker-compose up -d && docker-compose logs -f`

### Run backend

1. Go to backend folder with `cd backend`
2. Install dependencies with `npm i`
3. Run database migration with `npm run db:migrate`
4. Launch server with `npm run dev`

### Run frontend

1. Go to frontend folder with `cd frontend`
2. Install dependencies with `npm i`
3. Launch server with `npm start`

## Backend

### Database

#### Diagram &middot; Generated with [typeorm-uml](https://github.com/eugene-manuilov/typeorm-uml)

![Diagram](http://www.plantuml.com/plantuml/svg/tLLHRzem47xFhxXrqWGIYErXUwZIg1cbD9fA9vPksZIfCl4HB18RsSueA_ptsIP0ICVWQPgMIC6-xxixt_cpkLIQI5tacUUze3Xc746JKOODv2J75j2H_Mq2Sitq0ixyKU0GlpCAldD_BBW6nNxYnPlNa8XCo8jKaaNGAFtyZcK4Pxleioak6ezDU1eppEWAJ43VEPvV4JdjYumY7meQ-AyCCV0x3WlWqIRS1XdNWwmZl0pTyyntwsSCHSv_vzcxjg_np94oqfQO24ch8Rm9emXAeqIX5pDKQqEEUY9eEKcOJ3BqF2rce0MCXDOY1yfCDCq4zpmrPNn69Cb1Ye9JauEZXBSLUsQMQSE3a2Pm1L0JGiMSyHJ695DOGIQ4qxbaMYCliGgOP4GfUFB0FEz9CarTugwj2kOJfj4XePHYlZOg9Ab4v6iFqmIKDM3bcGgTHk1A94Lkf65qKeuKD86eojIcTdiEZ4Bp7A91tEltXc3CvMw0KLQ65klUXCEm6nlqSpZy6WtwLPRfpFGWoGa24g8n5N8HxMNo_UiFGR0ZIIHQo0ESJJR7GXfgougZszwdEBpz25-Y-ERkFdOM-7Otw3NUDQkBB6RqTBVLjeynILlctALbzzpeXCRP8tQi9VzWjVSAPGiAyothNGzFADWI_rZqXeWvOTbHrioSZRcH-54Y-K7CDNcKzdVRs2tLtjhedc7Ppyhy_rNHzefviCUbLPlNhg67sf7Q056zAMlOi6k8oRkxqrRBTdkvhBJvEUOaxRciUvRArkpPQoijiQtr06x7ddU9dDf_y5y0)

### Migration &middot; [Learn more about migrations](https://typeorm.io/#/migrations)

- Update your entity
- Run `cd backend && npm run build`

#### Generate migration

- Run `npx typeorm migration:generate -d src/migrations -n name-of-your-migration`

#### Run migration

- Run `npm run db:migrate`

#### Revert migration

- Run `npx typeorm migration:revert`

## Git and Gitflow &middot; [Learn more about Gitflow](http://danielkummer.github.io/git-flow-cheatsheet/index.fr_FR.html)

### Important

:warning: Do not merge your branch into `main` branch

:warning: Your branch must merge into the `develop` branch. Make sure you select `develop` branch as the target when you create your Pull Request

### Branches

- **Production** : main
- **Development** : develop

### Gitflow

- **Feature** : feature/name-of-your-feature
- **Hotfix** : hotfix/name-of-your-hotfix
- **Release** : release/name-of-your-release
- **Bugfix** : bugfix/name-of-your-bugfix

### Recommended process for git during development

Suppose you start to develop a feature. Normally, you start from branch **develop**

1. If you not in branch **develop**, move to **develop** with `git checkout develop`
2. Check if your **develop** is up to date with **origin**. For it, you can run `git fetch --all` or `git fetch origin develop`
3. If your **develop** in local and **origin** are at the same level, pass to point **4**. If not, make a pull rebase of **origin** with `git pull --rebase origin develop`. If you have a conflict, please resolve it :smile:
4. Create your branch with `git checkout -b feature/name-of-your-feature`. Or you can use [gitflow](http://danielkummer.github.io/git-flow-cheatsheet/index.fr_FR.html)

   - Code
   - Commit
   - Check if **origin** have a change with step **2**. If that is the case, do a rebase with `git rebase origin/develop`. If you have a conflict, please resolve it :smile:.
   - Push your branch with `git push origin feature/name-of-your-feature`.

   Continue to **code, commit, check change from origin and push your branch**.

   - Or if no change from **origin**, continue to **code, commit, check change from origin and push your branch** too.

**You can apply this process during your development. This is valid for others gitflow like hotfix or bugfix.**

And dont forget to create your **Pull Request** if you finish your development :clap:

## Frontend

### Styles

For this project, we use [styled-components](https://styled-components.com)
