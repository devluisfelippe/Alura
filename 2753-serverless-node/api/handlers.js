// module.exports.handler = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: "Go Serverless v3.0! Your function executed successfully!",
//         input: event,
//       },
//       null,
//       2
//     ),
//   };
// };
const { buildResponse } = require('./utils')
const { getUserByCredentials, saveResultsToDatabase, getResultById } = require('./database')
const { createToken, authorize, makeHash } = require('./auth')
const { countCorrectAnswers } = require('./countCorrectAnswers')

function extractBody(event) {
  if (!event?.body) {
    return buildResponse(422, { error: "Missing body" })
  }

  return JSON.parse(event.body)
}

module.exports.login = async (event) => {
  const { username, password } = extractBody(event)
  const hashedPass = makeHash(password)
  console.log("HASHED PASS:", hashedPass)

  const user = await getUserByCredentials(username, hashedPass)

  if (!user) {
    return buildResponse(401, { error: 'Invalid Credentials' })
  }
  console.log("user:", user)
  return buildResponse(200, { token: createToken(username, user._id) })
}

module.exports.sendReponse = async (event) => {
  const authResult = await authorize(event)
  if (authResult.statusCode === 401) return authResult
  const { name, answers } = extractBody(event) // não usamos req, res
  const result = countCorrectAnswers(name, answers)
  const insertedId = await saveResultsToDatabase(result)

  return buildResponse(201, {
    resultId: insertedId,
    __hypermedia: {
      href: `/results.html`,
      query: { id: insertedId }
    }
  })

  // res.status(201).json({
  //   resultId,
  //   __hypermedia: {
  //     href: `/results.html`,
  //     query: { id: resultId }
  //   }
  // })
}

module.exports.getResult = async (event) => {
  const authResult = await authorize(event)
  if (authResult.statusCode === 401) return authResult

  const result = await getResultById(event.pathParameters.id)

  if (!result) {
    return buildResponse(404, { error: 'Result not found' })
    //return res.status(404).json({ error: 'Result not found' })
  }

  return buildResponse(200, result)
  //res.json(result)
}