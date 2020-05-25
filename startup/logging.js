// const winston = require('winston');
// //require('winston-mongodb');
// require('express-async-errors');

// winston.exceptions.handle(
//           new winston.transports.Console({colorize:true,prettyPrint:true }),
//           new winston.transports.File({ filename: 'uncaughtExceptions.log' }));      
   
//   process.on('unhandledRejection', (ex) => {
//     throw ex;
//   });
  
//   winston.add(new winston.transports.File, { filename: 'logfile.log' });
//   // winston.add(new winston.transports.MongoDB, { 
//   //   db: 'mongodb://localhost/vidly',
//   //   level: 'info'
//   // });  
// }

const winston = require('winston');

module.exports = function () {


  winston.exceptions.handle(
         new winston.transports.Console({colorize:true,prettyPrint:true }),
         new winston.transports.File({ filename: 'uncaughtExceptions.log' }));      

  const files = new winston.transports.File({ filename: 'logfile.log' });
  const myconsole = new winston.transports.Console();

  winston.add(myconsole);
  winston.add(files);

}