const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

// TODO maintenance job az budes mit hotovy tasks a habits
// https://firebase.google.com/docs/functions/schedule-functions

exports.createUserDb = functions
  .region('europe-west2')
  .auth.user()
  .onCreate((user) => {
    const { uid, email, displayName } = user
    const userRef = admin.firestore().collection('users').doc(uid)
    const pomoStatsRef = userRef.collection('pomoStats')

    userRef.set({
      name: displayName,
      email,
    })

    pomoStatsRef.doc('stats').set({
      completed: 0,
      dailyGoal: 0,
    })
  })
