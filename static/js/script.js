
  $(document).ready(function(){
    $('.sidenav').sidenav();
    $('select').formSelect();
    fadeOutFlash();
  });

  function fadeOutFlash(){
    $('.flashes').delay(4000).slideUp('slow');
  }


// Add a line to recipe ingredient input
  $('#add-ingredient').click(function(){

  let recipeInputHtml = `
  <div class="row ingredient">
                      <!-- ingredient -->
                      <div class="input-field col s12 m8">
                          <input name="ingredient_name" type="text" minlength="3" maxlength="100"
                              class="validate" required>
                          <label for="ingredient_name">Ingredient</label>
                      </div>

                      <div class="input-field col s6 m2">
                          <input name="amount" type="text" maxlength="5" class="validate" required>
                          <label for="amount">Amount</label>
                      </div>
                      <div class="unit_select col s6 m2">
                          <label>Unit</label>
                          <select class="browser-default" name="unit_name" required>
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                            <option value="l">l</option>
                            <option value="ml">ml</option>
                            <option value="pcs">pcs</option>
                          </select>
                      </div>
                  </div>
  `
// add after the last added ingredient
  $( '.ingredient' ).last().after(recipeInputHtml)
});


// Add a line to recipe preparation input
$('#add-prep-step').click(function(){

let recipeInputHtml = `
  <div class="row prep-step">
                    <div class="input-field col s12">
                        <textarea name="preparation_step" type="text" minlength="10"
                            maxlength="200" class="validate"></textarea>
                        <label class="textarea-label" for="preparation_step">Preparation step</label>
                    </div>
                </div>
  `
// add after the last added step
$( '.prep-step' ).last().after(recipeInputHtml)
});

 