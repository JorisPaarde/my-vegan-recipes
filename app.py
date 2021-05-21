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
@app.route("/all_recipes")
def all_recipes():
    recipes = list(mongo.db.recipes.find())
    return render_template("all_recipes.html", recipes=recipes)


# code adjusted from task manager project by code institute
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
        return redirect(url_for("all_recipes", username=session["user"]))
    return render_template("register.html")


# code adjusted from task manager project by code institute
@app.route("/logout")
def logout():
    # remove user from session cookie
    flash("You have been logged out")
    session.pop("user")
    return redirect(url_for("all_recipes"))


@app.route("/add_recipe", methods=["GET", "POST"])
def add_recipe():
    if request.method == "POST":

        ingredient_1 = {
            "unit_name": "yet to add",
            "amount": request.form.get("amount"),
            "ingredient_name": request.form.get("amount")
        }

        ingredient_2 = {
            "unit_name": "yet to add also",
            "amount": request.form.get("amount"),
            "ingredient_name": request.form.get("amount")
        }

        ingredients = [ingredient_1,ingredient_2]

        step_1 = request.form.get("preparation_step")
        step_2 = "this is step 2"

        preparation_steps = [step_1, step_2]

        liked_by = ["joris", "ben", "henk"]

        recipe = {
            "user_name": "yet to add",
            "recipe_title": request.form.get("recipe_title"),
            "recipe_description": request.form.get("recipe_description"),
            "image_url": request.form.get("image_url"),
            "category_name": "yet to add",
            "ingredients": ingredients,
            "preparation_steps": preparation_steps,
            "liked_by": liked_by
        }

        mongo.db.recipes.insert_one(recipe)
        flash("Recipe succesfully added to your recipe book.")
        return redirect(url_for("all_recipes"))

    return render_template("add_recipe.html")


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
            port=int(os.environ.get("PORT")),
            debug=True)
