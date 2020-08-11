const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.createUserDb = functions
  .region('europe-west2')
  .auth.user()
  .onCreate((user) => {
    const { uid, email, displayName } = user
    const userRef = admin.firestore().collection('users').doc(uid)

    userRef.set({
      name: displayName,
      email,
      pomoGoal: {
        completed: 0,
        dailyGoal: 0,
        timestamp: Date.now(),
      },
    })
  })
