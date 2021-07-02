
# Bugs:

when adding an ingredient line with javascript, the dropdown menu did not work. hardcoded in stead of db generated.
When liking a recipe without being logged in site crashed. check if logged user added. Rederected to register page.
When adding a really long title the text would flow outside the recipe card. fixed by adding webkit-line-clamp.
Card text displayed as blue link text when the card was made clickable to link to the recipe. Added class to text.
Delete modal did not function. Gave corresponding id to the modal for each recipe.
Background fixed caused exessive zoom on the background on apple devices. No errors on devtools.. Finally used:@supports (-webkit-touch-callout: none). A hack to detect ios devices (they are the only ones supporting this.) and set the background to scroll.
When deleting the last ingredient or preperation step, adding a new one was broken. Added a check to prevent deleting the last item.
Pressing reset on the search bar in the recipe book page sended the user to the all recipes page. Corrected url.
Validation resulted in being valid if the last test was valid. refactored code to fix it.
With validation on the dropdown menu's the scrollto would not work, fixed by scrolling to the nearest row instead of the element itself.