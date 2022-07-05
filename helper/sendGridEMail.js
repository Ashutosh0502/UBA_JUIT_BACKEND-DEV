import axios from 'axios';

export const resetPasswordOption = (userInfo) => {
   return {
      "from": {
         "email": process.env.signupFrom
      },
      "personalizations": [
         {
            "to": [
               {
                  "email": userInfo.email
               }
            ],
            "dynamic_template_data": {
               "passwordResetUrl": `${process.env.frontEndHttpPath}/confirmPassword/${encodeString(userInfo._id.toString())}`,
               "username": userInfo.name
            }
         }
      ],
      "template_id": process.env.ResetPasswordTemplateId
   }
}

export const passwordUpdateOption = (userInfo) => {
   return {
      "from": {
         "email": process.env.signupFrom
      },
      "personalizations": [
         {
            "to": [
               {
                  "email": userInfo.email
               }
            ],
            "dynamic_template_data": {
               "username": userInfo.name
            }
         }
      ],
      "template_id": process.env.passwordUpdateTemplateId
   }
}

export const sendMail = async (options) => {
   try {
      const config = { "headers": { "Authorization": `Bearer ${process.env.sendGridAPIKey}` } };
      const url = process.env.sendgridEmailUrl;
      const { data } = await axios.post(url, options, config);
      return data;
   } catch (err) {
      console.log(err);
      return err;
   }
}

export const encodeString = (data) => {
   const buff = Buffer.from(data, "utf8");
   return buff.toString('base64');
}


export const decodeString = (data) => {
   const buff = Buffer.from(data, "base64");
   return buff.toString('utf8');
}