# Firebase Custom Claims Manager

Custom claims enables you to set roles on users directly in the Auth object. You can read the custom claims in the client so as to customize their UI (e.g, prevent non-admins from seeing the admin page), as well as in Firestore security rules (e.g, prevent non-admins from writing Firestore documents).

Custom Claims (as of March 2024) can only be set programmatically. So if you have a new app with no users then how can you assign an admin claim to the first user if the user doesn't exist to invoke a cloud function? One solution is to manage custom claims on a dev machine using NodeJs. 

To use this code, you need to download the service account's permissions.json file of the Firebase project you're managing, and store it in the project's folder. You also need to install the Firebase Admin SDK npm package.

Then you can specify the user's email address (which you've previously added in Firebase Authentication), their custom claims, and what type of operations you want to run on the claims (add one or more claims, delete claims) by using this code.

I hope you find this useful.
