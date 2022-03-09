// const chai = require("chai")
import chai from 'chai'
// const chaiHttp = require("chai-http")
import chaiHttp from 'chai-http'
import { server } from '../index.js'
// const server = require('../index')
chai.should()
chai.use(chaiHttp)


/**
 * Test Case for creating a User
 */

 describe("Post /users/signup", ()=>{
    it("POST a USER ",  (done)=>{
        const user = {
            name: "Mathankumar",
            email: "Ruban0@gmail.com",
            mobile: 8133338078,
            password: "Kavin@132Sa!"
        }
        chai.request(server)
        .post("/users/signup")
        .send(user)
        .end((err, res)=>{
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.should.have.property('message')
                res.body.should.have.property('createduser')
                done()
        })
    })

    it("It should not POST a user",  (done)=>{
        const users = {
                name: "Mathankumar",
                email: "Rubagmail.com",
                mobile: 8633338178,
                password: "Kavin@132Sa!"
            }        
        chai.request(server)
        .post("/users/signup")
        .send(users)
        .end((err, res)=>{
                res.should.have.status(500)
                done()
        })
    })

    it("It should not get into the user creating route",  (done)=>{
        const users = {
            
                name: "Mathankumar",
                email: "Ruban17@gmail.com",
                mobile: 8633438878,
                password: "Kavin@132Sa!"
                  }
        chai.request(server)
        .post("/user/signup")
        .send(users)
        .end((err, res)=>{
                res.should.have.status(404)
                done()
        })
    })
})





