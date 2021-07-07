# Tests and bugreports:

- [User story testing](#user-story-testing)
- [Responsive layout testing](#responsive/visual-layout-testing)
- [Menu testing](#menu-testing)
- [Email form testing](#email-form-testing)
- [Settings page testing](#settings-page-testing)
- [Icanban functionality testing](#icanban-functionality-testing)
- [Browser testing](#browser-testing)
- [Validators](#validators)
- [Lighthouse Report](#lighthouse-report)
- [Bugs during development](#bugs-encountered-during-development-and-their-fixes)

# User story testing:

## General functionality:

<br>
<br>

### As a First Time Visitor, I want to:
---
user story|implementation
----|----
Have a clear idea what the site is about. | The welcome text explains this in a few sentences.
Register as a new user. | Register page with custom validation.
View recipies other people posted. | shown at the bottom of the page.
See most liked recipies on top. | Recipes are sorted o show most liked on top.
Read a full recipe | Clicking a recipe card sends the user to the full recipe. The ability to do this is indicated by the hover shadow animation.
See which recipes i liked. (needs registration) | Indicated by the hart being filled in.
Search recipies by ingredient. | Search bar text field searches on any word containing the search query. ("fo" finds "foo" and "ofo")
Search recipies by title. | Search bar text field searches on any title containing the search query. ("fo" finds "foo" and "ofo")
filter recipes by category. (dropdown) | Dropdown menu next to the searchbar that works with or without text search.
Like a recipe. (only one like per user per recipe, needs registration) | clicking the hart icon does this and also automatically sends the user to his/her private recipe book.

<br>
<br>

### As a Returning Visitor, I want to:
---
user story|implementation
----|----
See how many likes my recipies have in total. | This is indicated at the top of the page of the users personal recipe book page.
See how many likes my individual recipies have. | indicate on each recipe card
See which recipes i liked | Indicated by the hart being filled in.
Log into my personal recipe book. | The login page is easily acesably via the main menu.
Add my own recipies | The add recipe link is automatically displayed when the user is logged in. In the header as well as the footer.
Add recipe title | Text field with custom validation to keep site content clean.
Add recipe category | Dropdown menu with validation.
Add an image url | Text field with custom validation to keep site content clean.
Add recipe description | Text field with custom validation to keep site content clean.
Add recipe ingredients by name, amount and unit(dropdown selection) | 3 fields, text, digit and dropdown with pre set units. And individual validation. this has been done to keep all ingredient lists the same format. Adding or deleting an ingredient line is done by the add button / trashcan symbol.
Add recipe preparation steps (adding 1 step at a time) |  Text field with custom validation to keep site content clean.
Edit my own recipies | Edit button only available for recipes made by the logged in user.
Edit recipe inputs | all fields are adjustable and show the current database values when editing a recipe.
Delete recipe inputs | The trashcan icon removes inputs. (after confirmation) Also a check is done to prevent recipes having no ingredients or preparation steps at all.
Add recipe inputs |
Delete my own recipies. | Delete button only available for recipes made by the logged in user.
Add recipies from other users to my personal recipe book. | Liking a recipe automatically adds it to your personal recipe book.
Remove recipies from other users from my personal recipe book. | Clicking the like icon of a liked recipe again (disliking) removes it. A remove button is automatically shown for recipes not created by the logged in user.
Filter my personal recipe book by category. (dropdown) | Dropdown menu next to the searchbar that works with or without text search.
Search my personal recipe book by ingredients and/or title. | Search bar text field searches both title and ingredients on any word containing the search query.

<br>
<br>

# Responsive/visual layout testing

## Header

feature|expected behaviour|testing|result|Fix(if needed)
---|---|---|---|---
links | collapses to hamburger on mobile| Resized screen from large(width 1920px), down to small(width 280px).|collapses on 993px and smaller|
logo text | Stays readable on all screensizes | Resized screen from large(width 1920px), down to small(width 280px).|correct|
logo image| does not display on sizes smaller than 375px |Resized screen from large(width 1920px), down to small(width 280px).|correct|

<br>

## Footer

feature|expected behaviour|testing|result|Fix(if needed)
---|---|---|---|---
links| Stay readable on all screensizes and correctly display according to user logged in or not|Resized screen from large, down to small. Logged in and out.|Links stay readable, and are displayed correctly. User gets visual confirmation on being logged in/out.|
text| Stays readable on all screensizes
sticky|footer stays on the bottom of the page.|Resized screen from large, down to small.| footer did not stick to bottom of the page. | added correct css
````body {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  main {
    flex: 1 0 auto;
  }
````


<br>

## all recipes / my recipe book page

feature|expected behaviour|testing|result|Fix(if needed)
---|---|---|---|---


<br>

## add/edit recipe page

feature|expected behaviour|testing|result|Fix(if needed)
---|---|---|---|---
Navigation menu|Collapses and/or stays readable and doesn't overflow.|Resized screen from large(width 1920px), down to small(width 280px).|Menu collapses on medium screen size, text stays readable, no items are overflowing. Breaks below 280px width, this was ignored as these are almost never used.
Dark mode|When switch is clicked the css varables change.|Clicked switch.|Correct display of darkmode.
Column text adjust textfield|Stays readable and doesn't overflow.|Resized screen from large to small.|Correct.
Slider buttons|Animate slide when clicked.|Clicked switch.|Correct.
Slider buttons|Form stays as intended.|Resized screen from large to small.|Settings buttons on galaxy fold (width 280px) or smaller where broken.|Reduced the padding on the columns of the settings menu. Still breaks on screens smaller than 260px width, this was ignored as these are almost never used.
Decoration columns|Only display on medium screensizes and above.|Resized screen from large to small.|Correct.

<br>

## recipe page

feature|expected behaviour|testing|result|Fix(if needed)
---|---|---|---|---
Navigation menu|Collapses and/or stays readable and doesn't overflow.|Resized screen from large(width 1920px), down to small(width 280px).|Menu collapses on medium screen size, text stays readable, no items are overflowing. Breaks below 280px width, this was ignored as these are almost never used.
Dark mode|When switch is clicked the css varables change.|Clicked switch.|Correct display of darkmode.
Column text adjust textfield|Stays readable and doesn't overflow.|Resized screen from large to small.|Correct.
Slider buttons|Animate slide when clicked.|Clicked switch.|Correct.
Slider buttons|Form stays as intended.|Resized screen from large to small.|Settings buttons on galaxy fold (width 280px) or smaller where broken.|Reduced the padding on the columns of the settings menu. Still breaks on screens smaller than 260px width, this was ignored as these are almost never used.
Decoration columns|Only display on medium screensizes and above.|Resized screen from large to small.|Correct.

<br>

## login/register page

feature|expected behaviour|testing|result|Fix(if needed)
---|---|---|---|---
Navigation menu|Collapses and/or stays readable and doesn't overflow.|Resized screen from large(width 1920px), down to small(width 280px).|Menu collapses on medium screen size, text stays readable, no items are overflowing. Breaks below 280px width, this was ignored as these are almost never used.
Canban columns|Never overlap and change to rows on screems smaller than 768px.|Resized screen from large to small.|Displays correctly.
Canban items|Display as squares on 768px and up and display as rows on smaller screens.|Resized screen from large to small.|No issues, text and icons are displayed as intended until 270px width. Below that the placeholder text is partially disappearing, this was ignored as screens this small are almost never used.
Canban item controls,moving an item|Stay visible when needed and dissapear when unnecessary. Not overflowing.|Resized screen from large to small.|Arrows for moving items change direction as intended. Only relevant directions are displaying.
Canban item controls,deleting an item|Stay visible when needed and dissapear when unnecessary. Not overflowing.|Moving items from one column to another.|Trashcan Only displays on relevant locations.(deliberately not displaying on the middle column to declutter UI)
Column expand/contract icon|Stay visible when needed and dissapear when unnecessary. Not overflowing.|Resize columns by clicking the icon and removing/adding items to a column.|Icon changes on resize correctly, dissapears on mobile when there are no items to hide, appears when there are items to hide. Indicates the amount of hidden items correctly.
Add canban item plus|Stays readable and doesn't overflow.|Resized screen from large(width 1920px), down to small(width 280px).|No issues.

<br>
<br>

# Functional testing

## Menu

feature|expected behaviour|testing|result|Fix(if needed)
---|---|---|---|---
Menu links|Direct the user to the right page.|Clicked all links in the menu. Repeated on all pages|All links behave correctly.
Logo|Clicking the logo brings the user back to the main page.|Clicked logo text and logo itself.|Clicking the text behaves as intended. The logo itself does nothing| As this is also clearly indicated by the mouseover transition to pointer this will stay as is.

<br>

## like button

feature|expected behaviour|testing|result|Fix(if needed)
---|---|---|---|---
Enter fullname|Reject fullname shorter than 5 characters.|Entered "ab c" and "ab cd" as a name.|Rejected and accepted as intended.
Enter fullname|Reject fullname without at least one space.|Entered "JohnDoe" and "John Doe".|Rejected and accepted as intended.
Enter fullname|Reject fullname that doesn't include letters.|Entered "!@#$" and "    ".|Rejected both as intended.
Enter email|Reject adress without a "@" or a ".".|Entered mail adresses "abc@abc" and "abc.abc" and "a@b.c".|Both incomplete email adresses where rejected, last one was accepted.
Enter email|Reject email adress shorter than "a.b@c".|Entered "a.@c".|Modal shows rejected email but send anyway.|Corrected email validation code.
Enter email|Reject email adress with no characters after "@".|Entered "abc.@".|Rejected as intended.
Enter Feature|Reject feature request shorter than 4 characters.|Entered "abc" and "abcd".|Rejected and accepted as intended.
Enter Feature|Reject feature request with less than 4 letters.|Entered "a!!!!" and "aaa!!!!" and "this!!!".|Rejected and accepted as intended.

<br>

# Browser testing

Browser|layout correct|functionality correct|Issues
---|---|---|---
Opera|Yes|Yes|None
Chrome|Yes|Yes|None
Edge|Yes|Yes|None
Firefox|Yes|Yes|None

<br>

# Validators

## To validate the html and CSS [W3C markup validation](https://validator.w3.org/) was used.
The initial response for the HTML was as follows:

![initial html validation](readme-images/html-validation-first.png)

<br>
After adressing the results this was the reponse:
All pages where tested and had these results.

![Second pass validation](readme-images/html-validation-after.png)

<br>
For the CSS the results were as follows:

![CSS validation](readme-images/css-validation.png)

<br>

## For Javascript validation [JSHint](https://jshint.com/) was used.

Results:

file|line|waring/error|fix
---|---|---|---
icanban.js|203 and 204 |Variable not declared properly.|Added let variable.
icanban.js|225| Confusing use of '!'. |Corrected "!variable > 0" changed to "variable == 0"
email.js|92|'modal' is already defined.|removed var
email.js|98|Missing semicolon.|fixed
email.js|104|Missing semicolon.|fixed
email.js|105|Unnecessary semicolon.|fixed
email.js|63|undefined variable emailjs.|This is part of the emailjs script
email.js|53|unused variable: sendMail.|This function is called in the html

<br>

## For python validation [pep8online](http://pep8online.com/) was used.


<br>

# Lighthouse Report 

## main page on desktop:

![Lighthouse results](readme-images/lighthouse-test.png)

<br>

# Bugs encountered during development and their fixes:

bug|fix
---|---
when adding an ingredient line with javascript, the dropdown menu did not work. | hardcoded in stead of db generated.
When liking a recipe without being logged in site crashed. | Check if logged user added. Rederected to register page.
When adding a really long title the text would flow outside the recipe card. | Fixed by adding webkit-line-clamp.
Card text displayed as blue link text when the card was made clickable to link to the recipe. | Added class to text.
Delete modal did not function. | Gave corresponding id to the modal for each recipe.
Background fixed caused exessive zoom on the background on apple devices. No errors on devtools.. | Finally used:@supports (-webkit-touch-callout: none). A hack to detect ios devices (they are the only ones supporting this.) and set the background to scroll.
When deleting the last ingredient or preperation step, adding a new one was broken. | Added a check to prevent deleting the last item.
Pressing reset on the search bar in the recipe book page sended the user to the all recipes page. | Corrected url.
Validation resulted in being valid if the last test was valid. | refactored code to fix it.
With validation on the dropdown menu's the scrollto would not work. | fixed by scrolling to the nearest row instead of the element itself.
Filling in a correct password was not accepted as valid. | Login validation was conflicting with html pattern, removed pattern from html.
Card created by text was breaking the card layout on certain screen sizes. | Decreased font size and adjusted created by text.
Delete button text disappeared on certain screen sizes. | Added custom css to this button.
Lighthouse testing revealed bad contrast and big image files. | Adjusted contrast and compressed images.
If a username was part of another username, likes would be calculated incorrectly. | Adjusted total likes function to only count likes if 'liked by' was exactly the same as logged in user.
