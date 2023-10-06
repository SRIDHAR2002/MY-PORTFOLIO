const sendGrid=require("nodemailer-sendgrid-transport")
const nodemailer=require("nodemailer")

const transporter=nodemailer.createTransport(
    sendGrid({
        auth:{
            api_key:process.env.API_SENDGRID,
        }
    })
)
const sendEmailController=(req,res)=>{
    
    try{
        const {name,email,msg}=req.body;
    if (!name || !email || !msg) {
        return res.status(500).send({
          success: false,
          message: "Please Provide All Fields",
        });
      }

      transporter.sendMail({
        to: "sridhargunturi123@gmail.com",
        from: "sridhargunturi123@gmail.com",
        subject: "Regarding Mern Portfolio App",
        html: `
          <h5>Detail Information</h5>
          <ul>
            <li><p>Name : ${name}</p></li>
            <li><p>Email : ${email}</p></li>
            <li><p>Message : ${msg}</p></li>
          </ul>
        `,
      });
  
        return res.status(200).send({
                success:true,
                message:'message send successfully',

            })
        
    }catch(err){
        console.log(err);
        return res.status(500).send({
            success:false,
            message:'send email API error',
            err,
        })
    }
};

module.exports={sendEmailController}