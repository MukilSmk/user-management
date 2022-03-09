import chai from 'chai'
import chaiHttp from 'chai-http'

import { server } from '../index.js'
chai.should()

chai.use(chaiHttp)
/**
 * Test case for the login route
 */
describe("POST/users/login", ()=>{
    it("It should login the  existing User ", (done)=>{

        const user = {
            "email": "kavinkumar@gmail.com",
            "password": "Hash@123!"
        }

        chai.request(server)
        .post("/users/login")
        .send(user)
        .end ((err, response)=>{
            response.should.have.status(200)
            response.body.should.be.a('object')
            response.body.should.have.property('message')
            response.body.should.have.property('token')
            done()
        })
    })

    it("It should not login the User ", (done)=>{

        const user = {
            "email": "kavinkumar@gmail.com",
            "password": "Hash@12!"
        }

        chai.request(server)
        .post("/users/login")
        .send(user)
        .end ((err, response)=>{
            response.should.have.status(401)
            response.body.should.be.a('object')
            response.body.should.have.property('message').eq("Invalid Password  ")
            done()
        })
    })


    it("It should Not get into the login route ", (done)=>{
        chai.request(server)
        .post("/user/login")
        .end ((err, response)=>{
            response.should.have.status(404)
            done()
        })
    })
})