const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

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
      timestamp: Date.now(),
    })
  })

exports.addTimePoints = functions
  .region('europe-west2')
  .pubsub.schedule('50***')
  .onRun(async () => {
    const db = admin.firestore()

    const querySnap = await db.collection('users').get()

    const promises = []

    querySnap.forEach((doc) => {
      const docRef = doc.ref
      promises.push(docRef.collection('habitList').get())
    })

    const snapArrays = await Promise.all(promises)

    const promises1 = []

    snapArrays.forEach((snapArr) => {
      snapArr.forEach((snap) => {
        promises1.push(
          snap.ref.update({
            timePoints: admin.firestore.FieldValue.arrayUnion({
              date: new Date(),
              done: false,
            }),
          }),
        )
      })
    })

    return Promise.all(promises1)
  })
