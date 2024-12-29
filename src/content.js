let content = {
    "nodes":{
        0:{
            "text":"this is the <span class='hl'>first</span> text.",
            "options":{
                1: {
                    "text": "continue",
                    "goto": "1",
                    "singleUse": false
                }
            }
        },
        1:{
            "text":"this is <span class='hl'>second</span> text. You can go back to the <span class='hl'>first</span> text, or go forward to the third text. What will yo do?",
            "options":{
                1: {
                    "text": "continue",
                    "goto": "2",
                    "effect": {"attr": "hp", "value": -10},
                    "singleUse": false
                },
                2: {
                    "text": "go back",
                    "goto": "0",
                    "effect": {"attr": "hp", "value": -10},
                    "singleUse": false
                }
            }
        },
        2:{
            "text":"this is the <span class='hl'>third</span> text. You can go back to previous texts, or choose other options that will reset this text.",
            "options":{
                
                1: {
                    "text": "CHOICE #3",
                    "goto": "2",
                    "singleUse": true

                },
                2: {
                    "text": "CHOICE #4",
                    "goto": "2",
                    "singleUse": true

                },
                3: {
                    "index": 5,
                    "text": "CHOICE #5",
                    "goto": "2",
                    "singleUse": true
                },
                4: {
                    "text": "go back to text 0",
                    "goto": "0",
                    "singleUse": false

                },
                5: {
                    "text": "go back to text 1",
                    "goto": "1",
                    "effect": {"attr": "hp", "value": -10},
                    "singleUse": false

                }
            }
        }
    }
};