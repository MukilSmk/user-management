import chai from 'chai'
import chaiHttp from 'chai-http'
import { server } from '../index.js'
chai.should()

chai.use(chaiHttp)

describe('Users API', ()=>{

    /**
     * 
     *Test the PATCH Route
     */
     describe("PATCH/users/", ()=>{
        
        it("It should UPDATE the  existing User ", (done)=>{
            const userId = "61cab71285a49d168ce4d55e"
            const user = {
                "name": "KEVINKUMAR"}
            chai.request(server)
            .patch("/users/update/"+userId)
            .send(user)
            .end ((err, response)=>{
                response.should.have.status(200)
                response.body.should.be.a('object')
                response.body.should.have.property("acknowledged").eq(true)
                response.body.should.have.property("modifiedCount").eq(1)
                response.body.should.have.property("matchedCount").eq(1)
                done()
            })
        }) 


        it("It should Not get the update route", (done)=>{

            const userId = "61cab71285a49d168ce4d55"
            const user = {
                "name": "KEVINKUMAR"}
            chai.request(server)
            .get("/user/update"+userId)
            .end ((err, response)=>{
                response.should.have.status(404)
                done()
            })
        })

        it("It should Not get the update route", (done)=>{

            const userId = "61c69168a49a646c551b4b1c"
            const user = {
                "name": "KEVINKUMAR"}
            chai.request(server)
            .get("/users/update"+userId)
            .end ((err, response)=>{
                response.should.have.status(500)
                done()
            })
        })

    }) 
}) 