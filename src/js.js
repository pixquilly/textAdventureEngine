try{

    let text = "";
    let choice = null;
    let textContainer = document.querySelector(".text-container");
    let optionsList = document.querySelector(".option-list");
    let optionsBtns = document.querySelectorAll('.option-btn');
    let nodeIndexElm = document.querySelector("#nodeIndex");
    let nodeIndex = 0;
    let contextIndex = 0;
    let pressedButtons = [];
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
    
    hideEmptyChoices(); //hides buttons that don't have text value
    typewriter(content.nodes[nodeIndex].text); //use typewriter effect to write the text

    function madeChoice(choiceNum, button){

        addToPressed(button); 

        let choice = choiceNum - 1;
        
        let nodeOptionsValues = Object.values(content.nodes[nodeIndex].options);

        //NODE INDEX UPDATES
        contextIndex = nodeIndex;
        nodeIndex = nodeOptionsValues[choice].goto;

        if(nodeOptionsValues[choice].hasOwnProperty("effect")){
            attributeName = nodeOptionsValues[choice].effect.attr;
            attributeValue = nodeOptionsValues[choice].effect.value;
            updateAttribute(attributeName, attributeValue);
        }

        updateAttribute();
        clearView();
        updateText();
        updateChoices();
        hideEmptyChoices();
        nodeIndexElm.innerHTML = nodeIndex;
    }
    function updateText(){
        let nodeText = content.nodes[nodeIndex].text;
        if(typeWriterInterval){
            clearInterval(typeWriterInterval);
        }
        typewriter(nodeText);
        textContainer.hidden = false;
    }
    function updateChoices(){
        
        let nodeOptionsValues = Object.values(content.nodes[nodeIndex].options);

        if(nodeIndex != contextIndex){
            pressedButtons = [];
        }
        for(i=0; i<nodeOptionsValues.length; i++){

            let btn = optionsBtns[i];
            btn.innerHTML = nodeOptionsValues[i].text;

            let isSingleUse = nodeOptionsValues[i].singleUse;
            let isRecursive = nodeOptionsValues[i].goto==nodeIndex;
            let isPressed = pressedButtons.includes(btn) && isRecursive;

            //debug
            btn.innerHTML += "  (";
            if(isSingleUse){btn.innerHTML += "singeUse ";}
            if(isRecursive){btn.innerHTML += "recursive ";}
            if(isPressed){btn.innerHTML += "pressed ";}
            btn.innerHTML += ")";
            //
            
            if(isSingleUse && isRecursive && isPressed){
                btn.hidden = true;
            } else {
                btn.hidden = false; 
            }
        }
    }
    function addToPressed(button){

        contextIndex = nodeIndex;
        pressedButtons.push(button);
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

        optionsList.style.display = "none";

        typeWriterInterval = setInterval(()=>{
            if(charIndex<text.length){
                // if <span> is reached, we keep going until we find </span>
                // - then we place the tag in one go
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

            } else {
                clearInterval(typeWriterInterval);
                appendPeriod(textContainer);
                optionsList.style.display = 'flex';
            }
        }, 30);
    }
    function resetTypewriterEffect(){
        if(typeWriterInterval){
            clearInterval(typeWriterInterval);
            optionsList.style.display = 'flex';
        }
        textContainer.innerHTML = content.nodes[nodeIndex].text;
        appendPeriod(textContainer);
    }
    function setCookie(cookieName, cookieValue, CookieDuration=30){

    }
    function getCookie(name) {

    }
    function deleteCookie(cookieName){

    }
    function appendPeriod(textElement){
        //this function does not work for now.
        if(".!?".indexOf(textElement.innerHTML[-1]) <= -1){
            // textElement.innerHTML += ".";
        };
    }
}
catch(error){
    alert(error);
}


