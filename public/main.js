const trash = document.getElementsByClassName('fa-trash')



  //     document.querySelector('.searchWorkout').addEventListener('click', function(){
  //      let workoutValue = document.querySelector('.workOutValue').value
  //       fetch(`https://api.api-ninjas.com/v1/exercises?muscle=${workoutValue}`, {
  //         method: 'GET',
  //         headers: {
  //           'X-Api-Key': 'z+kP/dQ1FLHyJ/EwaC6oBg==0NTw6jxccdMQUNgj',
  //           'Content-Type': 'application/json'
  //         },
      
  //       })
  //       .then(res => res.json()) // parse response as JSON 
  //   .then(data => { 
  //     console.log(data) 

  //     a = document.getElementById('addWorkout');
  //       a.setAttribute("href", `/feed?name=${data[0].name}`);
  //     document.querySelector('.muscle').innerText = data[0].muscle.toUpperCase()
  //     document.querySelector('.workoutName').innerText = data[0].name
  //     document.querySelector('.difficulty').innerText = data[0].difficulty.toUpperCase()
  //     document.querySelector('#addWorkout').innerText = data[0].name
  //     document.querySelector('.instructions').innerText = data[0].instructions
 
  //   }) 
  //   .catch(err => { 
  //       console.log(`error ${err}`) 
  //   });
  // });





  Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
      
      fetch('deleteWorkoutLog', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'id': element.dataset.id,
          
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});





