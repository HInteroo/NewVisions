Palindrome("racecar");
Palindrome("stars");
function Palindrome(word){
  if((word.length > 1) && (word.charAt(0) == word.charAt(word.length-1))){
    console.log(word.charAt(0) +"=="+ word.charAt(word.length-1));
    Palindrome(word.substr(1,word.length-2));
  }
  else if((word.length <= 1)){
    console.log("This word is a Palindrome");
    return true;
  }
  else{
    console.log("'"+word+"'"+" is not a Palindrome word because :"+word.charAt(0) +" =/= "+ word.charAt(word.length-1));
    return false;
  }
}
