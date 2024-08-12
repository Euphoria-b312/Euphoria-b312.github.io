(function() 
 {
  var allQuestions = [{
    question: "Udders Ice Cream was founded in:",
    options: ["2005", "2012", "2007", "2019"],
    answer: 2
  }, {
    question: "What are the names of our founders?",
    options: ["Darius & Peck Chye", "Ben & Jerry", "Daniel & Peggy", "David & Peck Lin"],
    answer: 3
  }, {
    question: "How many flavours of Ice Cream does Udders have?",
    options: ["21", "More than 30", "More than 40","Less than 20"],
    answer: 1
  },{
    question: "Which of these options is a brand value of Udders?",
    options: ["Cheeky", "Positive", "Exciting", "Unique"],
    answer: 0
  }, {
    question: "Which term does Udders use to describe international flavours of Ice Cream?",
    options: ["Universal", "Cosmopolitian", "Standard", "Global"],
    answer: 1
  },{
    question: "Pick the flavour from our Cosmopolitian category.",
    options: ["French Vanilla", "Mao Shan Wang", "Kyoto Matcha", "Wineberries"],
    answer: 0 
  },{
    question: "Which term does Udders use to describe local flavours of Ice Cream?",
    options: ["Asian", "Singaporean", "Oriental", "Regional"],
    answer: 0
  },{
    question: "Pick the flavour from our Asian category.",
    options: ["Baileys & Bourbon", "Salted Caramel", "Cookies & Cream", "Thai Iced Tea"],
    answer: 3
  },{
    question: "Which term does Udders use to describe alcoholic flavours of Ice Cream?",
    options: ["Spirituous", "Vinous", "Liqueur", "Inebriating"],
    answer: 2
  },{
    question: "Pick the flavour from our Liqueur category.",
    options: ["Rum Rum Raisin", "Hazel's Nuts", "Singapore Chendol", "Earl Grey"],
    answer: 0
    }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        redirectPage();
        return score;
  }

  function redirectPage() {
    var score = 0;
    for (var i = 0; i < selectOptions.length; i++) {
      if (selectOptions[i] === allQuestions[i].answer) {
        score++;
      }
    }
    if (score === allQuestions.length) {
      setTimeout(function() {
        window.location.href = 'udders success page.html';
      }, 2000);
    }
  }
})();
