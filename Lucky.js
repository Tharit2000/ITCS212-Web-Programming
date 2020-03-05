function lucky()
{
    // first 3 phone numbers
    const first3Num = "082";
    
    // reference from html
    var cat = document.getElementById("cat");
    var catName = document.getElementById("catName");
    var exclude = document.getElementById("exclude");
    var numRef = document.getElementById("number");
    
    // value from reference
    var catVal = cat.value;
    var excludeNum = exclude.value;
    
    // categories of lucky numbers
    var work = ["39", "45", "46", "56", "78", "87", "93"];
    var love = ["24", "32", "36", "62", "63", "69", "96"];
    var wealth = ["28", "45", "54", "56", "65", "78", "82"];
    var merchan = ["16", "22", "26", "41", "42", "44", "61"];
    var tech = ["19", "59", "89", "91", "95", "98", "99"];
    var education = ["14", "15", "23", "41", "39", "51", "55"];
    
    // initiate the array of selected lucky numbers and display the selected category
    var luckyNumbers = [];
    switch(catVal)
    {
        case "work": luckyNumbers = work; catName.innerHTML = "Work"; break;
        case "love": luckyNumbers = love; catName.innerHTML = "Love"; break;
        case "wealth": luckyNumbers = wealth; catName.innerHTML = "Wealth"; break;
        case "merchandising": luckyNumbers = merchan; catName.innerHTML = "Merchandising"; break;
        case "technology": luckyNumbers = tech; catName.innerHTML = "Technology"; break;
        case "education": luckyNumbers = education; catName.innerHTML = "Education/Wiseness"; break;
    }

    numRef.innerHTML = ""; // clear screen

    // loop through all lucky numbers in the selected category
    for(let i=0; i<luckyNumbers.length; i++)
    {
        var noNumber = true;
        numRef.innerHTML += "<h3>---- " + luckyNumbers[i] + " ----</h3>"; // display current lucky number

        // check if the exclude numbers are in the lucky numbers
        var generate = true;
        for(let x=0; x<excludeNum.length; x++)
        {
            if(luckyNumbers[i].includes(excludeNum[x]))
            {
                numRef.innerHTML += "Numbers not found";
                generate = false;
                break;
            }
        }

        // generate numbers
        if(generate)
        {
            var number = ""; // temporary 7-digits phone number
            for(let j=0; j<6; j++)
            {
                // generate the temporary 5-digits number from 00000 to 99999
                var temp = "0";
                while(temp <= 99999) /*** please read the note at the bottom of the function ***/
                {
                    temp = (temp.toString().padStart(5,"0")); // fill "0" in front of the generated number up to 5-digits

                    // check if the exclude numbers are in the generated number
                    var approve = true;
                    for(let x=0; x<excludeNum.length; x++)
                    {
                        if(temp.includes(excludeNum[x]))
                        {
                            approve = false;
                            break;
                        }
                    }
                    
                    if(approve)
                    {
                        var sum = 10 + Number(luckyNumbers[i][0]) + Number(luckyNumbers[i][1]); // sum the digits value of 082 and the lucky number
                        sum += (temp.split("")).reduce((a,b) => Number(a) + Number(b) , 0); // sum the digits value of generated 5-digits number
                        
                        // check if the sum is equal to any lucky numbers in the category
                        // if(sum == luckyNumbers[i]) --> use this if you want the sum to be equal to the lucky number in the phone number
                        if(luckyNumbers.includes(sum.toString()))
                        {
                            if(j == 0)
                            {
                                number = luckyNumbers[i] + temp.slice(0); // insert the lucky number in front of the generated 5-digits number
                            }
                            else
                            {
                                number = temp.slice(0,j) + luckyNumbers[i] + temp.slice(j); // insert the lucky number in between the generated 5-digits number
                            }
                            // display the numbers
                            console.log(first3Num + number + " = " + sum);
                            numRef.innerHTML += first3Num + number + "<br>";
                            noNumber = false;
                        }
                    }
                    temp++;
                }
            }
        }
        // check if there is no satisfied phone numbers
        if(noNumber && generate == true)
        {
            numRef.innerHTML += "Number not found";
        }
    }
}

/* Note: This algorithm takes a lot of runtime. 
 *       It may take many hours to complete the whole function.
 *       I have tried to generate the Education lucky numbers and it takes approximately 3 hours to complete.
 *       Therefore, you can test this algorithm by reducing the number of 99999 in while loop to a smaller number like 999.      
*/