# API Documentation

#### Backend deployed at [Heroku]:

(https://key-conservation.herokuapp.com/) (Production Server)<br>
(https://key-conservation-staging.herokuapp.com/) (Staging Server)<br>

## Getting started

To get the server running locally:

- Clone this repo
- **npm i** to install all required dependencies
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

## Endpoints

https://documenter.getpostman.com/view/7671243/SVYtNdSZ?version=latest



## Data Model

#### Airtable Key Access

The airtable key is stored in the config vars in heroku. To keep it secret in the front end, we access the key through a get request. The endpoint is /api/airtable, and the route is found in airtableRouter in the airtable-key-retrieval directory.

#### USERS

---

```
{
  "id": UUID,
  "sub": STRING,
  "username": STRING,
  "email": STRING,
  "profile_image": STRING,
  "created_at": TIMESTAMP,
  "location": STRING,
  "mini-bio": STRING,
  "species-and-habitats": STRING,
  "twitter": STRING,
  "facebook": STRING,
  "instagram": STRING,
  "phone_number": STRING,
  "roles": STRING,
  "admin": BOOLEAN,
  "is_deactivated": BOOLEAN,
  "deactivated_at": TIMESTAMP
}
```

#### CONSERVATIONISTS

---

```
{
  "cons_id": UUID,
  "users_id": FOREIGN KEY - "id" in USERS table,
  "org_name": STRING,
  "org_link_url": STRING,
  "org_link_text": STRING,
  "org_cta": STRING,
  "about_us": STRING,
  "issues": STRING,
  "support_us": STRING
}
```

#### SUPPORTERS

---

```
{
  "sup_id": UUID,
  "users_id": FOREIGN KEY - "id" in USERS table,
  "sup_name": STRING
}
```

#### CAMPAIGNS

---

```
{
  "camp_id": UUID,
  "users_id": FOREIGN KEY - "id" in USERS table,
  "created_at": TIMESTAMP,
  "camp_img": STRING,
  "camp_name": STRING,
  "camp_desc": STRING,
  "camp_cta": STRING
}
```

#### CAMPAIGNUPDATES

---

```
{
  "update_id": UUID,
  "users_id": FOREIGN KEY - "id" in USERS table,
  "created_at": TIMESTAMP,
  "update_img": STRING,
  "update_desc": STRING,
}
```

#### COMMENTS

---

```

{
"comment_id": UUID,
"users_id": FOREIGN KEY - "id" in USERS table,
"created_at": TIMESTAMP,
"camp_id": FOREIGN KEY - "camp_id" in CAMPAIGNS table,
"comment_body": TEXT
}

```

#### LIKES

---

```

{
"like_id": UUID,
"users_id": FOREIGN KEY - "id" in USERS table,
"camp_id": FOREIGN KEY - "camp_id" in CAMPAIGNS table,
"update_id": FOREIGN KEY - "update_id" in CAMPAIGNUPDATES table
}

```

#### BOOKMARKS

---

```

{
"bookmark_id": UUID,
"users_id": FOREIGN KEY - "id" in USERS table,
"camp_id": FOREIGN KEY - "camp_id" in CAMPAIGNS table,
}

```

#### REPORTED_POSTS

---

```

{
  "id": UUID,
  "reported_by": FOREIGN KEY - "id" in USERS table,
  "post_id": INTEGER,
  "table_name": STRING,
  "report_desc": STRING,
  "reported_at": TIMESTAMP,
}

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

```

```
