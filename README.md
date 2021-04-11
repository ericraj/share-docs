# Share Docs

## Description

Share-Docs is a project which is, as its suggests, a project dedicated to document sharing, Created by the first graduates of the ISSTM (Institue Supérieur de Sience et de Téchnologie de Mahajanga)

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
