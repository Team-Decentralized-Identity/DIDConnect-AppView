# test for posts
import unittest
from post import Post
import pytest
# testing for posts
# A blog specific term that refers to a firehose(stream of data) of posts
# blog are what is stored in a database(PDS repos)
class TestBlog(unittest.TestCase):
    # Setup the blog with the Post function 
    def setUp(self):
        self.blog = Post()
# Test: Add a post to the blog
    def test_add_post(self):
        self.blog.add_post("Hello, world!")
        self.assertEqual(self.blog.get_posts(), ["Hello, world!"])
# Test: Check that the blog is empty on initialization
    def test_empty_on_initialization(self):
        self.assertEqual(self.blog.get_posts(), [])
# Test: Add multiple posts to the blog
    def test_multiple_posts(self):
        posts = ["Hello, world!", "Another post", "Third post"]
        for post in posts:
            self.blog.add_post(post)
        self.assertEqual(self.blog.get_posts(), posts)

if __name__ == "__main__":
    unittest.main()