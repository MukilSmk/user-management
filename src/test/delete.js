import chai from 'chai'
import chaiHttp from 'chai-http'
import { server } from '../index.js'
chai.should()

chai.use(chaiHttp)



/**
* 
*Test cases for the delete route
*/
describe('Users API', ()=>{
describe("DELETE/users/", ()=>{
   it("It should DELETE the   User ", (done)=>{
       const userId = "61c95206749f64309b8e377d"
       chai.request(server)
       .delete("/users/delete/"+userId)
       .end ((err, response)=>{
           response.should.have.status(200)
           response.body.should.be.a('object')
           response.body.should.have.property("deletedCount").eq(1)
           done()
       })
   }) 

   it("It should not delete the user", (done)=>{

    const userId = "61c94e8b9eecadc69edae2f7"
    const user = {
        "name": "KEVINKUMAR"}
    chai.request(server)
    .get("/users/delete"+userId)
    .end ((err, response)=>{
        response.should.have.status(500)
        done()
    })
})

}) 
})

