# E-Shop

This is an assessment project to showcase my skills in Angular. It is build and design in angular framework and utilities. Click here to know more about [Angular](https://angular.io/).

## Get Started

### Install Git

Git can be installed on the most common operating systems like Windows, Mac, and Linux. In fact, Git comes installed by default on most Mac and Linux machines! To install git to your local machine navigate to this [link](https://github.com/git-guides/install-git).

### Clone the Repo

```shell
git clone https://github.com/mrkdolormente/e-shop-ui.git
cd e-shop-ui
```

### Install Node.js

To publish and install packages to and from the public npm registry or a private npm registry, you must install Node.js and the npm command line interface using either a Node version manager or a Node installer. We strongly recommend using a Node version manager like nvm to install Node.js and npm. To install Node.js to your local machine kindly navigate to this [page](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Install npm packages

```shell
npm install
```

### Development server

You can run either `npm start` or `ng serve` command to run the development server locally.

The `npm start` or `ng serve` command builds (compiles TypeScript and copies assets) the application.
After running the dev server, navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The default configuration for this command is set to production. The build artifacts will be stored in the `dist/` directory.

### npm scripts

These are the most useful commands defined in `package.json`:

- `npm start` - runs the TypeScript compiler, asset copier, and a server at the same time, all three in "watch mode".
- `npm run build` - runs the TypeScript compiler and asset copier once.
- `npm run build-develop` - runs the TypeScript compiler and asset copier once with develop configuration.
- `npm run build-staging` - runs the TypeScript compiler and asset copier once with staging configuration.
- `npm run watch` - runs the TypeScript compiler and asset copier in "watch mode"; when changes occur to source files, they will be recompiled or copied into `dist/`.

These are the test-related scripts:

- `npm test` - builds the application and runs Intern tests (both unit and functional) one time.

## Dependencies

### Tailwind CSS

[Tailwind CSS](https://tailwindcss.com/docs/installation) works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.

It's fast, flexible, and reliable — with zero-runtime.

### Angular Material

[Angular Material](https://material.angular.io/) is a User Interface (UI) component library that developers can use in their Angular projects to speed up the development of elegant and consistent user interfaces.

Angular Material offers you reusable and beautiful UI components like Cards, Inputs, Data Tables, Datepickers, and much more.

## Git Convention

### Branch

- `feature/*` - for new feature, functionality and breaking changes
- `bug/*` - for bug fixes
- `release/*` - for production releases

### Additional Note

Always rebase the current branch to the main branch before pushing to the origin.
