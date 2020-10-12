function processReceipts() {
  var baseUrl = "https://maker.ifttt.com/trigger/";
  var event = "curve_receipt_management/";
  var key = "with/key/<COPY_YOUR_IFTTT_KEY_HERE>";
  
  var url = baseUrl + event + key;
  
  // Get all the threads labelled 'Curve Receipts'
  var label = GmailApp.getUserLabelByName("Curve Receipts");
  var threads = label.getThreads(0, 20);
  
  // we archive all the threads if they're unread AND older than the limit we set in delayDays
  for (var i = 0; i < threads.length; i++) {
    if (threads[i].isUnread()) {
      Logger.log("Found mail(s) unread with Curve Label");
      var thisThread = threads[i]; // Get a speific thread
      var messages = thisThread.getMessages(); // Get the messages in that 
      var messageCount = thisThread.getMessageCount(); // Count the number of messages in that 
      var lastMessage = messages[messageCount - 1]; // Get the last message in that thread. The first message is 0
      
      var body = lastMessage.getBody();
      var subject = lastMessage.getSubject();
      var merchant = subject.substring(subject.indexOf("Purchase at ") + "Purchase at ".length, subject.indexOf("on "));
      var price = subject.substring(subject.indexOf("for ") + "for ".length, subject.length);

      //The following regex select the date of payment in the current receipt      
      var regex = /(([0-9])|([0-2][0-9])|([3][0-1]))\ (January|February|March|April|May|June|July|August|September|October|November|December)\ \d{4} (([0-9][0-9])\:([0-9][0-9])\:([0-9][0-9]))/g;
      var exactDate = body.match(regex).toString();
      
      var cardHolder = "";

      //This part is for searching for some specific information, like card holder
      if (body.indexOf("<REDACTED>") > 0) {
        cardHolder = "Some Holder";
      }
      else {
        cardHolder = "Another Holder";
      }
      
      var data = {
        'value1': cardHolder,
        'value2': price,
        'value3': merchant + " / " + exactDate
      };
      var options = {
        'method' : 'post',
        'contentType': 'application/json',
        // Convert the JavaScript object to a JSON string.
        'payload' : JSON.stringify(data)
      };
      var response = UrlFetchApp.fetch(url, options);
      
      Logger.log(response);
      threads[i].markRead();
      
      sleep(5000);
    }
  }
}

//Function for sleep during a certain amount of milliseconds
//Sometimes the script sends data too rapidly to IFTTT
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
