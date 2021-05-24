# Cuddly - Sharing the joy of pets

Cuddly is a social media platform for everything pet related made by [Decio Candido](https://github.com/deciocandido), [En-Chi Liu](https://github.com/eeels22), [Janko Radakovic](https://github.com/janko101), [Pei Nen Esther Chee](https://github.com/estherchee) and [Yash Seeta](https://github.com/NeuralAlchemist).

## Contents

- [Vision](#vision)
- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)

## Vision

The Cuddly Team believes that pets are not just animals, but that pets are family. We want to help spread the joy that pets bring to our lives and facilitate trusted connections to improve pet care. So we made a social media application that allows pet fans to share experiences and expertise, and grow relationships.

## Features

- Register your account 
- Create posts/comments with text and attached video/image (up to 10MB)
- Edit the text of your posts/comments
- Delete posts/comments you created
- Add/remove likes to posts/comments
- Personalize your profile with an image and description
- Get your created and liked posts as a feed on your profile page
- Private chat with other users or yourself
- Search for other user profiles

## Technologies

- JDK
- Gradle
- Docker
- NodeJS
- React
- JavaScript
- Spring
- Hibernate
- PostgreSQL

## Setup

To run this website

1.  Clone this repository into your desired location by running

   `git clone https://github.com/NeuralAlchemist/cuddly.git  `

2. Navigate to the project folder on your machine

3. To start the database go to the root directory, run `docker compose up`

4. Start the backend server by running `./gradlew bootRun`

5. Change the current directory to `frontend` by using `cd frontend` from the root directory

6. Run `npm install` to install all the dependencies needed

7. Run `npm start` . This will locally host the application at [localhost](localhost:3000) and should open automatically.

## Usage

### Register/Login 

![cuddly_register](C:\Users\yashs\Downloads\cuddly-pictures\cuddly_register.png)

### Create a post/comment with image/video attachment

![cuddly_video_selector](C:\Users\yashs\Downloads\cuddly-pictures\cuddly_video_selector.png)

### Check your chats

The left side view shows the receiver view and the right side shows the sender view 

![cuddly_chat_page](C:\Users\yashs\Downloads\cuddly-pictures\cuddly_chat_page.png)

### Personalize your profile

![cuddly_profile_page](C:\Users\yashs\Downloads\cuddly-pictures\cuddly_profile_page.png)

## Contributing

Developers are welcome to create pull requests, create an issues on bugs or features.

## Credits

Demo images/videos taken from [Unsplash](https://unsplash.com/).

Icons made by [Font Awesome](https://fontawesome.com/v4.7.0/icons/).

Skeleton code provided by [Software Development Academy](https://github.com/softwaredevacademy/be-mini-group-project).

Thanks to the staff and teaching assistants of SDA, Novare Potential and KTH.
