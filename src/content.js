let content = {
    "nodes":{
        0:{
            "text":"This is the first text.",
            "options":{
                
                1: {
                    "text": "Continue",
                    "goto": "1",
                    "singleUse": false

                }
            }
        },
        1:{
            "text":"This is the second text.",
            "options":{
                
                1: {
                    "text": "Go back.",
                    "goto": "0",
                    "singleUse": false

                },
                2: {
                    "text": "Continue.",
                    "goto": "2",
                    "singleUse": false

                }
            }
        },
        2:{
            "text":"This is the third and final text.",
            "options":{
                
                1: {
                    "text": "Restart",
                    "goto": "0",
                    "singleUse": false

                }
            }
        }
    }
};