const MessagesSchema = require("../../models/Messages/messagesModel");

const saveToDatabaseMessages = async ({ to, from, message }) => {
  console.log(message);
  try {
    const availableUserMessages = await MessagesSchema.findOne({
      toUserId: to,
      fromUserId: from,
    });
    const availableUserMessagesY = await MessagesSchema.findOne({
      toUserId: from,
      fromUserId: to,
    });
   
    if (availableUserMessages) {
      availableUserMessages.messages.push({ fromUserId:from, message });
      await availableUserMessages.save();
    }else if(availableUserMessagesY){
      availableUserMessagesY.messages.push({ fromUserId:from, message });
      await availableUserMessagesY.save();
    }else {
      try {
        const newMessages = new MessagesSchema({
          toUserId: to,
          fromUserId: from,
        });
        newMessages.messages.push({fromUserId:from, message });
        await newMessages.save();
      } catch (error) {
        console.log(error);
      }
      
    }
  } catch (error) {
    console.log(error);
  }
};

const returnUsersMessages = async (req, res) => {
  try {
    const { to, from } = req.query;
    console.log(req.query);
    console.log('helo');
    const availableUserMessages = await MessagesSchema.findOne({
      toUserId: to,
      fromUserId: from,
    }).populate({path:'messages' ,populate:{path:'fromUserId'}});
    if( availableUserMessages){

      return res.status(200).json({ availableUserMessages });
    }else{

      const availableUserMessages = await MessagesSchema.findOne({
        toUserId: from,
        fromUserId: to,
      }).populate({path:'messages' ,populate:{path:'fromUserId'}});
  console.log(availableUserMessages);
     return res.status(200).json({ availableUserMessages });
    }
  
console.log(availableUserMessages);
   

   
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

module.exports = { saveToDatabaseMessages, returnUsersMessages };
