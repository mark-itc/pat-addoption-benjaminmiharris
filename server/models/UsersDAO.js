const { ObjectId } = require("mongodb");
const PetsDAO = require("./PetsDAO");
let usersCollection;

module.exports = class UsersDAO {
  static async injectDB(connection) {
    if (!connection) return;
    try {
      usersCollection = await connection.collection("users");
    } catch (e) {
      console.log(`Could not establish connection to users collection ${e}`);
    }
  }

  static async createUser(userData) {
    userData.created_on = new Date();
    userData.role = "user";
    userData.savedPets = [];
    userData.myPets = [];
    await usersCollection.insertOne({ ...userData });
  }

  static async getUserByEmail(email) {
    return await usersCollection.findOne({ email });
  }

  static async getUserById(userId) {
    return await usersCollection.findOne({ _id: new ObjectId(userId) });
  }

  static async updateUser(userId, userObject) {
    await usersCollection.updateOne(
      { _id: new ObjectId(userId.id) },
      { $set: userObject }
    );
  }

  static async addLikedPetToUser(userId, petId) {
    const petObject = await PetsDAO.getPetById(petId);

    await usersCollection.updateOne(
      { _id: new ObjectId(userId.id) },
      { $push: { savedPets: petObject } }
    );
  }

  static async removeLikedPetFromUser(userId, petId) {
    await usersCollection.updateOne(
      { _id: new ObjectId(userId.id) },
      { $pull: { savedPets: { _id: new ObjectId(petId) } } }
    );
  }

  static async adoptOrFosterPet(userId, petId) {
    const petObject = await PetsDAO.getPetById(petId);

    await usersCollection.updateOne(
      { _id: new ObjectId(userId.id) },
      {
        $addToSet: { myPets: petObject._id },
      },
      { upsert: true }
    );
  }

  static async removeAdoptedPetFromUser(userId, petId) {
    await usersCollection.updateOne(
      { _id: new ObjectId(userId.id) },
      { $pull: { myPets: new ObjectId(petId) } }
    );
  }

  static async getAllUsers() {
    return await usersCollection.find({}).toArray();
  }
};
