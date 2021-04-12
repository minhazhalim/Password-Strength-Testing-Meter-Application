const strengthMeter = document.getElementById('strengthMeter');
const passwordInput = document.getElementById('passwordInput');
const reasons = document.getElementById('reasons');
passwordInput.addEventListener('input',updateStrengthMeter);
updateStrengthMeter();
function updateStrengthMeter(){
     const weaknesses = calculatePasswordStrength(passwordInput.value);
     let strength = 100;
     reasons.innerHTML = '';
     weaknesses.forEach(weakness => {
          if(weakness == null){
               return;
          }
          strength -= weakness.deduction;
          const messageElement = document.createElement('div');
          messageElement.innerText = weakness.message;
          reasons.appendChild(messageElement);
     });
     strengthMeter.style.setProperty('--strength',strength);
}
function calculatePasswordStrength(password){
     const weaknesses = [];
     weaknesses.push(lengthWeakness(password));
     weaknesses.push(lowercaseWeakness(password));
     weaknesses.push(uppercaseWeakness(password));
     weaknesses.push(numberWeakness(password));
     weaknesses.push(specialCharactersWeakness(password));
     weaknesses.push(repeatCharactersWeakness(password));
     return weaknesses;
}
function lengthWeakness(password){
     const length = password.length;
     if(length<=5){
          return {message: 'your password is too short',deduction: 40};
     }
     if(length<=10){
          return {message: 'your password could be longer',deduction: 15};
     }
}
function uppercaseWeakness(password){
     return characterTypeWeakness(password,/[A-Z]/g,'uppercase characters');
}
function lowercaseWeakness(password){
     return characterTypeWeakness(password,/[a-z]/g,'lowercase characters');
}
function numberWeakness(password){
     return characterTypeWeakness(password,/[0-9]/g,'numbers');
}
function specialCharactersWeakness(password){
     return characterTypeWeakness(password,/[^0-9a-zA-Z\s]/g,'special characters');
}
function characterTypeWeakness(password,regularExpression,type){
     const matches = password.match(regularExpression) || [];
     if(matches.length === 0){
          return {message: `your password has no ${type}`,deduction: 20};
     }
     if(matches.length<=2){
          return {message: `your password could use more ${type}`,deduction: 5};
     }
}
function repeatCharactersWeakness(password){
     const matches = password.match(/(.)\1/g) || [];
     if(matches.length>0){
          return {message: 'your password has repeat characters',deduction: matches.length * 10};
     }
}