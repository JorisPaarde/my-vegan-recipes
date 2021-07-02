# MY Vegan Recipes


[View the live project here](https://my-veganrecipes.herokuapp.com/)

![MY Vegan Recipes mockup image](readme-images/mockup-site.jpg)

## Table of Contents
- [UX](#user-experience-(ux))
  - [User stories](#user-stories)
  - [Design](#design)
  - [Mockup](#mockup)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [Deployment](#deployment)
- [Credits](#credits)

# User experience (ux)

## User stories:

### First time user:

As a first time user i want to:

- Have a clear idea what the site is about.
- Register as a new user
- View recipies other people posted
- See most liked recipies on top
- See which recipes i liked
- Search: - recipies by ingredient
          - by name
- filter by category (dropdown)
- like a recipe (only one like per user per recipe, needs registration)

### Recurring user:

- See how many likes my recipies have in total.
- See how many likes my individual recipies have.
- See which recipes i liked
- Log into my personal recipe book.
- Add my own recipies
        - title
        - category
        - ingredients by name, amount and unit(dropdown selection)
        - preparation steps (adding 1 step at a time)
        - image url
- Edit my own recipies.
        - edit inputs
        - delete inputs
        - add inputs
- Delete my own recipies.
- Add recipies from other users to my personal recipe book
- Remove recipies from other users from my personal recipe book
- filter my personal recipe book by category (dropdown)

# Design


#### Colour Scheme

For the colors

- Green : Green revitalizes and encourages ideal for the "Done" section of our page.
        After completing a task revitalized nad encouraged by the color green it's back to work o the next task!


#### Typography

Font:


#### Imagery

Apart from the images linked in the recipes, the following images where used:

-   https://unsplash.com/photos/4MEL9XS-3JQ?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink
-   https://unsplash.com/photos/IxBCafdQItg?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink    


### Mockup

-  The mockup design of this site was made in Figma. U can view it [here](https://www.figma.com/file/wDLKFqlSfiIHY9t91UBkJX/My-vegan-recipies?node-id=0%3A1) 

![Icanban mockup image](readme-images/design-mockup.jpg)

# Features

- Register
- Login
- Logout
- Like button
- Truncation on recipe cards
- Delete recipes
- Edit recipes
- Remove recipes
- Search with regex on ingredients and titles
- pagination
- custom javascript form validation
- adaptive error display on validation
- scroll to error on validation

## future features

- Use Ajax for the like button
- Recipe reviews
- liked recipes per user for better performance.

# Technologies Used

# Testing

# Deployment

- Create your account on MongoDB here: https://account.mongodb.com/account/register
- Create your account on Heroku here: https://signup.heroku.com/login

```
pip3 install flask
pip3 install flask-pymongo
pip3 install dnspython
```
- Create your requirements file: 
```
pip3 freeze --local > requirements.txt
```
- Or if u downloaded it already:
```
pip install -r requirements.txt
```
- Create your env.py file:
```
touch env.py
```
- Make sure u add this env.py file to your gitignore file!
- Add the folowing code to your env.py file:
```python
import os

os.environ.setdefault("IP", "0.0.0.0")
os.environ.setdefault("PORT", "5000")
os.environ.setdefault("SECRET_KEY", "<YOUR-SECRET-KEY-HERE>")
os.environ.setdefault("MONGO_URI", "mongodb+srv://root:<MONODBPASSWORD>@cluster0.ajvr3.mongodb.net/<DATABASENAME>?retryWrites=true&w=majority")
os.environ.setdefault("MONGO_DBNAME", "<DATABASENAME>")
```
- Replace YOUR-SECRET-KEY-HERE, MONGODBPASSWORD, DATABASENAME according to your personal situation.
- Create your procfile:
``` 
echo web: python app.py > Procfile
```
- Delete the blank line 


- Create a new app on heroku


# Credits

Thanks guys

### recipes:

https://www.jamieoliver.com/recipes/category/special-diets/vegan/
https://www.goodhousekeeping.com/food-recipes/a38332/grilled-asparagus-and-shiitake-tacos-recipe/

### code: 

added html select field has no id since there will be lots added.

pagination:
https://gist.github.com/mozillazg/69fb40067ae6d80386e10e105e6803c9
