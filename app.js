const admin = require('firebase-admin')
const fs = require('fs')

console.clear()

const CREDENTIALS_FILE = './path/to/your/credentials.json'
const USER_EMAIL = ''
const USER_CLAIMS = { role: 'manager', department: 'marketing' }

const serviceAccountKey = JSON.parse(fs.readFileSync(CREDENTIALS_FILE))
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
})

/**
 * Get the user from Firebase Auth
 */
async function getUser() {
  try {
    const user = await admin.auth().getUserByEmail(USER_EMAIL)
    if (!user) {
      console.log(`User "${USER_EMAIL}" not found`)
      return null
    }
    console.log(`Operating on user "${USER_EMAIL}"`)
    return user
  } catch (error) {
    console.log(`Unexpected error: ${error}`)
    return null
  }
}

/**
 * Get the user's custom claims
 */
function getCustomClaims(user) {
  return user.customClaims
}

/**
 * Set or update custom claims to the user
 */
async function setCustomClaims(user) {
  try {
    const customClaims = getCustomClaims(user) || {}
    Object.entries(USER_CLAIMS).forEach(
      ([claimName, claimValue]) => (customClaims[claimName] = claimValue)
    )
    await admin.auth().setCustomUserClaims(user.uid, customClaims)
  } catch (error) {
    console.log(`Unexpected error: ${error}`)
    return null
  }
}

/**
 * Delete one or more custom claims from the user
 */
async function deleteCustomClaims(user) {
  try {
    const customClaims = getCustomClaims(user)
    Object.keys(USER_CLAIMS).forEach(
      (claimName) => delete customClaims[claimName]
    )
    await admin.auth().setCustomUserClaims(user.uid, customClaims)
  } catch (error) {
    console.log(`Unexpected error: ${error}`)
    return null
  }
}

/**
 * Remove all custom claims from the user
 */
async function removeAllCustomClaims(user) {
  try {
    await admin.auth().setCustomUserClaims(user.uid, {})
  } catch (error) {
    console.log(`Unexpected error: ${error}`)
    return null
  }
}

;(async () => {
  const user = await getUser()

  if (!user) {
    return
  }
  await removeAllCustomClaims(user)
  await setCustomClaims(user)
  // await deleteCustomClaims(user)
  console.log(getCustomClaims(user))
})()
