try{

    let text = "";
    let choice = null;
    let textContainer = document.querySelector(".text-container");
    let optionsBtns = document.querySelectorAll('.option-btn');
    let nodeIndexElm = document.querySelector("#nodeIndex");
    let nodeIndex = 0;
    let typeWriterInterval = null;

    let player = {
        name: "",
        username: "",
        age: "",
        gender: "",
        country: "",
        wp: "sword",
        hp: 100,
        attk: 100,
    }

    //INITIAL SETTING OF TEXT AND OPTIONS
    let options_values = Object.values(content.nodes[nodeIndex].options);
    for(i=0; i<options_values.length; i++){
        optionsBtns[i].innerHTML = options_values[i].text;
    }
    
    hideEmptyChoices();
    typewriter(content.nodes[nodeIndex].text);


    function madeChoice(choiceNum){

        let choice = choiceNum - 1
        let nodeOptions = content.nodes[nodeIndex].options;
        let nodeOptionsKeys = Object.keys(nodeOptions);
        let nodeOptionsValues = Object.values(nodeOptions);
        
        nodeIndex = nodeOptionsValues[choice].goto;

        if(nodeOptionsValues[choice].hasOwnProperty("effect")){
            attributeName = nodeOptionsValues[choice].effect.attr;
            attributeValue = nodeOptionsValues[choice].effect.value;
            player[attributeName] += attributeValue;
        }

        updateAttribute();
        clearView();
        updateText(nodeIndex);
        updateChoices(nodeIndex);
        hideEmptyChoices();
        nodeIndexElm.innerHTML = nodeIndex;
    }
    function updateText(nodeIndex){
        let nodeText = content.nodes[nodeIndex].text;
        if(typeWriterInterval){
            clearInterval(typeWriterInterval);
        }
        typewriter(nodeText);
        textContainer.hidden = false;
    }
    function updateChoices(){
        let nodeOptions = content.nodes[nodeIndex].options;
        let nodeOptionsValues = Object.values(nodeOptions);
        for(i=0; i<nodeOptionsValues.length; i++){
            let btn = optionsBtns[i]
            btn.innerHTML = nodeOptionsValues[i].text;
            btn.hidden = false;
        }
    }
    function showChoice(){
        alert(choice);
    }
    function clearView(){
        textContainer.innerHTML = '';
        optionsBtns.forEach((btn)=>{
            btn.innerHTML = '';
            btn.hidden = true;
        });
    }
    function hideEmptyChoices(){
        optionsBtns.forEach((btn)=>{
            if(btn.innerHTML == ''){
                btn.hidden = true;
            }
        });
    }
    function showContinueButton(){
        let show = false;
        optionsBtns.forEach((btn)=>{
            if(btn.innerHTML==''){
                show = true;
            } else{
                show = false;
            }
        });
        if(show){
            continueBtn.hidden = false;
        }
    }
    function updateAttribute(attr, value){
        player[attr] = value;
    }
    function typewriter(text){
        let charIndex = 0;
        let tempText = '';

        typeWriterInterval = setInterval(()=>{
            if(charIndex<text.length){
                // if <span> is reached, we keep going until we find </span>
                // - then we extract the text from between the tags
                // - then we place the tag in one go
                // - then we add the text back
                if(text[charIndex]==="<"){
                    let count = 0;
                    let subString = '';
                    for(i=charIndex;i<text.length;i++){
                        if(count==2){
                            charIndex=i;
                            break
                        } else{
                            charIndex = i;
                        }
                        if(text[i]===">"){
                            charIndex++; //this fixes the problem where if a span is the last thing in the text area it'll print > twice.
                            count++;
                        }
                        subString += text[i];
                        
                    }
                    // text = text.replace(subString, '');
                    textContainer.innerHTML += subString;

                }
                if(text[charIndex]){
                    textContainer.innerHTML += text[charIndex];
                    charIndex++;
                }

            } else{
                clearInterval(typeWriterInterval);
            }
        }, 30);
    }
    function resetTypewriterEffect(){
        if(typeWriterInterval){
            clearInterval(typeWriterInterval);
        }
        textContainer.innerHTML = content.nodes[nodeIndex].text;
    }
}
catch(error){
    alert(error);
}


