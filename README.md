# OSU College of Pharmacy

Here is some basic information about what the project is

## Spinup
This will spin up site, run composer, build theme, and download the database.

- `ddev init`

## Environments
- Local: <https://osu.ddev.site>
- Stage: <https://pharmacy.madcollective.com>
- Prod: <https://pharmacy.oregonstate.edu>

## Provided Commands

- `ddev init` - Spinup project for first time
- `ddev db-sync` - Download database from server and import it locally
- `ddev theme-setup` - Download all needed theme assets
- `ddev theme-build` - Compile theme files
- `ddev theme-watch` - Compile theme files and watch
- `ddev theme-lint` - Run linting for themes
- `ddev php-lint` - Run linting for php files

## Storybook

After site is up and running.

1. Run `ddev storybook -s`
2. Navigate to https://osu.ddev.site:6006

### Creating new Stories

- Site theme's components is `docroot/themes/custom/osu/components`
- Create the `nameofcomponent.component.yml`, `nameofcomponent.twig`,
  `nameofcomponent.stories.twig` and other files if needed.
- Clear Drupal caches: `ddev drush cr`
- Build site's theme (if needed) `ddev theme-build`
- Generate new stories `ddev drush storybook:generate-all-stories`

## Designs

- [Desktop](https://www.figma.com/proto/YaDSH2FqKN0AAruTe4QYfm/Pharmacy-UX%2FUI?page-id=1577%3A12473&type=design&node-id=1577-12707&viewport=-11374%2C-837%2C0.62&t=7BzBdmcOAhSEn37A-1&scaling=scale-down-width&hide-ui=1)
- [Mobile](https://www.figma.com/proto/YaDSH2FqKN0AAruTe4QYfm/Pharmacy-UX%2FUI?page-id=1577%3A23515&type=design&node-id=1577-26082&viewport=-113%2C222%2C0.15&t=ZGmdlIF7Lhrg2jok-1&scaling=scale-down&starting-point-node-id=1577%3A26082&hide-ui=1)
- [Figma Source](https://www.figma.com/file/YaDSH2FqKN0AAruTe4QYfm/UX%2FUI?type=design&node-id=11%3A233&mode=design&t=erAdfffncBOsGdy8-1)

## Members
**Project Owner:** 

**Project Manager:** 

**Software Engineer:** 

**Designer:** 
