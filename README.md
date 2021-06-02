# User stories:

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

# Features

- Register
- Login
- Logout
- Like button
- Truncation on recipe cards
- Delete recipes
- Edit recipes
- Remove recipes

## future features

- Use Ajax for the like button
- Recipe reviews
- liked recipes per user for better performance.

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
- Replace YOUR-SECRET-KEY-HERE, MONODBPASSWORD, DATABASENAME according to your personal situation.
- Create your procfile:
``` 
echo web: python app.py > Procfile
```
- Delete the blank line 


- Create a new app on heroku


### images:

https://unsplash.com/photos/4MEL9XS-3JQ?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink
https://unsplash.com/photos/IxBCafdQItg?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink


### recipes:

https://www.jamieoliver.com/recipes/category/special-diets/vegan/
https://www.goodhousekeeping.com/food-recipes/a38332/grilled-asparagus-and-shiitake-tacos-recipe/

### code: 

added html select field has no id since there will be lots added.

https://help.pixpa.com/kb/add-a-floating-back-to-top-button/

pagination?:

https://betterprogramming.pub/simple-flask-pagination-example-4190b12c2e2e


# Bugs:

when adding an ingredient line with javascript, the dropdown menu did not work. hardcoded in stead of db generated.
When liking a recipe without being logged in site crashed. check if logged user added.
When adding a really long title the text would flow outside the recipe card. fixed by adding webkit-line-clamp.
Card text displayed as blue link text when the card was made clickable to link to the recipe. Added class to text.
Delete modal did not function. Gave corresponding id to the modal for each recipe.