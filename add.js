const previewImage = document.getElementById("previewImage");
function preview(){
    const imageUrlInput = document.getElementsByName("imageUrl")[0];
    console.log(imageUrlInput.value)
    previewImage.style.backgroundImage = `url('${imageUrlInput.value}')`;
}

async function addRecipe(){
    const form = document.getElementById("recipeForm");
    var recipeValues = {};
    for (var i = 0; i < form.elements.length; i++) {
    console.log(form.elements.length)

        var element = form.elements[i];
        
        if (element.nodeName === "INPUT" || element.nodeName === "TEXTAREA") {
            // Add the element value to the object using the element's name as the key
            if(element.value.length <= 0) return;
            recipeValues[element.name] = element.value;
          }
    }
    
    try {
        const response = await fetch('http://localhost:3000/api/recipe', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeValues),
          });
      
          if (response.status === 201) {
            console.log("Recipe created successfully.");
            console.log(await response.json());
            window.location.href = './index.html';
          } else {
            console.error("Error creating recipe.");
          }
        } catch (error) {
          console.error("Network error:", error);
        }

}