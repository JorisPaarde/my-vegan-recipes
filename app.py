import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


@app.route("/")
@app.route("/all_recipes", methods=["GET", "POST"])
def all_recipes():
    # get all recipes
    recipes = list(mongo.db.recipes.find())
    # sort the recipes by likes high to low

    def sort_by_likes(recipe):
        return len(recipe['liked_by'])

    recipes.sort(reverse=True, key=sort_by_likes)

    return render_template("all_recipes.html", recipes=recipes)


@app.route("/like_recipe", methods=["GET", "POST"])
def like_recipe():
    # check like button press
    if request.method == "POST":

        # check if a user is logged in
        if not session.get("user"):

            # let user know he needs to register to perform this action
            flash("Please register to like recipes")
            return redirect(url_for("register"))

        else:
            # get nescessary data
            recipe_id = request.form.get("like")
            user = session["user"]
            recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
            liked_by = recipe['liked_by']

            # remove this user if he/she already likes this recipe
            if user in liked_by:
                flash("{} removed from your recipe book".format(
                      recipe['recipe_title']))
                mongo.db.recipes.update_one(
                    {"_id": ObjectId(recipe_id)},
                    {"$pull": {"liked_by": user}}
                )
            else:
                # Add this user to the list of users that like his recipe
                flash("{} added to your recipe book".format(
                      recipe['recipe_title']))
                mongo.db.recipes.update_one(
                    {"_id": ObjectId(recipe_id)},
                    {"$push": {"liked_by": user}}
                )
            # send user to his/her personal recipe book
            return redirect(url_for("recipe_book"))


@app.route("/recipe_book", methods=["GET", "POST"])
def recipe_book():
    # check if a user is logged in
    if not session.get("user"):

        # let user know he needs to register to acess this page
        flash("Please register to get your own recipe book")
        return redirect(url_for("register"))

    else:
        # get all recipes
        recipes = list(mongo.db.recipes.find())

        # sort the recipes by likes high to low
        def sort_by_likes(recipe):
            return len(recipe['liked_by'])

        recipes.sort(reverse=True, key=sort_by_likes)

        return render_template("recipe_book.html", recipes=recipes)


# register page code adjusted from task manager project by code institute
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # check if username already exists in db
        existing_user = mongo.db.users.find_one(
            {"user_name": request.form.get("user_name").lower()})

        if existing_user:
            flash("Username already exists")
            return redirect(url_for("register"))

        register = {
            "user_name": request.form.get("user_name").lower(),
            "password": generate_password_hash(request.form.get("password")),
            "likes_amount": 0,
            "liked_recipes": []
        }
        mongo.db.users.insert_one(register)

        # put the new user into 'session' cookie
        session["user"] = request.form.get("user_name").lower()
        message = "welcome, {} your registration was succesfull!".format(
            session["user"])
        flash(message)
        # send user to his/her personal recipe book
        return redirect(url_for("recipe_book", username=session["user"]))
    return render_template("register.html")


# login page code adjusted from task manager project by code institute
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # check if username is in database
        existing_user = mongo.db.users.find_one(
            {"user_name": request.form.get("user_name").lower()})

        if existing_user:
            # ensure hashed password matches user input
            if check_password_hash(
                    existing_user["password"], request.form.get("password")):
                session["user"] = request.form.get("user_name").lower()
                flash("Welcome, {}".format(request.form.get("user_name")))
                return redirect(url_for(
                   "all_recipes"))  # , username=session["user"])
            else:
                # invalid password match
                flash("Username and/or password incorrect.")
                return redirect(url_for("login"))

        else:
            # no such user in database
            flash("Username and/or password incorrect.")
            return redirect(url_for("login"))

    return render_template("login.html")


# code adjusted from task manager project by code institute
@app.route("/logout")
def logout():
    # remove user from session cookie
    flash("You have been logged out")
    session.pop("user")
    return redirect(url_for("all_recipes"))


# Add recipe page
@app.route("/add_recipe", methods=["GET", "POST"])
def add_recipe():
    # when submitting the form:
    if request.method == "POST":
        # check if user is logged in
        if not session.get("user"):

            flash("Please register to add recipes")
            return redirect(url_for("register"))
        # get recipe data from form
        else:
            # get all the ingredients
            # populate arrays for ingredients
            ingredient_names = request.form.getlist("ingredient_name")
            amounts = request.form.getlist("amount")
            unit_names = request.form.getlist("unit_name")
            ingredient = [None] * len(ingredient_names)
            ingredients = []
            # add all ingredients to the ingredients array

            for i in range(len(ingredient_names)):

                ingredient[i] = {
                    "ingredient_name": ingredient_names[i],
                    "amount": amounts[i],
                    "unit_name": unit_names[i]
                }

                ingredients.append(ingredient[i])

            # get all the preparation steps
            preparation_steps = request.form.getlist("preparation_step")

            # get all the likes
            liked_by = [session["user"]]

            recipe = {
                "user_name": session["user"],
                "recipe_title": request.form.get("recipe_title"),
                "recipe_description": request.form.get("recipe_description"),
                "image_url": request.form.get("image_url"),
                "category_name": request.form.get("category_name"),
                "ingredients": ingredients,
                "preparation_steps": preparation_steps,
                "liked_by": liked_by
            }
            # add recipe to database
            mongo.db.recipes.insert_one(recipe)
            flash("Recipe succesfully added to your recipe book.")
            # send user to his/her personal recipe book
            return redirect(url_for("recipe_book"))

    categories = mongo.db.categories.find()
    return render_template("add_recipe.html", categories=categories)


@app.route("/recipe/<recipe_id>")
def recipe(recipe_id):
    # get all data
    recipe = mongo.db.recipes.find_one({"_id": ObjectId(recipe_id)})
    ingredients = recipe['ingredients']
    preparation_steps = recipe['preparation_steps']
    print(preparation_steps)

    return render_template("recipe.html",
                           recipe=recipe,
                           ingredients=ingredients,
                           preparation_steps=preparation_steps
                           )


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
