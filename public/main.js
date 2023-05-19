



      document.querySelector('.searchWorkout').addEventListener('click', function(){
       let workoutValue = document.querySelector('.workOutValue').value
        fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${workoutValue}`, {
          method: 'GET',
          headers: {
            'X-Api-Key': 'z+kP/dQ1FLHyJ/EwaC6oBg==0NTw6jxccdMQUNgj',
            'Content-Type': 'application/json'
          },
      
        })
        .then(res => res.json()) // parse response as JSON 
    .then(data => { 
      console.log(data) 
      document.querySelector('.muscle').innerText = data[0].muscle.toUpperCase()
      document.querySelector('.workoutName').innerText = data[0].name
      document.querySelector('.difficulty').innerText = data[0].difficulty.toUpperCase()

      document.querySelector('.instructions').innerText = data[0].instructions
 
    }) 
    .catch(err => { 
        console.log(`error ${err}`) 
    });
  });










