const adminAuth =(req , res , next)=>{
    console.log("Authntication Admin middleware called")
    const token  = "abc123";
    const isAdminAuthenticated = token === "abc123";
  
    if(! isAdminAuthenticated){
      res.status(401).send("Unauthorized");
    }else{
      next()
    }
  
  };
  const userAuth =(req , res , next)=>{
    console.log("Authntication User middleware called")
    const token  = "abc123";
    const isAdminAuthenticated = token === "abc123";
  
    if(! isAdminAuthenticated){
      res.status(401).send("Unauthorized");
    }else{
      next()
    }
  
  };

  module.exports = {
    adminAuth ,
    userAuth
  }