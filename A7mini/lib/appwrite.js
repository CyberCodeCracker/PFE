import { Client, Account, ID, Databases } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.dev.PFE',
  projectId: '6634d3910015441b8e9b',
  databaseId: '6634ea580033b602c647',
  userCollectionId: '6634ea96000c020ee220',
  storageId: '6634ebf30023116a0094'
}

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) 
  .setProject(appwriteConfig.projectId) 
  .setPlatform(appwriteConfig.platform ) 

  const account = new Account(client);
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
 
    if(!newAccount) throw Error;

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        age,
        heartRate,
        gender,
      }
    )

    return newUser;
  } catch(error) {
    console.log(error);
    throw new Error(error);
  }
}

export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password)

    return session;
  } catch(error) {
    throw new Error(error);
  }
} 
;

