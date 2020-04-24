# Key Conservation

Current version: 4.2.0. This app is in Beta for iOS and Android.

[Key Conservation PVD](https://www.notion.so/Key-Conservation-9de81dcdeca546ba85509f2982d211cc)

[Trello Board](https://trello.com/b/cUouSxH7/key-conservation-labs-20)

[Git Flow](https://whimsical.com/PFQJs3Yxef3Uh4VWAub1D6)

![MIT](https://img.shields.io/packagist/l/doctrine/orm.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Maintainability](https://api.codeclimate.com/v1/badges/5c50b1a3eebf18ff384e/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/key-conservation-be/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/key-conservation-be/test_coverage)

# API Documentation

#### Backend deployed at [Heroku]:

(https://key-conservation.herokuapp.com/) (Production Server)<br>
(https://key-conservation-staging.herokuapp.com/) (Staging Server)<br>

## Build Instructions
Feel free to use `yarn ...` instead of `npm run ...`, but make sure not to commit the `yarn.lock`.

1. Clone the repository: `git clone https://github.com/Lambda-School-Labs/key-conservation-be`.
2. Navigate to the directory: `cd key-conservation-be`.
3. Install PostgreSQL. See [installation instructions below](#installing-postgres).
4. Install the necessary dependencies: `npm install`. For Windows users, see [specific build instructions below](#windows-build-instructions).
5. Create a new `.env` file using `.env.example` as a template: `cp .env.example .env`.
6. Fill out the `.env`. See the [example file below](#sample-env).
7. Run the containerized service(s) (e.g. Postgres): `docker-compose up -d`.
8. Initialize the database: `npm run db:migrate`.
9. Start the Node app: `npm run server`.

#### Installing Postgres
MacOS and Linux users can install Postgres via [Homebrew](https://brew.sh), and Linux users can use `apt`. Windows users will need to download the Postgres 11.5 installer from [here](https://www.postgresql.org/download/windows/), run the installer, and add the Postgres bin to the PATH environment variable.

#### Windows Build Instructions
1. Run the Windows Powershell as administrator.
2. Install build tools to compile [native Node modules](https://www.npmjs.com/package/windows-build-tools#examples-of-modules-supported): `npm install -g windows-build-tools`.
3. Rerun `npm install` in a separate command prompt window.

#### Sample `.env`
```
AIRTABLE_KEY=
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=keycons_dev
DATABASE_PASS=password
DATABASE_NAME=key-conservation
S3_ACCESS_KEY_ID=
S3_BUCKET_NAME=
S3_BUCKET_REGION=
S3_SECRET_ACCESS_KEY=
SWT_SECRET=secret
```
**Note**: For Windows users, `localhost` won't work&mdash;you'll need to set `DATABASE_HOST` to [the Docker Machine's IP address](https://docs.docker.com/machine/reference/ip/).

#### Useful Commands
+ `docker-compose up -d` to configure and run any required services
+ `npm install` to install the necessary dependencies
+ `npm run server` to run the Node app with [Nodemon](https://nodemon.io/)
+ `npm run lint` to lint the Node app with [ESLint](https://eslint.org/) (without `--fix`)
+ `npm run lint:fix` to handle the simple linter issues automatically
+ `npm run test` to run the test suite with [Jest](https://jestjs.io/)
+ `npm run db:migrate` to run any new database migrations
+ `docker exec -it pg.keycons.local psql -U [DATABASE_USER] -d [DATABASE_NAME]` to access Postgres.

Take a look at [`package.json`](https://github.com/Lambda-School-Labs/key-conservation-be/blob/master/package.json) for the actual commands.

## Endpoints

https://documenter.getpostman.com/view/7671243/SVYtNdSZ?version=latest

## Data Model

#### Airtable Key Access

The airtable key is stored in the config vars in heroku. To keep it secret in the front end, we access the key through a get request. The endpoint is /api/airtable, and the route is found in airtableRouter in the airtable-key-retrieval directory.

#### USERS

---

```
{
  "id": INTEGER,
  "sub": STRING,
  "email": STRING,
  "profile_image": STRING,
  "created_at": TIMESTAMPTZ,
  "location": STRING,
  "mini_bio": STRING,
  "species_and_habitats": STRING,
  "twitter": STRING,
  "facebook": STRING,
  "instagram": STRING,
  "phone_number": STRING,
  "roles": STRING,
  "admin": BOOLEAN,
  "is_deactivated": BOOLEAN,
  "deactivated_at": TIMESTAMP,
  "strikes": INTEGER,
  "full_text_weighted": TSVECTOR,
  "accepting_help_requests": BOOLEAN
}
```

#### CONSERVATIONISTS

---

```
{
  "id": INTEGER,
  "user_id": FOREIGN KEY - "id" in USERS table,
  "name": STRING,
  "link_url": STRING,
  "link_text": STRING,
  "call_to_action": STRING,
  "about_us": STRING,
  "issues": STRING,
  "support_us": STRING,
  "city": STRING,
  "country": STRING,
  "point_of_contact_name": STRING,
  "point_of_contact_email": STRING,
  "longitude": DOUBLE,
  "latitude": DOUBLE
}
```

#### SUPPORTERS

---

```
{
  "id": INTEGER,
  "user_id": FOREIGN KEY - "id" in USERS table,
  "name": STRING
}
```

#### CAMPAIGNS

---

```
{
  "id": INTEGER,
  "user_id": FOREIGN KEY - "id" in USERS table,
  "created_at": TIMESTAMPTZ,
  "image": STRING,
  "name": STRING,
  "description": STRING,
  "call_to_action": STRING,
  "urgency": STRING
}
```

#### CAMPAIGN_UPDATES

---

```
{
  "id": INTEGER,
  "user_id": FOREIGN KEY - "id" in USERS table,
  "campaign_id": FOREIGN KEY - "id" in CAMPAIGNS table,
  "created_at": TIMESTAMPTZ,
  "image": STRING,
  "description": STRING,
  "camp_name": STRING
}
```

#### COMMENTS

---

```
{
  "id": INTEGER,
  "user_id": FOREIGN KEY - "id" in USERS table,
  "campaign_id": FOREIGN KEY - "id" in CAMPAIGNS table,
  "created_at": TIMESTAMPTZ,
  "body": STRING
}
```

#### SKILLED_IMPACT_REQUESTS

---

```
{
  "id": INTEGER,
  "campaign_id": FOREIGN KEY - "id" in CAMPAIGNS table,
  "skill": ENUM_SKILLS,
  "point_of_contact": STRING,
  "welcome_message": STRING,
  "our_contribution": STRING
}
```

#### APPLICATION_SUBMISSIONS

---

```
{
  "id": INTEGER,
  "skilled_impact_request_id": FOREIGN KEY - "id" in SKILLED_IMPACT_REQUESTS table,
  "user_id": FOREIGN KEY - "id" in USERS table,
  "decision": ENUM_DECISIONS,
  "why_project": STRING,
  "relevant_experience": STRING
}
```

#### SKILLS

---

```
{
  "id": INTEGER,
  "user_id": FOREIGN KEY - "id" in USERS table,
  "skill": ENUM_SKILLS
}
```

#### PROJECT_GOALS

---

```
{
  "id": INTEGER,
  "goal_title": STRING,
  "description": STRING,
  "skilled_impact_request_id": FOREIGN KEY - "id" in SKILLED_IMPACT_REQUESTS table
}
```

#### BOOKMARKS

---

```
{
  "id": INTEGER,
  "user_id": FOREIGN KEY - "id" in USERS table,
  "campaign_id": FOREIGN KEY - "id" in CAMPAIGNS table,
}
```

#### USER_REPORTS

---
```
{
  "id": INTEGER,
  "reported_by": FOREIGN KEY - "id" in USERS table,
  "reported_user": FOREIGN KEY - "id" in USERS table,
  "post_id": INTEGER,
  "table_name": STRING,
  "description": STRING,
  "reported_at": TIMESTAMPTZ,
  "is_archived": BOOLEAN
}
```

#### CONNECTIONS

---

```
{
  "id": INTEGER,
  "connector_id": FOREIGN KEY - "id" in USERS table,
  "connected_id": FOREIGN KEY - "id" in USERS table
}
```

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Key Conservation](https://github.com/labs14-key-conservation/Frontend-Mobile) for details on the frontend of our project.
