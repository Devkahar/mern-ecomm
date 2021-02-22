import Mailchimp from 'mailchimp-api-v3';



const subscribeToNewsLetter =async  email =>{
    const key = `${process.env.MONGO_DB_USER}`
    console.log(process.env.MAILCHIMP_LIST_KEY);
    const mailchimp = new Mailchimp('b55c2ddee39970a97d9e65b38ccc4b5d-us1');
    console.log(email);
    return new Promise((resolve,reject)=>{
        mailchimp.post(`lists/598d77fdfe/members`,{
            email_address: email,
            status: 'subscribed'
        })
        .then(result =>resolve(result))
        .catch(error =>reject(error))
    })
}

export default subscribeToNewsLetter;