import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.dev.vigilance',
  projectId: '663b5f7600256d2a24ce',
  databaseId: '663b71880017aa43eda8',
  userCollectionId: '663b71ad002ec722f1fe',
  storageId: '663b737a0039ff5e9426'
}

const client = new Client();

client
    .setEndpoint(config.endpoint) 
    .setProject(config.projectId) 
    .setPlatform(config.platform) 

  const account = new Account(client);
  const avatars = new Avatars(client);
  const databases = new Databases(client);

  export const createUser = async (email, password, username, 
    age, heartRate, gender) => {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username,
        age,
        heartRate,
        gender
        ) 

      if (!newAccount) throw Error;

      const avatarUrl = avatars.getInitials(username)

      const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email,
          password,
          username, 
          age,
          heartRate,
          gender,
        }
      )

      return newUser;
      await signIn(email, password);
  } catch(error) {
    console.log(error)
    throw new Error(error);
  }
}

export const signIn = async (email, password) => {
  try {
    const existingSessions = await account.listSessions();
    if (existingSessions.total > 0) {
      await account.deleteSessions();
    }
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if(!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )
    
    if(!currentUser) throw Error
    
    return currentUser.documents[0];
  } catch(error) {
    console.log(error)
  }
}

export const signOut = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    throw new Error(error);
  }
}