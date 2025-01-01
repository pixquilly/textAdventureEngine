let content = {
    "nodes":{
        0:{
            "text":"this is the <span class='hl'>third</span> text. You can go back to previous texts, or choose other options that will reset this text.",
            "options":{
                
                1.1: {
                    "text": "RECURSIVE",
                    "goto": "0",
                    "singleUse": true

                },
                1: {
                    "text": "Go to 2.1",
                    "goto": "2.1",
                    "singleUse": true

                },
                2: {
                    "text": "Go to 2.2",
                    "goto": "2.2",
                    "singleUse": true

                }
            }
        },
        2.1:{
            "text":"this is 2.1",
            "options":{
                
                1: {
                    "text": "Continue",
                    "goto": "2.2",
                    "singleUse": true

                }
            }
        },
        2.2:{
            "text":"this is 2.2",
            "options":{
                
                1: {
                    "text": "Continue",
                    "goto": "2.3",
                    "singleUse": true

                }
            }
        },
        2.3:{
            "text":"this is 2.3",
            "options":{
                
                1: {
                    "text": "Continue",
                    "goto": "0",
                    "singleUse": true
                }
            }
        }
    }
};