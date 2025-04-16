import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Initialize an empty array for blog posts
let blogPosts = [];
let contacts = [];

//Adding a new contact
// Function to add a new contact
function addContact(name, email, message) {
  const newContact = { name, email, message };
  contacts.push(newContact);
  console.log("Contact added successfully!");
}
// Function to retrieve a contact by index
function getContact(index) {
  if (index >= 0 && index < contacts.length) {
    return contacts[index];
  } else {
    console.log("Contact not found!");
    return null;
  }
}
// Function to add a new post
function addPost(title, content) {
    const newPost = { title, content };
    blogPosts.push(newPost);
    console.log("Post added successfully!");
}

// Function to retrieve a post by index
function getPost(index) {
    if (index >= 0 && index < blogPosts.length) {
        return blogPosts[index];
    } else {
        console.log("Post not found!");
        return null;
    }
}
// Function to update a post by index
function updatePost(index, newTitle, newContent) {
  if (index >= 0 && index < blogPosts.length) {
      blogPosts[index].title = newTitle;
      blogPosts[index].content = newContent;
      console.log(`Post at index ${index} updated successfully!`);
  } else {
      console.log("Post not found! Cannot update.");
  }
}

// Function to delete a post by index
function deletePost(index) {
    if (index >= 0 && index < blogPosts.length) {
        const deletedPost = blogPosts.splice(index, 1);
        console.log(`Post titled "${deletedPost[0].title}" deleted successfully!`);
        console.log("All Posts After Deletion:", blogPosts);
    } else {
        console.log("Δεν έγινε ανάρτηση του Post!");
    }
}

// Example usage
addPost("I Love Food", "Food is my passion. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.");
addPost("Officially Blogging", "This is the content of my second blog.");

console.log("All Posts:", blogPosts);

console.log("Retrieving Post:", getPost(0));

//deletePost(0);




  // Middleware to serve static files
app.use(express.static("public"));

/* Write your code here:
Step 1: Render the home page "/" index.ejs
Step 2: Make sure that static files are linked to and the CSS shows up.
Step 3: Add the routes to handle the render of the about and contact pages.
  Hint: Check the nav bar in the header.ejs to see the button hrefs
Step 4: Add the partials to the about and contact pages to show the header and footer on those pages. */

// Step 1: Render the home page "/" index.ejs
app.get("/", (req, res) => {
  res.render("blog.ejs", { posts:blogPosts });
  });

app.get("/about", (req, res) => {
  res.render("about.ejs");
  });

app.get("/contact", (req, res) => {
res.render("contact.ejs");
});

app.post("/addcontact", (req, res) => {
  const name= req.body["name"];
  const email = req.body["email"];
  const message = req.body["message"];
  addContact(name, email, message);
  console.log("Contact added successfully!");
  console.log("Contact Details:", contacts);
  res.redirect("/");
});
  
app.post("/submit", (req, res) => {
  const title = req.body["title"];
  const content = req.body["content"];
  addPost(title, content);
  res.redirect("/");
});
app.get("/delete/:id", (req, res) => {
  const id = req.params["id"];
  console.log(id);
  const index = parseInt(id);
  // Validate the index before deleting
  if (isNaN(index) || index < 0 || index >= blogPosts.length) {
    console.log("Invalid index. Cannot delete post.");
    return res.redirect("/");
  }
  // Call the deletePost function
  deletePost(index);
  res.redirect("/");
});
app.get("/editpost/:id", (req, res) => {
  const id = req.params["id"];
  console.log(id);
  const index = parseInt(id);
  // Validate the index before deleting
  if (isNaN(index) || index < 0 || index >= blogPosts.length) {
    console.log("Invalid index. Cannot edit post.");
    return res.redirect("/");
  }
  const post = getPost(index);
  // Render the edit page with the post data
  res.render("editpost.ejs", { posts: blogPosts, index: index });
}
);
app.post("/update/:id", (req, res) => {
  const id = req.params["id"];
  const index = parseInt(id);
  const newTitle = req.body["title"];
  const newContent = req.body["content"];
  // Validate the index before updating
  if (isNaN(index) || index < 0 || index >= blogPosts.length) {
    console.log("Invalid index. Cannot update post.");
    return res.redirect("/");
  }
  // Call the updatePost function
  updatePost(index, newTitle, newContent);
  res.redirect("/");
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
