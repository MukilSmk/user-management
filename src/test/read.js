import chai from 'chai'
import chaiHttp from 'chai-http'
import { server } from '../index.js'
chai.should()
chai.use(chaiHttp)


    /**
     *Test cases for retrieving the users
     */

describe('Users API', ()=>{
   
     describe("GET/users/", ()=>{
         it("It should get all the USERS", (done)=>{
             chai.request(server)
             .get("/users/")
             .end ((err, response)=>{
                 response.should.have.status(200)
                 response.body.should.be.a('object')
                 response.body.should.have.property('count')
                 response.body.should.have.property('users')
                 done()
             })
         })

         it("It should not get all the USERS", (done)=>{
            chai.request(server)
            .get("/user")
            .end ((err, response)=>{
                response.should.have.status(404)
                done()
            })
        })
     })



     /**
     * 
     *Test the GET(by id) Route
     */
     describe("GET/users/:userId", ()=>{
        const userId = "61ca88ee4eefc149aec11b9b"
        it("It should get the User by id", (done)=>{
            chai.request(server)
            .get("/users/"+userId)
            .end ((err, response)=>{
                response.should.have.status(200)
                response.body.should.be.a('object')
                response.body.should.have.property('name')
                response.body.should.have.property('mail')
                response.body.should.have.property('mobile')
                done()
            })
        }) 
        it("It should Not get the User by id", (done)=>{
            const userId = "61ca88ee4eefc149aec11b9b"
            chai.request(server)
            .get("/user/"+userId)
            .end ((err, response)=>{
                response.should.have.status(404)
                done()
            })
        })
    })
})