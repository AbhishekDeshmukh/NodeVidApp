const request = require('supertest');
const {Genre } = require('../../../models/genre')
const { User} = require('../../../models/user')
 let server;


describe('/api/genres',() =>{

     beforeEach(() => { server = require('../../../index.js') } )
     afterEach(async () => {
        server.close()
        await Genre.remove({})   
    })

     describe('GET /',() => {

      it('should retun all genres',async() => {
           await Genre.collection.insertMany([
             { name : 'genre1'},
             { name : 'genre2'}            
           ])
             
           const res= await request(server).get('/api/genres')
           expect(res.status).toBe(200)
           expect(res.body.length).toBe(2)
           expect(res.body.some( g => g.name ==='genre1')).toBeTruthy()           
      });

      
      describe('GET /:id',() =>{
     
        it('should return genre by id',async() =>{

            const genre = new Genre({ name : 'genre1' })
            await genre.save()

            const res=await request(server).get('/api/genres/'+genre._id)

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('name',genre.name)
        })

        it('should return 404 ',async() =>{
            const res=await request(server).get('/api/genres/1') 
            expect(res.status).toBe(404)
        })

      });

      describe('POST /',() =>{

         it('should be 401 if user not logged in',async() =>{

            const result= await request(server)
                         .post('/api/genres') 
                         .send({ name:'genre1'})
            expect(result.status).toBe(401)

         });

         it ('should return 400 if length is less than 5', async() =>{
         
            const token= new User().generateAuthToken()

            const result = await request(server)
                                .post('/api/genres')
                                .set('x-auth-token',token)
                                .send({ name:'1234' })

             expect(result.status).toBe(400)
         }) 


      });

     });
});

  

