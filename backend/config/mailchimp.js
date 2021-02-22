import Mailchimp from 'mailchimp-api-v3';

const key = `${process.env.MONGO_DB_USER}`
console.log(key);
const mailchimp = new Mailchimp('b55c2ddee39970a97d9e65b38ccc4b5d-us1');

const subscribeToNewsLetter = email =>{
    return new Promise((resolve,reject)=>{
        mailchimp.post(`lists/598d77fdfe/members`,{
            email_address: email,
            status: 'subscribed'
        })
        .then(result =>{
            return resolve(result);
        })
        .catch(error =>{
           return reject(error);
        })
    })
}

export default subscribeToNewsLetter;