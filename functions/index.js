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
    const pomoStatsRef = userRef.collection('pomo').doc('stats')

    userRef.set({
      name: displayName,
      email,
    })

    pomoStatsRef.set({
      dailyGoal: 0,
      completed: 0,
    })
  })
