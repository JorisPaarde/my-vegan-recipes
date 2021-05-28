
  $(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    fadeOutFlash();
  });

  function fadeOutFlash(){
    $('.flashes').delay(4000).slideUp('slow');
  }


//-----------------------------------------------  Add a line to recipe ingredient input
  $('#add-ingredient').click(function(){

  let recipeInputHtml = `
  <div class="row recipe-item ingredient">
                <!-- ingredient -->
                <div class="input-field col s12 m8">
                    <input name="ingredient_name" type="text" minlength="3" maxlength="100" class="validate" required>
                    <label for="ingredient_name">Ingredient</label>
                </div>
                <div class="input-field col s4 m1">
                    <input name="amount" type="text" maxlength="5" class="validate" required>
                    <label for="amount">Amount</label>
                </div>
                <div class="col s6 m2">
                    <label>Unit</label>
                    <select class="browser-default" name="unit_name" required>
                        <option value="g">g</option>
                        <option value="kg">kg</option>
                        <option value="l">l</option>
                        <option value="ml">ml</option>
                        <option value="pcs">pcs</option>
                    </select>
                </div>
                <div class="col s2 m1 l1">
                    <button type="button" class="delete btn-floating btn-small waves-effect waves-light red">
                        <i class="material-icons">delete</i>
                    </button>
                </div>
            </div>
  `
// add after the last added ingredient
  $( '.ingredient' ).last().after(recipeInputHtml)
});

// remove ingredient line
$('.add-recipe').click(function(event){
  buttonClass = $(event.target).parent().attr("class")

  if (buttonClass.includes("delete")){
    item = $(event.target).closest(".recipe-item")
    item.remove()
  }
});

//----------------------------------------------- Add a line to recipe preparation input
$('#add-prep-step').click(function(){

let recipeInputHtml = `
<div class="row prep-step recipe-item valign-wrapper">
  <div class="col s10 m11 l11">
      <div class="input-field preparation_step col s12">
          <textarea name="preparation_step" type="text" minlength="10" maxlength="400"
              class="validate"></textarea>
          <label class="textarea-label" for="preparation_step">Preparation step</label>
      </div>
  </div>
  <div class="col s2 m1 l1">
      <button type="button" class="delete btn-floating btn-small waves-effect waves-light red">
          <i class="material-icons">delete</i>
      </button>
  </div>
</div>
  `
// add after the last added step
$( '.prep-step' ).last().after(recipeInputHtml)
});

// remove prep line