# My Online Forum

Your task for this part of the module will be to take the Spring + React template
application you have received and turn it into an online discussion forum! As you
see, some parts have been done for you. For example, you will not need to worry about how
to handle the authentication (registration and login) as that has already been fixed.

As we're keeping it relatively simple, we will only be adding minimal functionality.
Simplified, the functionalities to add are:

- Make a post
- Delete a post
- View all posts
- Write a comment on a post
- Delete a comment on a post
- View all comments on a post

The web application is made up of three parts: database, backend and frontend. You will
be doing work on the backend (Spring) and frontend (React). Both Spring and React are
quite big and complex tools. Knowing how to use them takes some time but when you do,
they are very useful and offer a great amount of help. The usual problem when you're
faced with big frameworks you haven't used before is knowing where to start. Therefore,
we are going to make it easier for you by giving you recommended courses of action.

### Page Branding

One thing you'll notice when you click around your web application is that it looks generic. It says SDA starter
template in some places and it doesn't really give you an idea of what the website is about.

Your first task is
to brand your page by switching out all the SDA starter template placeholders and replacing them with your own
brand name and logo. You should also give a quick introduction text on the landing page (and home page) that says what your forum is about.
You are free to choose the theme of your forum (could be environment, food/drinks, agriculture or even a forum entirely dedicated
to [this](https://images-na.ssl-images-amazon.com/images/I/81JSMr%2BIR6L._AC_SL1500_.jpg).
The UI components that you need to change are:
​

- `frontend/src/components/auth/LoginPage.js`
- `frontend/src/components/home/HomePage.js`
- `frontend/src/components/layout/Navbar.js`

Tip: for the name and logo these websites might come in handy:

- <https://namelix.com/>
- <https://hatchful.shopify.com/>

Be creative! You can also choose to change the background image, the font styles, colors, etc.

**IMPORTANT!** WHEN YOU CODE, MAKE SURE TO COMMIT OFTEN:
>>>
> ...Whenever you add a new feature that's worth commiting, commit. You added a working method? Commit. You fixed a
>typo? Commit. You fixed a file wrong indentation? Commit. There's nothing wrong commiting small changes, as soon as
>the commit is relevant.

Use branches, pull requests and reviews. This will be a BIG part of your assessment.

### Post

One of the first things you'll probably notice is that when you try to make a post, nothing really happens. If you
open up the developer tools and go to Network and try to make a post. You will see that each time you click, a request
is actually being sent (to which address?) but it receives a 404 status code which means that the server could not
find what was requested. Inspecting the `PostsAPI.js` we see that the frontend implementation expects the following HTTP endpoints.

| HTTP Method | HTTP Path | Action |
| ------------|-----------|--------|
| `GET` |`/posts` | should return all posts. |
| `GET` | `/posts/{id}` |should return a specific post based on the provided id.|
| `POST`| `/posts` | should create a new post.|
| `PUT` | `/posts/{id}` | should update the post.|
| `DELETE` | `/posts/{id}` | should delete the post.|

So the client-side (or frontend) is actually done here, it is doing what it's supposed to.
It is the server-side (backend) that needs to be fixed.

Your task is to implement the code for the Post resource on the server. This means that in your backend, you need to

- Make the `Post` class persistent using hibernate annotations on it.
- Implement the `PostRepository` interface so that you can do CRUD (Create, Read, Update, Delete) operations on Post class instances.
- Complete the `PostService` class which will use an instance of the `PostRepository` class to retrieve, edit, create and
delete posts on a more abstract level.
- Finish the `PostController` which will handle requests coming from the client side and use the `PostService` to serve
the requests.

### Comment

It would be nice to be able to comment on posts to offer help and/or feedback to the poster. As we all have learned from social
forums, allowing people to express their thoughts and opinions _always_ leads to [well-formed discussions and intellectual
development](https://beckyyk.files.wordpress.com/2010/09/screen-shot-2010-09-28-at-7-13-39-am.png).

Your second task is to add the functionality to make comments on posts and delete comments.

You'll need to add the necessary classes (similar to `Post`) to get the `comments` API up and running on the backend side. The java files has already been created in the `se.kth.sda.skeleton.comments` package. Don't forget to add correct ORM relationship between `Post` and `Comment`. After that's done you should now go into the react project (`frontend`) and add
comment components that will display some kind of input for comments on a post with the buttons for
making a comment and deleting a comment. That means you need to make sure that a request is sent when you click
the button to post a comment and when you click the button to delete a comment.

More specifically, we will need:

- A `Comment.js` component to display a single comment.
- A `CommentList.js` component to display a list of comments.
- A `CommentForm.js` component where users can type a new comment.
- A javascript HTTP API `CommentsApi.js` similar to `PostsApi.js` (which can be found at `frontend/src/api/`) to handle
communication with backend.

Look at how the components in `src/components/posts` are structured and take inspiration from there to create your
comment components.

### (Extra 1) Who posted/commented

So far in your application you should be able to login and make a post and make a comment. The problem is that posts and
comments don't seem to belong to any user. There is no indication of who posted or commented and you can freely delete
anyone's (hopefully) intellectual contribution. Since we do not want to suppress free speech, each comment and post
should only be deletable by the user who posted it. Also, for us to differentiate between posters and commenters we
should attach a username (in this case, email) to each post and each comment. The task here is to add a relationship
between users and posts, and a relationship between users and comments, so that posts and comments become personal

- Add associations to your entities so that `Post` and `Comment` have a user.
Think back on the database module, should we have OneToOne, OneToMany, or ManyToMany?
- In a post, show the email of the person who posted it.
- In a comment, show the email of the person who made it.
- Make sure only the person who is the creator of a post/comment can delete it.

### (Extra 2) Direct Messaging

It is nice that we can communicate with people in our application but sometimes we might not want to communicate with
absolutely everyone. Wouldn't it be even nicer to be able to speak with someone in private so that you don't bother
everyone else with your messages? In this task you are to create functionality for direct messaging another user. It
doesn't have to be real-time messaging, that is a bit more advanced than the things we've covered so far. This
is a task where we leave the implementation almost entirely up to you because of two important reasons:

1. We do not want to limit your creativity, so you get to apply as much as you can of what you've learned.
2. We get away with writing a shorter task specification :)


Tip: For real-time messaging you will need a way for the server to send data to the client without waiting for the client to send a request first. It could be a good idea to check out [Web Sockets](https://spring.io/guides/gs/messaging-stomp-websocket/). Secondary [article](https://www.baeldung.com/websockets-spring).


Go ahead and do your magic, best of luck on the tasks!
