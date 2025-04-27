# DevTinder APIs

- authRouter
 - POST /signup
 - POST /login
 - POST /logout

profileRouter
 - GET /profile/view
 - PATCH /profile/edit
 - PATCH /profile/password

connectionRequestRouter
 - POST /request/send/intersted/:userId
 - POST /request/send/ignored/:userId
 - POST /request/send/accepted/:requestId
 - POST /request/send/rejected/:requestId 


userRouter
 - GET /user/connection
 - GET / user/request
 - GET / user/feed - Gets you the profile of other user on plateform


 status : ignore , intersted , accepeted , rejected