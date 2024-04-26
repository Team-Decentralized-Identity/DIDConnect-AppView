ctr+shit+v

*Welcome to DIDConnect Testing*

**Installation**

Before running the tests, make sure to install the required Python testing library, pytest. You can install it using pip:
- pip install pytest

**Running Tests**

The tests are located in the src/test directory of this project. To run the tests, navigate to the project root directory and execute the tests using pytest. 

**Here's how you can run tests:**

pytest path/to/your/test_file.py

This command will execute the specified test file, and you will see the test results directly in your terminal.

- pytest src\test\test_like.py
- pytest src\test\test_login.py
- pytest src\test\test_post.py
- pytest src\test\test_search.py


**What is being tested**
For this test we will be testing the following user cases
- Can a user post
- Can a user like a post
- Can a user log in
- Can a user search for other users.

**How to run app**
- npm install 
- npm run dev

**Login Testing Info**
- Email: didconnect440@gmail.com
- Pass: Golions2024

**User Stories**
[Note: This is very watered down]
- Log in with a password and user name.

- The user can see feeds generated.

- Create post

- Like post.

- Log out and log back in as demo_admin (User: demo_admin, Pass: demo).

- Create a user for yourself with "user" privileges (In dev).

- Create CAR file with account migration (In dev).

- Search user handles in the search page.

- Follow a user or add a new feed.

- Unfollow a user or feed.

- Delete a post created by the user.