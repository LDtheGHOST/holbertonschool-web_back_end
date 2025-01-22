// Export a class named AppController.
class AppController {
    static getHomepage(req, res) {
      res.send('Hello Holberton School!');
    }
  }
  
  module.exports = AppController;